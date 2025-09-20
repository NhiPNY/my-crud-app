const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }, // Thêm field address
  phone: { type: String, required: true },   // Thêm field phone
  supplierId: { type: String, required: true } // Liên kết với Supplier
});

module.exports = mongoose.model("Product", productSchema);