import sqlite3

# Function to fetch data from the us_representatives table
def fetch_us_representatives_data():
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    c.execute("SELECT bioguide_id, depiction FROM us_representatives")
    us_representatives_data = c.fetchall()

    conn.close()

    return us_representatives_data

def search_legislators_by_state(state_code):
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    state_code_pattern = f'%{state_code}%'
    c.execute("SELECT * FROM current_legislators WHERE office LIKE ?", (state_code_pattern,))
    search_results = c.fetchall()

    conn.close()

    print("Search Results:", search_results)  # Add this print statement

    return search_results

def is_table_empty(table_name):
    conn = sqlite3.connect('legislators.db')
    c = conn.cursor()
    c.execute(f'SELECT COUNT(*) FROM {table_name}')
    result = c.fetchone()[0]
    conn.close()
    return result == 0