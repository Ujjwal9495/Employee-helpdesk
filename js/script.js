/* 
 * Employee Help Desk System - Client-Side Logic 
 * (Includes robust error handling and sessionStorage/localStorage fallback)
 */

// --- Data Models (Simulation) ---
const USERS = {
    'admin': { role: 'ADMIN', name: 'System Administrator' },
    'emp01': { role: 'EMPLOYEE', name: 'John Doe', fullName: 'Ujjwal (Employee)' },
    'emp02': { role: 'EMPLOYEE', name: 'Jane Smith', fullName: 'Employee 02' }
};

// --- Initialization ---
// Attempt to initialize immediately if DOM already loaded, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    console.log("App Initializing...");
    const path = window.location.pathname.toLowerCase();

    try {
        if (path.includes('dashboard_employee.html')) {
            console.log("Detecting Employee Dashboard");
            initEmployeeDashboard();
        } else if (path.includes('dashboard_admin.html')) {
            console.log("Detecting Admin Dashboard");
            initAdminDashboard();
        } else {
            console.log("Detecting Login/Home Page");
            // Optional: Clear session on login page load if needed
            // localStorage.removeItem('helpdesk_session'); 
        }
    } catch (e) {
        console.error("Initialization Error:", e);
        alert("An error occurred while initializing the application: " + e.message);
    }
}

// --- Auth Handling ---
function handleLogin(e) {
    e.preventDefault();
    const uInput = document.getElementById('username');
    const pInput = document.getElementById('password');

    if (!uInput || !pInput) {
        alert("Error: Login form fields not found!");
        return;
    }

    const u = uInput.value.trim();
    const p = pInput.value.trim();

    console.log(`Attempting login for user: ${u}`);

    if (u === 'admin' && p === 'admin123') {
        createSession(u, 'ADMIN');
        window.location.href = 'dashboard_admin.html';
    } else if ((u === 'emp01' && p === 'password123') || (u === 'emp02' && p === 'password123')) {
        createSession(u, 'EMPLOYEE');
        window.location.href = 'dashboard_employee.html';
    } else {
        alert('Invalid Username or Password. \n\nTry:\nEmployee: emp01 / password123\nAdmin: admin / admin123');
    }
}

function createSession(username, role) {
    const session = {
        username: username,
        role: role,
        name: USERS[username] ? USERS[username].name : username,
        loginTime: new Date().toISOString()
    };
    try {
        localStorage.setItem('helpdesk_session', JSON.stringify(session));
        console.log("Session created:", session);
    } catch (e) {
        alert("Error saving session. Please ensure cookies/local storage are enabled.");
    }
}

function getSession() {
    try {
        const s = localStorage.getItem('helpdesk_session');
        return s ? JSON.parse(s) : null;
    } catch (e) {
        console.error("Error retrieving session", e);
        return null;
    }
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem('helpdesk_session');
        window.location.href = 'index.html';
    }
}

function checkAuth(requiredRole) {
    const session = getSession();
    if (!session) {
        console.warn("No active session found. Redirecting to login.");
        window.location.href = 'index.html';
        return null;
    }
    if (requiredRole && session.role !== requiredRole) {
        console.warn(`Role mismatch. Required: ${requiredRole}, Found: ${session.role}`);
        alert('Unauthorized Access: You do not have permission to view this page.');
        window.location.href = 'index.html';
        return null;
    }
    return session;
}

// --- Ticket Management (Simulation) ---

function getTickets() {
    try {
        const tickets = localStorage.getItem('helpdesk_tickets');
        return tickets ? JSON.parse(tickets) : [];
    } catch (e) {
        console.error("Error loading tickets", e);
        return [];
    }
}

function saveTickets(tickets) {
    try {
        localStorage.setItem('helpdesk_tickets', JSON.stringify(tickets));
    } catch (e) {
        alert("Error saving ticket data. LocalStorage might be full or disabled.");
    }
}

function handleTicketSubmit(e) {
    e.preventDefault();
    const session = getSession();
    if (!session) {
        alert("Session expired. Please login again.");
        window.location.href = 'index.html';
        return;
    }

    const form = e.target;
    // Robust selector handling using IDs first, falling back to querySelector if needed
    const catInput = form.querySelector('#category') || form.querySelector('select:nth-of-type(1)');
    const priInput = form.querySelector('#priority') || form.querySelector('select:nth-of-type(2)');
    const descInput = form.querySelector('#description') || form.querySelector('textarea');

    if (!catInput || !priInput || !descInput) {
        alert("Error: Form fields could not be identified.");
        return;
    }

    const tickets = getTickets();
    // Generate ID
    const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id || 0)) + 1 : 101;

    const newTicket = {
        id: newId,
        user: session.username,
        name: session.name,
        category: catInput.value,
        priority: priInput.value,
        description: descInput.value,
        status: 'OPEN',
        date: new Date().toISOString().split('T')[0]
    };

    tickets.unshift(newTicket);
    saveTickets(tickets);

    alert("Ticket Submitted Successfully!");
    form.reset();
    renderEmployeeTickets(session.username);
}

// --- Dashboard Logic ---

function initEmployeeDashboard() {
    const session = checkAuth('EMPLOYEE');
    if (!session) return;

    // Try to update Welcome message if element exists
    const welcomeEl = document.querySelector('.site-header p');
    if (welcomeEl) {
        welcomeEl.textContent = `Welcome, ${session.name} (Employee)`;
    }

    renderEmployeeTickets(session.username);

    // Re-bind form event just in case
    const form = document.getElementById('newTicketForm');
    if (form) {
        form.removeEventListener('submit', handleTicketSubmit);
        form.addEventListener('submit', handleTicketSubmit);
    } else {
        console.error("Ticket form not found!");
    }
}

function renderEmployeeTickets(username) {
    const tickets = getTickets();
    const myTickets = tickets.filter(t => t.user === username);
    const tbody = document.getElementById('ticketTableBody') || document.querySelector('.ticket-table tbody');

    if (!tbody) {
        console.error("Ticket table body not found!");
        return;
    }

    if (myTickets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#666;">No tickets found. Raise one above!</td></tr>';
        return;
    }

    tbody.innerHTML = myTickets.map(t => `
        <tr>
            <td>#${t.id}</td>
            <td>${t.category}</td>
            <td>
                <span style="
                    padding: 4px 8px; border-radius: 4px; font-size: 0.8em;
                    background: ${getPriorityColor(t.priority)}; color: white;">
                    ${t.priority}
                </span>
            </td>
            <td>${getStatusBadge(t.status)}</td>
            <td>${t.date}</td>
        </tr>
    `).join('');
}

function initAdminDashboard() {
    const session = checkAuth('ADMIN');
    if (!session) return;

    console.log("Initializing Admin Dashboard for", session.username);
    renderAdminDashboard();
}


// --- Modal Logic ---
function openTicketModal(id) {
    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === id);

    if (!ticket) return;

    document.getElementById('modalTicketId').textContent = `#${ticket.id}`;
    document.getElementById('modalUser').innerHTML = `<strong>${ticket.user}</strong><br><small>${ticket.name}</small>`;
    document.getElementById('modalDate').textContent = ticket.date;
    document.getElementById('modalCategory').textContent = ticket.category;

    const priColor = getPriorityColor(ticket.priority);
    document.getElementById('modalPriority').innerHTML = `<span style="color:${priColor}; font-weight:bold;">${ticket.priority}</span>`;

    document.getElementById('modalStatus').innerHTML = getStatusBadge(ticket.status);
    document.getElementById('modalDescription').textContent = ticket.description; // textContent for safety

    const modal = document.getElementById('ticketModal');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('ticketModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('ticketModal');
    if (event.target == modal) {
        closeModal();
    }
}

function renderAdminDashboard() {
    const tickets = getTickets();
    const tbody = document.getElementById('ticketTableBody') || document.querySelector('.ticket-table tbody');

    // Update Stats
    const open = tickets.filter(t => t.status === 'OPEN').length;
    const inProg = tickets.filter(t => t.status === 'IN_PROGRESS').length;
    const resolved = tickets.filter(t => t.status === 'RESOLVED').length;

    console.log(`Stats: Open=${open}, InProg=${inProg}, Resolved=${resolved}`);

    const statBoxes = document.querySelectorAll('.stat-number');
    if (statBoxes.length >= 3) {
        statBoxes[0].textContent = open;
        statBoxes[1].textContent = inProg;
        statBoxes[2].textContent = resolved;
    }

    if (!tbody) {
        console.error("Admin ticket table body not found!");
        return;
    }

    if (tickets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">No tickets found in the system.</td></tr>';
        return;
    }

    tbody.innerHTML = tickets.map(t => `
        <tr style="cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
            <td onclick="openTicketModal(${t.id})">#${t.id}</td>
            <td onclick="openTicketModal(${t.id})"><strong>${t.user}</strong><br><small style="color:#666">${t.name}</small></td>
            <td onclick="openTicketModal(${t.id})">${t.category}</td>
            <td onclick="openTicketModal(${t.id})">
                <span style="
                    padding: 4px 8px; border-radius: 4px; font-size: 0.8em;
                    background: ${getPriorityColor(t.priority)}; color: white;">
                    ${t.priority}
                </span>
            </td>
            <td onclick="openTicketModal(${t.id})">
                <div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #0277bd; font-weight: 500;">
                    ${t.description}
                </div>
            </td>
            <td onclick="openTicketModal(${t.id})">${getStatusBadge(t.status)}</td>
            <td>
                <button class="action-btn" style="background:#537895; margin-right:5px;" onclick="openTicketModal(${t.id})">View</button>
                ${t.status !== 'RESOLVED' ?
            `<button class="action-btn" onclick="event.stopPropagation(); updateTicketStatus(${t.id}, 'RESOLVED')">Resolve</button>`
            : '<span style="color:var(--primary-color); font-weight:bold; font-size: 0.9em;"><i class="fa fa-check"></i> Done</span>'}
            </td>
        </tr>
    `).join('');
}

function updateTicketStatus(id, newStatus) {
    if (!confirm(`Are you sure you want to resolve Ticket #${id}?`)) return;

    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === id);
    if (ticket) {
        ticket.status = newStatus;
        saveTickets(tickets);
        renderAdminDashboard(); // Refresh UI
        alert(`Ticket #${id} marked as RESOLVED.`);
    } else {
        alert("Error: Ticket not found!");
    }
}

// Helpers
function getPriorityColor(p) {
    const priority = p ? p.toLowerCase() : '';
    if (priority === 'high') return '#e74c3c'; // Red
    if (priority === 'medium') return '#f39c12'; // Orange
    return '#27ae60'; // Green (Low)
}

function getStatusBadge(s) {
    if (s === 'OPEN') return '<span style="color: #27ae60; font-weight: bold; background: #e8f5e9; padding: 4px 8px; border-radius: 4px;">Open</span>';
    if (s === 'RESOLVED') return '<span style="color: #2c3e50; font-weight: bold; background: #eceff1; padding: 4px 8px; border-radius: 4px;">Resolved</span>';
    if (s === 'IN_PROGRESS') return '<span style="color: #e67e22; font-weight: bold; background: #fff3e0; padding: 4px 8px; border-radius: 4px;">In Progress</span>';
    return `<span style="color: #666; font-weight: bold;">${s}</span>`;
}
