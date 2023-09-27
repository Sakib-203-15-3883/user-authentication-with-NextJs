// this schema defines the structure of user documents in the MongoDB collection and specifies validation rules. It ensures that user documents must have a unique username and email, and it provides default values for fields like isVerified and isAdmin. Additionally, it includes fields for handling password reset and email verification tokens, along with their expiration dates.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

// this code ensures that there is a Mongoose model named "users" for user documents. If the model already exists, it reuses it; otherwise, it creates a new model.

const User = mongoose.models.users || mongoose.model("users", userSchema);


console.log(User);

export default User;