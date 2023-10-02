
const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({
    imageName: {
        type: String,
        unique: true,
        required: [true, 'Name Already Exit kindly Rename '],

    },
    cloudinary_id: { type: String },
    imageUrl: { type: String },
    audioUrl: { type: String },
    transcribe: { type: String }


});

const uploadDb = mongoose.model('uploadDb', tourSchema);


module.exports = uploadDb