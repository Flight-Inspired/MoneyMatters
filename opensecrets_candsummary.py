#opensecrets_candsummary.py
import requests, sqlite3, time
import xml.etree.ElementTree as ET
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENSECRETS_API_KEY")

# New hosts will need to create last_batch_cid_index_summary.txt if they intend to batch data
CYCLES_TO_FETCH = ["2022"]
BATCH_SIZE = 2  # Adjust as needed

def fetch_candidate_summary(cid, year):
    api_url = f"{API_BASE_URL}?method=candSummary&cid={cid}&cycle={year}&apikey={API_KEY}"
    response = requests.get(api_url)
    
    try:
        response.raise_for_status()
        root = ET.fromstring(response.content)

        if root.tag == "response":
            summary = root.find("summary")
            if summary is not None:
                candidate_summary = {
                    "cid": summary.get("cid"),
                    "cand_name": summary.get("cand_name"),
                    "cycle": summary.get("cycle"),
                    "state": summary.get("state"),
                    "party": summary.get("party"),
                    "chamber": summary.get("chamber"),
                    "first_elected": summary.get("first_elected"),
                    "next_election": summary.get("next_election"),
                    "total": summary.get("total"),
                    "spent": summary.get("spent"),
                    "cash_on_hand": summary.get("cash_on_hand"),
                    "debt": summary.get("debt"),
                    "origin": summary.get("origin"),
                    "source": summary.get("source"),
                    "last_updated": summary.get("last_updated")
                }
                return candidate_summary
            else:
                print("Summary element not found in the response.")
                return None
        else:
            print("Response data structure doesn't match expected format.")
            print("Response content:", response.text)
            return None
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            print(f"No data found for CID {cid} in cycle {year}")
            return None
        else:
            print(f"An error occurred: {e}")
            return None


def insert_candidate_summary_into_db(c, candidate_summary):
    try:
        # Check if the combination of cid and cycle already exists in the database
        c.execute("SELECT 1 FROM candidate_summary WHERE cid = ? AND cycle = ?", (candidate_summary['cid'], candidate_summary['cycle']))
        existing_data = c.fetchone()

        if not existing_data:
            c.execute(
                "INSERT INTO candidate_summary (cid, cand_name, cycle, state, party, chamber, first_elected, next_election, total, spent, cash_on_hand, debt, origin, source, last_updated) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    candidate_summary["cid"],
                    candidate_summary["cand_name"],
                    candidate_summary["cycle"],
                    candidate_summary["state"],
                    candidate_summary["party"],
                    candidate_summary["chamber"],
                    candidate_summary["first_elected"],
                    candidate_summary["next_election"],
                    candidate_summary["total"],
                    candidate_summary["spent"],
                    candidate_summary["cash_on_hand"],
                    candidate_summary["debt"],
                    candidate_summary["origin"],
                    candidate_summary["source"],
                    candidate_summary["last_updated"]
                )
            )
            print(f"Candidate summary data inserted for {candidate_summary['cand_name']} in cycle {candidate_summary['cycle']}")
        else:
            print(f"Data already exists for {candidate_summary['cand_name']} in cycle {candidate_summary['cycle']}. Skipping insertion.")
    except Exception as e:
        print(f"An error occurred while inserting data: {e}")


def main():
    try:
        conn = sqlite3.connect("legislators.db")
        c = conn.cursor()

        c.execute("SELECT cid FROM current_legislators")
        cids = c.fetchall()

        last_cid_index = 0
        try:
            with open("last_batch_cid_index_summary.txt", "r") as file:
                last_cid_index = int(file.read().strip())
        except (FileNotFoundError, ValueError):
            last_cid_index = 0

        cycle = CYCLES_TO_FETCH[0]  # Assuming only one cycle in the list
        remaining_cids = cids[last_cid_index:last_cid_index + BATCH_SIZE]

        for cid in remaining_cids:
            print(f"Fetching candidate summary data for CID {cid[0]} in cycle {cycle}")
            candidate_summary = fetch_candidate_summary(cid[0], cycle)

            if candidate_summary:
                insert_candidate_summary_into_db(c, candidate_summary)
                last_cid_index += 1  # Increment by 1 for successful insertion

            conn.commit()
            print("Batch of data fetched and inserted.")

            with open("last_batch_cid_index_summary.txt", "w") as file:
                file.write(str(last_cid_index))
            time.sleep(1)  # Delay between API requests

        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()