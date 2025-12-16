const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Sequelize = require("sequelize");

// Initialize App
const app = express();
const PORT = 3000;

// Middleware (This allows us to read Form Data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// -----------------------------------------
// DATABASE CONNECTION
// -----------------------------------------
// Replace 'root' and 'password' with YOUR actual MySQL credentials
const sequelize = new Sequelize("pharmastock", "root", "Pikachu28?", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set to true if you want to see raw SQL in terminal
});

// -----------------------------------------
// DEFINE DATA MODELS (The Schema)
// -----------------------------------------

// 1. User Table (For Shop Owners)
const User = sequelize.define("user", {
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false }, // We will hash this later
  role: { type: Sequelize.STRING, defaultValue: "owner" }, // 'admin' or 'owner'
});

// 2. Medicine Table (General Info)
const Medicine = sequelize.define("medicine", {
  name: { type: Sequelize.STRING, allowNull: false },
  manufacturer: { type: Sequelize.STRING },
  category: { type: Sequelize.STRING },
});

// 3. Batch Table (The Actual Stock with Expiry)
const Batch = sequelize.define("batch", {
  batch_number: { type: Sequelize.STRING, allowNull: false },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  expiry_date: { type: Sequelize.DATEONLY, allowNull: false }, // CRITICAL for FEFO
  price: { type: Sequelize.FLOAT, allowNull: false },
});

// Relationships (Linking Medicine to Batch)
Medicine.hasMany(Batch);
Batch.belongsTo(Medicine);

// -----------------------------------------
// SYNC DATABASE & START SERVER
// -----------------------------------------
sequelize
  .sync() // This creates the tables in MySQL automatically if they don't exist
  .then(() => {
    console.log("✅ Database Connected & Tables Synced!");

    // Start the Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Error:", err);
  });

// -----------------------------------------
// BASIC ROUTE (To Test)
// -----------------------------------------
app.get("/", (req, res) => {
  res.send(
    "<h1>Pharma Stock System is Running!</h1><p>Go to /inventory to see more (once we build it).</p>"
  );
});
