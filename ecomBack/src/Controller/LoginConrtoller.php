<?php

namespace App\Controller;

use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;



class LoginController
{
    #[Route('/login_check', name: 'api_login_check_doc', methods: ['POST'])]
    #[OA\Post(
        path: '/api/login_check',
        summary: 'Authentification utilisateur (JWT)',
        tags: ["Utilisateur"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(property: 'email', type: 'string', example: 'user@email.com'),
                    new OA\Property(property: 'password', type: 'string', example: 'password')
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Token JWT renvoyé'),
            new OA\Response(response: 401, description: 'Identifiants invalides')
        ]
    )]
    public function loginDoc(): Response
    {
        // Cette méthode ne sera jamais appelée, elle sert uniquement à la documentation.
        return new Response(null, 200);
    }
}