CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_name TEXT,
    price DECIMAL(10,2),
    img_url TEXT
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER REFERENCES products(id),
    qty INTEGER,
    order_date DATE,
    order_time TIME
);


INSERT INTO products(product_name, price, img_url)
VALUES 
('apple', 2.00, 'https://i.ibb.co/qrh9mm4/k8-h-Rbt11o8c-EU-unsplash.jpg'),
('banana', 1.50, 'https://i.ibb.co/Jxq5V0x/rodrigo-dos-reis-Dk-Tu-Gvg-Pot-A-unsplash.jpg'),
('pear', 2.30, 'https://i.ibb.co/jVLLnjG/lovelli-fuad-5lrbb-XC-kx-A-unsplash.jpg'),
('orange', 1.80, 'https://i.ibb.co/yhHtSW3/jen-gunter-A4-BBd-JQu2co-unsplash.jpg');
