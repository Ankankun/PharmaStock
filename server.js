const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Sequelize = require("sequelize");

// Initialize App
const app = express();
const PORT = 3000;

// Middleware (Allows us to read form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this to parse JSON bodies
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// -----------------------------------------
// DATABASE CONNECTION
// -----------------------------------------
// using your password from the previous snippet
const sequelize = new Sequelize("pharmastock", "root", "Pikachu28?", {
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
  doctor_name: { type: Sequelize.STRING }, // Added to store Prescribed By
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
// ROUTES
// -----------------------------------------

// 1. HOME REDIRECT
app.get("/", (req, res) => {
  res.redirect("/view-stock");
});

// 2. SHOW ADD STOCK PAGE
app.get("/add-stock", (req, res) => {
  res.render("add-stock");
});

// 3. SHOW VIEW STOCK PAGE
app.get("/view-stock", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let options = {};

    if (searchQuery) {
      options = {
        where: {
          [Sequelize.Op.or]: [
            { med_name: { [Sequelize.Op.like]: `%${searchQuery}%` } },
            { batch_no: { [Sequelize.Op.like]: `%${searchQuery}%` } },
            { rack_no: { [Sequelize.Op.like]: `%${searchQuery}%` } },
            { generic_name: { [Sequelize.Op.like]: `%${searchQuery}%` } },
          ],
        },
      };
    }

    const medicines = await Medicine.findAll(options);
    res.render("view-stock", { medicines: medicines, search: searchQuery });
  } catch (err) {
    console.error(err);
    res.send("Error loading stock");
  }
});

// 4. HANDLE FORM SUBMISSION
app.post("/inventory/add", async (req, res) => {
  try {
    await Medicine.create({
      batch_no: req.body.batch_no,
      med_name: req.body.med_name,
      manufacturer_name: req.body.manufacturer_name,
      manufacture_date: req.body.manufacture_date,
      expiry_date: req.body.expiry_date,
      rack_no: req.body.rack_no,
      buying_cost: req.body.buying_cost,
      mrp: req.body.mrp,
      consumer_cost: req.body.consumer_cost,
      prescription_required: req.body.prescription_required === "yes",
      generic_name: req.body.generic_name,
      supplier_name: req.body.supplier_name,
      supplier_contact: req.body.supplier_contact,
      category: req.body.category,
      entry_date: req.body.entry_date,
      unit_type: req.body.unit_type,
      quantity: req.body.quantity,
      stock_status: "Available",
    });
    console.log("✅ Medicine Added!");
    res.redirect("/view-stock");
  } catch (err) {
    console.error(err);
    res.send("Error adding medicine: " + err.message);
  }
});

// 5. SHOW UPDATE PAGE (GET)
// This handles both the initial load AND the search button click
app.get("/update-stock", async (req, res) => {
  try {
    const batchSearch = req.query.batch_search || ""; // Get the search term from URL
    let medicine = null;

    // If user searched, try to find the medicine
    if (batchSearch) {
      medicine = await Medicine.findOne({
        where: { batch_no: batchSearch },
      });
    }

    // CRITICAL: We MUST pass 'medicine' and 'searchTerm' even if they are null
    res.render("update-stock", {
      medicine: medicine,
      searchTerm: batchSearch,
    });
  } catch (err) {
    console.error("Error loading update page:", err);
    res.send("Error loading update page");
  }
});

// 6. HANDLE UPDATE FORM SUBMISSION (POST)
app.post("/inventory/update", async (req, res) => {
  try {
    const medId = req.body.med_id;

    // Update the specific fields
    await Medicine.update(
      {
        quantity: req.body.quantity,
        rack_no: req.body.rack_no,
        expiry_date: req.body.expiry_date,
        mrp: req.body.mrp,
        consumer_cost: req.body.consumer_cost,
        stock_status: req.body.stock_status,
      },
      {
        where: { med_id: medId },
      }
    );

    console.log("✅ Stock Updated!");
    res.redirect("/view-stock"); // Go back to view list
  } catch (err) {
    console.error("Error updating stock:", err);
    res.send("Error updating stock: " + err.message);
  }
});

// 7. SHOW SELL PAGE (GET)
app.get("/sell", async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.render("sell-stock", { medicines: medicines });
  } catch (err) {
    console.error("Error loading sell page:", err);
    res.send("Error loading sell page");
  }
});

// 8. API: GET MEDICINE DETAILS (For Sell Page AJAX)
app.get("/api/medicine/:batch", async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      where: { batch_no: req.params.batch },
    });

    if (medicine) {
      res.json({ success: true, data: medicine });
    } else {
      res.json({ success: false, message: "Medicine not found" });
    }
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

<<<<<<< HEAD



=======
// 9. API: PROCESS SALE (Handle Receipt Generation)
app.post("/api/sell", async (req, res) => {
  const t = await sequelize.transaction(); // Start a transaction

  try {
    const { customer, items } = req.body;

    // 1. Create Customer Record
    const newCustomer = await Customer.create(
      {
        cust_name: customer.name,
        cust_phone: customer.phone,
        // shop_owner_id: 1 // Optional: Add if you have auth
      },
      { transaction: t }
    );

    // 2. Process Each Item
    for (const item of items) {
      // Find the medicine to update stock
      const med = await Medicine.findByPk(item.id, { transaction: t });

      if (!med) {
        throw new Error(`Medicine ID ${item.id} not found`);
      }

      if (med.quantity < item.qty) {
        throw new Error(`Insufficient stock for ${med.med_name}`);
      }

      // Calculate new quantity and status
      const newQty = med.quantity - item.qty;
      let status = "Available";
      if (newQty === 0) status = "Out of Stock";
      else if (newQty < 10) status = "Low Stock";

      // Update Medicine
      await med.update(
        {
          quantity: newQty,
          stock_status: status,
        },
        { transaction: t }
      );

      // Create Sale Record
      await Sale.create(
        {
          cust_id: newCustomer.cust_id,
          med_id: med.med_id,
          batch_no: med.batch_no,
          quantity_sold: item.qty,
          selling_price: item.price,
          total_amount: item.total,
          doctor_name: customer.doctor,
        },
        { transaction: t }
      );
    }

    // Commit the transaction if all good
    await t.commit();
    console.log("✅ Sale Processed Successfully!");
    res.json({ success: true, message: "Sale recorded successfully!" });
  } catch (err) {
    // Rollback if any error occurs
    await t.rollback();
    console.error("❌ Sale Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. SHOW CUSTOMER PAGE (GET)
app.get("/customer.html", (req, res) => {
  res.redirect("/customer");
});

app.get("/customer", async (req, res) => {
  try {
    const filter = req.query.filter || "all";
    let dateCondition = {};

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    if (filter === "today") {
      dateCondition = {
        sale_date: { [Sequelize.Op.gte]: startOfDay },
      };
    } else if (filter === "current-month") {
      dateCondition = {
        sale_date: { [Sequelize.Op.gte]: startOfMonth },
      };
    } else if (filter === "last-month") {
      dateCondition = {
        sale_date: {
          [Sequelize.Op.gte]: startOfLastMonth,
          [Sequelize.Op.lte]: endOfLastMonth,
        },
      };
    }

    // Fetch Sales with Customer and Medicine data
    const sales = await Sale.findAll({
      where: dateCondition,
      include: [
        { model: Customer, required: true },
        { model: Medicine, required: false },
      ],
      order: [["sale_date", "DESC"]],
    });

    // Calculate Total Sales for the current view
    const totalSales = sales.reduce((sum, sale) => sum + (sale.total_amount || 0), 0);

    res.render("customer", {
      sales: sales,
      filter: filter,
      totalSales: totalSales,
    });
  } catch (err) {
    console.error("Error loading customer page:", err);
    res.send("Error loading customer page: " + err.message);
  }
});
>>>>>>> 5e285db40b05911ac2f18ba2f5eb13617c71ec5b
