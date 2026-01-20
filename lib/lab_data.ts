export const LAB_INIT_SQL = `
-- Drop tables if exist
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS stock_movements;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- Create tables
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    level TEXT CHECK (level IN ('REGULAR', 'GOLD', 'PLATINUM')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2),
    stock INTEGER DEFAULT 0
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK (status IN ('PENDING', 'PAID', 'SHIPPED', 'CANCELLED')),
    total_amount DECIMAL(12,2) DEFAULT 0.00,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    unit_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed Customers
INSERT INTO customers (name, email, level) VALUES
('Somchai Jai-dee', 'somchai@email.com', 'GOLD'),
('John Doe', 'john@email.com', 'REGULAR'),
('Alice Smith', 'alice@email.com', 'PLATINUM'),
('Bob Brown', 'bob@test.com', 'REGULAR'),
('Charlie Wilson', 'charlie@test.com', 'GOLD');

-- Seed Products
INSERT INTO products (name, category, price, stock) VALUES
('Gaming Laptop', 'Electronics', 45000.00, 10),
('Wireless Mouse', 'Accessories', 1290.00, 50),
('Mechanical Keyboard', 'Accessories', 3500.00, 20),
('Monitor 27"', 'Electronics', 8900.00, 15),
('USB-C Hub', 'Accessories', 990.00, 100);

-- Seed Orders (Some completed, some pending)
INSERT INTO orders (customer_id, order_date, status, total_amount) VALUES
(1, '2024-01-15', 'PAID', 46290.00), -- Somchai bought Laptop + Mouse
(1, '2024-02-01', 'SHIPPED', 3500.00), -- Somchai bought Keyboard
(2, '2024-02-10', 'PENDING', 8900.00), -- John reserved Monitor
(3, '2024-02-14', 'PAID', 99000.00), -- Alice (Rich) bought 2 laptops
(NULL, '2024-01-01', 'CANCELLED', 0.00); -- System test order

-- Seed Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 45000.00),
(1, 2, 1, 1290.00),
(2, 3, 1, 3500.00),
(3, 4, 1, 8900.00),
(4, 1, 2, 45000.00);
`;
