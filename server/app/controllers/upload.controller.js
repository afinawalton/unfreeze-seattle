const multer = require('multer');
const db = require('../models');
const path = require('path');
let UserProfile = db.userProfiles;

const multerStorage = multer.diskStorage({
    // Where files will be stored
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/images'));
    },
    // What the filename should be inside the folder
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}` + path.extname(file.originalname))
        // path.extname get the uploaded file extension
    }
});

const multerFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        // upload only png and jpg format
        return cb(new Error('Please upload an image!'))
    }

    cb(null, true)
};

exports.upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadSingleImage = (req, res) => {
    const id = req.params.id;

    UserProfile.findOne({
        where: { user_id : id }
    })
    .then(profile => {
        profile.update({ profile_pic: req.file.filename });
        res.status(200).send('Image successfully uploaded!');
    })
    .catch(err => {
        res.status(400).send('Image could not be uploaded.')
    })
}