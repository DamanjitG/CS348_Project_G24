import sqlite3, sys

if __name__ == "__main__":
    if len(sys.argv) == 2:
        sqlFilename = sys.argv[1]
    else:
        raise ValueError("Usage: python runSQL.py {filename.sql}")
    
    with open(sqlFilename, 'r') as queryFile:
        query = queryFile.read()
    
    conn = sqlite3.connect('m1.db')
    cursor = conn.cursor()

    queryOutput = cursor.execute(query).fetchall()
    columnNames = [description[0] for description in cursor.description]

    print(f"\nQuery returned {len(queryOutput)} row(s)")
    print(', '.join(columnNames)) 
    
    for outputRow in queryOutput:
        print(outputRow)

    # Close the cursor
    cursor.close()
    conn.close()