const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema({
    place:{type: mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    user: {type: mongoose.Schema.Types.ObjectId, required:true},
    checkIn:{type:Date,required: true},
    checkOut:{type:Date,required: true},
    name:String,
    mobile:String,
    price:Number,
    numberOfGuests:Number,
})

const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = BookingModel