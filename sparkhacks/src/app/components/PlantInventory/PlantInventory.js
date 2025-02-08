"use client";
import React, { useState, useEffect } from "react";
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
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function PlantInventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    acresPlanted: "",
    lastHarvested: "",
    lastHarvestYield: "",
    datePlanted: "",
  });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  //Read Items from database
  useEffect(() => {
    var q = query(collection(db, "plantsInventory"));
    var unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      setFiltered(itemsArr);
    });
  }, []);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();

    if (
      newItem.name !== "" &&
      newItem.acresPlanted !== "" &&
      newItem.lastHarvested !== "" &&
      newItem.lastHarvestYield !== "" &&
      newItem.datePlanted !== ""
    ) {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "plantsInventory"), {
        name: newItem.name.trim(),
        acresPlanted: newItem.acresPlanted,
        lastHarvested: newItem.lastHarvested,
        lastHarvestYield: newItem.lastHarvestYield,
        datePlanted: newItem.datePlanted,
      });
      setNewItem({
        name: "",
        acresPlanted: "",
        lastHarvested: "",
        lastHarvestYield: "",
        datePlanted: "",
      });
    } else {
      alert("NOT ADDED");
    }
  };

  //Delete Items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "plantsInventory", id));
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    const s = e.target.value;

    setFiltered(
      items.filter((el) => {
        if (s === "") {
          return el;
        } else {
          return el.name.includes(s);
        }
      })
    );
  };

  return (
    <div className={styles.PlantInventory}>
      <h1>Plant Inventory</h1>
      <form>
        <div className={styles.span2}>
          <label>Plant Name</label>
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
            placeholder="Enter # of Acres Planted"
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
          <label>Last Harvest</label>
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
          <label className={styles.smallText}>Last Yield</label>
          <input
            value={newItem.lastHarvestYield}
            onChange={(e) =>
              setNewItem({ ...newItem, lastHarvestYield: e.target.value })
            }
            type="number"
            min={0}
            max={100}
            placeholder="Enter Harvest Yield %"
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
      </div>
    </div>
  );
}
