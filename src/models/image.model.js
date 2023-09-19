const { Schema, model } = require("mongoose");
const uuid = require("uuid").v4;
const imageSchema = new Schema({
    uuid: { type: String, default: uuid },
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: {type: Number},
    created_at: {type: Date, default: Date.now()},
})

module.exports = model('Image', imageSchema);