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
console.log(secretAccessKey);
console.log(accessKeyId);

const s3 = new aws.S3();

/*
if file filter kept as external function
const jpgFilter = (file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'file/pdf') {
      // if (file.mimetype === 'image/jpg') {
      //   req.fileType = '.jpg';
      // }
      // else if (file.mimetype === 'image/png') {
      //   req.filetype = '.png';
      // }
      // else {
      //   req.fileType = '.pdf';
      // }
      if (file.mimetype != 'image/jpeg') {
        cb(new Error('Wrong method used.'), false);
      }
    } else {
      cb(new Error('Invalid file type, only JPEG, PNG and PDF are supported!'), false);
    }
  }
*/

const uploadJpg = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'ascenders-accenture',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      console.log(file);
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype != 'application/pdf') {
        cb(new Error('Invalid file type, only JPEG, PNG and PDF are supported!'), false);
      }
      else{
        if (file.mimetype != 'image/jpeg') {
          cb(new Error('Wrong method used!'), false);
        }
      }
      const fileName = Date.now().toString() + '.jpg';
      cb(null, fileName)
    }
  })
});

const uploadPng = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'ascenders-accenture',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      console.log(file);
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype != 'application/pdf') {
        cb(new Error('Invalid file type, only JPEG, PNG and PDF are supported!'), false);
      }
      else{
        if (file.mimetype != 'image/png') {
          cb(new Error('Wrong method used!'), false);
        }
      }
      const fileName = Date.now().toString() + '.png';
      cb(null, fileName)
    }
  })
});

const uploadPdf = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'ascenders-accenture',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype != 'application/pdf') {
        cb(new Error('Invalid file type, only JPEG, PNG and PDF are supported!'), false);
      }
      else{
        if (file.mimetype != 'application/pdf') {
          cb(new Error('Wrong method used!'), false);
        }
      }
      const fileName = Date.now().toString() + '.pdf';
      cb(null, fileName)
    }
  })
});

module.exports = {
    uploadJpg,
    uploadPng,
    uploadPdf,
}
