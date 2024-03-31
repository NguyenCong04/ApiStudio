const DataURIParser = require("datauri/parser");
const path = require("path");

// Sử dụng module.exports thay cho export
module.exports.getDatURI = (file) => {
    const parser = new DataURIParser();
    const exName = path.extname(file.originalname).toString();
    return parser.format(exName,file.buffer);
}
