-- Seed Data

-- 1. Customers
INSERT INTO customers (name, email, level) VALUES
('Alice Smith', 'alice@example.com', 'GOLD'),
('Bob Jones', 'bob@test.com', 'REGULAR'),
('Charlie Brown', 'charlie@check.com', 'PLATINUM'),
('David White', 'david@demo.com', 'REGULAR'),
('Eve Black', 'eve@example.com', 'GOLD');

-- 2. Products
INSERT INTO products (name, category, price, stock) VALUES
('Laptop Pro', 'Electronics', 1200.00, 10),
('Wireless Mouse', 'Electronics', 25.50, 50),
('Ergonomic Chair', 'Furniture', 350.00, 5),
('Coffee Mug', 'Home', 12.00, 100),
('Mechanical Keyboard', 'Electronics', 150.00, 20);

-- 3. Orders
INSERT INTO orders (customer_id, order_date, status, total_amount) VALUES
(1, '2023-01-10 10:00:00', 'SHIPPED', 1225.50),
(2, '2023-01-11 14:30:00', 'PENDING', 350.00),
(3, '2023-01-12 09:15:00', 'PAID', 150.00),
(1, '2023-01-15 16:20:00', 'CANCELLED', 0.00),
(4, '2023-01-16 11:00:00', 'SHIPPED', 12.00);

-- 4. Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1200.00), -- Alice bought Laptop
(1, 2, 1, 25.50),   -- And Mouse
(2, 3, 1, 350.00),  -- Bob bought Chair
(3, 5, 1, 150.00),  -- Charlie bought Keyboard
(5, 4, 1, 12.00);   -- David bought Mug

-- 5. Payments
INSERT INTO payments (order_id, amount, method) VALUES
(1, 1225.50, 'CREDIT_CARD'),
(3, 150.00, 'PAYPAL'),
(5, 12.00, 'TRANSFER');

-- 6. Stock Movements
INSERT INTO stock_movements (product_id, change_type, qty_change, reason) VALUES
(1, 'IN', 10, 'Initial Stock'),
(1, 'OUT', -1, 'Order #1'),
(3, 'IN', 5, 'Initial Stock'),
(3, 'OUT', -1, 'Order #2'),
(5, 'IN', 20, 'Vendor Delivery');
