import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    iv: {
        type: String,
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
  
export const Password = mongoose.model('Password', passwordSchema);