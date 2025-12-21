# Pharma Stock Presentation Speech & Q&A Guide

**Time Limit:** 15 Minutes Presentation + 5 Minutes Q&A
**Team Members:** Ankan, Tanima, Soumadeep, Soumik, Abir

---

## 🎤 Role Allocation & Slide Breakdown

| Member        | Role                     | Focus Area                                  | Slides Assigned          |
| :------------ | :----------------------- | :------------------------------------------ | :----------------------- |
| **Ankan**     | Team Lead, System Design | Intro, Problem/Solution, Architecture, FEFO | 1, 2, 3, 4, 5, 6, 15, 16 |
| **Tanima**    | Database Engineer        | Database Tables, Relationships, Data Flow   | 7, 8                     |
| **Soumik**    | Security & Auth          | Login Security, Tech Stack                  | 9, 14                    |
| **Soumadeep** | UI/UX Design             | User Journey (Visuals & Layouts)            | 10, 11, 12, 13 (Shared)  |
| **Abir**      | Frontend Logic (JS)      | User Journey (Functionality & Scripting)    | 10, 11, 12, 13 (Shared)  |

---

## 🗣️ Speech Pointers (Simplified)

### 1. Ankan (The Big Picture)

- **Slide 1: Title**
  - "Hi everyone, we are Team Pharma Stock. I'm Ankan, and this is my team: Tanima, Soumadeep, Soumik, and Abir."
  - "We built a Smart Pharmacy System to stop medicine wastage."
- **Slide 2: The Problem**
  - "Pharmacies lose money because medicines expire on the shelf. Old systems track _how many_ pills you have, but not _when_ they expire."
- **Slide 3: The Solution**
  - "Our solution tracks the **Batch Number** and **Expiry Date**. It's like a smart assistant that tells the chemist what to sell."
- **Slide 4: FEFO Logic (Important!)**
  - "The most important part is **FEFO: First Expired, First Out**."
  - "Unlike grocery stores that sell what came in first (FIFO), we sell what expires first. This saves money."
- **Slide 5 & 6: Architecture & MVC**
  - "We used a standard 3-part design: Browser, Server (Node.js), and Database (MySQL). We organized our code using MVC to keep it clean."
  - _"Now, Tanima will explain our data."_

### 2. Tanima (The Data)

- **Slide 7: Database Design**
  - "I designed the database using **MySQL**. It's structured and organized."
  - "We have tables for **Shop Owners**, **Medicines**, **Customers**, and **Sales**."
  - "Everything is linked. For example, every Medicine belongs to a specific Shop Owner."
- **Slide 8: Data Flow**
  - "This diagram shows how data moves. When you sell a medicine, the system updates the Stock table and adds a record to the Sales table at the same time."
  - _"Next, Soumik will talk about security."_

### 3. Soumik (Security & Tech)

- **Slide 9: Security**
  - "Security is key. We don't want Shop A to see Shop B's inventory."
  - "I used **Bcrypt** to encrypt passwords. Even if someone hacks the database, they can't read the passwords."
  - "We also use **Sessions** to make sure you must be logged in to see the dashboard."
- **Slide 14: Tech Stack**
  - "We used modern tools: **Node.js** for the backend, **MySQL** for the database, and **EJS** for the frontend pages."
  - _"Now, Soumadeep and Abir will show you the User Journey."_

### 4. Soumadeep & Abir (The User Journey - Tag Team)

_(Soumadeep covers the Look/Feel, Abir covers the Logic/Code)_

- **Slide 10: Adding Stock**
  - **Soumadeep:** "I designed the 'Add Stock' page. It's simple and clean. I made sure there are fields for Batch Number and Rack Number so the inventory is organized."
  - **Abir:** "And I added the logic. When you click 'Add', my script checks if the data is valid before sending it to the server."
- **Slide 11: The Dashboard**
  - **Soumadeep:** "This is the main dashboard. I used colors to make it easy to read—Red for danger, Green for safe."
  - **Abir:** "My code runs in the background here. It checks today's date against the expiry date. If it's expired, it automatically turns the row Red."
- **Slide 12: Selling (The Main Feature)**
  - **Soumadeep:** "This is the Sell Page. I designed it to be fast because shops are busy. You just type the Batch Number."
  - **Abir:** "Exactly. When you type the batch, my script instantly fetches the price and expiry date. It calculates the total bill automatically without reloading the page."
- **Slide 13: History**
  - **Soumadeep:** "Finally, we have the History page. It shows a clear list of all past customers."
  - **Abir:** "This data comes from the database, helping the shop owner track their daily sales."
  - _"Back to Ankan for the conclusion."_

### 5. Ankan (Conclusion)

- **Slide 15: Future Plans**
  - "In the future, we want to add AI scanning so you can just take a photo of the medicine strip to add it."
- **Slide 16: Summary**
  - "To sum up: Pharma Stock saves money and keeps patients safe. Thank you!"

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
