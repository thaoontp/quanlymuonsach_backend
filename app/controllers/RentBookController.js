const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");
const DocGia = require("../models/DocGia");
const Sach = require("../models/Sach");
class RentController {
  async addToRent(req, res, next) {
    try {
      const { maDocGia, maSach, ngayMuon, ngayTra, soLuong, thanhTien } =
        req.body;
      const [existingSach, existingDocGia] = await Promise.all([
        Sach.findById(maSach),
        DocGia.findById(maDocGia),
      ]);
      if (!existingSach) return res.json({ error: `Không tìm thấy sách` });
      if (!existingDocGia) return res.json({ error: "Không tìm thấy đọc giả" });
      if (soLuong > existingSach.SoQuyen)
        return res.json({ error: "Số lượng hàng không đủ" });
      existingSach.SoQuyen -= soLuong;
      const newTheoDoiMuonSach = await TheoDoiMuonSach.create({
        MaDocGia: maDocGia,
        MaSach: maSach,
        SoLuong: soLuong,
        NgayMuon: ngayMuon,
        NgayTra: ngayTra,
        TrangThai: "W",
        TraSach: "",
        ThanhTien: thanhTien,
      });
      await Promise.all([existingSach.save(), newTheoDoiMuonSach.save()]);
      return res.json({
        message: "Đăng ký mượn sách thành công.",
        data: newTheoDoiMuonSach,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async listRentOfUser(req, res, next) {
    try {
      const MaDocGia = req.params.id;
      TheoDoiMuonSach.find({ MaDocGia: MaDocGia })
        .populate("MaSach")
        .populate("MaDocGia")
        .then((TheoDoiMuonSachs) => {
          return res.send(TheoDoiMuonSachs);
        })
        .catch((err) => res.json({ message: err.message }));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async listRentBook(req, res, next) {
    try {
      const MaSach = req.params.id;
      TheoDoiMuonSach.find({ MaSach: MaSach })
        .populate("MaDocGia")
        .then((TheoDoiMuonSachs) => {
          return res.send(TheoDoiMuonSachs);
        })
        .catch((err) => res.json({ message: err.message }));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // async filterByTenDocGia(req, res, next) {
  //   try {
  //     const searchQuery = req.query.tenDocGia;
  //     const searchTraSach = req.query.traSach;
  //     let query = {};

  //     if (searchTraSach)
  //       query.TraSach = { $regex: searchTraSach, $options: "i" };
  //     if (searchQuery)
  //       query["MaDocGia.Ten"] = { $regex: searchQuery, $options: "i" };

  //     const theoDoiMuonSachs = await TheoDoiMuonSach.find(query).populate({
  //       path: "MaDocGia",
  //       match: { Ten: { $regex: searchQuery, $options: "i" } },
  //     });

  //     const filteredResults = theoDoiMuonSachs.filter(
  //       (item) => item.MaDocGia !== null
  //     );
  //     res.send(filteredResults);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async listRents(req, res, next) {
  //   try {
  //     const TrangThai = req.params.trangThai;
  //     TheoDoiMuonSach.find({ TrangThai: TrangThai })
  //       .populate("MaSach")
  //       .populate("MaDocGia")
  //       .then((TheoDoiMuonSachs) => {
  //         return res.send(TheoDoiMuonSachs);
  //       })
  //       .catch((err) => res.json({ message: err.message }));
  //   } catch (error) {
  //     console.log("Lỗi khi thêm uống", error);
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  async filterByTenDocGia(req, res, next) {
    try {
      const searchQuery = req.query.tenDocGia;
      const searchTraSach = req.query.traSach;
      let query = {};
      if (searchTraSach) {
        query = {
          TraSach: { $regex: searchTraSach, $options: "i" },
        };
      }
      if (searchQuery) {
        TheoDoiMuonSach.find(query)
          .populate({
            path: "MaDocGia",
            match: { Ten: { $regex: searchQuery, $options: "i" } },
          })
          .then((theoDoiMuonSachs) => {
            const filteredResults = theoDoiMuonSachs.filter(
              (item) => item.MaDocGia !== null
            );
            return res.send(filteredResults);
          })
          .catch((err) => res.json({ message: err.message }));
      } else {
        TheoDoiMuonSach.find(query)
          .populate("MaDocGia")
          .then((theoDoiMuonSachs) => {
            const filteredResults = theoDoiMuonSachs.filter(
              (item) => item.MaDocGia !== null
            );
            return res.send(filteredResults);
          })
          .catch((err) => res.json({ message: err.message }));
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async listRents(req, res, next) {
    const searchQuery = req.query.trangThai;
    if (searchQuery) {
      try {
        TheoDoiMuonSach.find({
          TrangThai: { $regex: searchQuery, $options: "i" },
        })
          .populate("MaSach")
          .populate("MaDocGia")
          .then((TheoDoiMuonSachs) => {
            return res.send(TheoDoiMuonSachs);
          })
          .catch((err) => res.json({ message: err.message }));
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      try {
        TheoDoiMuonSach.find({})
          .populate("MaSach")
          .populate("MaDocGia")
          .then((TheoDoiMuonSachs) => {
            return res.send(TheoDoiMuonSachs);
          })
          .catch((err) => res.json({ message: err.message }));
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async updateRent(req, res, next) {
    try {
      const id = req.params.id;
      const existingRent = await TheoDoiMuonSach.findById(id);
      if (!existingRent) return res.json({ error: "Không tìm thấy id." });
      existingRent.MaDocGia = req.body.maDocGia || existingRent.MaDocGia;
      existingRent.MaSach = req.body.maSach || existingRent.MaSach;
      existingRent.NgayMuon = req.body.ngayMuon || existingRent.NgayMuon;
      existingRent.NgayTra = req.body.ngayTra || existingRent.NgayTra;
      existingRent.SoLuong = req.body.soLuong || existingRent.SoLuong;
      existingRent.TrangThai = req.body.trangThai || existingRent.TrangThai;
      existingRent.TraSach = req.body.traSach || existingRent.TraSach;
      existingRent.ThanhTien = req.body.thanhTien || existingRent.ThanhTien;

      await existingRent.save();
      return res.send({ message: "Cập nhật thành công", data: existingRent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteRent(req, res, next) {
    try {
      const id = req.params.id;
      const existingRent = await TheoDoiMuonSach.findById(id);
      if (!existingRent) {
        return res.status(404).json({ error: "Không tìm thấy. " });
      } else {
        await TheoDoiMuonSach.findByIdAndDelete(id);
        return res.send({ message: "Hủy đơn mượn thành công." });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi hủy. " });
    }
  }
}

module.exports = new RentController();
