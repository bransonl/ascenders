const env = require('../env.js');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const {secretAccessKey} = env;
const {accessKeyId} = env;

aws.config.update({
    secretAccessKey,
    accessKeyId,
    region: 'us-east-1',
});

const s3 = new aws.S3();

const fileFilter = (file) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        if (file.mimetype === 'image/jpeg') {
            return '.jpg';
        }
        else if (file.mimetype === 'image/png') {
            return '.png';
        }
        else {
            return '.pdf';
        }
    } else {
    throw new Error('Invalid file type, only JPEG, PNG and PDF are supported!');
    }
}

const uploadFile = multer({
    storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'ascenders-accenture',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
        try {
            const suffix = fileFilter(file);
            const fileName = Date.now().toString() + suffix;
            cb(null, fileName);
        } catch (err) {
            cb(err, false);
        }
        /*
        if filecheck is done non-unit ly
        let suffix;
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype != 'application/pdf') {
        cb(new Error('Invalid file type, only JPEG, PNG and PDF are supported!'), false);
        }
        else{
        if (file.mimetype === 'image/jpeg') {
            suffix = '.jpg';
        }
        else if (file.mimetype === 'image/png') {
            suffix = '.png';
        }
        else {
            suffix = '.pdf'
        }
        }
        */
    }
    })
});

module.exports = {
    uploadFile,
}
