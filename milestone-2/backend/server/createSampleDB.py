import sqlite3
import createDB 

conn = sqlite3.connect('SAMPLEDB.sqlite')
createDB.initialize_db(conn, sample=True)

conn.close()
