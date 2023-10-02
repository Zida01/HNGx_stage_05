const uploadDb = require('../models/imageModels')
const upload = require('../uploadMethods/multer')
const multer = require('multer')
const path = require('path')
require('dotenv').config()
const cloudinary = require('../uploadMethods/cloudinary')
const { Deepgram } = require("@deepgram/sdk");

exports.getVideosTranscribe = async (req, res,) => {

    const deepgram = new Deepgram(process.env.DG_API_KEY);
    try {
        const { name } = req.params
        // findById(name)

        const allvideos = await uploadDb.findOne({
            cloudinary_id: name
        })
        if (!allvideos) {
            return res.status(404).json({ message: 'No videos found', status: " this recording does not exit" })
        }
        //console.log(allvideos.audioUrl)
        const t = await deepgram.transcription.preRecorded({ url: allvideos.audioUrl })
        const data = t.results.channels[0].alternatives[0].transcript

        if (!allvideos) {
            return res.status(200).json({ message: error.message })
        }
        const addTranscribe = await uploadDb.findOneAndUpdate({ cloudinary_id: name }, { transcribe: data }, { new: true, upsert: true })
        res.status(200).json({ message: "success", data: addTranscribe })


        //res.redirect(`/rc/${name}`, { allvideos: allvideos }, { data: data })
    }

    catch (error) {
        res.status(404).json(error.message)

    }

}



//exports.showVideosTranscribe = async (req, res) => {


//res.render('videosTranscribe')

// try {
//     const { name } = req.params
//     // findById(name)

//     const allvideos = await uploadDb.findOne({
//         cloudinary_id: name
//     })
//     if (!allvideos) {

//         return res.status(200).json({ message: error.message })
//     }
//     return res.render('videosTranscribe', { allvideos: allvideos })

// } catch (error) {
//     res.status(404).json({ message: error.message })

// }
//}

