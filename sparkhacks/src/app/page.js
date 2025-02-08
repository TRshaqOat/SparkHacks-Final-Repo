"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import PlantInventory from "./components/PlantInventory/PlantInventory";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [items, setItems] = useState([]);

  //Read Items from database
  useEffect(() => {
    var q = query(collection(db, "items"));
    var unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <ul className="mt-6 grid grid-cols-1 gap-6">
          {items.map((item, ind) => (
            <li key={ind}>{item.name}</li>
          ))}
        </ul>
        <PlantInventory></PlantInventory>
      </main>
    </div>
  );
}
