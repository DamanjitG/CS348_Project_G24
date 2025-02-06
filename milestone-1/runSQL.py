import sqlite3, sys
from param_schema import parse_params, load_query

if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise ValueError("Usage: python runSQL.py {filename.sql} param1=value1 ... paramK=valueK")
    
    sqlFilename, params = sys.argv[1], sys.argv[2:]
    
    try:
        params = parse_params(params)
    except ValueError as ve:
        print(f"Parameter Parsing Error: {ve}")
        sys.exit(1)

    query = load_query(sqlFilename)
    
    conn = sqlite3.connect('m1.db')
    cursor = conn.cursor()

    try:
        cursor.execute(query, params)
        conn.commit()

        if cursor.description:
            queryOutput = cursor.fetchall()
            columnNames = [description[0] for description in cursor.description]
            
            print(f"\nQuery returned {len(queryOutput)} row(s)")
            print(', '.join(columnNames)) 
            
            for outputRow in queryOutput:
                print(outputRow)
        else:
            print("\nQuery executed successfully")
            print(f"Rows affected: {cursor.rowcount}")
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        cursor.close()
        conn.close()
