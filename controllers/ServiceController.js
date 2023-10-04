import ServiceModel from "../models/service.js";
import DateCoachSchema from "../models/date.js"

export const createService = async (req, res) => {
	try {
		const doc = new ServiceModel({
			name: req.body.name,
			info: req.body.info,
			price: req.body.price,
			category: req.body.category,
			authorId: req.body.authorId
		})

		const service = await doc.save()
		res.json(service)

	} catch (err) {
		console.log(err);
		res.status(500).json({
			 message: 'Не получилось добавить услугу',
		});
	}
}

export const getMyServices = async (req, res) => {
	try {
		const idAuthor = req.body.authorId

		const services = await ServiceModel.find({ authorId: idAuthor })

		res.json(services)
	} catch (err) {
		res.status(500).json({
			 message: 'Не удалось получить услуги',
		});
	}
}

export const deliteMyService = async (req, res) => {
	try {
		const idService = req.body.serviceId

		const service = await ServiceModel.findByIdAndDelete({ _id: idService })

		res.json(service)
	} catch (err) {
		res.status(500).json({
			 message: 'Не удалось получить услуги',
		});
	}
}

export const getServicesByCoach = async (req, res) => {
	try {
		const idCoach = req.body.id

		const services = await ServiceModel.find({authorId: idCoach})

		res.json(services)
	} catch (err) {
		res.status(500).json({
			message: 'Не удалось получить услуги',
	  });
	} 
}

export const selectServicesByCoachToDate = async (req, res) => {
	try {
		
		const serviceId = req.body.serviceId
		// const serviceId = req.body.serviceId
		const service = await ServiceModel.findById({_id: serviceId})

		const doc = new DateCoachSchema({
			date: req.body.date,
			time: req.body.time,
			service: service,
			authorId: req.body.authorId
		})

		const serv = await doc.save()
		res.json(serv)
	} catch (err) {
		res.status(500).json({
			message: 'Не удалось создать',
	  });
	}
}

export const getServicesDate = async (req, res) => {
	try {

		const idAuthor = req.body._id

		const doc = await DateCoachSchema.find({authorId: idAuthor}).populate('service')

		res.json(doc)
	} catch (err) {
		res.status(500).json({
			message: 'Не удалось создать',
	  });
	}
}

export const getServicesDateUser = async (req, res) => {
	try {
		const idAuthor = req.body.authorId
		const idService = req.body.serviceId

		const doc = await DateCoachSchema.find({$and : [{authorId: idAuthor}, {userId : { $exists : false }}, {service: {_id: idService}}]}).populate('service')

		res.json(doc)
	} catch (err) {
		console.log(err)

		res.status(500).json({
			message: 'Не удалось получить',
	  });
	}
}

export const signUpToService = async (req, res) => {
	try {
		const idService = req.body.serviceId
		const idUser = req.body.userId

		const doc = await DateCoachSchema.findByIdAndUpdate(idService, {$set: {userId: idUser}}, { new: true }).populate('service')
		
		res.json(doc)
	} catch (err) {
		console.log(err)

		res.status(500).json({
			message: 'Не удалось записаться',
	  });
	}
}

export const getServicesDateByUser = async (req, res) => {
	try {
		const idUser = req.body.userId

		const doc = await DateCoachSchema.find({userId: idUser}).populate('service').populate('authorId')
		
		res.json(doc)
	} catch (err) {
		console.log(err)

		res.status(500).json({
			message: 'Не удалось получить услуги',
	  });
	}
}

export const deliteService = async (req, res) => {
	try {
		const idService = req.body.serviceId

		const service = await DateCoachSchema.findByIdAndDelete({ _id: idService })

		res.json(service)
	} catch (err) {
		res.status(500).json({
			 message: 'Не получилось удалить',
		});
	}
}

export const getAllServices = async (req, res) => {
	try {

		const service = await ServiceModel.find()

		res.json(service)
	} catch (err) {
		res.status(500).json({
			 message: 'err',
		});
	}
}

export const editServices = async (req, res) => {
	try {

		const id = req.body._id

		const service = await ServiceModel.findOneAndReplace(
			{ _id: id}, 
			{ name: req.body.name, info: req.body.info, _id: id,
				price: req.body.price, authorId: req.body.authorId,
			}, { new: true })

		res.json(service)
	} catch (err) {
		res.status(500).json({
			 message: 'err',
		});
	}
}

export const editServicesDate = async (req, res) => {
	try {

		const id = req.body._id

		const service = await DateCoachSchema.findOneAndReplace({ _id: id}, { date: req.body.date, time: req.body.time}, { new: true })

		res.json(service)
	} catch (err) {
		res.status(500).json({
			 message: 'err',
		});
	}
}

export const getEditServicesDateAdmin = async (req, res) => {
	try {
		const service = await DateCoachSchema.find().populate('service')

		res.json(service)
	} catch (err) {
		res.status(500).json({
			 message: 'err',
		});
	}
}