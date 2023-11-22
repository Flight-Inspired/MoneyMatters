import React from 'react';

function About(props) {

    return (
        <div className='container-fluid m-auto pt-3 ' style={{'maxWidth': 800 +'px'}}>
            <div className='mission-statement'>
                <h3 className='h3'>Mission Statement:</h3>
                <p>Our mission is to empower citizens with accessible, comprehensive insights into the financial dynamics of political campaigns. We believe in the democratization of information, ensuring that the intricate flow of money in politics is transparent and understandable for all. By analyzing data made available from Congress.gov, FEC.gov, and OpenSecrets.org, we aim to show the relationships between candidates, committees, PACs, and individual donors, fostering an informed electorate that can advocate for integrity and accountability in the political process.</p>
            </div>
            <div className='about-team'>
                <h3 className='h3'>About the Team:</h3>
                <p>Welcome to ElectSum, a collaborative initiative to bridge the gap between complex campaign finance data and public knowledge. Our goal is to make the realm of campaign finance as simple reading the daily news.</p>
                <p>Our team is a diverse mix of Computer Information Systems and Computer Science disciplines, united by a common goal, transparency in campaign finance. Our computer science professionals deliver a cutting-edge tech stack that enables our computer information systems analysts to extract and deliver insightful visual narratives that incite the story behind the numbers and encourage our users to ask more.</p>
                <p>We meticulously process and present our analytics in a user-friendly environment, highlighting the financial patterns that shape the United States political landscape. Our work is more than an academic pursuit; it is a public service, one that fosters an understanding of how money flows through politics.</p>
                <p>At ElectSum, we don't just crunch numbers; we decode the language of political finance. Join us on this journey of discovery and enlightenment as we endeavor to make a difference, one data point at a time.</p>
            </div>
        </div>
    );
}

export default About;