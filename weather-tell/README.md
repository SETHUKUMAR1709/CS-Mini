# ⛅ Weather Tell

A responsive weather forecast web application built with **React** and styled using **Semantic UI**.
The app fetches real-time weather data from the **Open-Meteo API** based on the user’s location or a selected location.

---

## 🚀 Features

* **Current Weather** – Shows temperature, wind speed/direction, sunrise, sunset, and more
* **Multi-Day Forecast** – Displays max/min temperatures, precipitation, and weather codes for multiple days
* **Day/Night Mode** – Detects current time to adjust theme accordingly
* **Location Support** – Uses latitude & longitude to fetch accurate forecasts
* **Responsive UI** – Styled with **Semantic UI React** for a clean, mobile-friendly design

---

## 🛠️ Tech Stack

**Frontend:**

* React 19
* Semantic UI React & Semantic UI CSS

**API & Networking:**

* Axios
* [Open-Meteo API](https://open-meteo.com/)

**Testing:**

* React Testing Library
* Jest DOM

---

## 📂 Folder Structure

```
weather-tell/
├── public/                # Static files
├── src/
│   ├── components/        # UI components
│   ├── utils/             # API calls and helper functions
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
   cd CS-Mini/weather-tell
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

## 🌤️ API Configuration

This project uses the **Open-Meteo API**, which is free and does not require an API key.
The core API call looks like:

```javascript
const URL = 'https://api.open-meteo.com/v1/forecast';

Axios.get(URL, {
  params: {
    latitude,
    longitude,
    current_weather: true,
    timeZone: 'Asia/Kolkata',
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'weathercode',
      'precipitation_sum',
      'windspeed_10m_max',
      'winddirection_10m_dominant',
      'sunrise',
      'sunset'
    ],
    start_date: 'YYYY-MM-DD',
    end_date: 'YYYY-MM-DD'
  }
});
```

---

## 📜 License

This project is licensed under the MIT License – free to use and modify.

---

## 🙌 Acknowledgements

* [React](https://reactjs.org/)
* [Semantic UI React](https://react.semantic-ui.com/)
* [Open-Meteo API](https://open-meteo.com/)
