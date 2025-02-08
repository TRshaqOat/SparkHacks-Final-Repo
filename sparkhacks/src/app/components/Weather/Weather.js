import { useState, useEffect } from "react";
import getData from "./data";

import Typography from "@mui/material/Typography";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LineHighlightPlot, LinePlot } from "@mui/x-charts/LineChart";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";

import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function Weather(props) {
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState({
    hourly: { time: [], temperature2m: [] },
  });

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
  }, [weatherData]);

  var series = [
    // {
    //   type: 'bar',
    //   yAxisId: 'percipitatoin',
    //   label: 'Volume',
    //   color: 'lightgray',
    //   data: alphabetStock.map((day) => day.volume),
    //   highlightScope: { highlight: 'item' },
    // },
    {
      type: "line",
      yAxisId: "temperature",
      color: "red",
      label: "Temperature",
      data: weatherData.hourly.temperature2m,
      highlightScope: { highlight: "item" },
    },
    // {
    //   type: 'line',
    //   yAxisId: 'price',
    //   color: 'green',
    //   label: 'High',
    //   data: alphabetStock.map((day) => day.high),
    // },
  ];

  const dates = weatherData.hourly.time.map((day) => new Date(day));

  return (
    <div>
      <h1>Weather</h1>
      <h2>{location.longitude}</h2>
      <h2>{location.latitude}</h2>
      {weatherData.hourly.time.length > 0 ? (
        <ResponsiveChartContainer
          series={series}
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
          ]}
        >
          <ChartsAxisHighlight x="line" />
          {/* <BarPlot /> */}
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
          {/* <ChartsYAxis
          label="Volume"
          position="right"
          axisId="volume"
          tickLabelStyle={{ fontSize: 10 }}
          sx={{
            [`& .${axisClasses.label}`]: {
              transform: "translateX(5px)",
            },
          }}
        /> */}
          <ChartsTooltip />
        </ResponsiveChartContainer>
      ) : (
        <h1>NOT WORKING</h1>
      )}
    </div>
  );
}
