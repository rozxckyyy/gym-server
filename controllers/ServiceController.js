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
		const doc = new DateCoachSchema({
			date: req.body.date,
			time: req.body.time,
			serviceId: req.body.serviceId,
			authorId: req.body.authorId
		})

		res.json(doc)
	} catch (err) {
		res.status(500).json({
			message: 'Не удалось создать',
	  });
	}
}

export const getServicesDate = async (req, res) => {
	try {

		idAuthor

		const doc = await DateCoachSchema.find({})

		// const doc = new DateCoachSchema({
		// 	date: req.body.date,
		// 	time: req.body.time,
		// 	serviceId: req.body.serviceId,
		// 	authorId: req.body.authorId
		// })

		res.json(doc)
	} catch (err) {
		res.status(500).json({
			message: 'Не удалось создать',
	  });
	}
}