const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();



router.get("/khachhang", (req, res) => {
    res.send("APIKhachHang");
});

const KhachHangModel = require("../model/khachHangModel");

const COMMON =  require("../Common/COMMON");

// Hien thi danh sach khach hang
router.get("/listKhachHang", async (req, res) => {
    await mongoose.connect(COMMON.uri);

    let khachhangs = await KhachHangModel.find();

    res.send(khachhangs);
});

// Them khach hang moi
router.post("/addKhachHang", async (req, res) => {
    try {
        const { name, adress, email, phonenumber } = req.body;
        const newKhachhang = new KhachHangModel({
            name,
            adress, 
            email,
            phonenumber
        });
        // Luu thong tin khach hang mowi
        await newKhachhang.save();
        res.status(200).json({ message: "Thêm khach hàng thành công"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Sửa khach hàng
router.put("/updateKhachHang/:id", async(req, res) => {
    try {
        await mongoose.connect(COMMON.uri);

        const { name, adress, email, phonenumber} = req.body;

        // Kiem tra Khach hang co trong mongodb khong
        const khachhangid = req.params.id;
        const existingkhachhang = await KhachHangModel.findById(khachhangid);
        if(!existingkhachhang) {
            return res.status(400).json({error: "Không timg thấy thông tin khach hang"});
        }

        // Cap nhat thong tin khach hang
        existingkhachhang.name = name;
        existingkhachhang.adress = adress;
        existingkhachhang.email = email;
        existingkhachhang.phonenumber = phonenumber;

        // luu thong ti cap nhat vao mongodb
        const update = await existingkhachhang.save();

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});



module.exports = router;