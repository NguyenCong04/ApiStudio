const express = require("express");
const { model, default: mongoose } = require("mongoose");

const router = express.Router();
const upload = require("../config/multerConfig");

model.exports = router;

router.get("/user", (req, res) => {
  res.send("API User");
});

const userModel = require("../model/userModel");

const COMMON = require("../Common/COMMON");

router.get("/listUser", async (req, res) => {
  await mongoose.connect(COMMON.uri);

  let users = await userModel.find();
  res.send(users);
});

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    // Lấy đường dẫn đến ảnh đã tải lên từ req.file
    const imagePath = req.file.path;

    // Trả về đường dẫn đến ảnh đã tải lên
    res.status(201).json({ imagePath: imagePath });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Them tai khoan moi
router.post("/addUser", async (req, res) => {
  try {
    const {
      hoTen,
      username,
      password,
      email,
      diaChi,
      dienThoai,
      trangThai,
      birthday,
      gender,
    } = req.body;

    const image = req.body.imagePath;
    const newUser = new userModel({
      hoTen,
      username,
      password,
      email,
      diaChi,
      dienThoai,
      trangThai,
      birthday,
      image,
      gender,
    });
    // Lưu tài khoản user mới
    await newUser.save();
    res.status(201).json({ message: "Them tai khoan thanh cong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sửa tài khoản User
router.put("/update/:id", async (req, res) => {
  try {
    await mongoose.connect(COMMON.uri);

    const { hoTen, username, password, email, diaChi, dienThoai, trangThai } =
      req.body;

    // kiểm tra tất cả các trường càn thiết đã được cung cấp chưa
    if (
      !hoTen ||
      !username ||
      !password ||
      !email ||
      !diaChi ||
      !dienThoai ||
      !trangThai
    ) {
      return res.status(400).json({ error: "Thiếu thông tin User" });
    }

    // Kiểm tra User có trong mongodb không
    const userid = req.params.id;
    const existingUser = await userModel.findById(userid);
    if (!existingUser) {
      return res.status(400).json({ error: "Không tìm thấy tài khoản User" });
    }

    // Cập nhật thông tin User
    existingUser.hoTen = hoTen;
    existingUser.username = username;
    existingUser.password = password;
    existingUser.email = email;
    existingUser.diaChi = diaChi;
    existingUser.dienThoai = dienThoai;
    existingUser.trangThai = trangThai;

    // Lưu tài khoản User đã sửa đổi vào mongodb
    const update = await existingUser.save();

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;

    let user = await userModel.findOne({ email: email });

    if (user) {
      if (user.password == req.body.password) {
        console.log("Login thành công");
        user.password = null;
        return res.send(user);
      } else {
        console.log("Sai password");

        res.status(405).json("Sai password");
      }
    } else {
      console.log("Tài khoản không tồn tạo");
      res.status(404).json("Tài khoản không tồn tại");
    }
  } catch (error) {
    console.log("router.post  error:", error);
    res.status(500).json(error);
  }
});

router.get("/listUser2", async (req, res) => {
  await mongoose.connect(COMMON.uri);

  let users = await userModel.find().select("-password");

  res.send(users);
});

module.exports = router;
