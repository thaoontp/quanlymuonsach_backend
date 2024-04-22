const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TheoDoiMuonSach = new Schema({
  MaDocGia: { type: mongoose.Types.ObjectId, ref: "ReaderModel" },
  MaSach: { type: mongoose.Types.ObjectId, ref: "BookModel" },
  NgayMuon: { type: Date },
  NgayTra: { type: Date },
  SoLuong: { type: Number },
  TrangThai: { type: String, maxLength: 10 },
  TraSach: { type: String, maxLength: 10 },
  ThanhTien: { type: Number },
});

module.exports = mongoose.model("TrackBookModel", TheoDoiMuonSach);
