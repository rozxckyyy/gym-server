import mongoose, { Schema } from "mongoose";

const HistoryServiseSchema = new mongoose.Schema({
	service: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'DateCoach',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: false
	}
},
{
	timestamps: true
})

export default mongoose.model('HistoryServise', HistoryServiseSchema)