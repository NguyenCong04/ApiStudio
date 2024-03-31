const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RES = require('../Common/COMMON');
const uri = RES.uri;
const ServiceModel = require('../model/serviceModel');

router.get('/', async (req, res) => {
  await mongoose.connect(uri);
  let service = await ServiceModel.find();
  res.send(service);
});
router.post('/add_service', async (req, res) => {
  try {
    await mongoose.connect(uri);
    const { tenDv, soLuong, chitiet, giaTien, anh,kichthuoc,giamgia } = req.body;

    if (!tenDv || !soLuong || !chitiet || !giaTien || !anh) {
      return res.status(400).json({ error: "Thiếu thông tin sinh viên." });
    }

    const newService = new ServiceModel({ tenDv, soLuong, giaTien, anh,chitiet,kichthuoc,giamgia });

    const save = await newService.save();

    res.status(201).json(save);
  } catch (error) {
    console.error("Lỗi khi thêm sinh viên mới:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi thêm sinh viên mới." });
  }
});




router.delete('/delete_service/:id', async (req, res) => {
  try {
      await mongoose.connect(uri);

      const service_id = req.params.id;

      const existingService = await ServiceModel.findById(service_id);
      if (!existingService) {
          return res.status(404).json({ error: "Không tìm thấy sinh viên." });
      }

      await ServiceModel.findByIdAndDelete(service_id);

      res.status(200).json({ message: "Xóa sinh viên thành công." });
  } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi xóa sinh viên." });
  }
});




router.put('/update_service/:id', async (req, res) => {
  try {
      await mongoose.connect(uri);

      const service_id = req.params.id;
      const { tenDv, trangThai, moTa, giaTien, anh } = req.body;

    // Kiểm tra xem tất cả các trường cần thiết đã được cung cấp chưa
    if (!tenDv || !trangThai || !moTa || !giaTien || !anh) {
      return res.status(400).json({ error: "Thiếu thông tin sinh viên." });
    }


      const existingService = await ServiceModel.findById(service_id);
      if (!existingService) {
          return res.status(404).json({ error: "Không tìm thấy sinh viên." });
      }

      existingService.tenDv = tenDv;
      existingService.trangThai = trangThai;
      existingService.moTa = moTa;
      existingService.giaTien = giaTien;
      existingService.anh = anh;

      const service_update = await existingService.save();

      res.status(200).json(service_update);
  } catch (error) {
      console.error("Lỗi khi cập nhật sinh viên:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật sinh viên." });
  }
});
module.exports = router;
