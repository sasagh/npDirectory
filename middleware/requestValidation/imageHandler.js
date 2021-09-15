const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now()+'-'+file.originalname)
});

const upload = multer({
    storage : storage,
    fileFilter: (req, file, cb) => {
        req.body.image = file
        cb(null)
    }
}).single('image');

module.exports = (req, res, next) => upload(req, res, next);