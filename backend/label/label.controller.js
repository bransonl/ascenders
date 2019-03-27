class LabelController {
    constructor(model) {
        this._model = model;

        this.getLabel = this.getLabel.bind(this);
        this.getLabelItems = this.getLabelItems.bind(this);
        this.createLabel = this.createLabel.bind(this);
    }

    async getLabel(req, res) {
        const labelType = req.params.labelType;
        try {
            const getLabelResult = await this._model.getLabel(labelType);
            return res.status(200).send(getLabelResult);
        } catch(err) {
            return res.status(500).send();
        }
    }

    async getLabelItems(req, res) {
        const labelType = req.params.labelType;
        try {
            const getLabelResult = await this._model.getLabel(labelType);
            delete getLabelResult["objectId"];
            delete getLabelResult["labelType"];
            delete getLabelResult["updatedAt"];
            delete getLabelResult["createdAt"];
            return res.status(200).send(getLabelResult);
        } catch(err) {
            return res.status(500).send();
        }
    }

    async createLabel(req, res) {
        const labelType = req.params.labelType;
        const label = await this._model.getLabel(labelType);
        if (labelType == 'tag') {
            const {name} = req.body;
            try {
                const createLabelResult = await this._model.createLabel(label.objectId, name);
                return res.status(200).send(createLabelResult);
            }
            catch(err) {
                return res.status(500).send();
            }
        }
        else {
            const {name, colour} = req.body;
            try {
                const createLabelcResult = await this._model.createLabelc(label.objectId, name, colour);
                return res.status(200).send(createLabelcResult);
            }
            catch(err) {
                return res.status(500).send();
            }
        }
    } 
}

module.exports = {
    LabelController,
}