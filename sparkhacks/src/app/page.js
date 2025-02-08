"use client";

import styles from "./page.module.css";
import PlantInventory from "./components/PlantInventory/PlantInventory";
import MachineryInventory from "./components/MachineryInventory/MachineryInventory";
import Weather from "./components/Weather/Weather";
import Banner from "./components/PlantInventory/PlantInventory"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.container}>
            <Weather></Weather>
          </div>
          <div className={styles.container}>
            <PlantInventory></PlantInventory>
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
