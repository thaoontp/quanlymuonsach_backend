const Sach = require("../models/Sach");
const multer = require("multer");
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
    try {
      if (!req.file) {
        return res.status(500).json({ error: "Chưa có image" });
      }

      const filename = req.file.filename;
      req.body.HinhSach = filename;

      const newSach = new Sach(req.body);
      newSach.save();
      return res.status(201).json({ massage: "Thêm sách thành công" });
    } catch (e) {
      // sửa lại theo cái cảu ông là ok
    }
  }

  async updateBook(req, res, next) {
    try {
      if (req.file) {
        req.body.HinhSach = req.file.filename;
      }
      console.log(req.body);

      const updatedProduct = await Sach.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Sach not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
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
