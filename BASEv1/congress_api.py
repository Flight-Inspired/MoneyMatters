import requests
import sqlite3
import os

API_KEY = "4Rb41QsJD8yDY1L8UHcqMZ5TLKHgGpb9yHLHtVWW"


# Fetches information about all members of the U.S. Congress using the Congress.gov API with pagination.
def get_all_members():
    url = f"https://api.congress.gov/v3/member?api_key={API_KEY}"
    offset = 0
    limit = 250
    all_members = []

    while True:
        params = { # Parameter packet for api request
            "format": "json",
            "offset": offset,
            "limit": limit
        }

        response = requests.get(url, params=params)
        data = response.json()

        if "members" in data:
            all_members.extend(data["members"])

        if len(data["members"]) < limit:
            break

        offset += limit
        print(offset, "members entered into us_representatives")

    return all_members


def insert_members_into_database(all_members_data):
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    for member_data in all_members_data:
        # Check if the member_data is not empty
        if member_data:
            bioguide_id = member_data.get("bioguideId")
            depiction_data = member_data.get("depiction")
            depiction_url = depiction_data.get("imageUrl") if depiction_data else None  # Get the image URL if available
            district = member_data.get("district")
            raw_name = member_data.get("name")  # Get the raw name dictionary
            name = normalize_name(raw_name)  # Normalize the name
            party_name = member_data.get("partyName")
            state = member_data.get("state")
            terms = str(member_data.get("terms"))
            update_date = member_data.get("updateDate")
            url = member_data.get("url")

            # Check if the record with the given bioguide_id already exists in the database
            c.execute("SELECT COUNT(*) FROM us_representatives WHERE bioguide_id=?", (bioguide_id,))
            result = c.fetchone()

            if result[0] == 0:
                # If the record does not exist, insert it into the database
                c.execute('''INSERT INTO us_representatives (
                                bioguide_id, depiction, district, name, partyName,
                                state, terms, updateDate, url
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                            (bioguide_id, depiction_url, district, name, party_name, state, terms, update_date, url))

    conn.commit()
    conn.close()


def normalize_name(name):
    if name is None:
        return None

    # Split the name into parts and remove suffixes
    name_parts = name.split(", ")
    last_name = name_parts[0]
    first_name_parts = name_parts[1].split(" ")
    first_name = first_name_parts[0]
    if len(first_name_parts) > 1:
        middle_name = first_name_parts[1]
        normalized_name = f"{first_name} {middle_name} {last_name}"
    else:
        normalized_name = f"{first_name} {last_name}"

    return normalized_name

if __name__ == "__main__":
    all_members_data = get_all_members()
    insert_members_into_database(all_members_data)
