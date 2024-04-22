const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sach = new Schema({
  TenSach: { type: String, maxLength: 255 },
  DonGia: { type: Number },
  SoQuyen: { type: Number },
  NamXuatBan: { type: Number },
  MaNxb: { type: mongoose.Types.ObjectId, ref: "NhaXuatBan" },
  TacGia: { type: String, maxLength: 255 },
  HinhSach: { type: String, maxLength: 255 },
});

module.exports = mongoose.model("BookModel", Sach);
