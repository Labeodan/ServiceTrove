const mongoose = require("mongoose")

const timeslotsSchema = new mongoose.Schema({
    date: {type: Date, required: true,},
    time: {type: String, required: true,},
    isBooked: {type: Boolean, default: false,},

})


const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true,},
    description: {type: String, required: true},
    price: {type: Number, required: true,},
    serviceProvider: {type: mongoose.Types.ObjectId, ref: "User", required: true,},
    timeslots: [timeslotsSchema],
    image: { type: String },

})

const Service = mongoose.model("service", serviceSchema)

module.exports = Service