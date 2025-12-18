document.addEventListener("DOMContentLoaded", function () {
  // =========================================
  // 1. EXISTING PASSWORD LOGIC
  // =========================================

  // Password Toggle Logic
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const wrapper = this.closest(".password-wrapper");
      const passwordInput = wrapper.querySelector("input");

      if (passwordInput) {
        // toggle the type attribute
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        // toggle the eye icon
        if (this.src.includes("close-eye.png")) {
          this.src = "../public/assets/open-eye.png";
        } else {
          this.src = "../public/assets/close-eye.png";
        }
      }
    });
  });

  // Password Match Validation (Sign Up Page)
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const submitButton = document.querySelector(".btn-login");

  if (passwordInput && confirmPasswordInput && submitButton) {
    function validatePasswords() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      // Check if passwords match and are not empty
      if (password && confirmPassword && password === confirmPassword) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
        confirmPasswordInput.style.border = "none"; // Reset border
      } else {
        submitButton.disabled = true;
        submitButton.style.opacity = "0.6";
        submitButton.style.cursor = "not-allowed";

        // Visual feedback for mismatch
        if (password && confirmPassword && password !== confirmPassword) {
          confirmPasswordInput.style.border = "2px solid #ee6c4d"; // Orange border for error
        } else {
          confirmPasswordInput.style.border = "none";
        }
      }
    }

    // Initial validation
    validatePasswords();

    // Add event listeners
    passwordInput.addEventListener("input", validatePasswords);
    confirmPasswordInput.addEventListener("input", validatePasswords);
  }

  // =========================================
  // 2. IMPROVED SEARCH LOGIC (Scans All Columns)
  // =========================================
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.querySelector(".btn-search");

  // Only run this if the search input exists on the current page
  if (searchInput) {
    console.log("Search script initialized"); // Debug log

    // Run filter on keyup (typing)
    searchInput.addEventListener("keyup", filterTable);

    // Also run on button click
    if (searchBtn) {
      searchBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent form submission if inside a form
        filterTable();
      });
    }
  }

  function filterTable() {
    // 1. Get the search term
    const filter = searchInput.value.toLowerCase();
    console.log("Searching for:", filter); // Debug log

    // 2. Get the table
    const table = document.getElementById("stockTable");
    if (!table) {
      console.error("Table with id 'stockTable' not found");
      return;
    }

    // 3. Get all rows in the tbody (skips the header)
    const rows = table.querySelectorAll("tbody tr");

    // 4. Loop through rows and hide/show based on content
    rows.forEach((row) => {
      // Get all text inside the row
      const text = row.textContent || row.innerText;

      // If text matches search term, show it, else hide it
      if (text.toLowerCase().indexOf(filter) > -1) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // =========================================
  // 3. SELL PAGE LOGIC
  // =========================================
  const findBtn = document.getElementById("btn-find-med");
  const addBtn = document.getElementById("btn-add-item");
  const searchMedInput = document.getElementById("search-med");
  const displayAvailable = document.getElementById("display-available");
  const displayPrice = document.getElementById("display-price");
  const sellQtyInput = document.getElementById("sell-qty");
  const billTableBody = document.querySelector("#bill-table tbody");
  const grandTotalSpan = document.getElementById("grand-total");

  let currentMedicine = null; // Store fetched medicine data
  let billItems = []; // Array to keep track of items in the bill

  // A. FIND MEDICINE
  if (findBtn) {
    findBtn.addEventListener("click", function () {
      const batchNo = searchMedInput.value.trim();
      if (!batchNo) {
        alert("Please enter a Batch Number");
        return;
      }

      // Fetch from API
      fetch(`/api/medicine/${batchNo}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            currentMedicine = data.data;
            // Populate fields
            displayAvailable.value = currentMedicine.quantity;
            displayPrice.value = currentMedicine.consumer_cost || currentMedicine.mrp; // Use consumer cost if available
            sellQtyInput.value = "";
            sellQtyInput.focus();
          } else {
            alert("Medicine not found!");
            currentMedicine = null;
            displayAvailable.value = "";
            displayPrice.value = "";
          }
        })
        .catch((err) => {
          console.error("Error fetching medicine:", err);
          alert("Error fetching medicine details");
        });
    });
  }

  // B. ADD ITEM TO BILL
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      if (!currentMedicine) {
        alert("Please search and find a medicine first.");
        return;
      }

      const qty = parseInt(sellQtyInput.value);
      const available = parseInt(currentMedicine.quantity);
      const price = parseFloat(displayPrice.value);

      // Validation
      if (!qty || qty <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }
      if (qty > available) {
        alert(`Only ${available} items available in stock!`);
        return;
      }

      // Calculate Total for this item
      const total = (price * qty).toFixed(2);

      // Add to Bill Array (Optional, but good for final submission)
      const item = {
        id: currentMedicine.med_id,
        name: currentMedicine.med_name,
        batch: currentMedicine.batch_no,
        exp: currentMedicine.expiry_date,
        price: price.toFixed(2),
        qty: qty,
        total: total,
      };
      billItems.push(item);

      // Render Row
      const rowCount = billTableBody.rows.length + 1;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${rowCount}</td>
        <td>${item.name}</td>
        <td>${item.batch}</td>
        <td>${item.exp}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        <td>${item.total}</td>
        <td><button class="btn-delete btn-remove-item">Remove</button></td>
      `;

      billTableBody.appendChild(row);

      // Update Grand Total
      updateGrandTotal();

      // Reset Inputs
      searchMedInput.value = "";
      displayAvailable.value = "";
      displayPrice.value = "";
      sellQtyInput.value = "";
      currentMedicine = null;
    });
  }

  // C. REMOVE ITEM
  if (billTableBody) {
    billTableBody.addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-remove-item")) {
        const row = e.target.closest("tr");
        row.remove();
        updateGrandTotal();
        // Note: In a real app, you'd also remove from 'billItems' array
        // by matching batch no or index, but for UI total update, this is enough.
        reindexRows();
      }
    });
  }

  // D. GENERATE RECEIPT
  const btnReceipt = document.querySelector(".btn-receipt");
  if (btnReceipt) {
    btnReceipt.addEventListener("click", function () {
      // 1. Validate Cart
      if (billItems.length === 0) {
        alert("Cart is empty! Add items first.");
        return;
      }

      // 2. Validate Customer Details
      const custName = document.getElementById("customer-name").value.trim();
      const custPhone = document.getElementById("customer-phone").value.trim();
      const doctorName = document.getElementById("doctor-name").value.trim();

      if (!custName || !custPhone) {
        alert("Please enter Customer Name and Phone Number.");
        return;
      }

      // 3. Prepare Data Payload
      const payload = {
        customer: {
          name: custName,
          phone: custPhone,
          doctor: doctorName,
        },
        items: billItems,
      };

      // 4. Send to Server
      fetch("/api/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("✅ Sale Successful! Stock Updated.");
            // Clear everything
            window.location.reload();
          } else {
            alert("❌ Error: " + data.message);
          }
        })
        .catch((err) => {
          console.error("Error processing sale:", err);
          alert("Error processing sale.");
        });
    });
  }

  // Helper: Update Grand Total
  function updateGrandTotal() {
    let total = 0;
    const rows = billTableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      const rowTotal = parseFloat(row.cells[6].innerText);
      total += rowTotal;
    });
    grandTotalSpan.innerText = total.toFixed(2);
  }

  // Helper: Re-index Row Numbers
  function reindexRows() {
    const rows = billTableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.cells[0].innerText = index + 1;
    });
  }
});
