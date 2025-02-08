import { fetchWeatherApi } from "openmeteo";

export default async function getData(lat, long) {
  const params = {
    latitude: lat,
    longitude: long,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "soil_temperature_0cm",
      "soil_temperature_18cm",
      "soil_moisture_0_to_1cm",
      "soil_moisture_9_to_27cm",
    ],
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const hourly = response.hourly();

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)?.valuesArray() || [],
      relativeHumidity2m: hourly.variables(1)?.valuesArray() || [],
      precipitation: hourly.variables(2)?.valuesArray() || [],
      soilTemperature0cm: hourly.variables(3)?.valuesArray() || [],
      soilTemperature18cm: hourly.variables(4)?.valuesArray() || [],
      soilMoisture0To1cm: hourly.variables(5)?.valuesArray() || [],
      soilMoisture9To27cm: hourly.variables(6)?.valuesArray() || [],
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console
      .log
      // weatherData.hourly.time[i].toISOString(),
      // weatherData.hourly.time[i]
      // new Date(weatherData.hourly.time[i])
      // weatherData.hourly.temperature2m[i],
      // weatherData.hourly.relativeHumidity2m[i],
      // weatherData.hourly.precipitation[i],
      // weatherData.hourly.soilTemperature0cm[i],
      // weatherData.hourly.soilTemperature18cm[i],
      // weatherData.hourly.soilMoisture0To1cm[i],
      // weatherData.hourly.soilMoisture9To27cm[i]
      ();
  }

  return weatherData;
}
