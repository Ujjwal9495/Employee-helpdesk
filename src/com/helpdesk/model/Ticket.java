package com.helpdesk.model;

import java.sql.Timestamp;

public class Ticket {
    private int ticketId;
    private int userId;
    private String category;
    private String priority;
    private String description;
    private String status;
    private String resolutionComments;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // Helper for displaying user name (join result)
    private String raisedBy;

    public Ticket() {}

    public Ticket(int ticketId, int userId, String category, String priority, String description, String status) {
        this.ticketId = ticketId;
        this.userId = userId;
        this.category = category;
        this.priority = priority;
        this.description = description;
        this.status = status;
    }

    // Getters and Setters
    public int getTicketId() { return ticketId; }
    public void setTicketId(int ticketId) { this.ticketId = ticketId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getResolutionComments() { return resolutionComments; }
    public void setResolutionComments(String resolutionComments) { this.resolutionComments = resolutionComments; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    public String getRaisedBy() { return raisedBy; }
    public void setRaisedBy(String raisedBy) { this.raisedBy = raisedBy; }
}
