import React, { useState } from "react";
import "./Home.css";
import CardGrid from "../cardGrid/CardGrid";
import Select from "react-select";

function Home(props) {
  const [members, setMembers] = useState([]);
  const [stateCode, setStateCode] = useState("");

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
    { value: "Individual", label: "Individual" },
  ];

  const lowerCaseStateCodes = usStateCodes.map((code) => code.toLowerCase());

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
    console.log(selectedOption.value);
    if (selectedOption.value === "State") {
      handleStateCodeSearch();
    } else if (selectedOption.value === "Company") {
      handleCompanySearch();
    } else if (selectedOption.value === "Individual") {
      handleIndividualSearch();
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
        <h2 className="col-11">Search Results:</h2>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          {members.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <CardGrid members={members} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
