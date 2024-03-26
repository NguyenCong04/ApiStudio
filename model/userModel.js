const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const Users = new Scheme({
    hoTen: {
        type: String, 
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    diaChi: {
        type: String
    },
    dienThoai: {
        type: String
    },
    trangThai: {
        type: Number
    }
});

const UserModel = new mongoose.model('user', Users);

module.exports = UserModel;