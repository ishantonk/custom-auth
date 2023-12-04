import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
        trim: true,
        minlength: [3, "Name can not be less than 3 characters"],
        maxlength: [20, "Name can not be more than 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password can not be less than 6 characters"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema); // if model already exists, use it, else create new model

export default User