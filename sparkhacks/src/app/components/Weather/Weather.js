import { useState, useEffect } from "react";
import getData from "./data";

export default function Weather(props) {
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    var lat = 0;
    var long = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    var data;
    async () => {
      data = await getData(lat, long);
    };
    setWeatherData(data);
    console.log(weatherData);
  }, []);

  return (
    <div>
      <h1>Weather</h1>
      <h2>{location.longitude}</h2>
      <h2>{location.latitude}</h2>
    </div>
  );
}
