-- ============================================================
-- SMART DUMMY DATA SCRIPT
-- ============================================================
-- 1. REPLACE 'your_login_email@example.com' with your actual email below.
--    This ensures the data is added to YOUR account, not someone else's.
SET @user_email = 'ankandas428@gmail.com'; 

-- 2. Get your Shop Owner ID automatically
SELECT @owner_id := shop_owner_id FROM shop_owners WHERE email = @user_email;

-- Check if ID was found (Optional debug)
SELECT CONCAT('Inserting data for User ID: ', @owner_id) AS Status;

-- ============================================================
-- 3. INSERT MEDICINES (Linked to your ID)
-- ============================================================
INSERT INTO medicines (
    batch_no, med_name, generic_name, manufacturer_name, manufacture_date, expiry_date, 
    rack_no, unit_type, category, prescription_required, buying_cost, mrp, consumer_cost, 
    quantity, stock_status, supplier_name, supplier_contact, entry_date, shop_owner_id, createdAt, updatedAt
) VALUES 
('BATCH001', 'Dolo 650', 'Paracetamol', 'Micro Labs', '2023-05-01', '2026-05-01', 'A-1', 'Strip', 'Tablet', 0, 15.00, 30.00, 28.00, 100, 'Available', 'Alpha Pharma', '9876543210', CURDATE(), @owner_id, NOW(), NOW()),
('BATCH002', 'Azithral 500', 'Azithromycin', 'Alembic', '2023-06-15', '2025-06-15', 'B-2', 'Strip', 'Tablet', 1, 45.00, 120.00, 110.00, 50, 'Available', 'Beta Meds', '9876543211', CURDATE(), @owner_id, NOW(), NOW()),
('BATCH003', 'Pan 40', 'Pantoprazole', 'Alkem', '2023-04-10', '2025-04-10', 'C-1', 'Strip', 'Tablet', 0, 50.00, 150.00, 140.00, 200, 'Available', 'Gamma Distributors', '9876543212', CURDATE(), @owner_id, NOW(), NOW()),
('BATCH004', 'Allegra 120', 'Fexofenadine', 'Sanofi', '2023-08-20', '2026-08-20', 'A-3', 'Strip', 'Tablet', 0, 80.00, 210.00, 200.00, 75, 'Available', 'Alpha Pharma', '9876543210', CURDATE(), @owner_id, NOW(), NOW()),
('BATCH005', 'Augmentin 625', 'Amoxicillin + Clavulanic Acid', 'GSK', '2023-02-28', '2025-02-28', 'B-1', 'Strip', 'Tablet', 1, 120.00, 250.00, 240.00, 40, 'Available', 'Delta Supplies', '9876543213', CURDATE(), @owner_id, NOW(), NOW());

-- ============================================================
-- 4. INSERT CUSTOMERS (Linked to your ID)
-- ============================================================
INSERT INTO customers (cust_name, cust_phone, cust_email, shop_owner_id, createdAt, updatedAt) VALUES
('John Doe', '9876543210', 'john@example.com', @owner_id, NOW(), NOW()),
('Jane Smith', '9123456789', 'jane@example.com', @owner_id, NOW(), NOW()),
('Robert Brown', '9988776655', 'robert@example.com', @owner_id, NOW(), NOW());

-- ============================================================
-- 5. INSERT SALES (Linked to your ID and your Medicines)
-- ============================================================
INSERT INTO sales (
    batch_no, quantity_sold, selling_price, total_amount, doctor_name, sale_date, 
    shop_owner_id, med_id, cust_id, createdAt, updatedAt
) VALUES 
(
    'BATCH001', 2, 30.00, 60.00, 'Dr. Strange', NOW(), @owner_id, 
    (SELECT med_id FROM medicines WHERE batch_no = 'BATCH001' AND shop_owner_id = @owner_id LIMIT 1),
    (SELECT cust_id FROM customers WHERE cust_phone = '9876543210' AND shop_owner_id = @owner_id LIMIT 1),
    NOW(), NOW()
),
(
    'BATCH002', 1, 120.00, 120.00, 'Dr. House', NOW(), @owner_id, 
    (SELECT med_id FROM medicines WHERE batch_no = 'BATCH002' AND shop_owner_id = @owner_id LIMIT 1),
    (SELECT cust_id FROM customers WHERE cust_phone = '9876543210' AND shop_owner_id = @owner_id LIMIT 1),
    NOW(), NOW()
),
(
    'BATCH003', 5, 150.00, 750.00, 'Dr. Who', DATE_SUB(NOW(), INTERVAL 1 DAY), @owner_id, 
    (SELECT med_id FROM medicines WHERE batch_no = 'BATCH003' AND shop_owner_id = @owner_id LIMIT 1),
    (SELECT cust_id FROM customers WHERE cust_phone = '9123456789' AND shop_owner_id = @owner_id LIMIT 1),
    NOW(), NOW()
),
(
    'BATCH004', 2, 210.00, 420.00, 'Dr. Strange', DATE_SUB(NOW(), INTERVAL 5 DAY), @owner_id, 
    (SELECT med_id FROM medicines WHERE batch_no = 'BATCH004' AND shop_owner_id = @owner_id LIMIT 1),
    (SELECT cust_id FROM customers WHERE cust_phone = '9988776655' AND shop_owner_id = @owner_id LIMIT 1),
    NOW(), NOW()
);
