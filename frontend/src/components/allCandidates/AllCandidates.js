import React from 'react';
import VizCollapse from '../tableau/VizCollapse';

// thumbnails
import allCandidateHeatmapThumb from '../../assets/thumbnails/heatmap_candidate_thumbnail.PNG';
import topDemocraticDonations from '../../assets/thumbnails/top_10_democratic.png';
import topRepublicanDonations from '../../assets/thumbnails/top_10_republican.png';

function AllCandidates(props) {
    const visuals = [
        {
            name: "HeatMap of Candidates",
            thumbnail: allCandidateHeatmapThumb,
            url: "https://public.tableau.com/views/Cand-to-Itcon-HeatmapBoxplot/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link",
            startOpen: true
        },
        {
            name: "Top Democratic Donations",
            thumbnail: topDemocraticDonations,
            url: "https://public.tableau.com/views/DemocratCommittees/DemCommitteesbyOccupationDB?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Top Republican Donations",
            thumbnail: topRepublicanDonations,
            url: "https://public.tableau.com/views/RepublicanCommittees/RepCommitteesDB?:language=en-US&:display_count=n&:origin=viz_share_link"
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

export default AllCandidates;