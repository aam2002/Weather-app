# 🌦️ Weather App

The **Weather App** is a simple and intuitive web application that provides real-time weather information for any location worldwide. 🌍☀️🌧️ It offers users current weather conditions, a 7-day forecast, and a graphical representation of temperature trends.

🚀 **Live Demo**: [Click Here to View](https://weather-app-pied-delta-77.vercel.app/)

---

## ✨ Features

✅ **Current Weather Data** – Displays real-time temperature, humidity, wind speed, and atmospheric pressure for a specified location. 🌡️💨🌍  
✅ **7-Day Forecast** – Provides an upcoming week’s weather forecast, including daily highs and lows. 📅📊  
✅ **Temperature Trend Graph** – Visualizes the temperature variations over the next 7 days with a line chart. 📉🌡️  
✅ **Search by Location** – Users can enter any city or country to fetch weather details. 🌎🔍  
✅ **Geolocation Support** – Automatically detects and displays weather for the user’s current location. 📍🛰️

---

## 📁 File Structure

📄 **index.html** – The main HTML file that structures the web application.  
🎨 **style.css** – The CSS file that defines the visual layout and design.  
🛠️ **script.js** – The JavaScript file that fetches and displays weather data dynamically.

---

## ⚙️ How It Works

### 📝 API Configuration

- Uses the **Tomorrow.io API** to fetch weather data.
- Requires an API key for authentication, which should be replaced in the script with a valid key.

### 🎯 User Interaction

- Listens for user input in the search box.
- When the search button is clicked, the entered location is processed to fetch weather data.

### 🔍 Fetching Weather Data

- Sends an API request to **Tomorrow.io** using the provided location.
- Retrieves the weather data, including temperature, humidity, and wind details.
- Handles potential errors such as invalid locations or network issues.

### 🌤️ Displaying Current Weather

- Extracts relevant data from the API response, such as temperature, humidity, and wind speed.
- Dynamically updates the UI to reflect the latest weather information.
- Ensures that the displayed weather conditions are clear and visually structured.

### 📊 Rendering Temperature Chart

- Processes the 7-day forecast data and extracts daily temperature values.
- Uses **Chart.js** to generate a line graph showing temperature trends.
- Updates the graph dynamically based on the fetched weather data.

---

## 🛠️ Technologies Used

🚀 **Frontend**: HTML, CSS, JavaScript  
📡 **API**: Tomorrow.io API  
📊 **Charting**: Chart.js  
💾 **Hosting**: Vercel

---

## 📌 How to Run the Project Locally

1️⃣ Clone the repository:

```sh
git clone https://github.com/aam2002/Weather-app.git
```

2️⃣ Open the project folder:

```sh
cd Weather-app
```

3️⃣ Open `index.html` in a browser.

4️⃣ Enjoy your weather updates! 🌦️✨

---

## 🙌 Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue. 🎉

---

## 📜 License

This project is licensed under the MIT License. 📄

---

🌟 **Developed with ❤️ by [aam2002](https://github.com/aam2002/)** 🌟
