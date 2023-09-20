import React from 'react';
import './MemberCard.css';
import { Link } from 'react-router-dom';

function MemberCard(props) {
    const member = props.member;
    const memberUrl = `/legislator/${member[14]}`;
    
    return (
        <div className="card col-2" styles="width: 10rem;">
            <Link to={memberUrl}>
                <img src={member[22]} className="card-img-top" styles="height: 75%; margin: 1rem;" alt={"A picture of " + member[1]} />
                <div className="card-body">
                    <h5 className="card-title"><strong>{member[1]}</strong></h5>
                    <p className="card-text">{member[21] === 'H' ? 'House' : 'Senate'}</p>
                        <p>{member[3]}-{member[4]}</p>
                </div>
            </Link>
        </div>
    );
}

export default MemberCard;