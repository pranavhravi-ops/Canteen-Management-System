-- Schema for the Flask Canteen Management System
-- Connect to the existing `canteen` database before running this script.
-- This creates tables only; it does not delete existing data.

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0)
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    feedback TEXT NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- The analytics endpoint joins orders.name to food.name and reads food.category.
CREATE TABLE IF NOT EXISTS food (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL
);

-- Optional starter categories/items for the category-sales dashboard.
-- Add or adjust menu items to match the names used by your frontend.
INSERT INTO food (name, category) VALUES
    ('Dosa', 'South Indian'),
    ('Idli', 'South Indian'),
    ('Samosa', 'Snacks'),
    ('Burger', 'Fast Food'),
    ('Pizza', 'Fast Food'),
    ('Pasta', 'Italian'),
    ('Momos', 'Snacks')
ON CONFLICT (name) DO NOTHING;
