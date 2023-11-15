import React from "react";
import MemberCard from "../memberCard/MemberCard";
import IndvResults from "../indvResults/indvResults";

const donoGrid = ({ members }) => {
  return (
    <div className="grid">
      <div className="row m-4">
        {members.top_donors.map((member) => (
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 pb-3">
            <IndvResults member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default donoGrid;
