import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import * as validation from './validations/validation.js'

import * as UserController from './controllers/UserController.js'
import * as ServiceController from './controllers/ServiceController.js'

import { validationResult } from "express-validator";

import checkAuth from './utils/checkAuth.js';


mongoose.connect('mongodb+srv://admin:gY3NfpUwfmk3SQ5b@cluster0.czys5.mongodb.net/') // подключение к бд
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error:', err))

const app = express();

app.use(express.json()); // для преобразования входящих запросов в JSON формат
app.use(cors()); // CORS — это механизм, который дает контролировать доступ к тегам на веб странице по сети. 
					//Механизм классифицируется на три разные категории доступа тегов
					//Проще говоря: нужен: чтобы клент мог принимать некоторые виды ресурсов

app.post('/auth/reg', UserController.register) // Регистрация
app.post('/auth/login', UserController.login) // Авторизация
app.get('/auth/me', checkAuth, UserController.getMe); // Проверка на то, автризован ли пользователь сейчас

app.get('/admin/allUsers', UserController.getAllAdmin) // Получение всех пользователей
app.get('/admin/allUsersRang', UserController.getAllRangsAdmin) // Получение пользователей с рангами (тренера)
app.post('/admin/upRole', UserController.upRoleUser) // Повысить роль
app.post('/admin/downRole', UserController.downRoleUser) // Понизить роль
app.post('/admin/upRang', UserController.upRangUser) // Повысить ранг
app.post('/admin/downRang', UserController.downRangUser) // Понизить ранг
app.get('/admin/allServices', ServiceController.getAllServices)  // Получение всего услуг
app.post('/admin/editService', ServiceController.editServices) // Изменение услуги
app.get('/admin/allServicesDate', ServiceController.getServicesDateAdmin) // Получение услуг с расписанием
app.post('/admin/editServicesDate', ServiceController.editServicesDateAdmin) // Изменение услуги с расписанием
app.post('/admin/editPassword', ServiceController.editPasswordAdmin) // Изменение пароля

app.post('/coach/serviceCreate', checkAuth, ServiceController.createService) // Создание услуги
app.post('/coach/myAllServices', ServiceController.getMyServices) // Получение собственных улсуг для тренера
app.post('/coach/deliteService', ServiceController.deliteMyService) // Удаление собственных услуг для тренера

app.get('/getAllCoach', UserController.getAllCoach) // Получение всех тренеров
app.post('/addFavoriteCoach', UserController.addFavoriteCoach) // Получение всех тренеров добавленных в избранное 
app.post('/getFavoriteCoach', UserController.getFavoriteCoach) // Добавить тренера в избранное
app.post('/removeFavoriteCoach', UserController.removeFavoriteCoach) // Удалить тренера из избранного

app.post('/servicesByCoach', ServiceController.getServicesByCoach) // Получение улсуг по выбранному тренеру
app.post('/servicesDateByCoach', ServiceController.selectServicesByCoachToDate) // Дабоваление услуги в расписание

app.post('/servicesDateByCoachAll', ServiceController.getServicesDate) // Получение услуг с расписанием по тренеру
app.post('/getServicesDateUser', ServiceController.getServicesDateUser) // Получение доступного расписания вы быранной услуге тренера

app.post('/signUpToService', ServiceController.signUpToService) // Записаться на услугу без скидки
app.post('/signUpToServiceDiscount', ServiceController.signUpToServiceDiscount) // Записаться на услугу со скидкой

app.post('/getServicesDateByUser', ServiceController.getServicesDateByUser) // Получение истории всех забронированных услуг
app.post('/deliteService', ServiceController.deliteService) // Удаление созданной услуги с расписанием

app.listen(4444, (err) => { // запуск сервака на порт 4444
	if (err) { 
		return console.log(err)
	}

	console.log("Server ok")
})