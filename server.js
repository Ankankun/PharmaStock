const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Sequelize = require("sequelize");

// Initialize App
const app = express();
const PORT = 3000;

// Middleware (Allows us to read form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// -----------------------------------------
// DATABASE CONNECTION
// -----------------------------------------
// using your password from the previous snippet
const sequelize = new Sequelize("pharmastock", "root", "dhar98315", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set to true to see raw SQL queries
});

// -----------------------------------------
// DEFINE DATA MODELS (Revised 4-Table Schema)
// -----------------------------------------

// 1. SHOP OWNERS TABLE
const ShopOwner = sequelize.define("shop_owner", {
  shop_owner_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  phone: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING, allowNull: false },
  first_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
  shop_name: { type: Sequelize.STRING },
  gst_no: { type: Sequelize.STRING },
  drug_licence_no: { type: Sequelize.STRING },
  shop_city: { type: Sequelize.STRING },
  shop_state: { type: Sequelize.STRING },
  shop_pin: { type: Sequelize.STRING },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// 2. MEDICINES TABLE
const Medicine = sequelize.define("medicine", {
  med_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  // shop_owner_id is added automatically via relationships
  batch_no: { type: Sequelize.STRING, allowNull: false },
  med_name: { type: Sequelize.STRING, allowNull: false },
  generic_name: { type: Sequelize.STRING },
  manufacturer_name: { type: Sequelize.STRING },
  manufacture_date: { type: Sequelize.DATEONLY },
  expiry_date: { type: Sequelize.DATEONLY, allowNull: false }, // Critical for FEFO
  rack_no: { type: Sequelize.STRING },
  unit_type: { type: Sequelize.STRING },
  category: { type: Sequelize.STRING },
  prescription_required: { type: Sequelize.BOOLEAN, defaultValue: false },
  buying_cost: { type: Sequelize.FLOAT },
  mrp: { type: Sequelize.FLOAT },
  consumer_cost: { type: Sequelize.FLOAT },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  stock_status: { type: Sequelize.STRING, defaultValue: "Available" },
  supplier_name: { type: Sequelize.STRING },
  supplier_contact: { type: Sequelize.STRING },
  entry_date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },
});

// 3. CUSTOMERS TABLE
const Customer = sequelize.define("customer", {
  cust_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  // shop_owner_id is added automatically
  cust_name: { type: Sequelize.STRING, allowNull: false },
  cust_phone: { type: Sequelize.STRING },
  cust_email: { type: Sequelize.STRING },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// 4. SALES TABLE
const Sale = sequelize.define("sale", {
  sales_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  // Foreign Keys added automatically: shop_owner_id, cust_id, med_id
  batch_no: { type: Sequelize.STRING }, // Snapshot of batch sold
  quantity_sold: { type: Sequelize.INTEGER },
  selling_price: { type: Sequelize.FLOAT },
  total_amount: { type: Sequelize.FLOAT },
  sale_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// -----------------------------------------
// RELATIONSHIPS (The Glue)
// -----------------------------------------

// Shop Owner Relationships
ShopOwner.hasMany(Medicine, { foreignKey: "shop_owner_id" });
Medicine.belongsTo(ShopOwner, { foreignKey: "shop_owner_id" });

ShopOwner.hasMany(Customer, { foreignKey: "shop_owner_id" });
Customer.belongsTo(ShopOwner, { foreignKey: "shop_owner_id" });

ShopOwner.hasMany(Sale, { foreignKey: "shop_owner_id" });
Sale.belongsTo(ShopOwner, { foreignKey: "shop_owner_id" });

// Sales Relationships
Medicine.hasMany(Sale, { foreignKey: "med_id" });
Sale.belongsTo(Medicine, { foreignKey: "med_id" });

Customer.hasMany(Sale, { foreignKey: "cust_id" });
Sale.belongsTo(Customer, { foreignKey: "cust_id" });

// -----------------------------------------
// SYNC DATABASE & START SERVER
// -----------------------------------------
sequelize
  .sync({ alter: true }) // Updates tables if you change fields
  .then(() => {
    console.log("✅ Database Synced with New 4-Table Schema!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Error:", err);
  });

// -----------------------------------------
// BASIC ROUTE
// -----------------------------------------
app.get("/", (req, res) => {
  res.send("<h1>Pharma Stock (Revised Schema) is Running!</h1>");
});