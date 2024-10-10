const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }


        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'archived'],
        default: 'pending'
    }, createdAt: {
        type: Date,
        default: Date.now
    }, stockUpdated: {
        type: Boolean,
        default: false,
    },
    archivedAt: {
        type: Date
    }

})


module.exports = mongoose.model('Order', orderSchema)