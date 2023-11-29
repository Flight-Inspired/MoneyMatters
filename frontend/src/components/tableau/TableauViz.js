import React, { useEffect, useState } from 'react';
import Tableau from "tableau-react";

function TableauViz(props) {
    const url = props.url;
    const options = props.options || { hideTabs: true, hideToolbar: true };
    const filters = props.filters;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

    useEffect(() => {

        const updateIsMobile = () => {
            setIsMobile(window.innerWidth <= 999);
        };

        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);

        return () => {
            window.removeEventListener('resize', updateIsMobile);
        };
    }, []);

    if (isMobile) {
        options.device = 'mobile';
    } else {
        options.device = 'desktop';
    }
    return (
        <Tableau
            url={url}
            options={options}
            filters={filters}
      />
    ); 
}

export default TableauViz;