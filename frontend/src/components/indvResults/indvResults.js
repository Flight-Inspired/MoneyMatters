export default function IndvResults(props) {
    const member = props.member;
    const name = member[0];
    const amt = member[1];
  
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <strong>{name}</strong>
          </h5>
          <p className="card-text">{"Amount: " + amt}</p>
          <p>
            {member[3]}-{member[4]}
          </p>
        </div>
      </div>
    );
  }