const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const KhachHangs = new Scheme({
    name: {
        type: String,
        require: true
    },
    adress: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    }
})

const KhachHangModel = new mongoose.model('khachhang', KhachHangs);

module.exports = KhachHangModel;