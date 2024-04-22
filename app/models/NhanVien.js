const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NhanVien = new Schema({
  HoTenNv: { type: String, maxLength: 255 },
  Password: { type: String, maxLength: 255 },
  DiaChi: { type: String, maxLength: 255 },
  SoDienThoai: { type: String, maxLength: 255 },
  ChucVu: { type: String, maxLength: 255 },
  Avatar: { type: String, maxLength: 255 },
});

module.exports = mongoose.model("StaffModel", NhanVien);
