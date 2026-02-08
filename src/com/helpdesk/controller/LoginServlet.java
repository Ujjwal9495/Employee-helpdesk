package com.helpdesk.controller;

import com.helpdesk.dao.DBConnection;
import com.helpdesk.model.User;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String u = request.getParameter("username");
        String p = request.getParameter("password");

        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                response.sendRedirect("index.html?error=Database Connection Failed");
                return;
            }

            String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, u);
            ps.setString(2, p);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                User user = new User();
                user.setUserId(rs.getInt("user_id"));
                user.setUsername(rs.getString("username"));
                user.setRole(rs.getString("role"));
                user.setFullName(rs.getString("full_name"));

                HttpSession session = request.getSession();
                session.setAttribute("user", user);

                if ("ADMIN".equals(user.getRole())) {
                    response.sendRedirect("dashboard_admin.html");
                } else {
                    response.sendRedirect("dashboard_employee.html");
                }
            } else {
                response.sendRedirect("index.html?error=Invalid Credentials");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("index.html?error=Server Error");
        }
    }
}
