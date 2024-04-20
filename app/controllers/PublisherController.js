const Published = require("../models/PublisherModel");

class PublishedController {
  async listProduct(req, res, next) {
    const searchQuery = req.query.search;
    if (searchQuery) {
      const published = await Published.find({
        TenNxb: { $regex: searchQuery, $options: "i" },
      });
      if (published.length > 0) {
        res.json(published);
      } else {
        res.json({ message: "Không tìm thấy nhà xuất bản" });
      }
    } else {
      Published.find()
        .then((nxbs) => {
          return res.send(nxbs);
        })
        .catch((err) => console.log(err));
    }
  }

  async addProduct(req, res, next) {
    try {
      const TenNxb = req.body.tenNxb;
      const DiaChi = req.body.diaChi;
      const existingPublished = await Published.findOne({ TenNxb });
      if (existingPublished) {
        return res.json({ update: "Nhà Xuất bản đã tồn tại" });
      } else {
        const newPublished = new Published({
          TenNxb,
          DiaChi,
        });
        await newPublished.save();
        return res.json({ message: "Đã thêm nhà xuất bản" });
      }
    } catch (error) {
      console.log("Lỗi khi thêm nhà xuất bản", error);
      res
        .status(500)
        .json({ message: "Lỗi khi thêm nhà xuất bản", error: error.message });
    }
  }

  async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      const existingPublished = await Published.findById(id);
      if (existingPublished) {
        if (req.body.tenNxb) {
          existingPublished.TenNxb = req.body.tenNxb;
        }
        if (req.body.diaChi) {
          existingPublished.DiaChi = req.body.diaChi;
        }
        await existingPublished.save();
        return res.json({ message: "Nhà xuất bản đã được cập nhật" });
      } else {
        return res.send({ error: "Cập nhật thất bại" });
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật nhà xuất bản", error);
      res.status(500).json({ message: "Lỗi khi cập nhật nhà xuất bản" });
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const existingPublished = await Published.findById(id);
      if (!existingPublished) {
        return res.status(404).json({ error: "Không tìm thấy nhà xuất bản" });
      } else {
        await Published.findByIdAndDelete(id);
        return res.send({ message: "Xóa nhà xuất bản thành công" });
      }
    } catch (error) {
      console.log("Lỗi khi xóa nhà xuất bản", error);
      res.status(500).json({ message: "Lỗi khi xóa nhà xuất bản" });
    }
  }
}

module.exports = new PublishedController();
