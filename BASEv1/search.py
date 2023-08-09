import sqlite3

def search_legislators_by_state(state_code):
    conn = sqlite3.connect("legislators.db")
    c = conn.cursor()

    state_code_pattern = f'%{state_code}%'
    c.execute('''
        SELECT current_legislators.*, us_representatives.depiction
        FROM current_legislators
        LEFT JOIN us_representatives ON current_legislators.bioguide_id = us_representatives.bioguide_id
        WHERE current_legislators.office LIKE ?
    ''', (state_code_pattern,))
    search_results = c.fetchall()

    conn.close()

    return search_results

def is_table_empty(table_name):
    conn = sqlite3.connect('legislators.db')
    c = conn.cursor()
    c.execute(f'SELECT COUNT(*) FROM {table_name}')
    result = c.fetchone()[0]
    conn.close()
    return result == 0