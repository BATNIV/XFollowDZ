
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50),
  phone VARCHAR(20),
  balance DECIMAL(10,2) DEFAULT 0.00
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  service_name VARCHAR(100),
  quantity INT,
  total DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE topup (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  order_id VARCHAR(20),
  amount DECIMAL(10,2),
  method VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending'
);
