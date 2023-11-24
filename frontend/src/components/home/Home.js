import React, { useState } from "react";
import "./Home.css";
import CardGrid from "../cardGrid/CardGrid";
import DonoGrid from "../cardGrid/donoGrid";
import Select from "react-select";
import { indvResults } from "../indvResults/indvResults";
import Tableau from "tableau-react";

function Home(props) {
  const [members, setMembers] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [searchedState, setSearchedState] = useState(false);
  const [error, setError] = useState(false);
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const usStateCodes = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  //store the current option selected when onChange is triggered
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const options = [
    { value: "State", label: "State" },
    { value: "Company", label: "Company" },
    { value: "Legislator", label: "Legislator" },
    { value: "Individual", label: "Individual" },
  ];

  const lowerCaseStateCodes = usStateCodes.map((code) => code.toLowerCase());

  const handleCitizenSearch = async () => {
    const params = stateCode;
    const name = params.split(", ")[0];
  
    let person_obj = {
      name: name,
      top_donors: [],
    };
  
    let last_index = null;
    let last_contribution_receipt_date = null;
    let total_count = null;
    let per_page = 100;
    let page = 1;
  
    while (true) {
      let url = `https://api.open.fec.gov/v1/schedules/schedule_a/?contributor_name=${name}&is_individual=true&contributor_type=individual&per_page=${per_page}&sort=-contribution_receipt_amount&sort_hide_null=true&sort_null_only=false&api_key=${process.env.REACT_APP_FEC_API_KEY}`;
  
      if (last_index && last_contribution_receipt_date) {
        url += `&last_index=${last_index}&last_contribution_receipt_amount=${Number(last_contribution_receipt_date)}`;
        console.log(url);
      }
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results.length === 0) {
        setError(true);
        break;
      } else {
        data.results.map((result) => {
          person_obj.top_donors.push([
            result.committee.name,
            result.contribution_receipt_amount,
            result.contribution_receipt_date,
            result.contributor_city,
            result.contributor_state,
          ]);
  
            last_index = data.pagination.last_indexes.last_index;
            last_contribution_receipt_date = data.pagination.last_indexes.last_contribution_receipt_amount;
          
        });
  
        setDonationData(person_obj);
      }
  
      total_count = data.pagination.total_count;
      if (page * per_page >= total_count) {
        break;
      }
      page++;
    }
  };

  const handleStateCodeSearch = () => {
    if (lowerCaseStateCodes.includes(stateCode.toLowerCase())) {
      const searchUrl = `${props.serverUrl}/search?state_code=${stateCode}`;
      
      setSearchedState(true);
      // Perform the fetch request with the search URL
      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => setMembers(data))
        .catch((error) => console.error(error));
    } else {
      // Handle invalid state code
      const searchUrl = `${props.serverUrl}/search?name=${stateCode}`;
    }

  };

  const handleCompanySearch = () => {
    const searchUrl = `${props.serverUrl}/search?company=${stateCode}`;
    // Perform the fetch request with the search URL
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error(error));

  };

  const handleIndividualSearch = () => {
    const searchUrl = `${props.serverUrl}/search?name=${stateCode}`;
    // Perform the fetch request with the search URL
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error(error));
      
  
  };

    const handleSearchSubmit = (event) => {
    event.preventDefault();
    setDonationData([]);
    setMembers([]);
    if (selectedOption === null) {
      handleStateCodeSearch(); // defaults to state code
      return;
    }
    if (selectedOption.value === "State") {
      handleStateCodeSearch();
    } else if (selectedOption.value === "Company") {
      handleCompanySearch();
    } else if (selectedOption.value === "Legislator") {
      handleIndividualSearch();
    } else if (selectedOption.value === "Individual") {
      handleCitizenSearch();
      }
  };

  const getPlaceholderValue = () => {
    if (selectedOption === null) return "i.e. co, wy, nj"; // defaults to

    if (selectedOption.value === 'State') {
      return "i.e. co, wy, nj";
    } else if (selectedOption.value === 'Company') {
      return "Company name...";
    } else if (selectedOption.value === 'Legislator') {
      return "Legislator name..."
    } else if (selectedOption.value == 'Individual'){
      return "i.e John Smith"
    } else {
      return "Search...";
    }
  };

  return (
    <div className="container-fluid grid pt-4">
      <div className="row">
        <h1 className="col-12 text-center">ElectSum</h1>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <p className="col-6" style={ { textAlign: 'center' } }>
          Enter two letter State Codes in search: (i.e. co, wy, nj, ma)
        </p>
        <div className="col-3"></div>
      </div>
      <div className="row">

        <form class="d-flex col-6 form_container" role="search">  
          <div class="form_container_upper">
            <input
              class="form-control me-2 search_bar"
              type="search"
              id="state_code"
              name="state_code"
              placeholder={getPlaceholderValue()}
              aria-label="Search"
              onChange={(e) => {
                setStateCode(e.target.value); 
                setSearchedState(false);
              }}
            />

            <button
              class="btn btn-outline-success search_btn"
              type="submit"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
          </div>

          <Select
            defaultValue={{ label: "State", value: 0 }}
            options={options} 
            onChange={handleChange} 
            className="search_dropdown"
          />
        </form>

      </div>

      <div className="row">
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-12 text-center">

          {
            loading ? (
              <p>Loading...</p>
            ) : (
              members.length === 0 ? (
                donationData.length === 0 ? (
                  <p>No results found</p>
                ) : (
                  <DonoGrid members={donationData} />
                )
              ) : (
                <CardGrid members={members} />
              )
            )
          }
        </div>
      </div>
      <div class="heatmap_container">
        <HeatMap searchedState={searchedState} setSearchedState={setSearchedState} state={stateCode} />
      </div>
    </div>
  );
}

function HeatMap(props) {
  const url = "https://public.tableau.com/views/Dash-2_16999301904860/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link";

  const filters = {
      "Cand Office St": props.state.toUpperCase()
  };

  const options = {
      hideTabs: true,
      hideToolbar: true
  };
  
  if (props.searchedState) {
    return (
      <Tableau
        url={url}
        options={options}
        filters={filters}
      />
   );
  } else {
    return null;
  }
}


export default Home;
