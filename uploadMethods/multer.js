const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const path = require('path');


// // specificiation of  file upload
// const storage = multer.diskStorage({
//     //passed  a  call  function
//     destination: function (req, file, cb) {
//         // uploads is folder where file are save
//         cb(null, './uploads')
//     },

//     // defining file name
//     filename: function (req, file, cb) {
//         // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, `${file.originalname}`)
//     }
// })


// const upload = multer({ storage: storage })

// module.exports = upload




const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //         // uploads is folder where file are save
    //         cb(null, './uploads')
    //     },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },


})



module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(null, false)
            return cb(new Error('Invalid mimetype'))
        }
    },




})


