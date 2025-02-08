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

export default function PlantInventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    acresPlanted: "",
    lastHarvested: "",
    lastHarvestYield: "",
    datePlanted: "",
  });

  //Read Items from database
  useEffect(() => {
    var q = query(collection(db, "plantsInventory"));
    var unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
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

  return (
    <div className={styles.PlantInventory}>
      <h1>plantInventory</h1>
      <form>
        <input
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          type="text"
          placeholder="Enter Name"
          className={styles.span2}
        />
        <input
          value={newItem.acresPlanted}
          onChange={(e) =>
            setNewItem({ ...newItem, acresPlanted: e.target.value })
          }
          type="number"
          placeholder="Enter numbedr of acres plante"
          className={styles.span2}
        />
        <input
          value={newItem.lastHarvested}
          onChange={(e) =>
            setNewItem({ ...newItem, lastHarvested: e.target.value })
          }
          type="date"
          placeholder="Enter when last harvested"
        />
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
        <input
          value={newItem.datePlanted}
          onChange={(e) =>
            setNewItem({ ...newItem, datePlanted: e.target.value })
          }
          type="date"
          placeholder="Enter when planted"
        />
        <div></div>
        <button onClick={addItem} type="submit">
          Add
        </button>
      </form>
      <ul>
        {items.map((item, id) => (
          <InfoCard
            key={item.id}
            name={item.name}
            lastHarvestDate={item.lastHarvested}
            datePlanted={item.datePlanted}
            onClick={() => deleteItem(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}
