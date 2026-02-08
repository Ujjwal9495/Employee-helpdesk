package com.helpdesk.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/employee_help_sys";
    private static final String USER = "root"; // Default XAMPP/MySQL user
    private static final String PASS = "";     // Default XAMPP/MySQL pass (change as needed)

    public static Connection getConnection() {
        Connection conn = null;
        try {
            // Load Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            // Establish Connection
            conn = DriverManager.getConnection(URL, USER, PASS);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }
}
