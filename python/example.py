#!/usr/bin/env python3

import json
from check import check_site

def load_queries(filename):
    with open(filename, "r") as file:
        queries = json.load(file)
        return queries

def query_to_args(query):
    args = []
    args.append(query["url"])
    args.append(query["selector"])
    args.append(query["attribute"])
    args.append(query.get("index", -1))
    args.append(query.get("format", "{url}[:]"))
    args.append(query.get("debug", False))

    return args

if __name__ == "__main__":
    queries = load_queries("queries.json")

    for query in queries:
        args = query_to_args(query)
        state = check_site(*args)
        print(query["name"], ": ", state, sep="");

