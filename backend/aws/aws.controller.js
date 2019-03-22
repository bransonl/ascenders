const awsModel = require('./aws.model.js');

async function uploadFile(req, res) {
    const singleUpload = awsModel.uploadFile.single('file');
    const uploadFileResult = await singleUpload(req, res, function(err, some) {
    if (err) {
        return res.status(422).send({
        errors: [{title: 'Upload Error', detail: err.message}] });
    }
    return res.json({
        'fileURL': req.file.location});
    });
}

module.exports = {
    uploadFile,
}