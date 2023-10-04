import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import * as validation from './validations/validation.js'

import * as UserController from './controllers/UserController.js'
import * as ServiceController from './controllers/ServiceController.js'

import { validationResult } from "express-validator";

import checkAuth from './utils/checkAuth.js';


mongoose.connect('mongodb+srv://admin:sssssssssss@gym.pvpedbv.mongodb.net/gym?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error:', err))

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello world')
});

app.post('/auth/reg', UserController.register)
app.post('/auth/login', UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/admin/allUsers', UserController.getAllAdmin)
app.get('/admin/allUsersRang', UserController.getAllRangsAdmin)
app.post('/admin/upRole', UserController.upRoleUser)
app.post('/admin/downRole', UserController.downRoleUser)
app.post('/admin/upRang', UserController.upRangUser)
app.post('/admin/downRang', UserController.downRangUser)
app.get('/admin/allServices', ServiceController.getAllServices)
app.post('/admin/editService', ServiceController.editServices)
app.get('/admin/allServicesDate', ServiceController.getEditServicesDateAdmin)
app.post('/admin/editServicesDate', ServiceController.editServicesDate)

app.post('/coach/serviceCreate', checkAuth, ServiceController.createService)
app.post('/coach/myAllServices', ServiceController.getMyServices)
app.post('/coach/deliteService', ServiceController.deliteMyService)

app.get('/getAllCoach', UserController.getAllCoach)

app.post('/servicesByCoach', ServiceController.getServicesByCoach)
app.post('/servicesDateByCoach', ServiceController.selectServicesByCoachToDate)
app.post('/servicesDateByCoachAll', ServiceController.getServicesDate)
app.post('/getServicesDateUser', ServiceController.getServicesDateUser)
app.post('/signUpToService', ServiceController.signUpToService)

app.post('/getServicesDateByUser', ServiceController.getServicesDateByUser)
app.post('/deliteService', ServiceController.deliteService)

app.post('/addFavoriteCoach', UserController.addFavoriteCoach)
app.post('/getFavoriteCoach', UserController.getFavoriteCoach)
app.post('/removeFavoriteCoach', UserController.removeFavoriteCoach)


app.listen(4444, (err) => {
	if (err) { 
		return console.log(err)
	}

	console.log("Server ok")
})