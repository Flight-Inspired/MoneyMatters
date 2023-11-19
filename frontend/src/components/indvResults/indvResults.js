export default function IndvResults(props) {
  const member = props.member;
  const name = member[0];
  const amt = member[1];
  const date = member[2];
  const city = member[3];
  const state = member[4];


  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <strong>{name}</strong>
        </h5>
        <p className="card-text">{"Amount: " + amt.toLocaleString("en-US")}</p>
        <p className="card-text">{"Date: " + date}</p>
        <p className="card-text">{"Location: "  + city + ", " + state}</p>
      </div>
    </div>
  );
}
