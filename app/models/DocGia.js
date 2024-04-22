const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocGia = new Schema({
  Ten: { type: String, maxLength: 255 },
  NgaySinh: { type: String, maxLength: 255 },
  Phai: { type: String, maxLength: 255 },
  DiaChi: { type: String, maxLength: 255 },
  DienThoai: { type: String, maxLength: 255 },
  Password: { type: String, maxLength: 255 },
  Avatar: { type: String, maxLength: 255 },
});

module.exports = mongoose.model("ReaderModel", DocGia);
