import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";

import UserModel from '../models/user.js'
import FavoriteModel from '../models/favorite.js';

export const register = async (req, res) => {
	try {
		const userSearch = await UserModel.findOne({ email: req.body.email });

		if (userSearch) {
			return res.status(404).json({
				message: "Данная почта уже занята",
			})
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10); // Генерируем соль
		const hash = await bcrypt.hash(password, salt); // Хэгируем пароль при помощи сгенерированной соли

		const doc = new UserModel({
			email: req.body.email,
			name: req.body.name,
			passwordHash: hash
		})

		const user = await doc.save();

		const token = jwt.sign( //Создаем токен, в который мы кидаем id и шифруем его по ключу
			{
				_id: user._id,
			},
			"secret123", // вот этот ключ
			{
				expiresIn: "30d", // время действия токена
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			userData,
			token,
		});

	} catch (err) {
		res.status(400).json({
			message: "Can`t reg",
		});
	}
}

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({
				message: "Пользователя с такой почтой не существует",
			})
		}

		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		);

		if (!isValidPass) {
			return res.status(404).json({
				message: "Неверный логин или пароль",
			});
		}

		const token = jwt.sign( //Создаем токен, в который мы кидаем id и шифруем его по ключу
			{
				_id: user._id,
			},
			"secret123", // вот этот ключ
			{
				expiresIn: "30d", // время действия токена
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});

	} catch (err) {
		console.log(err);
		res.status(403).json({
			message: "Can`t log",
		});
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res.status(404).json({
				message: "Такого пользователя нет",
			});
		}
		const { passwordHash, ...userData } = user._doc;

		res.json(userData);
	} catch (err) {
		console.log(err);
		res.status(403).json({
			message: "Нет доступа ",
		});
	}
};

export const getAllAdmin = async (req, res) => {
	try {
		const users = await UserModel.find({type: {$ne : 'admin'}})

		res.json(users);

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to show all users',
		});
	};
}

export const getAllRangsAdmin = async (req, res) => {
	try {
		const users = await UserModel.find({$and : [{type: {$ne : 'admin'}}, {rang: {$ne : null}}, {type: {$ne : 'user'}}]})

		res.json(users);

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to show all users',
		});
	};
}

export const upRoleUser = async (req, res) => {
	try {
		const userId = req.body._id

		const user = await UserModel.findOneAndUpdate({ _id: userId }, { type: 'coach', rang: 'Тренер' }, { new: true })

		res.json(user)
	} catch (err) {
		res.status(500).json({
			message: 'Такого пользователя не существует',
		});
	};
}

export const downRoleUser = async (req, res) => {
	try {
		const userId = req.body._id

		const user = await UserModel.findOneAndUpdate({ _id: userId }, { type: 'user', rang: null }, { new: true })

		res.json(user)
	} catch (err) {
		res.status(500).json({
			message: 'Такого пользователя не существует',
		});
	};
}

export const downRangUser = async (req, res) => {
	try {
		const userId = req.body._id

		const user = await UserModel.findOne({_id: userId, rang: {$ne: null}})
		if (user.rang == 'Старший тренер') {
			user.rang = 'Тренер';
		} else if (user.rang == 'Тренер') {
			user.rang = null;
			user.type = 'user'
		}

		user.save()
		res.json(user)
	} catch (err) {
		res.status(500).json({
			message: 'Такого пользователя не существует',
		});
	};
}

export const upRangUser = async (req, res) => {
	try {
		const userId = req.body._id

		const user = await UserModel.findOne({_id: userId, rang: {$ne: null}})
		if (user.rang == 'Тренер') {
			user.rang = 'Старший тренер';
		}

		user.save()
		res.json(user)
	} catch (err) {
		res.status(500).json({
			message: 'Такого пользователя не существует',
		});
	};
}

export const getAllCoach = async (req, res) => {
	try {
		const users = await UserModel.find({type: 'coach', rang: {$ne: null}})

		res.json(users)


	} catch (err) {
		res.status(500).json({
			message: 'Такого пользователя не существует',
		});
	};
}

export const addFavoriteCoach = async (req, res) => {
	try {

		const userId = req.body.user
		const coachId = req.body.coach

		const doc = new FavoriteModel({
			user: userId,
			coach: coachId
		})

		await doc.populate('coach')

		const result = await doc.save()
		res.json(result)
	} catch (err) {
		res.status(500).json({
			message: 'Такого пользователя не существует',
		});
	};
}

export const getFavoriteCoach = async (req, res) => {
	try {
		const userId = req.body._id

		const doc = await FavoriteModel.find({user: userId}).populate('coach')

		res.json(doc)
	} catch (err) {
		res.status(500).json({
			message: 'err',
		});
	};
}

export const removeFavoriteCoach = async (req, res) => {
	try {
		const id = req.body._id

		const doc = await FavoriteModel.findByIdAndDelete(id)

		res.json(doc)
	} catch (err) {
		res.status(500).json({
			message: 'Не получилось удалить',
		});
	};
}