import styles from "../../page.module.css";

export default function InfoCard(props) {
  return (
    <div className={styles.InfoCard}>
      <h1 className={styles.span2}>{props.name}</h1>
      <h1 className={styles.span2}>{props.make}</h1>
      <h4 className={styles.span2}>{props.model}</h4>
      <h4 className={styles.span2}>{props.modelYear}</h4>
      <h3 className={styles.span2}>{props.price}</h3>
      <h2 className={styles.span2}>{props.lastMaintenance}</h2>
      <h3 className={styles.span2}>{props.registered}</h3>
      <div className={styles.delete} onClick={props.onClick}>
        Delete
      </div>
    </div>
  );
}
