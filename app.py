#app.py
from congress_api import get_all_members, insert_members_into_database
from database_setup import setup_database
from flask import Flask, render_template, request
from opensecrets_api import insert_legislators_for_all_states
from search import search_legislators_by_state, get_top_donors, search_by_legislator, name_to_bioguide_id
import os, sqlite3

app = Flask(__name__)

# Check if the database file exists before setting up (This will not populate the full database, only allows for search)
'''if not os.path.exists('legislators.db'):
    setup_database()
    insert_legislators_for_all_states()
    all_members_data = get_all_members()
    insert_members_into_database(all_members_data)
'''

# Landing page
@app.route('/', methods=['GET'])
def home():
    search_results = None
    
    state_code = request.args.get('state_code')
    if state_code and len(state_code) == 2:
        search_results = search_legislators_by_state(state_code)
        print(search_results)
        print(type(search_results))
        return render_template('index.html', search_results=search_results)
    else:
        #In this case state_code is a name
        #Line below could be buggy
        if isinstance(state_code, str):
            search_results=search_by_legislator(state_code)
            topdon = get_top_donors(name_to_bioguide_id(state_code))
            print(search_results)
            #search_results[-1] = get_lesislator_picture(name_to_bioguide_id(state_code))

            return render_template('single_legislator.html', legislator_details=search_results,  top_donors=topdon)
    return render_template('index.html', search_results=search_results)
    

    

# Legislator details
@app.route('/legislator/<bioguide_id>', methods=['GET'])
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
    return render_template('legislator_details.html', legislator_details=legislator_details, top_donors=top_donors)

def get_lesislator_picture(bio_id):
    conn = sqlite3.connect('legislators.db')
    c = conn.cursor()
    bio_id = bio_id[0]
    c.execute("SELECT depiction FROM us_representatives WHERE bioguide_id = ?", (bio_id,))
    pic_url = c.fetchone()[0]
    conn.close()
    return pic_url

if __name__ == '__main__':
    app.run(debug=True)
