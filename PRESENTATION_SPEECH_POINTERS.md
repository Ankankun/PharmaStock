# Pharma Stock Presentation Speech & Q&A Guide

**Time Limit:** 15 Minutes Presentation + 5 Minutes Q&A
**Team Members:** Ankan, Soumik, Soumadeep, Tanima, Abir

---

## 🎤 Role Allocation & Slide Breakdown

| Member        | Role                | Focus Area                                      | Slides Assigned         |
| :------------ | :------------------ | :---------------------------------------------- | :---------------------- |
| **Ankan**     | Team Lead           | Intro, Problem, Solution, FEFO, Conclusion      | 1-7, Conclusion         |
| **Soumik**    | Backend Dev         | Methodology, Architecture, Security             | 8, 9, 10                |
| **Soumadeep** | UI/UX Design        | User Journey (Visuals & Layouts)                | 11, 12, 13, 14 (Shared) |
| **Tanima**    | Database Engineer   | User Journey (Data), DB Design, Connectivity    | 11-14 (Shared), 15, 16  |
| **Abir**      | Frontend Logic (JS) | User Journey (Scripting), Future Scope, Scripts | 11-14 (Shared), Future  |

---

## 🗣️ Speech Pointers

### 1. Ankan (The Start)

_Covers Slides 1-7_

- **Intro & Problem:**
  - "Hi, I'm Ankan. We are Team Pharma Stock."
  - "We solved the problem of medicine wastage. Old systems track quantity; we track **expiry**."
- **Solution & FEFO:**
  - "Our USP is **FEFO (First Expired, First Out)**. We sell the oldest stock first to save money."
- **Transition:**
  - "Now, Soumik will explain the technical backbone of our system."

### 2. Soumik (The Backend Architecture)

_Covers Slides 8-10_

- **Slide 8: Methodology (MVC)**
  - "We used the **MVC (Model-View-Controller)** pattern. This keeps our code organized: Data (Model), UI (View), and Logic (Controller) are separate."
- **Slide 9: Architecture**
  - "Our system runs on a 3-tier architecture: **Browser**, **Node.js Server**, and **MySQL Database**."
- **Slide 10: Security & Multi-Tenancy**
  - "Security is critical. We use **Bcrypt** for password hashing and **Sessions** to keep user data isolated. Shop A cannot see Shop B's stock."
  - "Now, we will walk you through the User Journey."

### 3. The User Journey (Trio: Soumadeep, Tanima, Abir)

_Covers Slides 11-14 (Inventory, Dashboard, Sell, History)_

**Slide 11: Adding Stock**

- **Soumadeep (UI):** "I designed the 'Add Stock' page to be clean. You enter Batch ID and Rack Number here."
- **Tanima (DB):** "When saved, this data goes into the `Medicines` table, linked to the `ShopOwner` ID."
- **Abir (Logic):** "My script validates the date format before submission to prevent errors."

**Slide 12: The Dashboard**

- **Soumadeep (UI):** "This is the main view. I used Red alerts for expired items and Yellow for low stock."
- **Tanima (DB):** "This view queries the database for all items where `expiry_date` is near."
- **Abir (Logic):** "The frontend logic calculates the days remaining and changes the row color dynamically."

**Slide 13: The Sale (Point of Sale)**

- **Soumadeep (UI):** "The Sell Page is built for speed. Just type the Batch Number."
- **Tanima (DB):** "This is a complex transaction. It updates the `Medicines` table (subtracts stock) and inserts into `Sales` and `Customers` tables simultaneously."
- **Abir (Logic):** "I wrote the auto-calculation script. It fetches the price instantly and totals the bill without reloading."

**Slide 14: History**

- **Soumadeep (UI):** "Here we see past transactions."
- **Tanima (DB):** "This pulls data from the `Sales` table joined with `Customers`."

### 4. Tanima (Database Deep Dive)

_Covers Slides 15-16_

- **Slide 15: Database Design**
  - "Here is our full Schema. We have normalized tables for Shop Owners, Medicines, and Sales to ensure data integrity."
- **Slide 16: Database Connectivity**
  - "This diagram shows how the pages we just saw connect to these tables. The 'Sell Page' touches almost every table in the database."

### 5. Abir (Scripting & Future)

_Covers Future Scope_

- **Scripting Challenges:**
  - "One challenge was making the bill calculation instant. I used client-side JavaScript to make it feel real-time."
- **Future Scope:**
  - "In the future, we plan to add **AI OCR** to scan medicine strips and **SMS alerts** for patients."

### 6. Ankan (Conclusion)

_Covers Conclusion Slide_

- **Summary:**
  - "To conclude: Pharma Stock saves money, organizes inventory, and ensures patient safety through FEFO."
  - "Thank you!"

---

## ❓ Simple Q&A Guide

### For Tanima (Database)

- **Q: Why MySQL?**
  - **A:** "Because our data is related. Sales need to link to Customers. SQL is best for this kind of structured data."
- **Q: What is normalization?**
  - **A:** "It means organizing data so we don't repeat ourselves. We store the Shop Owner ID instead of writing their name everywhere."

### For Soumik (Security)

- **Q: How do you protect passwords?**
  - **A:** "We use **hashing**. It turns the password into a random string of characters that cannot be reversed."
- **Q: Can one user see another user's data?**
  - **A:** "No. Every query includes the `shop_owner_id`, so you only get data that belongs to you."

### For Soumadeep (Design)

- **Q: Is it mobile friendly?**
  - **A:** "Yes, we used responsive CSS so it works on phones and tablets too."
- **Q: Why use Red and Yellow colors?**
  - **A:** "They are universal warning colors. We want the chemist to notice expired items immediately."

### For Abir (Frontend Logic)

- **Q: How does the total calculate so fast?**
  - **A:** "It happens in the browser using JavaScript. We don't wait for the server to calculate it, so it's instant."
- **Q: How does the search work?**
  - **A:** "I wrote a script that hides the table rows that don't match the text entered in the search input."

### For Ankan (System)

- **Q: What is FEFO again?**
  - **A:** "First Expired, First Out. We sell the item that expires soonest, not the one that arrived first."
- **Q: What happens if two people buy the same item?**
  - **A:** "The database handles this. It processes one sale at a time to prevent selling stock we don't have."
