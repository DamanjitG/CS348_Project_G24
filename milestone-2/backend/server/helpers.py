

def serialize_output(cur):
    return [dict((cur.description[i][0], val) for i, val in enumerate(row)) for row in cur.fetchall()]