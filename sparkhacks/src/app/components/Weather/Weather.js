import { useState, useEffect } from "react";
import getData from "./data";
import Papa from "papaparse";
import styles from "../../page.module.css";

import { BarPlot } from "@mui/x-charts/BarChart";
import { LineHighlightPlot, LinePlot } from "@mui/x-charts/LineChart";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";

import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Weather(props) {
  const [location, setLocation] = useState({});
  const [csvData, setCsvData] = useState();
  const [weatherData, setWeatherData] = useState({
    hourly: {
      time: [],
      temperature2m: [],
      precipitation: [],
      soilTemperature0cm: [],
      soilTemperature18cm: [],
      soilMoisture0To1cm: [],
      soilMoisture9To27cm: [],
      relativeHumidity2m: [],
    },
  });
  const [temperatureView, setTemperatureView] = useState(false);
  const [precipitationView, setPrecipitationView] = useState(false);
  const [soilTemperature0cmView, setSoilTemperature0cmView] = useState(false);
  const [soilTemperature18cmView, setSoilTemperature18cmView] = useState(false);
  const [soilMoisture0To1cmView, setSoilMoisture0To1cmView] = useState(false);
  const [soilMoisture9To27cmView, setSoilMoisture9To27cmView] = useState(false);
  const [relativeHumidity2mView, setRelativeHumidity2mView] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async (lat, long) => {
      try {
        const data = await getData(lat, long);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    const fetchCSV = async () => {
      const response = await fetch("open-meteo.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true });
      console.log(results);
      setCsvData(results.data);
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
    fetchCSV();
  }, []);

  const tempSeries = {
    type: "line",
    yAxisId: "temperature",
    color: "red",
    label: "Temperature (°F)",
    data: weatherData.hourly.temperature2m,
    highlightScope: { highlight: "item" },
  };

  const percipitatoinSeries = {
    type: "bar",
    yAxisId: "percipitatoin",
    label: "Percipitation mm (inch)",
    color: "blue",
    data: weatherData.hourly.precipitation,
    highlightScope: { highlight: "item" },
  };

  const soilTemp0Series = {
    type: "line",
    yAxisId: "temperature",
    label: "Soil Temperature-0cm (°F)",
    color: "#9c755f",
    data: weatherData.hourly.soilTemperature0cm,
    highlightScope: { highlight: "item" },
  };

  const soilTemp18Series = {
    type: "line",
    yAxisId: "temperature",
    label: "Soil Temperature-18cm (°F)",
    color: "#543d30",
    data: weatherData.hourly.soilTemperature18cm,
    highlightScope: { highlight: "item" },
  };

  const soilMoisture0To1cmSeries = {
    type: "line",
    yAxisId: "moisture",
    label: "Soil Moisture-0to1cm (m³/m³)",
    color: "#47ba5a",
    data: weatherData.hourly.soilMoisture0To1cm,
    highlightScope: { highlight: "item" },
  };

  const soilMoisture9To27cmSeries = {
    type: "line",
    yAxisId: "moisture",
    label: "Soil Moisture-9to27cm (m³/m³)",
    color: "#194521",
    data: weatherData.hourly.soilMoisture9To27cm,
    highlightScope: { highlight: "item" },
  };

  const moistureSeries = {
    type: "line",
    yAxisId: "moisture",
    label: "Relative Humidity-2m (%) scaled by .25",
    color: "#0a7694",
    data: weatherData.hourly.relativeHumidity2m.map((e) => e / 250),
    highlightScope: { highlight: "item" },
  };

  const dates = weatherData.hourly.time.map((day) => new Date(day));

  const [formats, setFormats] = useState([]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <div className={styles.Weather}>
      <h1>Weather</h1>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton
          onClick={(e) => {
            setTemperatureView(!temperatureView);
          }}
          value="temperature"
          sx={{ color: "#d4d4d4" }}
        >
          Temperature
        </ToggleButton>
        <ToggleButton
          value="percipitation"
          onClick={(e) => {
            setPrecipitationView(!precipitationView);
          }}
          sx={{ color: "#d4d4d4" }}
        >
          Percipitation
        </ToggleButton>
        <ToggleButton
          value="soiltemp0"
          onClick={(e) => {
            setSoilTemperature0cmView(!soilTemperature0cmView);
          }}
          sx={{ fontSize: "10px;", color: "#d4d4d4" }}
        >
          Soil-Temp 0cm
        </ToggleButton>
        <ToggleButton
          value="soiltemp18"
          onClick={(e) => {
            setSoilTemperature18cmView(!soilTemperature18cmView);
          }}
          sx={{ fontSize: "10px;", color: "#d4d4d4" }}
        >
          Soil-Temp 18cm
        </ToggleButton>
        <ToggleButton
          value="soilM01"
          onClick={(e) => {
            setSoilMoisture0To1cmView(!soilMoisture0To1cmView);
          }}
          sx={{ fontSize: "10px;", color: "#d4d4d4" }}
        >
          Soil Moisture 0-1 cm
        </ToggleButton>
        <ToggleButton
          value="soilM927"
          onClick={(e) => {
            setSoilMoisture9To27cmView(!soilMoisture9To27cmView);
          }}
          sx={{ fontSize: "10px;", color: "#d4d4d4" }}
        >
          Soil Moisture 9-27 cm
        </ToggleButton>
        <ToggleButton
          value="hum"
          onClick={(e) => {
            setRelativeHumidity2mView(!relativeHumidity2mView);
          }}
          sx={{ color: "#d4d4d4" }}
        >
          Humidity
        </ToggleButton>
      </ToggleButtonGroup>

      {weatherData.hourly.time.length > 0 ? (
        <ResponsiveChartContainer
          series={[
            temperatureView ? tempSeries : {},
            precipitationView ? percipitatoinSeries : {},
            soilTemperature0cmView ? soilTemp0Series : {},
            soilTemperature18cmView ? soilTemp18Series : {},
            soilMoisture0To1cmView ? soilMoisture0To1cmSeries : {},
            soilMoisture9To27cmView ? soilMoisture9To27cmSeries : {},
            relativeHumidity2mView ? moistureSeries : {},
          ]}
          height={400}
          margin={{ top: 10 }}
          xAxis={[
            {
              id: "date",
              data: dates,
              scaleType: "band",
              valueFormatter: (value) =>
                value.getMonth() +
                1 +
                "/" +
                value.getDate() +
                ": " +
                value.getHours() +
                ":00",
            },
          ]}
          yAxis={[
            {
              id: "temperature",
              scaleType: "linear",
            },
            {
              id: "percipitatoin",
              scaleType: "linear",
              valueFormatter: (value) =>
                `${(value / 1000000).toLocaleString()}M`,
            },
            {
              id: "moisture",
              scaleType: "linear",
            },
          ]}
        >
          <ChartsAxisHighlight x="line" />
          <BarPlot />
          <LinePlot />
          <LineHighlightPlot />
          <ChartsXAxis
            label="Time"
            position="bottom"
            axisId="date"
            tickInterval={(value, index) => {
              return (index + 6) % 12 == 0;
            }}
            tickLabelStyle={{
              fontSize: 7,
            }}
          />
          <ChartsYAxis
            label="Temperature (°F)"
            position="left"
            axisId="temperature"
            tickLabelStyle={{ fontSize: 10 }}
            sx={{
              [`& .${axisClasses.label}`]: {
                transform: "translateX(-5px)",
              },
            }}
          />
          <ChartsYAxis
            label="Moisture (% or m³/m³)"
            position="right"
            axisId="moisture"
            tickLabelStyle={{ fontSize: 7 }}
            sx={{
              [`& .${axisClasses.label}`]: {
                transform: "translateX(12px)",
              },
            }}
          />
          <ChartsTooltip />
        </ResponsiveChartContainer>
      ) : (
        <h1>Loading Data ...</h1>
      )}
    </div>
  );
}
