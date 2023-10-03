import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
		default: 'user'
	},
	rang: {
		type: String,
		required: false,
		default: null,
	}
},
{
	timestamps: true
})

export default mongoose.model('User', UserSchema)