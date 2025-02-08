import { useState, useEffect } from "react";
import getData from "./data";

export default function Weather(props) {
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeatherData = async (lat, long) => {
      try {
        const data = await getData(lat, long);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation({
            latitude: lat,
            longitude: long,
          });
          fetchWeatherData(lat, long);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1 onClick={console.log(weatherData)}>Weather</h1>
      <h2>{location.longitude}</h2>
      <h2>{location.latitude}</h2>
    </div>
  );
}
