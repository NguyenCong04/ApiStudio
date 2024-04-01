const { getDatURI } = require("../config/fetures");
const cloudinary = require("cloudinary");
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
const UserModel = require("../model/userModel");

router.get("/listUser", async (req, res) => {
  await mongoose.connect(COMMON.uri);

  let users = await userModel.find();
  res.send(users);
});

router.delete('/delete/:id', async (req, res) => {
  try {

      const service_id = req.params.id;

      const existingService = await UserModel.findById(service_id);
      if (!existingService) {
          return res.status(404).json({ error: "Không tìm thấy sinh viên." });
      }

      await userModel.findByIdAndDelete(service_id);

      res.status(200).json({ message: "Xóa sinh viên thành công." });
  } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi xóa sinh viên." });
  }
});

router.put('/update-picture', upload.singleUpload, async (req, res) => {
  try {
    const file = getDatURI(req.file);

    // Gửi hình ảnh lên Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(file.content);

    // Lấy đường dẫn của hình ảnh từ phản hồi của Cloudinary
    const imageUrl = cloudinaryResponse.secure_url;

    // Lưu đường dẫn hình ảnh vào cơ sở dữ liệu (ví dụ: User)
    // Ở đây tôi giả sử bạn đang cập nhật hình ảnh cho một user cụ thể (ví dụ: req.body.userId)
    const userId = req.body.userId; // Đảm bảo bạn đã truyền userId từ client
    const user = await userModel.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });

    res.status(200).send({
      success: true,
      message: "Update picture success",
      user: user, // Trả về thông tin user đã được cập nhật hình ảnh mới,
      imageUrl: imageUrl // Trả về đường dẫn hình ảnh mới
    });
  } catch (error) {
    console.log("updatePicture error:", error);
    res.status(500).json(error);
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
      image,
    } = req.body;

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

// Dang ký
router.post('/register', async (req, res) => {
  try {
    const {hoTen, username, password, email, diaChi, dienThoai} = req.body;


    // Kiểm tra xem email đã được sử dụng chưa
    const existingEmail = await userModel.findOne({email: email});
    if(existingEmail) {
      return res.status(400).json({error: "Email đã được sử dụng"});
    }  

    // Tạo tài khoản mới
    const newUser = new userModel({
      hoTen,
      username, 
      password,
      email, 
      diaChi,
      dienThoai,
      trangThai: 0 //Set trang thai khi dang ky luoon bang 0
    });

    await newUser.save();

    res.status(201).json({error: "Đăng ký tài khoản thành công"});
  } catch (error) {
    console.log("Router.post error:", error);
    res.status(500).json(error);
  }
});

module.exports = router;


