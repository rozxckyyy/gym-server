import { body } from "express-validator";

export const registerValidation = [
	body('email').isEmail(),
	body('password').isLength({min: 5}),
	body('name').isLength({min: 3}),
]

export const loginValidation = [
	body('email', 'Такая почта уже существует'),
	body('password', 'Неверно указан пароль'),
];