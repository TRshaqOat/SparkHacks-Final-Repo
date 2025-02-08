"use client";

import styles from "./page.module.css";
import PlantInventory from "./components/PlantInventory/PlantInventory";
import MarketAPI from "./components/MarketInformation/MarketAPI";
import MachineryInventory from "./components/MachineryInventory/MachineryInventory";
import Weather from "./components/Weather/Weather";
import axios from "axios";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <h1 className={styles.heading}>Farmers's Dashboard</h1>
      </div>
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.container}>
            <Weather></Weather>
          </div>
          <div className={styles.container}>
            <MarketAPI></MarketAPI>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.container}>
            <PlantInventory></PlantInventory>
          </div>
          <div className={styles.container}>
            <MachineryInventory></MachineryInventory>
          </div>
        </div>
      </main>
    </div>
  );
}
