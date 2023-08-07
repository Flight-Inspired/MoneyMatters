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

        conn.commit()
        conn.close()
        print("Database setup completed.")
    except sqlite3.Error as e:
        print(f"Error setting up the database: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    setup_database()
