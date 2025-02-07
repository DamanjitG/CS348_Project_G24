import subprocess


def run_sql_script(script_name, **params):
    param_list = [f"{key}={value}" for key, value in params.items()]
    try:
        result = subprocess.run(
            ["python", "runSQL.py", script_name] + param_list,
            check=True,
            capture_output=True,
            text=True,
        )
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while running {script_name}: {e}")
        print(e.stderr)


def create_user_watchlists_table():
    run_sql_script("R8-watchlist/create_tables/create_user_watchlists_table.sql")


def create_watchlist_table():
    run_sql_script("R8-watchlist/create_tables/create_watchlist_table.sql")


def add_to_watchlist(username, watchlist_name, player_id):
    run_sql_script(
        "R8-watchlist/query_templates/add_to_watchlist.sql",
        username=username,
        watchlist_name=watchlist_name,
        pid=player_id,
    )


def add_watchlist(username, watchlist_name):
    run_sql_script(
        "R8-watchlist/query_templates/add_watchlist.sql",
        username=username,
        watchlist_name=watchlist_name,
    )


def delete_from_watchlist(username, watchlist_name, player_id):
    run_sql_script(
        "R8-watchlist/query_templates/delete_from_watchlist.sql",
        username=username,
        watchlist_name=watchlist_name,
        pid=player_id,
    )


def delete_watchlist(username, watchlist_name):
    run_sql_script(
        "R8-watchlist/query_templates/delete_watchlist.sql",
        username=username,
        watchlist_name=watchlist_name,
    )


def get_user_watchlist(username, watchlist_name):
    run_sql_script(
        "R8-watchlist/query_templates/get_user_watchlist.sql",
        username=username,
        watchlist_name=watchlist_name,
    )


# Will only execute if this if file is main so we can use this section for testing/demonstration purposes
if __name__ == "__main__":
    subprocess.run(["python", "createDB.py"], check=True)

    create_user_watchlists_table()
    create_watchlist_table()

    add_watchlist("user1", "watchlist1")
    add_to_watchlist("user1", "watchlist1", 1)
    get_user_watchlist("user1", "watchlist1")
    add_to_watchlist("user1", "watchlist1", 2)
    get_user_watchlist("user1", "watchlist1")

    add_watchlist("user1", "watchlist2")
    add_to_watchlist("user1", "watchlist2", 77)
    get_user_watchlist("user1", "watchlist2")

    get_user_watchlist("user1", "watchlist1")
    get_user_watchlist("user1", "watchlist2")

    add_to_watchlist("user2", "watchlist1", 3)
    add_to_watchlist("user2", "watchlist1", 4)
    get_user_watchlist("user2", "new_watchlist1")

    add_watchlist("user1", "repeat_watchlist_name")
    add_watchlist("user2", "repeat_watchlist_name")

    get_user_watchlist("user1", "watchlist1")
    delete_from_watchlist("user1", "watchlist1", 1)
    get_user_watchlist("user1", "watchlist1")
