#search.py
import sqlite3

def search_legislators_by_state(state_code):
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    state_code = f'%{state_code}%'
    c.execute('''
        SELECT current_legislators.*, candidate_summary.chamber, us_representatives.depiction 
        FROM current_legislators
        LEFT JOIN us_representatives ON current_legislators.bioguide_id = us_representatives.bioguide_id
        LEFT JOIN candidate_summary ON current_legislators.cid = candidate_summary.cid
        WHERE current_legislators.office LIKE ?
    ''', (state_code,))
    search_results = c.fetchall()

    conn.close()

    return search_results

def name_to_bioguide_id(name):
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    name = f'%{name}%'
    c.execute('''
        SELECT current_legislators.bioguide_id
        FROM current_legislators
        WHERE current_legislators.lastname LIKE ? OR current_legislators.firstlast LIKE ?
    ''', (name, name))
    search_results = c.fetchall()

    conn.close()

    return search_results

def name_search(name):
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    name = f'%{name}%'
    c.execute('''
        SELECT current_legislators.*, candidate_summary.chamber, us_representatives.depiction
        FROM current_legislators
        LEFT JOIN us_representatives ON current_legislators.bioguide_id = us_representatives.bioguide_id
        LEFT JOIN candidate_summary ON current_legislators.cid = candidate_summary.cid
        WHERE current_legislators.lastname LIKE ? OR current_legislators.firstlast LIKE ?
    ''', (name, name))
    search_results = c.fetchall()

    conn.close()

    return search_results


def search_by_company(name):
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    name = f'%{name}%'
    c.execute('''
        SELECT current_legislators.*, candidate_summary.chamber, us_representatives.depiction
        FROM candidate_contributions
        LEFT JOIN current_legislators ON candidate_contributions.cid = current_legislators.cid
        LEFT JOIN us_representatives ON current_legislators.bioguide_id = us_representatives.bioguide_id
        LEFT JOIN candidate_summary ON current_legislators.cid = candidate_summary.cid
        WHERE candidate_contributions.org_name LIKE ? OR candidate_contributions.org_name LIKE ?
    ''', (name, name))

    search_results = c.fetchall()

    print(search_results)

    conn.close()

    return search_results
    


def get_top_donors(bioguide_id):
    try:
        conn = sqlite3.connect('legislators.db')
        c = conn.cursor()

        # Fetch the associated cid using the provided bioguide_id
        c.execute('SELECT cid FROM current_legislators WHERE bioguide_id = ?', (bioguide_id,))
        result = c.fetchone()

        if result:
            cid = result[0]  # Extract the cid from the result

            # Fetch the top 10 donors for the retrieved cid, sorted by total amount
            c.execute('''
                SELECT org_name, total
                FROM candidate_contributions
                WHERE cid = ?
                ORDER BY total DESC
                LIMIT 10
            ''', (cid,))
            top_donors = c.fetchall()
            print(top_donors)

            # Sort the top donors in descendeing order
            sorted_top_donors = sorted(top_donors, key=lambda x: int(x[1]), reverse=True)

            # Format donor amounts with commas
            formatted_top_donors = [(donor[0], '$ {:,.0f}'.format(int(donor[1]))) for donor in sorted_top_donors]

            conn.close()
            return formatted_top_donors
        else:
            print("Legislator not found.")
            conn.close()
            return []

    except sqlite3.Error as e:
        print(f"Error fetching top donors: {e}")
        return []

