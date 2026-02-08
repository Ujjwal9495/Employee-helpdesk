package com.helpdesk.controller;

import com.helpdesk.dao.DBConnection;
import com.helpdesk.model.User;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/createTicket")
public class TicketServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false); // Don't create new session if none exists
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("index.html?error=Session Expired");
            return;
        }

        User user = (User) session.getAttribute("user");

        String category = request.getParameter("category");
        String priority = request.getParameter("priority");
        String description = request.getParameter("description");

        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                response.sendRedirect("dashboard_employee.html?error=Database Unavailable");
                return;
            }

            String sql = "INSERT INTO tickets (user_id, category, priority, description) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, user.getUserId());
            ps.setString(2, category);
            ps.setString(3, priority);
            ps.setString(4, description);

            ps.executeUpdate();
            response.sendRedirect("dashboard_employee.html?msg=Ticket Created Successfully");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("dashboard_employee.html?error=Failed to create ticket");
        }
    }
}
