import React from 'react';
import Tableau from "tableau-react";

function AllCandidates(props) {
    function AllCandidatesHeatMap(props) {
        const url = "https://public.tableau.com/views/Cand-to-Itcon-HeatmapBoxplot/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link";
        
        const options = {
            hideTabs: true,
            hideToolbar: true
        };

        return (
            <Tableau
                url={url}
                options={options}
        />
        );

    }

    function RepublicanCommiteesHistogram(props) {
        const url = "https://public.tableau.com/views/RepublicanCommittees/RepCommitteesDB?:language=en-US&:display_count=n&:origin=viz_share_link";
        
        const options = {
            hideTabs: true,
            hideToolbar: true
        };

        return (
            <Tableau
                url={url}
                options={options}
        />
        );

    }

    function DemocraticCommitteeHistogram(props) {
        const url = "https://public.tableau.com/views/DemocratCommittees/DemCommitteesbyOccupationDB?:language=en-US&:display_count=n&:origin=viz_share_link";
        
        const options = {
            hideTabs: true,
            hideToolbar: true
        };

        return (
            <Tableau
                url={url}
                options={options}
        />
        );

    }

    return (
        <div className='container-fluid m-auto' style={{ 'maxWidth': 1200 + 'px' }}>
            <div className='container-md mx-auto mt-3'>
                <h3 className='h3'>HeatMap of Candidates:</h3>
                <AllCandidatesHeatMap/>
            </div>
            <div className='container-md mx-auto mt-5'>
                <hr className="border border-primary border-3 opacity-75" />
                <h3 className='h3'>Top Democratic Donations:</h3>
                <DemocraticCommitteeHistogram/>
            </div>
            <div className='container-md mx-auto mt-5'>
                <hr className="border border-danger border-2 opacity-50" />
                <h3 className='h3'>Top Republican Donations:</h3>
                <RepublicanCommiteesHistogram/>
            </div>
        </div>
    );
}

export default AllCandidates;