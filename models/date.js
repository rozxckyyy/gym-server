import mongoose from "mongoose";

const DateCoachSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
    time: {
		type: String,
		required: true,
	},
    serviceId: {
        type: String,
		required: true,
    },
    authorId: {
        type: String,
		required: true,
    }
},
{
	timestamps: true
})

export default mongoose.model('DateCoach', DateCoachSchema)