const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const Users = new Scheme({
    hoTen: {
        type: String, 
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
    },
    diaChi: {
        type: String
    },
    dienThoai: {
        type: String
    },
    trangThai: {
        type: Number
    },
    birthday: {
        type: Date
    },
    image: {
        type: String
    },
    gender: {
        type: String
    }
});

const UserModel = new mongoose.model('user', Users);

module.exports = UserModel;