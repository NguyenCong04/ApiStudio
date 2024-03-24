const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    tenDv : {
        type: String,
    },
    trangThai: {
        type: Boolean,
    },
    giaTien: {
        type: String,
    },
    moTa: {
        type: String,
    },
    anh:{
        type: String
    }
});

const ServiceModel = new mongoose.model('service', ServiceSchema);

module.exports = ServiceModel;

