"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../page.module.css";

export default function PlantAPI() {
  const [location, setLocation] = useState({});

  const [name, setName] = useState();
  const [link, setLink] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

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
    console.log("CLICKEd");
    const options = {
      method: "GET",
      url: `https://www.usdalocalfoodportal.com/api/farmersmarket/?apikey=qYztaVCAi1&x=${getX}&y=${getY}&radius=${inputRadius}`,
    };
    try {
      try {
        const response = await axios.request(options);

        setName(response.data.data[0].listing_name);
        setLink(response.data.data[0].media_website);
        setAddress(response.data.data[0].location_address);
        setPhone(response.data.data[0].contact_phone);

        setFarmers(response.data.data);

        console.log(name);
        console.log(link);
        console.log(address);
        console.log(phone);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.PlantInventory}>
      <h1>Farmers Market</h1>
      <div className="search">
        <form>
          <input
            value={inputRadius}
            onChange={(e) => setInputRadius(e.target.value)}
            placeholder="Enter Radius (miles)"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              searchMarkets();
            }}
          >
            Submit
          </button>
        </form>
      </div>

      <h1>{name}</h1>
      <h1>{link}</h1>
      <h1>{address}</h1>
      <h1>{phone}</h1>

      <ul>
        {farmers.map((item, id) => (
          <div key={id}>
            <h1>{item.listing_name}</h1>
            <h1>{item.media_website}</h1>
            <h1>{item.location_address}</h1>
            <h1>{item.contact_phone}</h1>
          </div>
        ))}
      </ul>
    </div>
  );
}
