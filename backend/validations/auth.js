import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'wrong email').isEmail(),
    body('password', 'password should be min 5 symbols').isLength({ min: 5}),
    body('fullName', 'full name should be min 3 symbols').isLength({ min: 3}),
    body('avatarUrl', 'wrong avatar url').optional().isURL(),
]

export const loginValidation = [
    body('email', 'wrong email').isEmail(),
    body('password', 'password should be min 5 symbols').isLength({ min: 5}),
]