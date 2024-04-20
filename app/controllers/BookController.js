const Sach = require("../models/BookModel");
const multer = require("multer");
// const storage = require("../../services/uploadImage");

const storage = require("../../services/uploadImage");

class BookController {
  async listBook(req, res, next) {
    const searchQuery = req.query.tenSach;
    if (searchQuery) {
      try {
        const books = await Sach.find({
          TenSach: { $regex: searchQuery, $options: "i" },
        }).populate("MaNxb"); // Populate thông tin của nhà xuất bản

        if (books.length > 0) {
          res.json(books);
        } else {
          res.json({ message: "Không tìm thấy sách" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      try {
        const books = await Sach.find().populate("MaNxb"); // Populate thông tin của nhà xuất bản
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async addBook(req, res, next) {
    const upload = multer({ storage: storage }).single("image");
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        try {
          const TenSach = req.body.tenSach;
          const DonGia = parseInt(req.body.donGia, 10);
          const SoQuyen = parseInt(req.body.soQuyen, 10);
          const NamXuatBan = parseInt(req.body.namXuatBan, 10);
          const MaNxb = req.body.idNxb;
          const HinhSach = req.file.originalname;
          const existingBook = await Sach.findOne({ TenSach });
          if (existingBook) {
            existingBook.SoQuyen += SoQuyen;
            await existingBook.save();
            return res.json({ update: "Sách đã được cập nhật" });
          } else {
            const newSach = new Sach({
              TenSach,
              DonGia,
              SoQuyen,
              NamXuatBan,
              MaNxb,
              HinhSach,
            });
            await newSach.save();
            return res.json({ message: `Sách đã được thêm ${TenSach}` });
          }
        } catch (error) {
          res.status(500).json({ message: err.message });
        }
      }
    });
  }

  async updateBook(req, res, next) {
    const upload = multer({ storage: storage }).single("image");
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        try {
          const id = req.params.id;
          const existingBook = await Sach.findById(id);
          if (existingBook) {
            if (req.body.tenSach) {
              existingBook.TenSach = req.body.tenSach;
            }
            if (req.body.donGia) {
              existingBook.DonGia = parseInt(req.body.donGia, 10);
            }
            if (req.body.soQuyen) {
              existingBook.SoQuyen = parseInt(req.body.soQuyen, 10);
            }
            if (req.body.idNxb) {
              existingBook.MaNxb = req.body.idNxb;
            }
            if (req.body.namXuatBan) {
              existingBook.NamXuatBan = req.body.namXuatBan;
            }
            if (req.file) {
              existingBook.HinhSach = req.file.originalname;
            }
            await existingBook.save();
            return res.json({
              message: "Sách đã được cập nhật",
              data: existingBook,
            });
          } else {
            return res.send({ error: "Cập nhật thất bại" });
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    });
  }

  async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      const existingBook = await Sach.findById(id);
      if (!existingBook) {
        return res.status(404).json({ error: "Không tìm thấy sách" });
      } else {
        await Sach.findByIdAndDelete(id);
        return res.send({ message: "Xóa Sách thành công" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new BookController();
