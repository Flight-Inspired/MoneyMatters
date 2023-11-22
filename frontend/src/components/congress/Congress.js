import React from 'react';
import Map from '../map/Map';
import "./congress.css";

function Congress(props) {
    return (
        <div className="container-fluid m-auto mt-3" style={{ 'maxWidth': 1200 + 'px' }}>
            <h3 className='h3'>Top Spending by State:</h3>
            <Map />
        </div>
        
    );
}

export default Congress;