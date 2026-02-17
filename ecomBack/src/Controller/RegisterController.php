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
        // Récupérer les données JSON envoyées par le front
        $data = json_decode($request->getContent(), true);

        // Vérifier la présence des champs obligatoires
        if (
            empty($data['firstName']) ||
            empty($data['lastName']) ||
            empty($data['email']) ||
            empty($data['password'])
        ) {
            return $this->json(['error' => 'Champs manquants'], 400);
        }
        // Vérifier si l'email existe déjà
        if ($em->getRepository(User::class)->findOneBy(['email' => $data['email']])) {
            return $this->json(['error' => 'Cet email existe déjà'], 400);
        }

        // Création du nouvel utilisateur
        $user = new User();
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($data['email']);
        $user->setRoles(['ROLE_USER']);
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        // Persister et sauvegarder l'utilisateur en base de données
        $em->persist($user);
        $em->flush();

        // Retourner une réponse en json
        return $this->json(['message' => 'Utilisateur créé avec succès'], 201);
    }
}






