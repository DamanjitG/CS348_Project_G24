import sqlite3



def get_all_testdb():
    conn = sqlite3.connect('m1.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM TESTDB")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows


def get_all_users():

    conn = sqlite3.connect('m1.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM Users")
    rows = cursor.fetchall()

    cursor.close()
    conn.close()
    return rows


if __name__ == "__main__":
    testDb = get_all_testdb()
    users = get_all_users()
    
    print("The TESTDB Table is:")
    for row in testDb:
        print(row)

    print("\nThe Users Table is:")
    for row in users:
        print(row)
