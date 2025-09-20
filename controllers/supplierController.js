const Supplier = require("../models/Supplier");

// Lấy tất cả suppliers
exports.getAll = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Tạo supplier
exports.create = async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        await supplier.save();
        res.status(201).json(supplier);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cập nhật supplier
exports.update = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(supplier);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xóa supplier
exports.delete = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplier deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
