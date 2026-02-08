CREATE DATABASE IF NOT EXISTS employee_help_sys;
USE employee_help_sys;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- In production, use hashed passwords
    role ENUM('EMPLOYEE', 'ADMIN') NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category VARCHAR(50) NOT NULL, -- Password, Email, Network, Hardware
    priority VARCHAR(20) NOT NULL, -- Low, Medium, High
    description TEXT,
    status VARCHAR(20) DEFAULT 'OPEN', -- Open, In Progress, Resolved, Closed
    resolution_comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert Default Admin
INSERT INTO users (username, password, role, full_name, email) 
VALUES ('admin', 'admin123', 'ADMIN', 'System Administrator', 'admin@helpdesk.com');

-- Insert Sample Employee
INSERT INTO users (username, password, role, full_name, email) 
VALUES ('emp01', 'password123', 'EMPLOYEE', 'John Doe', 'john.doe@helpdesk.com');
