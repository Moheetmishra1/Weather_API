# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


            Weather Dashboard
A React-based app for viewing current weather and a 5-day forecast by city. Users can search for cities, save favorite locations, and manage them with a JSON server. The app also remembers the last searched city using local storage.

Features
City Search: View current weather and 5-day forecast for any city.
Favorites Management: Add/remove favorite cities.
Persistent Data: Favorites are stored using a JSON server.
Last Searched City: Automatically loads the last searched city on startup.
Setup

1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
2. Install Dependencies
bash
Copy code
npm install
3. Obtain an OpenWeatherMap API Key
Visit OpenWeatherMap and sign up for a free account.
After signing in, navigate to the API keys section in your account and generate a new API key.
Once you have the key, create a .env file in the root of the project and add your API key:
env
Copy code
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
*Important - Add the API key to the API file .
4. Start JSON Server
Make sure json-server is installed globally or locally. To install globally, run:
bash
Copy code
npm install -g json-server
Start the JSON server to watch db.json:
bash
Copy code
npx json-server --watch db.json --port 3001
5. Start the React Application
In a new terminal, start the application:

bash
Copy code
npm start
The app will run on http://localhost:3000, and it will connect to the JSON server on http://localhost:3001 for managing favorite cities.