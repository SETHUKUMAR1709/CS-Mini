import './App.css';
import WeatherPage from './pages/weatherPage'; 
import { isDay } from './components/weatherapi';
function App() {
  return (
  <div className={`App ${!isDay ? 'dark' : ''}`}>
    <WeatherPage/>
  </div>
  )
}

export default App;
