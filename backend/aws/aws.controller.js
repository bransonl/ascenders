class AwsController {
    constructor(model) {
        this._model = model;

        this.uploadFile = this.uploadFile.bind(this);
    }
    async uploadFile(req, res, next) {
        console.log('uploadFile called');
        const singleUpload = this._model.uploadFile.single('file');
        const uploadFileResult = await singleUpload(req, res, function(err, some) {
        if (err) {
            return res.status(422).send({
            errors: [{title: 'Upload Error', detail: err.message}] });
        }
        req.fileURL = req.file.location;
        next();
        });
    }
}

module.exports = {
    AwsController,
}