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