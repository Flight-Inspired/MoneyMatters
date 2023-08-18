import sqlite3

def setup_database():
    try:
        conn = sqlite3.connect('legislators.db')
        c = conn.cursor()

        # Create the current_legislators table (if not exists)
        c.execute('''
            CREATE TABLE IF NOT EXISTS current_legislators (
                cid TEXT PRIMARY KEY,
                firstlast TEXT,
                lastname TEXT,
                party TEXT,
                office TEXT,
                gender TEXT,
                firstelectoff TEXT,
                exitcode TEXT,
                comments TEXT,
                phone TEXT,
                fax TEXT,
                website TEXT,
                webform TEXT,
                congress_office TEXT,
                bioguide_id TEXT,
                votesmart_id TEXT,
                feccandid TEXT,
                twitter_id TEXT,
                youtube_url TEXT,
                facebook_id TEXT,
                birthdate TEXT
            )
        ''')

        # Create the us_representatives table (if not exists)
        c.execute('''
            CREATE TABLE IF NOT EXISTS us_representatives (
                bioguide_id TEXT PRIMARY KEY,
                depiction TEXT,
                district TEXT,
                name TEXT,
                partyName TEXT,
                state TEXT,
                terms TEXT,
                updateDate TEXT,
                url TEXT,
                FOREIGN KEY (bioguide_id) REFERENCES current_legislators (bioguide_id)
            )
        ''')

        # Create the candidate_summary table (if not exists)
        c.execute('''
            CREATE TABLE IF NOT EXISTS candidate_summary (
                id INTEGER PRIMARY KEY,
                cid TEXT,
                cand_name TEXT,
                cycle TEXT,
                state TEXT,
                party TEXT,
                chamber TEXT,
                first_elected TEXT,
                next_election TEXT,
                total TEXT,
                spent TEXT,
                cash_on_hand TEXT,
                debt TEXT,
                origin TEXT,
                source TEXT,
                last_updated TEXT,
                FOREIGN KEY (cid) REFERENCES current_legislators (cid),
                UNIQUE (cid, cycle) ON CONFLICT IGNORE
            )
        ''')

        # Create the candidate_contributions table (if not exists)
        c.execute('''
            CREATE TABLE IF NOT EXISTS candidate_contributions (
                id INTEGER PRIMARY KEY,
                cid TEXT,
                cycle TEXT,
                cand_name TEXT,
                origin TEXT,
                source TEXT,
                notice TEXT,
                org_name TEXT,
                total TEXT,
                pacs TEXT,
                indivs TEXT,
                FOREIGN KEY (cid) REFERENCES current_legislators (cid),
                UNIQUE (cid, cycle, org_name) ON CONFLICT IGNORE
            )
        ''')

        conn.commit()
        conn.close()
        print("Database setup completed.")
    except sqlite3.Error as e:
        print(f"Error setting up the database: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    setup_database()
