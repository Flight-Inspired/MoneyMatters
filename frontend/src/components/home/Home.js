import React, { useState } from "react";
import "./Home.css";
import CardGrid from "../cardGrid/CardGrid";
import DonoGrid from "../cardGrid/donoGrid";
import Select from "react-select";
import { indvResults } from "../indvResults/indvResults";

function Home(props) {
  const [members, setMembers] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [error, setError] = useState(false);
  const [donationData, setDonationData] = useState([]);

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

  const handleCitizenSearch = () => {
    const params = stateCode;
    //separate the name and city, first by a comma, then a space. The name will be the first element in the array, the city will be the second
    const name = params.split(", ")[0];
    const city = params.split(", ")[1];

    let person_obj = {
      name: name,
      city: city,
      top_donors: [],
    };

    const url = `https://api.open.fec.gov/v1/schedules/schedule_a/?contributor_name=${name}&contributor_city=${city}&is_individual=true&contributor_type=individual&per_page=10&sort=-contribution_receipt_amount&sort_hide_null=true&sort_null_only=false&api_key=${process.env.REACT_APP_FEC_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          setError(true);
        } else {
          data.results.map((result) => {
            person_obj.top_donors.push([
              result.committee.name,
              result.contribution_receipt_amount,
            ]);
          });
          setDonationData(person_obj);
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleStateCodeSearch = () => {
    if (lowerCaseStateCodes.includes(stateCode.toLowerCase())) {
      const searchUrl = `${props.serverUrl}/search?state_code=${stateCode}`;
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
    if (selectedOption === null) {
      return;
    }
    setMembers([]);
    setDonationData([]);
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

  return (
    <div className="container-fluid grid pt-4">
      <div className="row">
        <h1 className="col-12 text-center">MoneyMatters</h1>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <p className="col-6">
          Enter two letter State Codes in search: (i.e. co, wy, nj, ma)
        </p>
        <div className="col-3"></div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <form class="d-flex col-6" role="search">
          <Select options={options} onChange={handleChange} />
          <input
            class="form-control me-2"
            type="search"
            id="state_code"
            name="state_code"
            placeholder="Search here"
            aria-label="Search"
            onChange={(e) => setStateCode(e.target.value)}
          />
          <button
            class="btn btn-outline-success"
            type="submit"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </form>
        <div className="col-3"></div>
      </div>

      <div className="row">
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          {members.length === 0 ? (
            donationData.length === 0 ? (
              <p>No results found</p>
            ) : (
              <DonoGrid members={donationData} />
            )
          ) : (
            <CardGrid members={members} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
