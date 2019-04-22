const {ModelError} = require('../error');

class LabelController {
    constructor(model) {
        this._model = model;

        this.createLabel = this.createLabel.bind(this);

        this.getLabels = this.getLabels.bind(this);
        this.getLabel = this.getLabel.bind(this);
        this.getLabell = this.getLabell.bind(this);

        this.modifyLabel = this.modifyLabel.bind(this);
        this.modifyLabelc = this.modifyLabelc.bind(this);

        this._getLabel = this._getLabel.bind(this);
        this._checkLabelExist = this._checkLabelExist.bind(this);
    }

    async createLabel(req, res) {
        const {labelType} = req.params;
        const labelName = req.body.name;
        console.log(labelName, labelType, "from backend");
        let checkLabelExistResult
        try {
            checkLabelExistResult = await this._checkLabelExist(labelType, labelName);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        if (checkLabelExistResult == true) {
            return res.status(400).json({
                message:`${labelType} named ${labelName} already exists`,
            });
        }
        if (labelType!='tag' & labelType!='status' & labelType!='priority') {
            return res.status(400).json({
                message:'Invalid labelType',
            })
        }
        else if (labelType == 'tag') {
            try {
                const createLabelResult = await this._model.createLabel(labelType, labelName);
                return res.status(200).send(createLabelResult);
            } catch(err) {
                return res.status(err.statusCode).json(err);
            }
        }
        else {
            try {
                const {colour} = req.body;
                const createLabelcResult = await this._model.createLabelc(labelType, labelName, colour);
                return res.status(200).send(createLabelcResult);
            } catch(err) {
                return res.status(err.statusCode).json(err);
            }
        }
    }

    async getLabels(req, res) {
        const {labelType} = req.params;
        try {
            const getLabelResult = await this._model.getLabels(labelType);
            return res.status(200).send(getLabelResult);    
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getLabel(req, res) {
        const {labelType, labelName} = req.params;
        try {
            const getLabelResult = await this._getLabel(labelType, labelName);
            return res.status(200).send(getLabelResult); 
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getLabell(req, res, next) {
        console.log('getLabell called');
        const {labelType, labelName} = req.body;
        try {
            const getLabelResult = await this._getLabel(labelType, labelName);
            req.label = getLabelResult;
            console.log(getLabelResult);
            next();
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async modifyLabel(req, res) {
        const {labelType, labelName} = req.params;
        let labelId;
        try {
            const getLabelResult = await this._getLabel(labelType, labelName);
            labelId = getLabelResult.objectId;
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        const new_name = req.body.name;
        if (!new_name) {
            return res.status(400).json({
                message:'Missing fields',
            })
        }
        else if (labelType != 'tag') {
            return res.status(400).json({
                message:`Wrong method for ${labelType}`,
            })
        }
        else if (labelId.length != 10) {
            return res.status(500).json({
                message:`Invalid labelId`,
            })
        }
        try {
            const modifyLabelResult = await this._model.modifyLabel(labelType, labelId, new_name);
            return res.status(200).send(modifyLabelResult);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
         
    }

    async modifyLabelc(req, res) {
        const {labelType, labelName} = req.params;
        let labelId;
        try {
            const getLabelResult = await this._getLabel(labelType, labelName);
            labelId = getLabelResult.objectId;
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        const new_name = req.body.name;
        const new_colour = req.body.colour;
        if (!new_name | !new_colour) {
            return res.status(400).json({
                message:'Missing fields',
            })
        }
        else if (labelType!='status' & labelType!='priority') {
            return res.status(400).json({
                message:`Wrong method for ${labelType}`,
            })
        }
        else if (labelId.length != 10) {
            return res.status(500).json({
                message:`Invalid labelId`,
            })
        }
        try {
            const modifyLabelResult = await this._model.modifyLabel(labelType, labelId, new_name, new_colour);
            return res.status(200).send(modifyLabelResult);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
    }

    // helper functions
    async _getLabel(labelType, labelName) {
        if (!labelType | !labelName) {
            throw new ModelError(400,'Missing fields');
        }
        else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
            throw new ModelError(400,'Invalid labelType');
        }
        let getLabelResult;
        try {
            getLabelResult = await this._model.getLabel(labelType, labelName);
        }
        catch (err) {
            throw new ModelError(err.statusCode, err.error.error);
        }
        if (getLabelResult[0] == undefined) {
            throw new ModelError(404, 'Label not found');
        }
        return getLabelResult[0];
    }

    async _checkLabelExist(labelType, labelName) {
        if (!labelType | !labelName) {
            throw new ModelError(400,'Missing fields');
        }
        else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
            throw new ModelError(400,'Invalid labelType');
        }
        try {
            const getLabelResult = await this._model.getLabel(labelType, labelName);
            if (getLabelResult[0] == undefined) {
                return false;
            }
            return true;
        }
        catch (err) {
            throw new ModelError(err.statusCode, err);
        }
    }
}

module.exports = {
    LabelController,
}