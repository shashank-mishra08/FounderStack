import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    partnerName: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: false, // Can be a placeholder if not provided
    },
    accessLevel: {
        type: String,
        enum: ['public', 'locked'],
        default: 'public',
    },
    category: {
        type: String,
        required: true,
    },
    discountDetails: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Deal = mongoose.model('Deal', dealSchema);
export default Deal;
