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


def create_watchlist_table():
    run_sql_script("R8-watchlist/create_watchlist_table.sql")


def add_to_watchlist(username, player_id):
    run_sql_script(
        "R8-watchlist/add_to_watchlist.sql", username=username, pid=player_id
    )


def delete_from_watchlist(username, player_id):
    run_sql_script(
        "R8-watchlist/delete_from_watchlist.sql", username=username, pid=player_id
    )


def get_user_watchlist(username):
    run_sql_script("R8-watchlist/get_user_watchlist.sql", username=username)


# Will only execute if this if file is main so we can use this section for testing/demonstration purposes
if __name__ == "__main__":
    subprocess.run(["python", "createDB.py"], check=True)

    create_watchlist_table()
    add_to_watchlist("user1", 1)
    print("Watchlist for user1 after adding player 1:")
    get_user_watchlist("user1")
    delete_from_watchlist("user1", 1)
    print("Watchlist for user1 after removing player 1:")
    get_user_watchlist("user1")


