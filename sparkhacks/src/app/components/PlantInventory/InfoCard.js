export default function InfoCard(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.lastHarvestDate}</h2>
      <h2>{props.datePlanted}</h2>
      <button onClick={props.onClick}>delete</button>
    </div>
  );
}
