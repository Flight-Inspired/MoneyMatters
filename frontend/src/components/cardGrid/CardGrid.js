// src/components/CardGrid.js
import React from 'react';
import MemberCard from '../memberCard/MemberCard';

const CardGrid = ({ members }) => {
  return (
    <div className='grid'>
      <div className='row m-4'>
        {members.map((member) => (
          <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 pb-3' key={member.id}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
