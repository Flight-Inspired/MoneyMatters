import React from 'react';
import VizCollapse from '../tableau/VizCollapse';

// thumbnails
import presidentialDash from '../../assets/thumbnails/presidential_dash.png';

function Presidential(props) {
    const visuals = [
        {
            name: "Presidential Donations",
            thumbnail: presidentialDash,
            url: "https://public.tableau.com/views/President-Dash/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link",
            startOpen: true
        }
    ];

    return (
        <div className='container-fluid m-auto' style={{ 'maxWidth': 1200 + 'px' }}>
            <div className='container-md mx-auto mt-5'>
                {visuals.map((viz) => (
                    <VizCollapse viz={viz} />
                ))}
            </div>
        </div>
    );
}



export default Presidential;