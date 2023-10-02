const router = require('express').Router()
const transcribeController = require('../controller/transcribeController')


router.get('/api/transcribe/:name', transcribeController.getVideosTranscribe)

//router.get('/rc/:name', transcribeController.showVideosTranscribe)


module.exports = router