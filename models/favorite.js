import mongoose, { Schema } from "mongoose";

const FavoriteSchema = new mongoose.Schema({
	coach: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
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

export default mongoose.model('Favorite', FavoriteSchema)