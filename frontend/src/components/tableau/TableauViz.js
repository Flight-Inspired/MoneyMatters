import React from 'react';
import Tableau from "tableau-react";

function TableauViz(props) {
    const url = props.url;
    const options = props.options || { hideTabs: true, hideToolbar: true };
    const filters = props.filters;

    return (
        <Tableau
            url={url}
            options={options}
            filters={filters}
      />
    ); 
}

export default TableauViz;