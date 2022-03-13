const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        immutable: true
    },
    age:{
        type: Number,
        required: true,
        immutable: true
    },
    message:{
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        default: Date,
        immutable: true
    }
}, {collection:"data"});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;