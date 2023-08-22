# MoneyMatters Web App

# Description
The Moneymatters App allows users to search for legislators using a two-letter state code and view detailed information about each legislator, including their top 10 donors. The inspiration for this application started as an exercise in Extract, Transform, and Load principles to establish a relational database that allows the user to derive insight into major donors for individual congressional campaigns. 

## Files and Modules
### `index.html`:
    The landing page of the application uses a search form and dynamically renders results utilizing HTML, inline CSS, and jinja2 templating. Results are displayed on a grid in containers that dynamically route to individual legislator_details.

### `legislator_details.html`:
    This is the template for the legislator_details route when a user clicks on a legislator container from the search results on the landing page. It serves as a landing page to display any number of details about the current legislator. However, the major function of this page currently is to show information about the top 10 donors and respective amounts to the selected candidate.

### `app.py`:
    This is the base application, which will spin up a Flask server and create a database if none exists. This file designates and routes user requests, retrieves legislator data from various sources, handles search queries and renders the corresponding templates. It establishes the backbone of the application's functionality.

### `congress_api.py`:
    Responsible for interacting with the Congress.gov API to gather legislator information. This file and its corresponding data are used to verify a legislator's information and to extract URL information which is used to display photos for every us congressperson.

### `database_setup.py`:
    This file sets up the SQLite relational database for the application. It defines the necessary tables; (`current_legislators`, `us_representatives`, `candidate_summary`, and `candidate_contributions`) to create the legislators.db SQL database, from which relationships are established using foreign key references to (`bioguide_id` and `cid`).

### `opensecrets_api.py`:
    This file calls the OpenSecrets API getLegislators method and returns data for every Senate and House member. The data is then inserted into the `current_legislators` table which is used by the search function to return legislators for an individual state.

### `opensecrets_candcontrib.py`:
    This file extracts detailed contribution data in batches from the OpenSecrets API and inserts it into the candidate_contributions table. It extracts detailed financial information in batches from the OpenSecrets API, transforming the raw XML data into a dictionary format. It then loads the transformed data into the `candidate_contributions` table within the SQLite database.

### `opensecrets_candsummary.py`:
    This file extracts and inserts summary financial data for all current legislators into the `candidate_summary` table. It extracts information in batches from the OpenSecrets API and transforms the raw XML response data into a dictionary format that corresponds to the `candidate_summary` table. The transformed data is then loaded into the appropriate table within the relational database.

### `search.py`:
    This file holds the central search functions for the application. It executes SQL queries within `legislators.db` to quickly retrieve legislator data and contributions.

## Design Choices
- The application uses Flask as the backend framework for simplicity and ease of use to spin up a server.
- Data from Congress.gov and OpenSecrets.com APIs are extracted, transformed, and loaded into a SQLite database for quick and efficient retrieval.
- Batch processing is implemented for fetching contribution data in `opensecrets_candcontrib.py` and summary data in `opensecrets_candsummary.py` to manage API rate limits.
- HTML and CSS templates ensure uniform functionality and search display.
- Jinja2 is used to dynamically display containers for search results.

## Usage
1. Run `app.py` to start the Flask development server.
2. Open your web browser and navigate to the provided local URL.
3. Enter a two-letter state code in the search form and click "Search."
4. View search results on the landing page and click on a legislator to see detailed information.
5. Explore legislator details, including top donors and contribution data.

### Contributors
- [Eddie Garza](eddieg2021@outlook.com)

