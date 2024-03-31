const multer = require("multer");
const storage = multer.memoryStorage();

// Sử dụng module.exports thay cho export
module.exports.singleUpload = multer({ storage }).single("file");
