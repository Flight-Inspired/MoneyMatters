import React from 'react';
import './MemberCard.css';

function MemberCard(props) {
    const member = props.member;
    const memberUrl = `/legislator/${member[14]}`;
    
    return(
        <div className="legislator-container">
            <a href={memberUrl}>
                <div className="legislator-chamber">
                    <p><strong>{member[21] === 'H' ? 'House' : 'Senate'}</strong></p>
                </div>
                <div className="legislator-info">
                    <p><strong>{member[1]}</strong></p>
                    <p>{member[3]}-{member[4]}</p>
                </div>
                <div className="legislator-image-container">
                    <img src={member[22]} alt={"A picture of " + member[1]} />
                </div> 
            </a> 
        </div>
    );
}

export default MemberCard;