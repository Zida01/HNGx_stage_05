const router = require('express').Router();
const uploadController = require('../controller/uploadController')
const upload = require('../uploadMethods/multer')

router.post('/upload', upload.single('image'), uploadController.uploadVideo)
router.get('/rec', uploadController.showVideos)
router.get('/rec/:name', uploadController.showSpecificVideos)
//router.get('/upload', uploadController.uploadVideo)


module.exports = router


