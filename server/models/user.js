const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    images: {
        type: Array,
        default: {
            url: "https://via.placeholder.com/150/000000/FFFFFF/?text=Default Image",
            public_id: Date.now
        }
    },
    about: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('User',userSchema);