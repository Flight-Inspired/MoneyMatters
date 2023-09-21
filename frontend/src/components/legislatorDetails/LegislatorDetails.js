import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './LegislatorDetails.css';

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
                    console.log(jsonData)
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
        <div>
            <div class="navbar">
            <a class="home-link" href="/">Home</a>
            </div>
            <div class="page-container">
                <div class="title">Legislator Details</div>
                    <div class="container">
                        {/* Display legislator info and top donors  */}
                        <div class="legislator-container">
                            <div class="legislator-info">
                                <p><strong>{legistlator_details[0]}</strong> - {legistlator_details[3]} - {legistlator_details[4]}</p>
                            </div>
                            <div styles="display: flex; justify-content: center; align-items: center; height: 100%; transform: translateY(-10%);">
                                <img src={ legistlator_details[22]} alt="***" styles="max-width: 100%; max-height: 215px;" />
                            </div>
                        </div>
                        <div class="top-donors">
                            <h2>Top 10 Donors - 2022 Cycle:</h2>
                        <ul>
                            
                            {top_donors.length === 0? "Error": top_donors.map((donor, index) => (
                                <li>
                                    <span class="donor-number">{++index}.</span>
                                    <span class="donor-name">{donor[0]}</span>
                                    <span class="donor-amount">{donor[1]}</span>
                                </li>
                                
                            ))}
                                    
                            </ul>
                        </div>
                </div>
                {/* Donation notice */}
                <p class="donation-notice">*The organizations themselves did not donate, rather the money came from the organization's PAC, its individual members or employees or owners, and those individuals' immediate families.</p>
                {/* Additional notice */}
                <p class="additional-notice">*These are 6-year numbers for senators/Senate candidates; 2-year numbers for representatives/House candidates.</p>
            </div>
        </div>
    );
}

export default LegislatorDetails;