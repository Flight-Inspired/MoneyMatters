// src/components/CardGrid.js
import React from 'react';
import MemberCard from '../memberCard/MemberCard';

const CardGrid = ({ members }) => {
  return (
    <div className='grid'>
      <div className='row'>
        {members.map((member) => (
          <div className='col' key={member.id} md={4} sm={6} xs={12}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
