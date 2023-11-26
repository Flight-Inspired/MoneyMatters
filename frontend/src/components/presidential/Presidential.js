import React from 'react';
import Tableau from "tableau-react";

function Presidential(props) {
    function PresidentialDash(props) {
        const url = "https://public.tableau.com/views/President-Dash/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link";
        
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
        <div className='container-md mx-auto mt-3' style={{ 'maxWidth': 1200 + 'px' }}>
            <h3 className='h3'>Presidential Donation Dashboard:</h3>
            <PresidentialDash />
        </div>
    );
}



export default Presidential;