const Services = require("../services/base.services");

class BaseController {
    constructor(modelName) {
        this.services = new Services(modelName);
    }
    create(data, transaction) {
        return this.services.create(data, transaction);
    }
    findAll(query) {
        return this.services.findAll(query);
    }
    findById(id, transaction) {
        return this.services.findById(id, transaction);
    }
    findByCustomId(key, value, query, showAll) {
        return this.services.findByCustomId(key, value, query, showAll);
    }
    update(data, transaction) {
        return this.services.update(data, transaction);
    }
    deleteById(data, transaction) {
        return this.services.delete(data, transaction);
    }
    deleteByCustomId(key, value) {
        return this.services.deleteByCustomId(key, value);
    }

    //handle update
    handleUpdate(id) {
        return this.services.handleUpdate(id);
    }

    //format response data
    formatResponse(data, message) {
        return this.services.formatResponse(data, message);
    }

    //format validation error
    formatValidationErrors(errors) {
        return this.services.formatValidationErrors(errors);
    }
    //upload image
    uploadImage(prefix, id, images) {
        return this.services.uploadImage(prefix, id, images);
    }
    //create bucket
    createAWSBucket(name) {
        return this.services.createAWSBucket(name);
    }
}

module.exports = BaseController;
