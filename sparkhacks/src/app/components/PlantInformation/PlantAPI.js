"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Fab from "@mui/material/Fab";
import styles from "../../page.module.css";
import Grid from "@mui/material/Grid2";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Stack } from "@mui/material";

export default function PlantAPI() {
  const [farmers, setFarmers] = useState([]);

  const [inputRadius, setInputRadius] = useState(0);
  const [getX, setX] = useState(0);
  const [getY, setY] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setX(long);
          setY(lat);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const searchMarkets = async () => {
    setFarmers([]);
    console.log("CLICKEd");
    const options = {
      method: "GET",
      url: `https://www.usdalocalfoodportal.com/api/farmersmarket/?apikey=qYztaVCAi1&x=${getX}&y=${getY}&radius=${inputRadius}`,
    };
    try {
      try {
        const response = await axios.request(options);

        setFarmers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.MarketInfo}>
      <h1 style={{ marginBottom: 5 }}>Farmers Market</h1>
      <div className="search">
        <div>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid size={8}>
              <FormControl fullWidth>
                <InputLabel id="Distance-Select-label">Distance</InputLabel>
                <Select
                  autoWidth
                  labelId="dDistance-Select-label"
                  id="demo-simple-select"
                  value={inputRadius}
                  label="Distance"
                  onChange={(e) => setInputRadius(e.target.value)}
                >
                  <MenuItem value={5}>Five(5)</MenuItem>
                  <MenuItem value={10}>Ten(10)</MenuItem>
                  <MenuItem value={15}>Fifteen(15)</MenuItem>
                  <MenuItem value={20}>Twenty(20)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  searchMarkets();
                }}
                style={{
                  height: 55,
                  width: 100,
                  backgroundColor: " #282c34",
                  color: "white",
                }}
              >
                Submit
              </button>
            </Grid>
          </Grid>
        </div>
      </div>

      <FixedSizeList
        height={400}
        fullWidth
        itemSize={75}
        itemCount={farmers.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem
        style={style}
        key={index}
        component="div"
        disablePadding
        divider
      >
        <ListItemButton alignItems="center">
          <ListItemText primary={`${farmers[index].listing_name}`} />
          <ListItemText secondary={`${farmers[index].location_address}`} />
          <Stack>
            <ListItemText secondary={`${farmers[index].media_website}`} />
            <ListItemText secondary={`${farmers[index].contact_phone}`} />
          </Stack>
        </ListItemButton>
      </ListItem>
    );
  }
}
