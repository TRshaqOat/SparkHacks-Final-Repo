import styles from "../../page.module.css";

export default function InfoCard(props) {
  return (
    <div className={styles.InfoCard}>
      <h1 className={styles.span2}>{props.name}</h1>
      <h2 className={styles.span2}>{props.acresPlanted}</h2>
      <h3 className={styles.span2}>{props.datePlanted}</h3>
      <h3 className={styles.span2}>{props.lastHarvestDate}</h3>
      <h2 className={styles.span2}>{props.lastHarvestYield}</h2>
      <div className={styles.delete} onClick={props.onClick}>
        Delete
      </div>
      {/* <button onClick={props.onClick}>Delete</button> */}
    </div>
  );
}
