const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NhaXuatBan = new Schema({
  TenNxb: { type: String, maxLength: 255 },
  DiaChi: { type: String, maxLength: 255 },
});

module.exports = mongoose.model("NhaXuatBan", NhaXuatBan);
