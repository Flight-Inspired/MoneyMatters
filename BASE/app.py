from flask import Flask, render_template, request
from congress_api import get_all_members, insert_members_into_database
from opensecrets_api import insert_legislators_for_all_states
from database_setup import setup_database
from search import fetch_us_representatives_data, search_legislators_by_state, is_table_empty  # Import the function from search.py
import os, sqlite3, requests

app = Flask(__name__)

# Check if the database file exists before setting up
if not os.path.exists('legislators.db'):
    setup_database()
    insert_legislators_for_all_states()
    all_members_data = get_all_members()  # Fetch member data from Congress API
    insert_members_into_database(all_members_data)  # Insert member data into the database

def build_us_representatives_dict():
    us_representatives = {}

    try:
        conn = sqlite3.connect('legislators.db')
        c = conn.cursor()

        # Fetch data from the us_representatives table
        c.execute("SELECT bioguide_id, depiction FROM us_representatives")
        rows = c.fetchall()

        # Build the dictionary
        for row in rows:
            bioguide_id = row[0]
            depiction_url = row[1]
            us_representatives[bioguide_id] = {"depiction": depiction_url}

        conn.close()
        return us_representatives
    except sqlite3.Error as e:
        print(f"Error building us_representatives dictionary: {e}")
        return {}

# Landing page
@app.route('/', methods=['GET'])
def home():
    us_representatives = build_us_representatives_dict()
    search_results = None

    state_code = request.args.get('state_code')
    if state_code:
        search_results = search_legislators_by_state(state_code)

    return render_template('index.html', search_results=search_results, us_representatives=us_representatives)

if __name__ == '__main__':
    app.run(debug=True)
