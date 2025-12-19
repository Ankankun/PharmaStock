-- SQL Script to insert 10 dummy medicine records
-- IMPORTANT: Replace '1' in the shop_owner_id column with your actual User ID from the shop_owners table.
-- You can find your ID by running: SELECT shop_owner_id, email FROM shop_owners;

INSERT INTO medicines (
    batch_no, med_name, generic_name, manufacturer_name, manufacture_date, expiry_date, 
    rack_no, unit_type, category, prescription_required, buying_cost, mrp, consumer_cost, 
    quantity, stock_status, supplier_name, supplier_contact, entry_date, shop_owner_id, createdAt, updatedAt
) VALUES 
('BATCH001', 'Dolo 650', 'Paracetamol', 'Micro Labs', '2023-05-01', '2026-05-01', 'A-1', 'Strip', 'Tablet', 0, 15.00, 30.00, 28.00, 100, 'Available', 'Alpha Pharma', '9876543210', CURDATE(), 1, NOW(), NOW()),
('BATCH002', 'Azithral 500', 'Azithromycin', 'Alembic', '2023-06-15', '2025-06-15', 'B-2', 'Strip', 'Tablet', 1, 45.00, 120.00, 110.00, 50, 'Available', 'Beta Meds', '9876543211', CURDATE(), 1, NOW(), NOW()),
('BATCH003', 'Pan 40', 'Pantoprazole', 'Alkem', '2023-04-10', '2025-04-10', 'C-1', 'Strip', 'Tablet', 0, 50.00, 150.00, 140.00, 200, 'Available', 'Gamma Distributors', '9876543212', CURDATE(), 1, NOW(), NOW()),
('BATCH004', 'Allegra 120', 'Fexofenadine', 'Sanofi', '2023-08-20', '2026-08-20', 'A-3', 'Strip', 'Tablet', 0, 80.00, 210.00, 200.00, 75, 'Available', 'Alpha Pharma', '9876543210', CURDATE(), 1, NOW(), NOW()),
('BATCH005', 'Augmentin 625', 'Amoxicillin + Clavulanic Acid', 'GSK', '2023-02-28', '2025-02-28', 'B-1', 'Strip', 'Tablet', 1, 120.00, 250.00, 240.00, 40, 'Available', 'Delta Supplies', '9876543213', CURDATE(), 1, NOW(), NOW()),
('BATCH006', 'Ascoril LS', 'Levosalbutamol + Ambroxol', 'Glenmark', '2023-09-05', '2025-09-05', 'D-1', 'Bottle', 'Syrup', 0, 60.00, 115.00, 110.00, 30, 'Available', 'Beta Meds', '9876543211', CURDATE(), 1, NOW(), NOW()),
('BATCH007', 'Volini Gel', 'Diclofenac', 'Sun Pharma', '2023-01-15', '2026-01-15', 'E-1', 'Tube', 'Gel', 0, 40.00, 85.00, 80.00, 60, 'Available', 'Gamma Distributors', '9876543212', CURDATE(), 1, NOW(), NOW()),
('BATCH008', 'Shelcal 500', 'Calcium + Vitamin D3', 'Torrent', '2023-07-01', '2025-07-01', 'C-2', 'Strip', 'Tablet', 0, 70.00, 130.00, 125.00, 150, 'Available', 'Delta Supplies', '9876543213', CURDATE(), 1, NOW(), NOW()),
('BATCH009', 'Becosules', 'B-Complex + Vitamin C', 'Pfizer', '2023-03-10', '2025-03-10', 'A-2', 'Strip', 'Capsule', 0, 25.00, 50.00, 45.00, 300, 'Available', 'Alpha Pharma', '9876543210', CURDATE(), 1, NOW(), NOW()),
('BATCH010', 'Otrivin', 'Xylometazoline', 'GSK', '2023-10-01', '2026-10-01', 'F-1', 'Bottle', 'Drops', 0, 35.00, 60.00, 58.00, 80, 'Available', 'Beta Meds', '9876543211', CURDATE(), 1, NOW(), NOW());

-- 5 Additional dummy records for Shop Owner ID 3
INSERT INTO medicines (
    batch_no, med_name, generic_name, manufacturer_name, manufacture_date, expiry_date, 
    rack_no, unit_type, category, prescription_required, buying_cost, mrp, consumer_cost, 
    quantity, stock_status, supplier_name, supplier_contact, entry_date, shop_owner_id, createdAt, updatedAt
) VALUES 
('BATCH011', 'Combiflam', 'Ibuprofen + Paracetamol', 'Sanofi', '2023-11-01', '2025-11-01', 'G-1', 'Strip', 'Tablet', 0, 20.00, 45.00, 40.00, 120, 'Available', 'Zeta Pharma', '9876543214', CURDATE(), 3, NOW(), NOW()),
('BATCH012', 'Cetzine', 'Cetirizine', 'Dr. Reddys', '2023-12-10', '2025-12-10', 'H-2', 'Strip', 'Tablet', 0, 18.00, 35.00, 32.00, 200, 'Available', 'Zeta Pharma', '9876543214', CURDATE(), 3, NOW(), NOW()),
('BATCH013', 'Digene', 'Antacid', 'Abbott', '2023-09-15', '2026-09-15', 'I-1', 'Bottle', 'Syrup', 0, 85.00, 160.00, 150.00, 45, 'Available', 'Omega Meds', '9876543215', CURDATE(), 3, NOW(), NOW()),
('BATCH014', 'Omez 20', 'Omeprazole', 'Dr. Reddys', '2023-08-05', '2025-08-05', 'J-3', 'Strip', 'Capsule', 1, 30.00, 65.00, 60.00, 90, 'Available', 'Omega Meds', '9876543215', CURDATE(), 3, NOW(), NOW()),
('BATCH015', 'Vicks Action 500', 'Paracetamol + Phenylephrine', 'P&G', '2024-01-01', '2026-01-01', 'K-1', 'Strip', 'Tablet', 0, 25.00, 55.00, 50.00, 150, 'Available', 'Zeta Pharma', '9876543214', CURDATE(), 3, NOW(), NOW());
