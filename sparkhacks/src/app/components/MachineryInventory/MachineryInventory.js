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

export default function MachineryInventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    make: "",
    model: "",
    modelYear: "",
    price: "",
    lastMaintenance: "",
    registered: "",
  });

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  //read items from db

  useEffect(() => {
    var q = query(collection(db, "machineryInventory"));
    var unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setItems(arr);
      setFiltered(arr);
    });
  }, []);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();

    if (
      newItem.name !== "" &&
      newItem.make !== "" &&
      newItem.model !== "" &&
      newItem.modelYear !== "" &&
      newItem.price !== "" &&
      newItem.lastMaintenance !== "" &&
      newItem.registered !== ""
    ) {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "machineryInventory"), {
        name: newItem.name.trim(),
        make: newItem.make,
        model: newItem.model,
        modelYear: newItem.modelYear,
        price: newItem.price,
        lastMaintenance: newItem.lastMaintenance,
        registered: newItem.registered,
      });
      setNewItem({
        name: "",
        make: "",
        model: "",
        modelYear: "",
        price: "",
        lastMaintenance: "",
        registered: "",
      });
    } else {
      alert("NOT ADDED");
    }
  };

  //delete from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "machineryInventory", id));
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
    <div className={styles.MachineryInventory}>
      <h1>Machinery Inventory</h1>
      <form>
        <div className={styles.span2}>
          <label>Name</label>
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            type="text"
            placeholder="Enter name of machinery"
          />
        </div>
        <div className={styles.span2}>
          <label>Make</label>
          <input
            value={newItem.make}
            onChange={(e) => setNewItem({ ...newItem, make: e.target.value })}
            type="text"
            placeholder="Enter the make of machinery "
          />
        </div>
        <div className={styles.span2}>
          <label className={styles.smallText}>Model</label>
          <input
            value={newItem.model}
            onChange={(e) => setNewItem({ ...newItem, model: e.target.value })}
            type="text"
            placeholder="Enter model of machinery "
          />
        </div>
        <div className={styles.span2}>
          <label className={styles.smallText}>Year</label>
          <input
            value={newItem.modelYear}
            onChange={(e) =>
              setNewItem({ ...newItem, modelYear: e.target.value })
            }
            type="number"
            placeholder="Enter model's year "
          />
        </div>
        <div className={styles.span2}>
          <label>Price</label>
          <input
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            type="number"
            min={0}
            placeholder="Enter price of machinery "
          />
        </div>
        <div className={styles.span2}>
          <label className={styles.smallText}>Repairs</label>
          <input
            value={newItem.lastMaintenance}
            onChange={(e) =>
              setNewItem({ ...newItem, lastMaintenance: e.target.value })
            }
            type="date"
            placeholder="Enter last maintenance date "
            className={styles.span2}
          />
        </div>
        <div className={styles.span2}>
          <label className={styles.smallText}>Registered</label>
          <input
            value={newItem.registered}
            onChange={(e) =>
              setNewItem({ ...newItem, registered: e.target.value })
            }
            type="text"
            placeholder="Yes or No "
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
              make={item.make}
              model={item.model}
              modelYear={item.modelYear}
              price={item.price}
              lastMaintenance={item.lastMaintenance}
              registered={item.registered}
              onClick={() => deleteItem(item.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
