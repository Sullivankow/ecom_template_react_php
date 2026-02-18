<?php

namespace App\Controller;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use OpenApi\Attributes as OA;


class RegisterController extends AbstractController
{
    // Route pour l'inscription d'un nouvel utilisateur
    #[Route('/register', name: 'api_register', methods: ['POST'])]
    #[OA\Post(
        path: "/api/register",
        summary: "Inscription d'un nouvel utilisateur",
        tags: ["Utilisateur"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["firstName", "lastName", "email", "password"],
                properties: [
                    new OA\Property(property: "firstName", type: "string"),
                    new OA\Property(property: "lastName", type: "string"),
                    new OA\Property(property: "email", type: "string", format: "email"),
                    new OA\Property(property: "password", type: "string", format: "password"),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Utilisateur créé"),
            new OA\Response(response: 400, description: "Erreur lors de la validation"),
        ]
    )]




    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'Cet email est invalide'], 400);
        }
        $error = null;

        // Vérification des champs obligatoires
        if (
            empty($data['firstName']) ||
            empty($data['lastName']) ||
            empty($data['email']) ||
            empty($data['password'])
        ) {
            $error = 'Champs manquants';
        }

        // Vérification regex mot de passe (si pas d'erreur précédente)
        $regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]).{8,}$/';
        if (!$error && !preg_match($regex, $data['password'])) {
            $error = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.';
        }

        // Vérification email déjà existant et échapper les caractères (si pas d'erreur précédente)
        if (!$error && $em->getRepository(User::class)->findOneBy(['email' => $email])) {
            $error = 'Email déjà existant';
        }

        if ($error) {
            return $this->json(['error' => $error], 400);
        }

        // Création du nouvel utilisateur
        $user = new User();
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($email);
        // Attribuer automatiquement le rôle USER
        $user->setRoles(['ROLE_USER']);
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'Utilisateur créé avec succès'], 201);
    }



    // Route pour remplacer toutes les infos de l'utilisateur (PUT)
    #[Route('/users/{id}', name: 'user_update', methods: ['PUT'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    #[OA\Put(
        path: "/api/users/{id}",
        summary: "Modifier totalement un utilisateur (nom, prénom, email)",
        tags: ["Utilisateur"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["firstName", "lastName", "email"],
                properties: [
                    new OA\Property(property: "firstName", type: "string"),
                    new OA\Property(property: "lastName", type: "string"),
                    new OA\Property(property: "email", type: "string", format: "email")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Utilisateur mis à jour"),
            new OA\Response(response: 400, description: "Erreur de validation")
        ]
    )]

    public function updateUser(
        Request $request,
        User $user,
        EntityManagerInterface $em,

    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $error = null;

        // Vérification des champs obligatoires
        if (
            empty($data['firstName']) ||
            empty($data['lastName']) ||
            empty($data['email'])
        ) {
            $error = 'Champs manquants';
        }

        // Vérification email
        $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
        if (!$error && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = 'Email invalide';
        }

        // Vérification email déjà existant (hors utilisateur courant)
        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if (!$error && $existingUser && $existingUser->getId() !== $user->getId()) {
            $error = 'Cet email existe déjà';
        }

        if ($error) {
            return $this->json(['error' => $error], 400);
        }

        // Mise à jour des champs (seulement nom, prénom, email)
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($email);

        $em->flush();

        return $this->json([
            'message' => 'Utilisateur mis à jour',
            'user' => [
                'id' => $user->getId(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }




    //Méthode pour modifier partiellement un utilisateur PAtCH
    #[Route('/users/{id}', name: 'user_patch', methods: ['PATCH'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    #[OA\Patch(
        path: "/api/users/{id}",
        summary: "Modifier partiellement un utilisateur (nom, prénom, email)",
        tags: ["Utilisateur"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            required: false,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "firstName", type: "string"),
                    new OA\Property(property: "lastName", type: "string"),
                    new OA\Property(property: "email", type: "string", format: "email")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Utilisateur modifié"),
            new OA\Response(response: 400, description: "Erreur de validation")
        ]
    )]


    public function patchUser(
        Request $request,
        User $user,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $error = null;

        if (isset($data['email'])) {
            $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $error = 'Email invalide';
            }
            $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $email]);
            if (!$error && $existingUser && $existingUser->getId() !== $user->getId()) {
                $error = 'Cet email existe déjà';
            }
            if (!$error) {
                $user->setEmail($email);
            }
        }
        if (isset($data['firstName'])) {
            $user->setFirstName($data['firstName']);
        }
        if (isset($data['lastName'])) {
            $user->setLastName($data['lastName']);
        }

        if ($error) {
            return $this->json(['error' => $error], 400);
        }

        $em->flush();

        return $this->json([
            'message' => 'Utilisateur modifié',
            'user' => [
                'id' => $user->getId(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }




#[Route('users/{id}', name: 'user_delete', methods: ['DELETE'])]
#[IsGranted('IS_AUTHENTICATED_FULLY')]
#[OA\Delete(
    path: "/api/users/{id}",
    summary: "Supprimer un utilisateur",
    tags: ["Utilisateur"],
    parameters: [
        new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
    ],
    responses: [
        new OA\Response(response: 200, description: "Utilisateur supprimé"),
        new OA\Response(response: 404, description: "Utilisateur non trouvé")
    ]
)]
public function deleteUser(
    User $user,
    EntityManagerInterface $em
): JsonResponse {
    $em->remove($user);
    $em->flush();

    return $this->json(['message' => 'Utilisateur supprimé']);
}








}