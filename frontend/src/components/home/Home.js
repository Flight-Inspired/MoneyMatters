import React, { useState } from 'react';
import MemberCard from '../memberCard/MemberCard';
import './Home.css';

function Home(props) {
    const [members, setMembers] = useState([]);
    const [stateCode, setStateCode] = useState('');

    const usStateCodes = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    const lowerCaseStateCodes = usStateCodes.map(code => code.toLowerCase());

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (lowerCaseStateCodes.includes(stateCode.toLowerCase())) {
            const searchUrl = `${props.serverUrl}/search?state_code=${stateCode}`;
            // Perform the fetch request with the search URL
            fetch(searchUrl)
                .then((response) => response.json())
                .then((data) => setMembers(data))
                .catch((error) => console.error(error));
        } else {
            // Handle invalid state code
            console.error('Invalid state code');
        }
    };
    
    return (
        <div>
            <h1>MoneyMatters</h1>
            <p>Enter two letter State Codes in search: (i.e. co, wy, nj, ma)</p>

            
            <label htmlFor="state_code">Search by State Code:</label>
            <input type="text" id="state_code" name="state_code" placeholder="Enter a state code" onChange={(e) => setStateCode(e.target.value)} />
            <button type="submit" onClick={handleSearchSubmit}>Search</button>
            

            {/* <!-- Display search results in containers --> */}
            <h2>Search Results:</h2>
            <div styles="display: flex; flex-direction: row; justify-content: space-around; align-items: flex-start; flex-wrap: wrap;">
            
            {members.length === 0 ? (
                <p>Loading...</p>
                ) : (
                members.map((member, index) => (
                    <MemberCard key={index} member={member} />
                ))    
            )}
                
            </div>
        </div>
    );
}

export default Home;