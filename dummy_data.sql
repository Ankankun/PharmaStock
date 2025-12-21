-- ============================================================
-- SMART DUMMY DATA SCRIPT FOR PRESENTATION
-- ============================================================
USE pharmastock;

-- 1. SETUP: Set your email here.
--    Make sure you have created an account with this email first!
SET @user_email = 'ankandas428@gmail.com'; 

-- 2. Get Shop Owner ID
SELECT @owner_id := shop_owner_id FROM shop_owners WHERE email = @user_email;
SELECT CONCAT('Inserting data for User ID: ', @owner_id) AS Status;

-- ============================================================
-- 3. INSERT MEDICINES (Showcasing all statuses)
-- ============================================================
INSERT INTO medicines (
    batch_no, med_name, generic_name, manufacturer_name, manufacture_date, expiry_date, 
    rack_no, unit_type, category, prescription_required, buying_cost, mrp, consumer_cost, 
    quantity, stock_status, supplier_name, supplier_contact, entry_date, shop_owner_id, createdAt, updatedAt
) VALUES 
-- 1. EXPIRED ITEM (To show Red Alert in Dashboard)
('EXP-BATCH-01', 'Expired-Cillin', 'Old Medicine', 'Pharma Corp', DATE_SUB(CURDATE(), INTERVAL 2 YEAR), DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'Z-99', 'Strip', 'Tablet', 0, 10.00, 20.00, 18.00, 50, 'Expired', 'Old Supplier', '1234567890', DATE_SUB(CURDATE(), INTERVAL 1 YEAR), @owner_id, NOW(), NOW()),

-- 2. EXPIRING SOON (To show Yellow Warning in Dashboard)
('SOON-BATCH-02', 'Urgent-Care 500', 'Near Expiry Drug', 'Health Ltd', DATE_SUB(CURDATE(), INTERVAL 1 YEAR), DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'A-10', 'Bottle', 'Syrup', 0, 50.00, 100.00, 90.00, 30, 'Available', 'Fast Supply', '1234567890', DATE_SUB(CURDATE(), INTERVAL 6 MONTH), @owner_id, NOW(), NOW()),

-- 3. LOW STOCK (To show Low Stock Alert)
('LOW-BATCH-03', 'Rare-Pill 10mg', 'Scarce Generic', 'Rare Meds', DATE_SUB(CURDATE(), INTERVAL 6 MONTH), DATE_ADD(CURDATE(), INTERVAL 1 YEAR), 'B-05', 'Strip', 'Tablet', 1, 100.00, 200.00, 190.00, 5, 'Low Stock', 'UniChem', '1234567890', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), @owner_id, NOW(), NOW()),

-- 4. NORMAL STOCK (High Quantity, Good Expiry)
('NORM-BATCH-04', 'Dolo 650', 'Paracetamol', 'Micro Labs', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), DATE_ADD(CURDATE(), INTERVAL 2 YEAR), 'C-01', 'Strip', 'Tablet', 0, 15.00, 30.00, 28.00, 500, 'Available', 'Alpha Pharma', '9876543210', CURDATE(), @owner_id, NOW(), NOW()),

-- 5. PRESCRIPTION REQUIRED (To show Rx Flag)
('RX-BATCH-05', 'Sedative-X', 'Sleep Aid', 'SleepWell', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), DATE_ADD(CURDATE(), INTERVAL 18 MONTH), 'L-02', 'Strip', 'Tablet', 1, 40.00, 80.00, 75.00, 100, 'Available', 'Neuro Meds', '9876543210', CURDATE(), @owner_id, NOW(), NOW());

-- ============================================================
-- 4. INSERT CUSTOMERS
-- ============================================================
INSERT INTO customers (cust_name, cust_phone, cust_email, shop_owner_id, createdAt, updatedAt) VALUES
('Rahul Sharma', '9876543210', 'rahul@example.com', @owner_id, NOW(), NOW()),
('Priya Verma', '9123456789', 'priya@example.com', @owner_id, NOW(), NOW()),
('Amit Singh', '9988776655', 'amit@example.com', @owner_id, NOW(), NOW());

-- ============================================================
-- 5. INSERT SALES (History for Charts/Logs)
-- ============================================================
INSERT INTO sales (
    batch_no, quantity_sold, selling_price, total_amount, doctor_name, sale_date, 
    shop_owner_id, med_id, cust_id, createdAt, updatedAt
) VALUES 
-- Sale 1: Today (Rahul bought Dolo)
(
    'NORM-BATCH-04', 2, 28.00, 56.00, 'Dr. Gupta', NOW(), @owner_id, 
    (SELECT med_id FROM medicines WHERE batch_no = 'NORM-BATCH-04' AND shop_owner_id = @owner_id LIMIT 1),
    (SELECT cust_id FROM customers WHERE cust_phone = '9876543210' AND shop_owner_id = @owner_id LIMIT 1),
    NOW(), NOW()
),
-- Sale 2: Yesterday (Priya bought Low Stock Item)
(
    'LOW-BATCH-03', 1, 190.00, 190.00, 'Dr. House', DATE_SUB(NOW(), INTERVAL 1 DAY), @owner_id, 
    (SELECT med_id FROM medicines WHERE batch_no = 'LOW-BATCH-03' AND shop_owner_id = @owner_id LIMIT 1),
    (SELECT cust_id FROM customers WHERE cust_phone = '9123456789' AND shop_owner_id = @owner_id LIMIT 1),
    NOW(), NOW()
),
-- Sale 3: Last Week (Amit bought Prescription Item)
(
    'RX-BATCH-05', 5, 75.00, 375.00, 'Dr. Strange', DATE_SUB(NOW(), INTERVAL 7 DAY), @owner_id, 
    (SELECT med_id FROM medicines WHERE batch_no = 'RX-BATCH-05' AND shop_owner_id = @owner_id LIMIT 1),
    (SELECT cust_id FROM customers WHERE cust_phone = '9988776655' AND shop_owner_id = @owner_id LIMIT 1),
    NOW(), NOW()
);
