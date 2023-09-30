#app.py
import json
from congress_api import get_all_members, insert_members_into_database
from database_setup import setup_database
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from opensecrets_api import insert_legislators_for_all_states
from search import search_legislators_by_state, get_top_donors
import os, sqlite3

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
# Check if the database file exists before setting up (This will not populate the full database, only allows for search)
'''if not os.path.exists('legislators.db'):
    setup_database()
    insert_legislators_for_all_states()
    all_members_data = get_all_members()
    insert_members_into_database(all_members_data)
'''

# Landing page
@app.route('/api/search', methods=['GET'])
def home():
    search_results = None
    
    state_code = request.args.get('state_code')
    print("here")
    if state_code:
        search_results = search_legislators_by_state(state_code)
        print(search_results)
        print(type(search_results))

    state_code = request.args.get('name')
    if state_code:
        search_results = search_by_legislator(state_code)
        topdon = get_top_donors(name_to_bioguide_id(state_code))
        return render_template('single_legislator.html', legislator_details=search_results,  top_donors=topdon)

    return jsonify(search_results)


# Legislator details
@app.route('/api/legislator/<bioguide_id>', methods=['GET'])
def legislator_details(bioguide_id):
    # Fetch legislator details from search_results
    search_results = search_legislators_by_state('')
    legislator_details = None
    for result in search_results:
        if result[14] == bioguide_id:
            legislator_details = result
            break
    
    # Fetch top 10 donors for the legislator from the database
    top_donors = get_top_donors(bioguide_id)

    result_dict = {
        "legistlatorDetails": legislator_details,
        "topDonors": top_donors
    }

    return json.dumps(result_dict)

if __name__ == '__main__':
    app.run(debug=True)
