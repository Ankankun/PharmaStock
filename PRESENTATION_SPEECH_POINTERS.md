# Pharma Stock Presentation Speech & Q&A Guide

**Time Limit:** 15 Minutes Presentation + 5 Minutes Q&A
**Team Members:** Ankan, Tanima, Soumadeep, Soumik, Abir

---

## 🎤 Role Allocation & Slide Breakdown

| Member        | Role                              | Focus Area                                     | Slides Assigned    |
| :------------ | :-------------------------------- | :--------------------------------------------- | :----------------- |
| **Ankan**     | Team Lead, System Design, Routing | Architecture, MVC, Core Logic (FEFO), Roadmap  | 1, 4, 5, 6, 15, 16 |
| **Soumadeep** | UI/UX Design, Basic Frontend      | Problem, Solution, Visual Layouts              | 2, 3, 10           |
| **Tanima**    | Database Engineer                 | Schema, Relationships, Data Flow               | 7, 8               |
| **Soumik**    | Security & Auth                   | Login/Signup, Encryption, Sessions, Tech Stack | 9, 14              |
| **Abir**      | Frontend Scripting (JS)           | Interactivity, Calculations, Dynamic Behavior  | 11, 12, 13         |

---

## 🗣️ Speech Pointers by Member

### 1. Ankan (Introduction & System Architecture)

- **Slide 1: Title Slide**
  - "Good morning everyone. We are Team Pharma Stock. I am Ankan, and along with Tanima, Soumadeep, Soumik, and Abir, we have built a Smart Pharmacy Management System."
  - "Our goal is simple: Stop Wastage, Prioritize Safety."
- _(Hand over to Soumadeep for Context)_
- _(Take back control after Slide 3)_
- **Slide 4: The Core Innovation (FEFO)**
  - "As the System Architect, I want to highlight our core logic. Unlike standard retail which uses FIFO, we implemented **FEFO (First Expired, First Out)**."
  - "This logic is handled in our backend routing to ensure the oldest medicine is sold first."
- **Slide 5: System Architecture**
  - "We used a 3-tier architecture. The browser is the client, Node.js is our application server, and MySQL is our data layer."
- **Slide 6: Methodology (MVC)**
  - "I structured the project using the **MVC Pattern**. This separates our Data (Models), UI (Views), and Logic (Controllers/Routes), making the code clean and scalable."
- _(Hand over to Tanima)_

### 2. Soumadeep (The Problem & UI Design)

- **Slide 2: The Problem**
  - "In our research, we found that pharmacies lose money because they can't track _expiry dates_ easily on paper or Excel."
  - "It's a design flaw in current systems—they track quantity, not quality."
- **Slide 3: The Solution**
  - "We designed Pharma Stock to be visual and intuitive. It's a digital assistant that tracks Batch Numbers specifically."
- **Slide 10: User Journey - Inventory (Add Stock)**
  - "I designed the 'Add Stock' interface to be clean but comprehensive. It forces the user to enter the Batch No and Rack No, ensuring the data is structured right from the start."
- _(Hand over to Ankan)_

### 3. Tanima (Database Design)

- **Slide 7: Database Design**
  - "I was responsible for the Database Design. We used **MySQL** with **Sequelize ORM**."
  - "The database is fully normalized. We have separate tables for `ShopOwners`, `Medicines`, `Customers`, and `Sales`."
  - "We used One-to-Many relationships: One Shop Owner has many Medicines."
- **Slide 8: Data Flow**
  - "Here you can see how data flows. When a user logs in, they access the `ShopOwner` table. When they sell, we update `Medicines`, create a `Sale` record, and link it to a `Customer` simultaneously."
- _(Hand over to Soumik)_

### 4. Soumik (Security & Authentication)

- **Slide 9: Security & Multi-Tenancy**
  - "My focus was on Security and Authentication. We didn't want Shop A to see Shop B's stock."
  - "I implemented **Bcrypt** to hash passwords—so even we as developers can't see user passwords."
  - "We use **Express-Sessions** to maintain a secure login state. If you try to access the dashboard without logging in, my middleware will kick you out."
- **Slide 14: Technology Stack**
  - "Our stack is built for scale: Node.js for the backend, MySQL for data integrity, and EJS for server-side rendering."
- _(Hand over to Abir)_

### 5. Abir (Frontend Logic & Interactivity)

- **Slide 11: The Dashboard (Logic)**
  - "I handled the frontend scripting (`script.js`). On the dashboard, my scripts automatically check dates."
  - "If a medicine is expired, the row turns red. If it's expiring soon, it turns yellow. This gives instant visual feedback."
- **Slide 12: The Sale (Dynamic Billing)**
  - "The Sell Page is where the heavy lifting happens. I wrote the JavaScript to fetch medicine details via API when you type a Batch Number."
  - "It calculates the total price dynamically in the browser before sending the data to the server."
- **Slide 13: Insights**
  - "We also track history. The system logs every sale so the shop owner can see exactly what happened yesterday or last month."
- _(Hand over to Ankan for Conclusion)_

### 6. Ankan (Conclusion)

- **Slide 15: Roadmap**
  - "Looking ahead, we plan to add AI OCR scanning and SMS integration."
- **Slide 16: Summary**
  - "To conclude, Pharma Stock saves money, time, and lives. Thank you."

---

## ❓ Probable Q&A Session (By Role)

### For Tanima (Database)

- **Q:** Why did you choose MySQL (SQL) over MongoDB (NoSQL)?
  - **A:** "Pharmacy data is highly structured and relational (e.g., Sales must link to Customers and Medicines). SQL ensures data integrity and strict relationships, which is safer for financial/inventory data."
- **Q:** What is normalization?
  - **A:** "It's the process of organizing data to reduce redundancy. For example, we don't store the Shop Owner's name in every Sale record; we just store their ID."

### For Soumik (Security)

- **Q:** How does Bcrypt work?
  - **A:** "Bcrypt adds a random 'salt' to the password and hashes it multiple times. This makes it impossible to reverse-engineer the password, protecting users even if the database is leaked."
- **Q:** What happens if I close the browser? Does the session stay?
  - **A:** "It depends on the cookie settings, but currently, the session is destroyed on logout or timeout to ensure security on shared computers."

### For Abir (Frontend Scripting)

- **Q:** How do you calculate the total bill on the client side?
  - **A:** "I use Event Listeners in JavaScript. When the quantity changes, the script multiplies it by the unit price and updates the 'Total' field in the DOM instantly."
- **Q:** How does the search bar work without reloading the page?
  - **A:** "I used JavaScript to filter the table rows. It hides rows that don't match the text entered in the search input."

### For Soumadeep (Design)

- **Q:** Is the design responsive?
  - **A:** "Yes, we used CSS media queries (or Bootstrap) to ensure the layout adjusts for mobile screens, tablets, and desktops."
- **Q:** Why did you choose this color scheme?
  - **A:** "We used clean, medical colors (Blues/Whites) for trust, and used Red/Yellow specifically for alerts (Expiry/Low Stock) to grab attention immediately."

### For Ankan (System/Backend)

- **Q:** What is the advantage of the MVC pattern?
  - **A:** "It allows us to work in parallel. Tanima worked on Models, Soumadeep on Views, and I worked on Controllers without conflicting with each other. It also makes debugging easier."
- **Q:** How do you handle two people buying the last item at the same time?
  - **A:** "We use Database Transactions in Sequelize. If two requests come in, the database locks the row, processes one, and the second one will fail or see 'Out of Stock'."
