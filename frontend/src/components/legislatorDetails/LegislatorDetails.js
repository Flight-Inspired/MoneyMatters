import React, { useEffect, useState } from 'react';
import { json, useParams } from 'react-router-dom';
import './LegislatorDetails.css';
import Tableau from "tableau-react";

function LegislatorDetails(props) {

    const [legistlator_details, setLegislator_details] = useState([]);
    const [top_donors, setTop_donors] = useState([]);

    const { bioguideId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(props.serverUrl + `/legislator/${bioguideId}`);
        
                if (response.ok) {
                    const jsonData = await response.json();

                    setLegislator_details(jsonData.legistlatorDetails);
                    setTop_donors(jsonData.topDonors);
                } else {
                    throw new Error('API request failed');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function immediately
        
    }, [bioguideId, props.serverUrl]);

    return (
        <div class="page_container">
            <p class="page_title">{legistlator_details[1]}</p>
            <div class="content">
                <div class="content_left">
                    <div class="l_image card">
                        <img src={ legistlator_details[22]} alt="legislator image" />
                        <center>
                            <p><strong>{legistlator_details[0]}</strong> - {legistlator_details[3]} - {legistlator_details[4]}</p>
                        </center>
                    </div>
                </div>
                <div class="content_center">
                    <TableauVisual />
                </div>
                
                <div class="content_right">
                    <div class="donors_container card">
                        <h2>Top 10 Donors - 2022 Cycle:</h2>
                        <ul>
                            
                            {top_donors.length === 0? "Error": top_donors.map((donor, index) => (
                                <li>
                                    <span class="donor_number">{++index}.</span>
                                    <span class="donor_name">{donor[0]}</span>
                                    <span class="donor_amount">{donor[1]}</span>
                                </li>
                                
                            ))}
                                    
                        </ul>
                    </div>
                </div>
                
            </div>
            <div class="disclaimer_notice_container">
                {/* Donation notice */}
                <p class="donation-notice">*The organizations themselves did not donate, rather the money came from the organization's PAC, its individual members or employees or owners, and those individuals' immediate families.</p>
                {/* Additional notice */}
                <p class="additional-notice">*These are 6-year numbers for senators/Senate candidates; 2-year numbers for representatives/House candidates.</p>
            </div>
        </div>
    );
}

function TableauVisual(props){ 
    const url = "https://public.tableau.com/shared/PQRFDDC5N?:display_count=n&:origin=viz_share_link";
    const { bioguideId } = useParams();

    const filters = {
        "Bioguide Id": bioguideId
    };

    const options = {
        hideTabs: true,
        hideToolbar: true
    };

    return (
        <Tableau
            url={url}
            options={options}
            filters={filters}
      />
    );
}

export default LegislatorDetails;

