const DocGia = require("../models/DocGia");
const NhanVien = require("../models/NhanVien");
const userServices = require("../../services/userService");
const multer = require("multer");
const storage = require("../../services/uploadImage");
class Authentication {
  async createStaff(req, res, next) {
    try {
      if (!req.file) {
        return res.status(500).json({ error: "Chưa có image" });
      }

      const HoTenNv = req.body.username;
      const Password = req.body.password;
      const DiaChi = req.body.address;
      const SoDienThoai = req.body.phone;
      const hashedPassword = await userServices.hashPassword(Password);
      const ChucVu = req.body.position;
      const Avatar = req.file.filename;
      const existingUser = await NhanVien.findOne({ SoDienThoai });
      if (existingUser) {
        return res.json({ error: "Người dùng đã tồn tại" });
      } else {
        const newNhanVien = new NhanVien({
          HoTenNv,
          Password: hashedPassword,
          DiaChi,
          SoDienThoai,
          ChucVu,
          Avatar,
        });
        await newNhanVien.save();
        return res.json({
          message: "Đăng ký nhân viên thành công",
          data: req.body,
        });
      }
    } catch (error) {
      console.log(error);
      console.log("Lỗi khi đăng ký nhân viên", error.message);
      res.status(500).json({ message: "Lỗi khi đăng ký nhân viên" });
    }
  }

  async createUser(req, res, next) {
    try {
      if (!req.file) {
        return res.status(500).json({ error: "Chưa có image" });
      }
      const Ten = req.body.username;
      const NgaySinh = req.body.birth;
      const Phai = req.body.sex;
      const DiaChi = req.body.address;
      const DienThoai = req.body.phone;
      const Password = req.body.password;
      const Avatar = req.file.filename;
      const existingUser = await DocGia.findOne({ DienThoai });
      const hashedPassword = await userServices.hashPassword(Password);

      if (existingUser) {
        return res.json({ error: "Người dùng đã tồn tại" });
      } else {
        const newDocGia = new DocGia({
          Ten,
          NgaySinh,
          Phai,
          DiaChi,
          DienThoai,
          Password: hashedPassword,
          Avatar,
        });
        console.log("SAVING____________");
        await newDocGia.save();
        return res.json({
          message: "Đăng ký người dùng thành công",
          data: req.body,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res, next) {
    const DienThoai = req.body.phone;
    const Password = req.body.password;
    try {
      const existingUser = await DocGia.findOne({ DienThoai });
      if (!existingUser) {
        return res.json({ error: "Tài khoản không tồn tại" });
      } else {
        const checkPassword = await userServices.checkPassword(
          Password,
          existingUser.Password
        );
        if (!checkPassword) {
          return res.json({ error: "Sai mật khẩu" });
        } else {
          const userData = existingUser.toObject();
          delete userData.Password;
          return res.json({
            message: "Đăng nhập thành công",
            data: userData,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async loginStaff(req, res, next) {
    const SoDienThoai = req.body.phone;
    const Password = req.body.password;
    try {
      const existingUser = await NhanVien.findOne({ SoDienThoai });
      if (!existingUser) {
        return res.json({ error: "Tài khoản không tồn tại" });
      } else {
        const checkPassword = await userServices.checkPassword(
          Password,
          existingUser.Password
        );
        if (!checkPassword) {
          return res.json({ error: "Sai mật khẩu" });
        } else {
          const userData = existingUser.toObject();
          delete userData.Password;
          return res.json({
            message: "Đăng nhập thành công",
            data: userData,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  logout(req, res, next) {
    return res.json({ message: "Đăng xuất thành công" });
  }

  infoUser(req, res, next) {
    const id = req.params.id;
    DocGia.findById(id)
      .then((DocGia) => res.send(DocGia))
      .catch((err) => {
        res.send("Lỗi khi tìm kiếm độc giả:");
      });
  }

  async editProfile(req, res, next) {
    try {
      const id = req.params.id;
      const existingStaff = await DocGia.findById(id);
      if (existingStaff) {
        if (req.body.username) {
          existingStaff.Ten = req.body.username;
        }
        if (req.body.birth) {
          existingStaff.NgaySinh = req.body.birth;
        }
        if (req.body.sex) {
          existingStaff.Phai = req.body.sex;
        }
        if (req.body.phone) {
          existingStaff.DienThoai = req.body.phone;
        }
        if (req.body.address) {
          existingStaff.DiaChi = req.body.address;
        }
        // Kiểm tra và cập nhật đường dẫn của tệp avatar nếu có
        if (req.file) {
          existingStaff.Avatar = req.file.filename;
        }
        await existingStaff.save();
        const userData = existingStaff.toObject();

        return res.json({
          message: "Thông tin đã được cập nhật",
          data: userData,
        });
      } else {
        return res.json({ error: "Cập nhật thất bại" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  infoStaff(req, res, next) {
    const id = req.params.id;
    NhanVien.findById(id)
      .then((nhanvien) => res.send(nhanvien))
      .catch((err) => {
        res.status().json("Lỗi khi tìm kiếm nhân viên:", err.message);
      });
  }

  async editProfileStaff(req, res, next) {
    try {
      const id = req.params.id;
      const existingStaff = await NhanVien.findById(id);
      if (existingStaff) {
        if (req.body.username) {
          existingStaff.HoTenNv = req.body.username;
        }
        if (req.body.address) {
          existingStaff.DiaChi = req.body.address;
        }
        if (req.body.phone) {
          existingStaff.SoDienThoai = req.body.phone;
        }
        if (req.body.position) {
          existingStaff.ChucVu = req.body.position;
        }
        if (req.file) {
          existingStaff.Avatar = req.file.filename;
        }
        await existingStaff.save();
        const userData = existingStaff.toObject();
        delete userData.Password;
        return res.json({
          message: "Thông tin đã được cập nhật",
          data: userData,
        });
      } else {
        return res.json({ error: err.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async dashboard(req, res, next) {}
}

module.exports = new Authentication();
