const multer = require("multer");
const path = require("path");

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../config/uploads")); // Thư mục lưu trữ file ảnh
  },
  filename: function (req, file, cb) {
    // Đặt tên file dựa trên thời gian hiện tại
    cb(null, Date.now() + "-" + file.originalname); // Tên file sẽ được lưu trữ
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
