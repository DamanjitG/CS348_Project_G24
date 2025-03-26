def dict_from_row(row, cursor):
    if not row:
        return None
    return {description[0]: value for description, value in zip(cursor.description, row)}

def serialize_output(cur):
    return [dict((cur.description[i][0], val) for i, val in enumerate(row)) for row in cur.fetchall()]