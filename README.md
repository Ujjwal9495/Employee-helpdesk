# Employee Help Desk System

## 📌 Project Overview

The **Employee Help Desk System** is a web-based frontend application designed to simplify internal support management within an organization. It allows employees to raise issues or queries and enables admins to view and manage those requests through a structured dashboard.

This project focuses on demonstrating **frontend development skills**, real-world workflow simulation, and live deployment using **GitHub Pages**.

---

## 🎯 Objective

* To provide a centralized platform for employees to submit support-related issues
* To allow admins to view and track employee queries
* To simulate a help desk system using client-side technologies

---

## 🛠️ Technologies Used

### Frontend

* **HTML5** – Page structure and content
* **CSS3** – Styling, layout, and responsiveness
* **JavaScript** – Client-side logic and data handling

### Data Handling

* **Browser localStorage** – Used to store and retrieve employee issues (client-side simulation of a database)

### Tools & Deployment

* **Git & GitHub** – Version control and repository management
* **GitHub Pages** – Hosting and live deployment

---

## ⚙️ How the Project Works

### 1️⃣ Home Page

* Acts as the landing page
* Provides navigation to employee and admin dashboards

### 2️⃣ Employee Dashboard

* Employees can submit their problems or queries using a form
* JavaScript captures the input data
* Submitted issues are stored in the browser’s **localStorage**

### 3️⃣ Admin Dashboard

* Admin can view all submitted employee issues
* Data is fetched from **localStorage** and displayed dynamically

### 4️⃣ Data Flow

```
Employee Dashboard
        ↓
JavaScript captures form data
        ↓
Browser localStorage
        ↓
Admin Dashboard reads and displays data
```



---

## 🌐 Live Demo

🔗 **Live Project URL:**
[https://ujjwal9495.github.io/Employee-helpdesk/](https://ujjwal9495.github.io/Employee-helpdesk/)

---

## 🖼️ Project Screenshots
<img width="1852" height="818" alt="Screenshot 2026-02-08 230828" src="https://github.com/user-attachments/assets/e78ff5f8-249c-48a7-b1cb-f06498b68fd6" />


### 🏠 Home Page

The Home Page acts as the entry point of the application. It provides a clean and user-friendly interface where users can navigate to the Employee Dashboard or Admin Dashboard.

![Employee Help Desk – Home Page](images/home-page.png)

---

### 👨‍💼 Employee Dashboard

This screen allows employees to raise new support tickets by selecting a category, priority, and describing their issue. Below the form, employees can also view their ticket history along with status and priority details.

![Employee Help Desk – Employee Dashboard](images/employee-dashboard.png)

*Note: Make sure both images are added to the `images/` folder in the repository so they render correctly on GitHub.*

*Note: Add the screenshot image to your repository inside an `images/` folder with the name `employee-dashboard.png` so it renders correctly on GitHub.*

---

## ⚠️ Limitations

* This is a **static frontend application**
* Data is stored only in the browser (not shared across devices)
* No backend or real database is used
* No authentication or role-based security

---

## 🚀 Future Enhancements

* Integrate backend using **Node.js / Flask**
* Use a real database such as **MySQL / MongoDB**
* Add authentication and authorization
* Implement ticket status (Open / In Progress / Closed)
* Add notifications and search functionality

---

## 👨‍💻 Author

**Ujjwal Roy**
GitHub: [https://github.com/ujjwal9495](https://github.com/ujjwal9495)

---

## 📄 License

This project is created for learning and demonstration purposes.
