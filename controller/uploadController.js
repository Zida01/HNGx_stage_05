const uploadDb = require('../models/imageModels')
const upload = require('../uploadMethods/multer')
const multer = require('multer')
const path = require('path')
const cloudinary = require('../uploadMethods/cloudinary')
const { Deepgram } = require("@deepgram/sdk");

exports.uploadVideo = async (req, res) => {
    const options = {
        resource_type: 'video',
        format: 'wav', // Change the format as needed (e.g., mp3, ogg)
    };

    try {
        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "video" },)
        const resultAudio = await cloudinary.uploader.upload(result.secure_url, options)
        const upload = new uploadDb({
            imageName: req.file.originalname,
            cloudinary_id: result.public_id,
            imageUrl: result.secure_url,
            audioUrl: resultAudio.secure_url,
            transcribe: null
        })
        await upload.save()
        res.status(200).json({
            message: " recording  has been saved ",
            upload
        })

    } catch (error) {

        res.status(404).json({ Error: error.message, status: "Failed" })

    }
}

exports.showVideos = async (req, res) => {
    try {

        const allvideos = await uploadDb.find()
        if (!allvideos) {

            return res.status(200).json({ message: "error occured  displaying all recording ", })
        }
        //return res.render('videos', { allvideos: allvideos })
        res.status(200).json({ message: "success  ,   Displaying all recording", recording: allvideos })


    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}



exports.showSpecificVideos = async (req, res) => {
    try {
        const { name } = req.params
        const allvideos = await uploadDb.findOne({
            cloudinary_id: name
        })
        if (!allvideos) {

            return res.status(200).json({ message: "video does not Exit" })
        }
        res.status(200).json({ message: "success", data: allvideos })
        //return res.render('singlevideos', { allvideos: allvideos })

    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}


// async function transcribe(req, res, nex) {
//     const file = 'https://res.cloudinary.com/dhwzwxbk2/video/upload/v1696135108/v3jica1u6ckpmgwzkjkq.wav'
//     const deepgram = new Deepgram('fbece349c367a59fcf30f7cd03f1a683785ebc7a');

//     deepgram.transcription
//         .preRecorded({ url: file })
//         .then((response) => {
//             //console.log(response)
//             console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null })
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// }

// transcribe()

// exports.showVideosTranscribe = async (req, res,) => {

//     const deepgram = new Deepgram('fbece349c367a59fcf30f7cd03f1a683785ebc7a');
//     try {
//         const { name } = req.params
//         // findById(name)

//         const allvideos = await uploadDb.findOne({
//             cloudinary_id: name
//         })
//         //console.log(allvideos.audioUrl)
//         const t = await deepgram.transcription.preRecorded({ url: allvideos.audioUrl })
//         const data = console.dir(t.results.channels[0].alternatives[0].transcript, { depth: null })
//         if (!allvideos) {
//             return res.status(200).json({ message: error.message })
//         }
//         res.redirect('/')
//     }

//     catch (error) {
//         res.status(404).json(error.message)

//     }

// }







