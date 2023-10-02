const express = require('express')
const multer = require('multer')
require('dotenv').config()
const fs = require('fs')
const db = require('./config/db')
const ejs = require('ejs')
const uploadDb = require('./models/imageModels')
const upload = require('./uploadMethods/multer')
const cloudinary = require('./uploadMethods/cloudinary')
const { UploadStream } = require('cloudinary')
const uploadRouter = require('./routes/uploadroutes')
const transcribeRouter = require('./routes/transcriberoutes')
const FormData = require('form-data');
const { Readable } = require('stream');
const axios = require('axios');






const app = express()
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.static("uploads"))




app.use('/api', uploadRouter)
app.use('/', transcribeRouter)


app.use(transcribeRouter)

const PORT = 3000 || process.env.PORT


app.get('/', (req, res) => {
    res.json({
        status: 200,
        welcome: "screen rcorder Api",
        message: "kindly use /api/upload endpoint  for upload",
        message: " use api/rec  to view videos"
    })
})


app.get("/tr", (req, res) => {

    const file = 'https://res.cloudinary.com/dhwzwxbk2/video/upload/v1696135108/v3jica1u6ckpmgwzkjkq.wav'
    const deepgram = new Deepgram('fbece349c367a59fcf30f7cd03f1a683785ebc7a');

    deepgram.transcription
        .preRecorded({ url: file })
        .then((response) => {
            //console.log(response)
            console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null })
        })
        .catch((err) => {
            console.log(err);
        });


});




app.listen(PORT, (req, res) => {
    console.log('LISTENING ON PORT 3000 🤩')

})


