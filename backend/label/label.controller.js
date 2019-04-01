class LabelController {
    constructor(model) {
        this._model = model;

        this.getLabels = this.getLabels.bind(this);
        this.getLabel = this.getLabel.bind(this);
        this.checkLabelExist = this.checkLabelExist.bind(this);
        this.createLabel = this.createLabel.bind(this);
        this.modifyLabel = this.modifyLabel.bind(this);
    }

    async getLabels(req, res) {
        const {labelType} = req.params;
        try {
            const getLabelResult = await this._model.getLabels(labelType);
            return res.status(200).send(getLabelResult);    
        } catch(err) {
            return res.status(500).send();
        }
    }

    async getLabel(req, res) {
        const {labelType, name} = req.params;
        try {
            const getLabelResult = await this._model.getLabel(labelType, name);
            return res.status(200).send(getLabelResult); 
        } catch(err) {
            return res.status(500).send();
        }
    }

    async checkLabelExist(labelType, name) {
        try {
            const getLabelResult = await this._model.getLabel(labelType, name);
            if (getLabelResult != undefined) {
                return getLabelResult;
            }
            else {
                return false;
            }
        } catch(err) {
            return res.status(500).send();
        }
    }

    async createLabel(req, res) {
        const {labelType} = req.params;
        const {name} = req.body;
        const checkLabelExistResult = await this.checkLabelExist(labelType, name);
        if (checkLabelExistResult != false) {
            console.log(checkLabelExistResult.objectId);
            return res.status(400).send(`${labelType} of name ${name} already exists, objectId: ${checkLabelExistResult.objectId}`);
        }
        else {
            if (labelType == 'tag') {
                try {
                    const createLabelResult = await this._model.createLabel(labelType, name);
                    return res.status(200).send(createLabelResult);
                } catch(err) {
                    return res.status(500).send();
                }
            }
            else if (labelType == 'status' | labelType == 'priority') {
                try {
                    const {colour} = req.body;
                    const createLabelcResult = await this._model.createLabelc(labelType, name, colour);
                    return res.status(200).send(createLabelcResult);
                } catch(err) {
                    return res.status(500).send();
                }
            }
        }
    }

    async modifyLabel(req, res) {
        const {labelType, name} = req.params;
        try {
            const checkLabelExistResult = await this.checkLabelExist(labelType, name);
            if (checkLabelExistResult != false) {
                const labelId = checkLabelExistResult.objectId;
                if (labelType == 'tag') {
                    try {
                        const {new_name} = req.body;
                        const modifyLabelResult = await this._model.modifyLabel(labelType, labelId, new_name);
                        return res.status(200).send(modifyLabelResult);
                    } catch(err) {
                        return res.status(500).send();
                    }
                }
                else if (labelType == 'status' | labelType == 'priority') {
                    try {
                        const new_name = req.body.name;
                        const new_colour = req.body.colour;
                        const modifyLabelcResult = await this._model.modifyLabelc(labelType, labelId, new_name, new_colour);
                        return res.status(200).send(modifyLabelcResult);
                    } catch(err) {
                        return res.status(500).send();
                    }
                }
            }
        }catch(err) {
            return res.status(500).send();
        }
    }
}

module.exports = {
    LabelController,
}