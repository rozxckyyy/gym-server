import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	info: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
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

export default mongoose.model('Service', serviceSchema)