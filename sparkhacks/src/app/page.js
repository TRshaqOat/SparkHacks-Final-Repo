"use client";

import styles from "./page.module.css";
import PlantInventory from "./components/PlantInventory/PlantInventory";
import Weather from "./components/Weather/Weather";

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
            <PlantInventory></PlantInventory>
          </div>
        </div>
      </main>
    </div>
  );
}
