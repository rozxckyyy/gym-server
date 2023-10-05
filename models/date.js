import mongoose, { Schema } from "mongoose";

const DateCoachSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
    time: {
		type: String,
		required: true,
	},
	discountPrice: {
		type: Number,
		required: false,
	},
	service: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Service',
		required: true,
	},
	authorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	userId: {
		type: String,
		required: false
	},
},
{
	timestamps: true
})

export default mongoose.model('DateCoach', DateCoachSchema)