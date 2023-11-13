import React from 'react';
import Tableau from "tableau-react";


function Map(props) {
    const url = "https://public.tableau.com/shared/PQD9S2NDH?:display_count=n&:origin=viz_share_link";
    
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

export default Map;