//  Validation des champs avec la bibliothèque yup
// (Installer d'abord : npm install yup)

import * as yup from 'yup';

export const registrationSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string()
    .min(8, 'Au moins 8 caractères')
    .matches(/[A-Z]/, 'Une majuscule requise')
    .matches(/[a-z]/, 'Une minuscule requise')
    .matches(/\d/, 'Un chiffre requis')
    .required('Mot de passe requis'),
});

// Exemple d'utilisation :
// registrationSchema.validate({ email, password })



//Création dd'un shéma de validation pour le forulaire de connexion
export const loginSchema = yup.object({ 
    email: yup.string().email('Email invalide').required('Email requis'),
    password: yup.string().required('Mot de passe requis'),
})


// Schéma de validation pour le formulaire d'inscription
export const registrationFullSchema = yup.object({
  fullname: yup
    .string()
    .min(2, 'Le nom doit comporter au moins 2 caractères')
    .max(50, 'Le nom est trop long')
    .required('Nom complet requis'),
  email: yup
    .string()
    .email('Email invalide')
    .required('Email requis'),
  password: yup
    .string()
    .min(8, 'Au moins 8 caractères')
    .matches(/[A-Z]/, 'Une majuscule requise')
    .matches(/[a-z]/, 'Une minuscule requise')
    .matches(/\d/, 'Un chiffre requis')
    .required('Mot de passe requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation du mot de passe requise'),
});



// Schéma de validation pour le formulaire de contact (sécurisé contre les injections de script)
export const contactSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Le nom doit comporter au moins 2 caractères')
    .max(50, 'Le nom est trop long')
    .matches(/^[a-zA-ZÀ-ÿ' -]+$/, 'Le nom ne doit contenir que des lettres et espaces')
    .test('no-script', 'Caractères non autorisés détectés', value => !/<script|<|>|&|"|'|\//i.test(value || ''))
    .required('Nom requis'),
  email: yup
    .string()
    .email('Email invalide')
    .required('Email requis'),
  message: yup
    .string()
    .min(10, 'Le message doit comporter au moins 10 caractères')
    .max(1000, 'Le message est trop long')
    .test('no-script', 'Caractères non autorisés détectés', value => !/<script|<|>|&|"|'|\//i.test(value || ''))
    .required('Message requis'),
  
});