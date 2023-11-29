import React from 'react';
import VizCollapse from '../tableau/VizCollapse';

// thumbnails
import allCandidateHeatmapThumb from '../../assets/thumbnails/heatmap_candidate_thumbnail.PNG';
import topDemocraticDonations from '../../assets/thumbnails/top_10_democratic.png';
import topRepublicanDonations from '../../assets/thumbnails/top_10_republican.png';
import campaignOperatingExpendituresThumbnail from '../../assets/thumbnails/campaign_operating_expendatures.png';
import radialOperatingExpendituresThumbnail from '../../assets/thumbnails/radial_operating_expendatures.png';
import radialLegislatorsThumbnail from '../../assets/thumbnails/radial_individual_contributions.png';
import debtByPartyThumbnail from '../../assets/thumbnails/debt_by_party.png';
import houseSenateContributionsThumbnail from '../../assets/thumbnails/contribution_for_all_house_senate_campaigners.png';
import topCandidatesByDonationThumbnail from '../../assets/thumbnails/top_10_by_committe_donations.png';
import candidateCampaignSpendingThumbnail from '../../assets/thumbnails/total_candidate_campaign_spending.png';
import totalCityStateThumbnail from '../../assets/thumbnails/total_transation_grouped_citystate.png';
import variousCityAmountsThumbnail from '../../assets/thumbnails/transaction_amount_cities.png';
import amountExpentitureThumbnail from '../../assets/thumbnails/amount_campaign_expendature_purpose.png';

function AllCandidates(props) {
    const visuals = [
        {
            name: "HeatMap of Candidates",
            thumbnail: allCandidateHeatmapThumb,
            url: "https://public.tableau.com/views/Cand-to-Itcon-HeatmapBoxplot/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link",
            startOpen: true
        },
        {
            name: "Top Democratic Donations",
            thumbnail: topDemocraticDonations,
            url: "https://public.tableau.com/views/DemocratCommittees/DemCommitteesbyOccupationDB?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Top Republican Donations",
            thumbnail: topRepublicanDonations,
            url: "https://public.tableau.com/views/RepublicanCommittees/RepCommitteesDB?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Top 10 Candidates by Committee Donations",
            thumbnail: topCandidatesByDonationThumbnail,
            url: "https://public.tableau.com/views/CandidatesbyCommitteeDonations/CandidatesDB?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Campaign Operating Expenditures",
            thumbnail: campaignOperatingExpendituresThumbnail,
            url: "https://public.tableau.com/views/OperatingExp/Expenses?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Radial Operating Expenditures",
            thumbnail: radialOperatingExpendituresThumbnail,
            url: "https://public.tableau.com/views/RADIAL-OperatingExp/RADIAL-OperatingExp?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Radial Indiviual Contributions",
            thumbnail: radialLegislatorsThumbnail,
            url: "https://public.tableau.com/views/Radial-Legislators/aa?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Debt by Party",
            thumbnail: debtByPartyThumbnail,
            url: "https://public.tableau.com/views/DebtIndivCont/DebtbyParty?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Contribution for all House and Senate Campaigns",
            thumbnail: houseSenateContributionsThumbnail,
            url: "https://public.tableau.com/views/HouseSenateContributionsbyState/Bad?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Total Candidate Campaign Spending",
            thumbnail: candidateCampaignSpendingThumbnail,
            url: "https://public.tableau.com/views/Book2_17006317242920/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Transaction Amount of Various Cities",
            thumbnail: variousCityAmountsThumbnail,
            url: "https://public.tableau.com/views/Book3_17011498508890/Dashboard2?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Amount of Each Campaign Expentiture Purpose",
            thumbnail: amountExpentitureThumbnail,
            url: "https://public.tableau.com/views/Book4_17011509296500/Dashboard3?:language=en-US&:display_count=n&:origin=viz_share_link"
        },
        {
            name: "Transaction Amounts by City and State",
            thumbnail: totalCityStateThumbnail,
            url: "https://public.tableau.com/views/Book5_17012088956690/Dashboard4?:language=en-US&:display_count=n&:origin=viz_share_link"
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