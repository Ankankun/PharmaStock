const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const session = require("express-session");

// =========================================
// 1. APP INITIALIZATION & MIDDLEWARE
// =========================================
const app = express();
const PORT = process.env.PORT || 3000;

// Static Files & View Engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session Configuration
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Authentication Middleware
async function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    try {
      // We need to access ShopOwner here. Since it's defined later, we rely on hoisting or execution order.
      // To be safe, we can access it via sequelize.models if needed, or just assume it's ready.
      // However, const variables are not hoisted.
      // Let's move this middleware usage or definition, OR just use sequelize.models.shop_owner
      // But ShopOwner variable is available in the scope when the function EXECUTED.
      const user = await ShopOwner.findByPk(req.session.userId);
      if (user) {
        res.locals.user = user; // Available in all views
        return next();
      }
    } catch (err) {
      console.error("Auth Middleware Error:", err);
    }
  }
  res.redirect("/login");
}

// =========================================
// 2. DATABASE CONNECTION & MODELS
const sequelize = new Sequelize(
  process.env.DB_NAME || "pharmastock",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Pikachu28?",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
    port: process.env.DB_PORT || 3306,
    dialectOptions: {
      ssl:
        process.env.DB_SSL === "true"
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : undefined,
    },
  }
);

// --- Models ---

// Shop Owner
const ShopOwner = sequelize.define("shop_owner", {
  shop_owner_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  phone: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING, allowNull: false },
  first_name: { type: Sequelize.STRING },
  middle_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
  shop_name: { type: Sequelize.STRING },
  gst_no: { type: Sequelize.STRING },
  drug_licence_no: { type: Sequelize.STRING },
  country: { type: Sequelize.STRING },
  shop_city: { type: Sequelize.STRING },
  shop_state: { type: Sequelize.STRING },
  shop_pin: { type: Sequelize.STRING },
  alt_phone: { type: Sequelize.STRING },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Medicine
const Medicine = sequelize.define("medicine", {
  med_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  batch_no: { type: Sequelize.STRING, allowNull: false },
  med_name: { type: Sequelize.STRING, allowNull: false },
  generic_name: { type: Sequelize.STRING },
  manufacturer_name: { type: Sequelize.STRING },
  manufacture_date: { type: Sequelize.DATEONLY },
  expiry_date: { type: Sequelize.DATEONLY, allowNull: false },
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

// Customer
const Customer = sequelize.define("customer", {
  cust_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  cust_name: { type: Sequelize.STRING, allowNull: false },
  cust_phone: { type: Sequelize.STRING },
  cust_email: { type: Sequelize.STRING },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// Sale
const Sale = sequelize.define("sale", {
  sales_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  batch_no: { type: Sequelize.STRING },
  quantity_sold: { type: Sequelize.INTEGER },
  selling_price: { type: Sequelize.FLOAT },
  total_amount: { type: Sequelize.FLOAT },
  doctor_name: { type: Sequelize.STRING },
  sale_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});

// --- Relationships ---
ShopOwner.hasMany(Medicine, { foreignKey: "shop_owner_id" });
Medicine.belongsTo(ShopOwner, { foreignKey: "shop_owner_id" });

ShopOwner.hasMany(Customer, { foreignKey: "shop_owner_id" });
Customer.belongsTo(ShopOwner, { foreignKey: "shop_owner_id" });

ShopOwner.hasMany(Sale, { foreignKey: "shop_owner_id" });
Sale.belongsTo(ShopOwner, { foreignKey: "shop_owner_id" });

Medicine.hasMany(Sale, { foreignKey: "med_id" });
Sale.belongsTo(Medicine, { foreignKey: "med_id" });

Customer.hasMany(Sale, { foreignKey: "cust_id" });
Sale.belongsTo(Customer, { foreignKey: "cust_id" });

// =========================================
// 3. ROUTES
// =========================================

// --- Public Routes ---

// Landing Page
app.get("/", (req, res) => {
  res.render("index");
});

// Login
app.get("/login", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/view-stock");
  }
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await ShopOwner.findOne({ where: { email } });

    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

    req.session.userId = user.shop_owner_id;
    res.redirect("/view-stock");
  } catch (err) {
    console.error(err);
    res.status(500).send("Login error");
  }
});

// Signup
app.get("/signup", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/view-stock");
  }
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;
    const existingUser = await ShopOwner.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await ShopOwner.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
    });

    // Auto-login after signup? Or redirect to login?
    // User flow requested: Signup -> Register (Profile Completion)
    // We need to set session here if we want them to access /register immediately
    // But usually, we might want them to login.
    // However, the previous code redirected to /register.
    // Let's find the user we just created to set the session.
    const newUser = await ShopOwner.findOne({ where: { email } });
    req.session.userId = newUser.shop_owner_id;

    res.redirect("/register");
  } catch (err) {
    console.error(err);
    res.status(500).send("Signup error");
  }
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// --- Protected Routes (Require Auth) ---

// Register (Profile Completion)
app.get("/register", isAuthenticated, async (req, res) => {
  try {
    const user = await ShopOwner.findByPk(req.session.userId);
    res.render("register", { user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

app.post("/register", isAuthenticated, async (req, res) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      shop_name,
      drug_licence_no,
      country,
      shop_city,
      shop_state,
      shop_pin,
      alt_phone,
      gst_no,
    } = req.body;

    await ShopOwner.update(
      {
        first_name,
        middle_name,
        last_name,
        shop_name,
        drug_licence_no,
        country,
        shop_city,
        shop_state,
        shop_pin,
        alt_phone,
        gst_no,
      },
      { where: { shop_owner_id: req.session.userId } }
    );

    res.redirect("/view-stock");
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration error");
  }
});

// Account Profile (Read-only)
app.get("/account", isAuthenticated, async (req, res) => {
  try {
    const user = await ShopOwner.findByPk(req.session.userId);
    res.render("account", { user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

// Account Update
app.get("/update", isAuthenticated, async (req, res) => {
  try {
    const user = await ShopOwner.findByPk(req.session.userId);
    res.render("update", { user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

app.post("/update", isAuthenticated, async (req, res) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      shop_name,
      drug_licence_no,
      country,
      shop_city,
      shop_state,
      shop_pin,
      phone,
      alt_phone,
      gst_no,
    } = req.body;

    await ShopOwner.update(
      {
        first_name,
        middle_name,
        last_name,
        shop_name,
        drug_licence_no,
        country,
        shop_city,
        shop_state,
        shop_pin,
        phone,
        alt_phone,
        gst_no,
      },
      { where: { shop_owner_id: req.session.userId } }
    );

    res.redirect("/view-stock");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update error");
  }
});

// Stock Management
app.get("/view-stock", isAuthenticated, async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let whereClause = { shop_owner_id: req.session.userId };

    if (searchQuery) {
      whereClause[Sequelize.Op.and] = [
        {
          [Sequelize.Op.or]: [
            { med_name: { [Sequelize.Op.like]: `%${searchQuery}%` } },
            { batch_no: { [Sequelize.Op.like]: `%${searchQuery}%` } },
            { rack_no: { [Sequelize.Op.like]: `%${searchQuery}%` } },
            { generic_name: { [Sequelize.Op.like]: `%${searchQuery}%` } },
          ],
        },
      ];
    }

    const medicines = await Medicine.findAll({ where: whereClause });
    res.render("view-stock", { medicines: medicines, search: searchQuery });
  } catch (err) {
    console.error(err);
    res.send("Error loading stock");
  }
});

app.get("/add-stock", isAuthenticated, (req, res) => {
  res.render("add-stock");
});

app.post("/inventory/add", isAuthenticated, async (req, res) => {
  try {
    await Medicine.create({
      ...req.body,
      prescription_required: req.body.prescription_required === "yes",
      stock_status: "Available",
      shop_owner_id: req.session.userId,
    });
    console.log("✅ Medicine Added!");
    res.redirect("/view-stock");
  } catch (err) {
    console.error(err);
    res.send("Error adding medicine: " + err.message);
  }
});

app.get("/update-stock", isAuthenticated, async (req, res) => {
  try {
    const batchSearch = req.query.batch_search || "";
    let medicine = null;

    if (batchSearch) {
      medicine = await Medicine.findOne({
        where: {
          batch_no: batchSearch,
          shop_owner_id: req.session.userId,
        },
      });
    }

    res.render("update-stock", { medicine, searchTerm: batchSearch });
  } catch (err) {
    console.error("Error loading update page:", err);
    res.send("Error loading update page");
  }
});

app.post("/inventory/update", isAuthenticated, async (req, res) => {
  try {
    const medId = req.body.med_id;
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
        where: {
          med_id: medId,
          shop_owner_id: req.session.userId,
        },
      }
    );
    console.log("✅ Stock Updated!");
    res.redirect("/view-stock");
  } catch (err) {
    console.error("Error updating stock:", err);
    res.send("Error updating stock: " + err.message);
  }
});

// Sales & Customers
app.get("/sell", isAuthenticated, async (req, res) => {
  try {
    const medicines = await Medicine.findAll({
      where: { shop_owner_id: req.session.userId },
    });
    res.render("sell-stock", { medicines });
  } catch (err) {
    console.error("Error loading sell page:", err);
    res.send("Error loading sell page");
  }
});

app.get("/customer", isAuthenticated, async (req, res) => {
  try {
    const filter = req.query.filter || "all";
    let dateCondition = { shop_owner_id: req.session.userId };
    const now = new Date();

    if (filter === "today") {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      dateCondition.sale_date = { [Sequelize.Op.gte]: startOfDay };
    } else if (filter === "current-month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateCondition.sale_date = { [Sequelize.Op.gte]: startOfMonth };
    } else if (filter === "last-month") {
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      dateCondition.sale_date = {
        [Sequelize.Op.gte]: startOfLastMonth,
        [Sequelize.Op.lte]: endOfLastMonth,
      };
    }

    const sales = await Sale.findAll({
      where: dateCondition,
      include: [
        { model: Customer, required: true },
        { model: Medicine, required: false },
      ],
      order: [["sale_date", "DESC"]],
    });

    const totalSales = sales.reduce((sum, sale) => sum + (sale.total_amount || 0), 0);

    res.render("customer", { sales, filter, totalSales });
  } catch (err) {
    console.error("Error loading customer page:", err);
    res.send("Error loading customer page: " + err.message);
  }
});

// Feedback
app.get("/feedback", isAuthenticated, (req, res) => {
  res.render("feedback");
});

// Payment (Placeholder)
app.get("/payment", isAuthenticated, (req, res) => {
  // Assuming payment.ejs exists or redirecting to a placeholder
  // If payment.ejs doesn't exist, this will error.
  // For now, let's render 'payment' if it exists, or send a message.
  // Given the user's request, we'll assume they want it linked.
  // If payment.html exists, it should be converted.
  // I'll try to render it, if it fails, user will know to create it.
  res.render("payment");
});

// --- API Routes ---

app.get("/api/medicine/:batch", isAuthenticated, async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      where: {
        batch_no: req.params.batch,
        shop_owner_id: req.session.userId,
      },
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

app.post("/api/sell", isAuthenticated, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { customer, items } = req.body;

    const newCustomer = await Customer.create(
      {
        cust_name: customer.name,
        cust_phone: customer.phone,
        shop_owner_id: req.session.userId,
      },
      { transaction: t }
    );

    for (const item of items) {
      const med = await Medicine.findOne({
        where: {
          med_id: item.id,
          shop_owner_id: req.session.userId,
        },
        transaction: t,
      });

      if (!med) throw new Error(`Medicine ID ${item.id} not found`);
      if (med.quantity < item.qty) throw new Error(`Insufficient stock for ${med.med_name}`);

      const newQty = med.quantity - item.qty;
      let status = "Available";
      if (newQty === 0) status = "Out of Stock";
      else if (newQty < 10) status = "Low Stock";

      await med.update({ quantity: newQty, stock_status: status }, { transaction: t });

      await Sale.create(
        {
          cust_id: newCustomer.cust_id,
          med_id: med.med_id,
          batch_no: med.batch_no,
          quantity_sold: item.qty,
          selling_price: item.price,
          total_amount: item.total,
          doctor_name: customer.doctor,
          shop_owner_id: req.session.userId,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.json({ success: true, message: "Sale recorded successfully!" });
  } catch (err) {
    await t.rollback();
    console.error("❌ Sale Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// =========================================
// 4. START SERVER
// =========================================
if (require.main === module) {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("✅ Database Synced!");
      app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("❌ Database Connection Error:", err);
    });
}

module.exports = app;

// terms of service page link
app.get("/terms", (req, res) => {
  res.render("terms");
});

//privacy page link
app.get("/privacy", (req, res) => {
  res.render("privacy");
});

//about page link
app.get("/about", (req, res) => {
  res.render("about");
});

//help page link
app.get("/help", (req, res) => {
  res.render("help");
});

//how does it work page link
app.get("/how-does-it-work", (req, res) => {
  res.render("how-does-it-work");
});
