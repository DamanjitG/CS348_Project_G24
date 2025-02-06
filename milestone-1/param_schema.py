from typing import Any, Callable


class Parameter:
    def __init__(self, name: str, param_type: Callable[[str], Any]):
        self.name = name
        self.type = param_type


PARAM_SCHEMA = {"username": Parameter("username", str), "pid": Parameter("pid", int)}

def parse_params(args):
    params = {}
    for arg in args:
        if "=" not in arg:
            raise ValueError(f"Invalid parameter format: '{arg}'. Expected key=value.")
        key, value = arg.split("=", 1)
        key = key.strip()
        value = value.strip()

        if key in PARAM_SCHEMA:
            expected_type = PARAM_SCHEMA[key].type
            try:
                if expected_type is int:
                    converted_value = int(value)
                elif expected_type is float:
                    converted_value = float(value)
                elif expected_type is str:
                    converted_value = value
                else:
                    converted_value = value
            except ValueError:
                raise ValueError(
                    f"Invalid value for {key}: '{value}'. Expected type {expected_type.__name__}."
                )

            params[key] = converted_value
        else:
            raise ValueError(
                f"Unexpected parameter: '{key}'. Please update PARAM_SCHEMA if this is a valid parameter."
            )
    return params


def load_query(sql_file):
    try:
        with open(sql_file, "r") as query_file:
            return query_file.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"SQL file '{sql_file}' does not exist.")
