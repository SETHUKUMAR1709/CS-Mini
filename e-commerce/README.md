# 🛒 E-Commerce Web App

A modern, responsive **React**-based e-commerce application that stores user data and cart details in **LocalStorage**.
The app features product listings, a shopping cart, and basic user authentication — all without a backend server.

---

## 🚀 Features

* **Responsive Design** – Works on desktop, tablet, and mobile
* **Product Catalog** – Browse and view product details
* **Shopping Cart** – Add, remove, and update quantities
* **LocalStorage-Based Persistence** – Cart items and user sessions are saved in the browser
* **User Authentication (Local)** – Sign up, log in, and stay signed in using LocalStorage
* **Routing** – Smooth navigation using `react-router-dom`
* **Modern UI** – Clean layout with **FontAwesome** and **Lucide Icons**

---

## 🛠️ Tech Stack

**Frontend:**

* React 19
* React Router DOM
* FontAwesome / Lucide Icons

**Storage & State Management:**

* Browser LocalStorage
* React state hooks

**Testing:**

* React Testing Library
* Jest DOM

---

## 📂 Folder Structure

```
e-commerce/
├── public/                # Static files
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components (Home, Cart, Login, etc.)
│   ├── utils/             # LocalStorage helpers and utility functions
│   ├── App.js             # Main app component
│   └── index.js           # React DOM rendering
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/CS-Mini.git
   cd CS-Mini/e-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the app**

   ```bash
   npm start
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

---

## 🧪 Running Tests

```bash
npm test
```

---


## 📜 License

This project is licensed under the MIT License – free to use and modify.

---

## 🙌 Acknowledgements

* [React](https://reactjs.org/)
* [FontAwesome](https://fontawesome.com/)
* [Lucide Icons](https://lucide.dev/)
