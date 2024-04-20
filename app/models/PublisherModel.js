const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublisherModel = new Schema({
  TenNxb: { type: String, maxLength: 255 },
  DiaChi: { type: String, maxLength: 255 },
});

module.exports = mongoose.model("PublisherModel", PublisherModel);
