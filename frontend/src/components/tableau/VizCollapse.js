import React, { useState } from 'react';
import TableauViz from './TableauViz';
import ChevronRight from '../icons/ChevronRight';
import ChevronDown from '../icons/ChevronDown';

import "./vizCollapse.css";

function VizCollapse(props) {
    const startingState = props.viz.startOpen ? true : false;
    const [isOpen, setIsOpen] = useState(startingState);

    const content = isOpen ? <TableauViz url={ props.viz.url } /> : <div />;
    const icon = isOpen ? <ChevronDown /> : <ChevronRight />;

    return (
        <div className="viz_container">
            <div className="viz_container_header mt-5" >
                <div>
                    { icon }
                </div>
                <h3 onClick={() => setIsOpen(!isOpen)} className='h3'>{ props.viz.name }</h3>
                <div className="flex_placeholder"></div>
                <img src={ props.viz.thumbnail } />
            </div>
            <div>
                <p>{ content }</p>
            </div>
        </div>
    );
}

export default VizCollapse;