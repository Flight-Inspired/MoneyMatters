import React from 'react';
import VizCollapse from '../tableau/VizCollapse';
import "./congress.css";

// thumbnails
import CongressSpendingHeatmapThumb from "../../assets/thumbnails/house_senate_spending_heatmap.png";

function Congress(props) {
    const visuals = [
        {
            name: "Congress Spending Heatmap",
            thumbnail: CongressSpendingHeatmapThumb,
            url: "https://public.tableau.com/shared/53NWSCCZQ?:display_count=n&:origin=viz_share_link",
            startOpen: true
        }
    ];

    return (
        <div className="container-fluid m-auto mt-3" style={{ 'maxWidth': 1200 + 'px' }}>
            <div className='container-md mx-auto mt-5'>
                {visuals.map((viz) => (
                    <VizCollapse viz={viz} />
                ))}
            </div>
        </div>
    );
}

export default Congress;