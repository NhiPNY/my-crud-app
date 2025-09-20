const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const supplierApi = require("./routes/supplierApi");
const productApi = require("./routes/productApi");

dotenv.config();
connectDB();

const app = express();

// Thêm middleware để parse JSON body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// View routes (EJS)
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// API routes (JSON)
app.use("/api/suppliers", supplierApi);
app.use("/api/products", productApi);

// Swagger
const swaggerDoc = yaml.load("./swagger.yaml");
console.log('Swagger document:', swaggerDoc);
if (!swaggerDoc) console.log('Failed to load swagger.yaml');
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));


// Trang chủ
app.get("/", (req, res) => {
  res.render("home");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  console.log(`📖 Swagger docs at http://localhost:${process.env.PORT}/api-docs`);
});
