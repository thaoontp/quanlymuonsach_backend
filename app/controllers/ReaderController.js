const DocGia = require("../models/DocGia");
const NhanVien = require("../models/NhanVien");
const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");

class ReaderController {
  async listUser(req, res, next) {
    try {
      const user = await DocGia.find();
      return res.send(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async listStaff(req, res, next) {
    try {
      const staff = await NhanVien.find();
      return res.send(staff);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async dashBoard(req, res, next) {
    try {
      const user = await DocGia.countDocuments();
      const staff = await NhanVien.countDocuments();
      const rent = await TheoDoiMuonSach.find({ TrangThai: "A" });
      const rentDenied = await TheoDoiMuonSach.find({ TrangThai: "D" });
      const rentWaiting = await TheoDoiMuonSach.find({ TrangThai: "W" });
      return res.json({ user, staff, rent, rentDenied, rentWaiting });
    } catch (error) {
      console.log("Lỗi khi thêm lấy dữ liệu", error);
      res.status(500).json({ message: "Lỗi khi thêm lấy dữ liệu" });
    }
  }
}

module.exports = new ReaderController();
