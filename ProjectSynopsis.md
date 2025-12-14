# 📄 Project Synopsis: Pharma Stock

**Subtitle:** An Intelligent Inventory Management System with FEFO Logic

## 1. Project Overview

**Pharma Stock** is a web-based pharmacy management application designed to solve the critical issue of medicine wastage due to expiration. Unlike traditional systems that track stock quantity, Pharma Stock tracks **batches** and **expiration dates**, ensuring that chemists sell the medicine expiring soonest rather than the one they purchased _first_.

## 2. Problem Statement

- **Medicine Wastage:** Pharmacies lose significant revenue when medicines expire on the shelf.
- **Inefficient Tracking:** Manual ledgers or simple excel sheets often fail to highlight which specific batch of a medicine (e.g., "Paracetamol") is expiring next.
- **Human Error:** Shop owners may accidentally sell a fresh batch while an older batch sits at the back of the shelf until it expires.

## 3. The Solution

A digital "Smart Assistant" for chemists that:

1.  **Digitizes Inventory:** Tracks stock by Batch Number and Expiration Date.
2.  **Automates FEFO:** Implements **First Expired First Out** logic. When a sale is made, the system automatically deducts stock from the batch expiring earliest.
3.  **Alerts:** Provides visual dashboards for "Expiring Soon" and "Low Stock".

## 4. Unique Selling Point (USP)

The core differentiator is the **FEFO Algorithm**. Most inventory systems use FIFO (First-In-First-Out). Pharma Stock prioritizes **Expiration Date** over Purchase Date.

- _Scenario:_ If Batch A was bought in Jan (Expires Dec) and Batch B was bought in Feb (Expires June), Pharma Stock forces the sale of Batch B first, saving Batch A for later.

## 5. Technical Specifications

- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript.
- **Backend:** Python (Flask Framework).
- **Database:** MySQL (Relational Database Management System).
- **ORM:** SQLAlchemy (For seamless database communication).

## 6. Project Modules

1.  **Authentication Module:** Secure Login/Registration for Shop Owners and Admin verification.
2.  **Inventory Module:** Add Medicines (Master Data) and Batches (Stock Data).
3.  **Sales & Billing Module:** Cart system with auto-applied FEFO logic and Receipt generation.
4.  **Analytics Module:** Dashboard showing daily sales, expiring alerts, and low stock warnings.

## 7. Future Scope

- **Integration with SMS API:** To send automated refill reminders and receipts to customers.
- **AI-Based Demand Prediction:** Analyzing sales patterns to suggest what medicines to order next before stock runs out.
- **AI Medicine Scanner (OCR):** A feature to scan medicine packaging via camera. An AI model identifies the text to auto-fill the "Add Record" form (Name, Batch, Expiry), requiring only a quick human verification for 100% accuracy.
- **Smart Stock History:** The system "remembers" previously added medicines (Manufacturer, Category, Price). When a user types a known medicine name, these details auto-populate, eliminating repetitive manual entry.
