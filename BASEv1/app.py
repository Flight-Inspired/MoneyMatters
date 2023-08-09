from flask import Flask, render_template, request
from congress_api import get_all_members, insert_members_into_database
from opensecrets_api import insert_legislators_for_all_states
from database_setup import setup_database
from search import search_legislators_by_state
import os, sqlite3

app = Flask(__name__)

# Check if the database file exists before setting up
if not os.path.exists('legislators.db'):
    setup_database()
    insert_legislators_for_all_states()
    all_members_data = get_all_members()
    insert_members_into_database(all_members_data)


# Landing page
@app.route('/', methods=['GET'])
def home():
    search_results = None

    state_code = request.args.get('state_code')
    if state_code:
        search_results = search_legislators_by_state(state_code)

    return render_template('index.html', search_results=search_results)


# Legislator details
@app.route('/legislator/<bioguide_id>', methods=['GET'])
def legislator_details(bioguide_id):
    # Fetch search_results again to ensure it's up-to-date
    search_results = search_legislators_by_state('')  # Fetch all legislators
    
    legislator_details = None
    for result in search_results:
        if result[14] == bioguide_id:
            legislator_details = result
            break
    
    return render_template('legislator_details.html', legislator_details=legislator_details)


if __name__ == '__main__':
    app.run(debug=True)
