# Pharma Stock Presentation Guide

This document serves as a reference for the 10-minute presentation of the Pharma Stock application. It is structured for a 16:9 slide format.

## Presentation Structure (10-12 Minutes / 16 Slides)

### Slide 1: Title Slide

- **Title:** Pharma Stock
- **Subtitle:** Smart Pharmacy Management System
- **Footer:** "Stop Wastage. Prioritize Safety."
- **Visual:** A clean, high-quality image of a pharmacy shelf or a digital tablet showing a graph.
- **Speaker Note:** "Good morning. Today we are presenting Pharma Stock, a digital assistant designed specifically to solve the hidden financial leaks in pharmacy retail."

---

### Slide 2: The Problem (The "Why")

- **Title:** The Reality of Pharmacy Retail
- **Content:**
  - **Medicine Wastage:** Significant revenue is lost annually due to expired stock.
  - **Inefficient Tracking:** Traditional ledgers track _quantity_, not _quality_ (expiry).
  - **Human Error:** Selling fresh stock while older batches expire at the back of the shelf.
- **Visual:** An icon of a trash can with money or pills, or a chaotic spreadsheet.
- **Speaker Note:** "Most POS systems treat medicine like groceries. But medicine expires. Shop owners often lose money because they don't know which specific batch on their shelf is expiring next."

---

### Slide 3: The Solution

- **Title:** Introducing Pharma Stock
- **Content:**
  - **Digitized Inventory:** Tracks products by **Batch Number** & **Expiration Date**.
  - **Smart Alerts:** Proactive warnings for "Expiring Soon" items.
  - **Multi-Tenant:** Secure, isolated workspaces for different shop owners.
- **Visual:** A screenshot of the Landing page (`index.ejs`) or Dashboard (`view-stock.ejs`).
- **Speaker Note:** "Pharma Stock bridges this gap. It’s not just a ledger; it’s a smart assistant that makes 'Expiration Date' a first-class citizen in your data."

---

### Slide 4: The Core Innovation (The USP)

- **Title:** FEFO vs. FIFO
- **Content:**
  - **FIFO (Standard):** First In, First Out. (Sells what arrived first).
  - **FEFO (Pharma Stock):** **First Expired, First Out**.
  - **Logic:** If Batch B expires before Batch A, the system forces the sale of Batch B, regardless of when it was bought.
- **Visual:** A simple diagram comparing two queues. One sorted by arrival, one sorted by expiry date.
- **Speaker Note:** "This is our secret sauce. While grocery stores use FIFO, we use FEFO. We prioritize the health of the inventory, ensuring the oldest stock moves first."

---

### Slide 5: System Architecture

- **Title:** System Architecture
- **Content:**
  - **Client Layer:** Web Browser (HTML/CSS/EJS).
  - **Application Layer:** Node.js Server with Express.js.
  - **Data Layer:** MySQL Database with Sequelize ORM.
- **Visual:** A 3-tier block diagram (Browser <-> Node.js <-> Database).
- **Speaker Note:** "The system follows a classic 3-tier architecture. The browser handles the UI, Node.js manages the business logic, and MySQL ensures secure data storage."

---

### Slide 6: Methodology: MVC Pattern

- **Title:** Architectural Pattern (MVC)
- **Content:**
  - **Model (Data):** Sequelize Models (Medicines, Sales).
  - **View (UI):** EJS Templates for dynamic rendering.
  - **Controller (Logic):** Express Routes handling requests.
- **Visual:** A diagram showing the cycle: Request -> Controller -> Model -> View -> Response.
- **Speaker Note:** "We use the Model-View-Controller pattern. This separates our data from our user interface, making the code clean, maintainable, and scalable."

---

### Slide 7: Database Design

- **Title:** Robust Data Modeling
- **Content:**
  - **Relational Structure:** Normalized MySQL tables.
  - **Key Entities:** Shop Owners, Medicines, Customers, Sales.
  - **Relationships:** One-to-Many (e.g., One Shop Owner -> Many Medicines).
- **Visual:** An Entity-Relationship (ER) Diagram showing the tables and their links.
- **Speaker Note:** "Our database is fully normalized. We track relationships strictly—for example, every medicine and sale is linked to a specific shop owner."

---

### Slide 8: Data Flow & Page Mapping

- **Title:** Data Flow & Page Mapping
- **Content:**

  ```mermaid
  flowchart LR
      subgraph Pages
          direction TB
          Login[Login / Signup]
          Stock[Add/View/Update Stock]
          Sell[Sell Page]
          History[Customer History]
      end

      subgraph DB["Database Tables"]
          direction TB
          SO[(ShopOwner)]
          Med[(Medicine)]
          Cust[(Customer)]
          Sale[(Sale)]
      end

      Login --> SO
      Stock --> Med
      Sell --> Med
      Sell --> Cust
      Sell --> Sale
      History --> Med
      History --> Cust
      History --> Sale

      %% Force straight lines
      linkStyle 0,1,2,3,4,5,6,7 interpolate linear
  ```

- **Visual:** A Mermaid diagram mapping Pages to Database Tables.
- **Speaker Note:** "Here is how our application pages interact with the database. For example, the 'Sell Page' is the most complex, writing to Sales and Customers while updating the Medicine inventory simultaneously."

---

### Slide 9: Security & Multi-Tenancy

- **Title:** Secure & Scalable
- **Content:**
  - **Data Isolation:** `shop_owner_id` enforces strict privacy.
  - **Authentication:** Secure Login with Bcrypt hashing.
  - **Session Management:** Protected user sessions.
- **Visual:** A lock icon or a split-screen showing two different users seeing only their own data.
- **Speaker Note:** "Security is built-in, not bolted on. Our multi-tenant design ensures that Shop A can never see Shop B's inventory, thanks to strict data isolation."

---

### Slide 10: User Journey - Step 1: Inventory

- **Title:** Granular Stock Management
- **Content:**
  - **Batch-Level Control:** Add stock with specific Batch IDs and Rack Numbers.
  - **Safety First:** Mandatory "Prescription Required" flags.
  - **Visual Indicators:** Color-coded status for Available vs. Out of Stock.
- **Visual:** Screenshot of the Add Stock form (`add-stock.ejs`).
- **Speaker Note:** "Let's look at the flow. When a chemist adds stock, they don't just say 'Paracetamol'. They enter the Batch and Rack number. This precision is key for retrieval later."

---

### Slide 11: User Journey - Step 2: The Dashboard

- **Title:** Real-Time Inventory Overview
- **Content:**
  - **Instant Visibility:** See all stock across all racks in one view.
  - **Smart Filters:** Search instantly by Medicine Name, Batch ID, or Rack Number.
  - **Status Alerts:** Automatic "Low Stock" and "Expired" tags highlight urgent items.
- **Visual:** Screenshot of the View Stock page (`view-stock.ejs`) showing the table with status badges.
- **Speaker Note:** "Once stock is added, the Dashboard becomes the command center. It instantly flags expired batches in red and warns about low stock, so the owner knows exactly what's happening on their shelves."

---

### Slide 12: User Journey - Step 3: The Sale

- **Title:** Intelligent Point of Sale
- **Content:**
  - **Instant Lookup:** Search by Name or Batch.
  - **Auto-Deduction:** Selling an item automatically updates the specific batch count.
  - **Bill Generation:** Dynamic billing with grand total calculation.
- **Visual:** Screenshot of the Sell Stock interface (`sell-stock.ejs`).
- **Speaker Note:** "At the counter, speed is everything. The chemist scans a batch, and the system instantly pulls up the price and expiry, ensuring they never accidentally sell an expired product."

---

### Slide 13: User Journey - Step 4: Insights

- **Title:** Data-Driven Decisions
- **Content:**
  - **Customer History:** Track who bought what (essential for recalls).
  - **Sales Logs:** Monitor daily revenue and trends.
  - **Expiry Dashboard:** See what needs to be returned to vendors _before_ it expires.
- **Visual:** Screenshot of Customer History (`customer.ejs`) or a chart from the dashboard.
- **Speaker Note:** "Finally, the owner gets a bird's-eye view. They can see sales history and, most importantly, a list of items expiring next month so they can take action."

---

### Slide 14: Technology Stack

- **Title:** Built for Scale
- **Content:**
  - **Frontend:** HTML5, CSS3, EJS (Responsive Design).
  - **Backend:** Node.js & Express.js (Fast, non-blocking I/O).
  - **Database:** MySQL with Sequelize ORM (Relational data integrity).
  - **Security:** Bcrypt encryption & Session-based auth.
- **Visual:** Logos of Node.js, MySQL, and HTML5 arranged cleanly.
- **Speaker Note:** "We built this on a robust, modern stack. Node.js ensures the app is fast, and MySQL ensures our complex data relationships are strictly maintained."

---

### Slide 15: Future Roadmap

- **Title:** What's Next?
- **Content:**
  - **AI OCR Scanner:** Scan medicine strips with a camera to auto-fill details.
  - **Demand Prediction:** AI analysis to suggest re-order quantities.
  - **Patient Care:** SMS reminders for chronic medication refills.
- **Visual:** An icon of a brain (AI) or a smartphone scanning a barcode.
- **Speaker Note:** "We aren't stopping here. Our next phase involves AI to predict demand and OCR technology to let chemists scan strips instead of typing details."

---

### Slide 16: Conclusion

- **Title:** Summary
- **Content:**
  - **Saves Money:** Reduces expired stock wastage.
  - **Saves Time:** Automates inventory tracking.
  - **Saves Lives:** Prevents the sale of expired medicine.
- **Big Text:** "Pharma Stock: The Smart Choice for Modern Pharmacies."
- **Speaker Note:** "In conclusion, Pharma Stock is more than just software. It's a tool to modernize local pharmacies, saving them money and keeping their patients safe. Thank you."

---

## Tips for the Presentation

1.  **Screenshots:** Run the app locally (`node server.js`) and take fresh screenshots of the **Add Stock**, **Sell Stock**, and **Dashboard** pages to put in the slides. Real visuals sell the project better than text.
2.  **Keep it Clean:** Don't clutter slides with too much text. Use the "Speaker Notes" to say the details, and keep the slides for headlines and bullet points.
3.  **Focus on FEFO:** Emphasize the **FEFO (First Expired, First Out)** logic. That is your biggest differentiator from a standard calculator or Excel sheet.
