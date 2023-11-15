export default function IndvResults(props) {
  const member = props.member;
  const name = member[0];
  const amt = member[1];
  const date = member[2];
  console.log(member);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <strong>{name}</strong>
        </h5>
        <p className="card-text">{"Amount: " + amt}</p>
        <p className="card-text">{"Date: " + date}</p>
      </div>
    </div>
  );
}
