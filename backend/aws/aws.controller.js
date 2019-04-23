class AwsController {
    constructor(model) {
        this._model = model;

        this.uploadFile = this.uploadFile.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
    }
    async uploadFile(req, res, next) {
        console.log('uploadFile called');
        // try {
        //     const uploadFileResult = await this._model.uploadFile(req, res);
        //     console.log(uploadFileResult);
        //     // req.fileURL = req.file.location;
        //     next();
        // } catch(err) {
        //     return res.status(422).json({
        //         message:'Error uploading file',
        //     })
        // }

        const singleUpload = this._model.uploadFile.single('file');
        const uploadFileResult = await singleUpload(req, res, 
            function(err, some) {
                if (err) {
                    return res.status(422).json({
                        message: 'Error uploading file',
                    });
                }
                console.log(req.file.location);
                console.log(req.file.originalname);
                req.fileURL = req.file.location;
                next();
            }
        );
    }

    async uploadProfile(req, res, next) {
        console.log('uploadProfile called');
        const singleUpload = this._model.uploadProfile.single('file');
        const uploadFileResult = await singleUpload(req, res, 
            function(err, some) {
                if (err) {
                    console.error(err);
                    return res.status(422).json({
                        message: 'Error uploading file',
                    });
                }
                console.log(req.file.location);
                console.log(req.file.originalname);
                req.fileURL = req.file.location;
                next();
            }
        );
    }
}

module.exports = {
    AwsController,
}