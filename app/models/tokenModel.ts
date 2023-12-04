import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['authentication', 'access', 'refresh', 'recovery'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    revoked: {
        type: Boolean,
        default: false
    },
    ipAddress: {
        type: String
    },
    clientInfo: {
        type: String
    },
});

const Token = mongoose.models.tokens || mongoose.model('tokens', tokenSchema);

export default Token;