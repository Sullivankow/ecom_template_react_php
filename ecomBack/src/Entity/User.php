<?php
        namespace App\Entity;

        use App\Repository\UserRepository;
        use Doctrine\ORM\Mapping as ORM;
        use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
        use Symfony\Component\Security\Core\User\UserInterface;

        /**
         * Entité représentant un utilisateur de l'application.
         * Contient les informations d'identité, d'authentification et de rôle.
         */
        #[ORM\Entity(repositoryClass: UserRepository::class)]
        #[ORM\Table(name: '`user`')]
        #[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
        class User implements UserInterface, PasswordAuthenticatedUserInterface
        {
            /**
             * Identifiant unique (clé primaire)
             */
            #[ORM\Id]
            #[ORM\GeneratedValue]
            #[ORM\Column]
            private ?int $id = null;

            /**
             * Prénom de l'utilisateur
             */
            #[ORM\Column(length: 100)]
            private ?string $firstName = null;

            /**
             * Nom de famille de l'utilisateur
             */
            #[ORM\Column(length: 100)]
            private ?string $lastName = null;

            /**
             * Adresse email (unique)
             */
            #[ORM\Column(length: 180)]
            private ?string $email = null;

            /**
             * Rôles de l'utilisateur (ex : ROLE_USER, ROLE_ADMIN)
             */
            #[ORM\Column]
            private array $roles = [];

            /**
             * Mot de passe hashé
             */
            #[ORM\Column]
            private ?string $password = null;

 /**
             * GETTER ET SETTER
             */




            /**
             * Retourne l'identifiant unique de l'utilisateur
             */
            public function getId(): ?int
            {
                return $this->id;
            }

            /**
             * Retourne le prénom de l'utilisateur
             */
            public function getFirstName(): ?string
            {
                return $this->firstName;
            }

            /**
             * Définit le prénom de l'utilisateur
             */
            public function setFirstName(string $firstName): static
            {
                $this->firstName = $firstName;
                return $this;
            }

            /**
             * Retourne le nom de famille de l'utilisateur
             */
            public function getLastName(): ?string
            {
                return $this->lastName;
            }

            /**
             * Définit le nom de famille de l'utilisateur
             */
            public function setLastName(string $lastName): static
            {
                $this->lastName = $lastName;
                return $this;
            }

            /**
             * Retourne l'adresse email de l'utilisateur
             */
            public function getEmail(): ?string
            {
                return $this->email;
            }

            /**
             * Définit l'adresse email de l'utilisateur
             */
            public function setEmail(string $email): static
            {
                $this->email = $email;
                return $this;
            }

            /**
             * Identifiant visuel de l'utilisateur (utilisé par Symfony)
             */
            public function getUserIdentifier(): string
            {
                return (string) $this->email;
            }

            /**
             * Retourne la liste des rôles de l'utilisateur
             */
            public function getRoles(): array
            {
                $roles = $this->roles;
                // Ajoute toujours le rôle de base
                $roles[] = 'ROLE_USER';
                return array_unique($roles);
            }

            /**
             * Définit la liste des rôles de l'utilisateur
             */
            public function setRoles(array $roles): static
            {
                $this->roles = $roles;
                return $this;
            }

            /**
             * Retourne le mot de passe hashé
             */
            public function getPassword(): ?string
            {
                return $this->password;
            }

            /**
             * Définit le mot de passe hashé
             */
            public function setPassword(string $password): static
            {
                $this->password = $password;
                return $this;
            }

            /**
             * Pour la sécurité : ne jamais stocker le hash du mot de passe en session (Symfony >= 7.3)
             */
            public function __serialize(): array
            {
                $data = (array) $this;
                $data["\0".self::class."\0password"] = hash('crc32c', $this->password);
                return $data;
            }
        }

