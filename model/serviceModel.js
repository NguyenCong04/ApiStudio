const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    tenDv : {
        type: String,
    },
    soLuong: {
        type: Number,
    },
    giaTien: {
        type: Number,
    },
    chitiet: {
        type: String,
    },
    anh: {
        type: [String], 
    },
    yeuthich:{
        type: Number
    },
    kichthuoc:{
        type: [String] ,
    },
    giamgia:{
        type: Number
    }   
});

const ServiceModel = new mongoose.model('service', ServiceSchema);

module.exports = ServiceModel;

