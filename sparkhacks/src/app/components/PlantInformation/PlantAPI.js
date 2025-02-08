"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import InfoCard from "./InfoCard";
import styles from "../../page.module.css";

export default function PlantAPI() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const [name, setName] = useState();
  const [link, setLink] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const [inputRadius, setInputRadius] = useState();
  const [getX, setX] = useState(0);
  const [getY, setY] = useState(0);
  const [searchRadius, setSearchRadius] = useState();

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
    if (!getX || !getY || getX == 0 || getY == 0) {
      return;
    }
    const options = {
      method: "GET",
      url: "https://www.usdalocalfoodportal.com/api/farmersmarket/?apikey=qYztaVCAi1&x=${getX}&y=${getY}&radius=${inputRadius}",
    };
    if (event.key === "Enter") {
      try {
        try {
          const response = await axios.request(options);

          setName(response.data.data[0].listing_name);
          setLink(response.data.data[0].media_website);
          setAddress(response.data.data[0].location_address);
          setPhone(response.data.data[0].contact_phone);

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
            onSubmit={(e) => {
              e.preventDefault();
              searchMarkets;
            }}
            placeholder="Enter Radius (miles)"
            // type="number"
          />
        </form>
      </div>

      <h1>{name}</h1>
      <h1>{link}</h1>
      <h1>{address}</h1>
      <h1>{phone}</h1>
      {/* <div>
        <button onClick={Request}>Upload Image</button>
        {response && <div>Response: {JSON.stringify(response)}</div>}
      </div> */}
      {/* <form>
        <div className={styles.span2}>
          <label>Name Of Plant</label>
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            type="text"
            placeholder="Enter Name"
          />
        </div>
        <div className={styles.span2}>
          <label>Acres Planted</label>
          <input
            value={newItem.acresPlanted}
            onChange={(e) =>
              setNewItem({ ...newItem, acresPlanted: e.target.value })
            }
            type="number"
            placeholder="Enter numbedr of acres plante"
          />
        </div>
        <div className={styles.span2}>
          <label className={styles.smallText}>Date Planted</label>
          <input
            value={newItem.datePlanted}
            onChange={(e) =>
              setNewItem({ ...newItem, datePlanted: e.target.value })
            }
            type="date"
            placeholder="Enter when planted"
          />
        </div>
        <div className={styles.span2}>
          <label>Last Harve.st Date</label>
          <input
            value={newItem.lastHarvested}
            onChange={(e) =>
              setNewItem({ ...newItem, lastHarvested: e.target.value })
            }
            type="date"
            placeholder="Enter when last harvested"
          />
        </div>
        <div className={styles.span2}>
          <label className={styles.smallText}>Last Harvest Yield</label>
          <input
            value={newItem.lastHarvestYield}
            onChange={(e) =>
              setNewItem({ ...newItem, lastHarvestYield: e.target.value })
            }
            type="number"
            min={0}
            max={100}
            placeholder="Enter last harvestyield percentage "
            className={styles.span2}
          />
        </div>
        <button onClick={addItem} type="submit">
          Add
        </button>
      </form>
      <input
        value={search}
        onChange={updateSearch}
        type="text"
        placeholder="Search..."
        className={styles.search}
      ></input>
      <div className={styles.scrollContainer}>
        <ul>
          {filtered.map((item, id) => (
            <InfoCard
              key={item.id}
              name={item.name}
              acresPlanted={item.acresPlanted}
              datePlanted={item.datePlanted}
              lastHarvestDate={item.lastHarvested}
              lastHarvestYield={item.lastHarvestYield}
              onClick={() => deleteItem(item.id)}
            />
          ))}
        </ul>
      </div> */}
    </div>
  );
}
