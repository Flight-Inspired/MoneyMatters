#opensecrets_candcontrib.py
import requests, sqlite3, time
import xml.etree.ElementTree as ET
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENSECRETS_API_KEY")

# New hosts will need to create last_batch_cid_index.txt if they intend to batch data
CYCLES_TO_FETCH = ["2022"]
BATCH_SIZE = 185 # Adjustable as needeed

def fetch_candidate_contributions(cid, cycle):
    api_url = f"{API_BASE_URL}?method=candContrib&cid={cid}&cycle={cycle}&apikey={API_KEY}"
    response = requests.get(api_url)

    try:
        response.raise_for_status()
        root = ET.fromstring(response.content)

        if root.tag == "response":
            contributors = root.find("contributors")
            cand_name = contributors.get("cand_name")
            origin = contributors.get("origin")
            source = contributors.get("source")
            notice = contributors.get("notice")

            if contributors is not None:
                contribution_elements = contributors.findall("contributor")
                contributions = []
                for contribution in contribution_elements:
                    contribution_info = {
                        "cand_name": cand_name,
                        "origin": origin,
                        "source": source,
                        "notice": notice,
                        "org_name": contribution.get("org_name"),
                        "total": contribution.get("total"),
                        "pacs": contribution.get("pacs"),
                        "indivs": contribution.get("indivs")
                    }
                    contributions.append(contribution_info)

                return contributions
            else:
                print("Contributors not found in the response.")
                return None
        else:
            print("Response data structure doesn't match expected format.")
            print("Response content:", response.text)
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None



def insert_candidate_contributions_into_db(c, cid, cycle, contributions):
    try:
        for contribution in contributions:
            c.execute(
                "INSERT INTO candidate_contributions (cid, cycle, cand_name, origin, source, notice, org_name, total, pacs, indivs) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    cid,
                    cycle,
                    contribution["cand_name"],
                    contribution["origin"],
                    contribution["source"],
                    contribution["notice"],
                    contribution["org_name"],
                    contribution["total"],
                    contribution["pacs"],
                    contribution["indivs"]
                )
            )
        print(f"Candidate contribution data inserted for CID {cid} in cycle {cycle}")
    except Exception as e:
        print(f"An error occurred while inserting data: {e}")
        print("Data:", cid, cycle, contribution)

        # Print the API response content for debugging
        response_content = fetch_candidate_contributions(cid, cycle)
        if response_content:
            print("API Response Content:")
            print(response_content)


def main():
    try:
        conn = sqlite3.connect("legislators.db")
        c = conn.cursor()

        c.execute("SELECT cid FROM current_legislators")
        cids = c.fetchall()

        # Determine where the last batch left off
        last_cid_index = 0
        try:
            with open("last_batch_cid_index.txt", "r") as file:
                last_cid_index = int(file.read().strip())
        except (FileNotFoundError, ValueError):
            # If the file doesn't exist or contains invalid data, start from the beginning
            last_cid_index = 0

        # Iterate through batches starting from the last batch
        for cycle in CYCLES_TO_FETCH:
            print(f"Fetching candidate contribution data for one batch in cycle {cycle}")
            remaining_cids = cids[last_cid_index:]  # Start from the last batch's index

            for batch_start in range(0, len(remaining_cids), BATCH_SIZE):
                batch_cids = remaining_cids[batch_start:batch_start + BATCH_SIZE]

                for cid in batch_cids:
                    contributions = fetch_candidate_contributions(cid[0], cycle)

                    if contributions:
                        insert_candidate_contributions_into_db(c, cid[0], cycle, contributions)
                    
                    time.sleep(1)  # Introduce a delay between API requests

                    #print("Data fetched from API:")
                    #print(f"CID: {cid[0]}, Cycle: {cycle}, Contribution:", contributions)

                last_cid_index += BATCH_SIZE  # Update the last batch's index
                with open("last_batch_cid_index.txt", "w") as file:
                    file.write(str(last_cid_index))

                print("One batch of data fetched and inserted.")

                break  # Exit the loop after one batch

        conn.commit()
        conn.close()

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
