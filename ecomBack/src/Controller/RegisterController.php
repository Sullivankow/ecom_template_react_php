<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
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
            new OA\Response(response: 400, description: "Erreur de validation"),
        ]
    )]




    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
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
    $error = 'Cet email existe déjà';
}

        if ($error) {
            return $this->json(['error' => $error], 400);
        }

        // Création du nouvel utilisateur
        $user = new User();
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($email);
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'Utilisateur créé avec succès'], 201);
    }
}






