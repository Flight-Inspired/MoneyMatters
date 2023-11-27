import React, { useEffect, useState } from 'react';
import TableauViz from '../tableau/TableauViz';
import ChevronRight from '../icons/ChevronRight';
import ChevronDown from '../icons/ChevronDown';
import './allCandidates.css';


function VizCollapse(props) {
    const [isOpen, setIsOpen] = useState(false);

    const content = isOpen ? <TableauViz url={ props.viz.url } /> : <div />;
    const icon = isOpen ? <ChevronDown /> : <ChevronRight />;

    return (
        <div className="viz_container">
            <div className="viz_container_header mt-5" >
                <div>
                    { icon }
                </div>
                <h3 onClick={() => setIsOpen(!isOpen)} className='h3'>{ props.viz.name }</h3>
            </div>
            <div>
                <p>{ content }</p>
            </div>
        </div>
    );
}

function AllCandidates(props) {
    const visuals = [
        {
            name: "HeatMap of Candidates",
            url: "https://public.tableau.com/views/Cand-to-Itcon-HeatmapBoxplot/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Top Democratic Donations",
            url: "https://public.tableau.com/views/DemocratCommittees/DemCommitteesbyOccupationDB?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Top Republican Donations",
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