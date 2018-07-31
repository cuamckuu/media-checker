#!/usr/bin/env python3

from bs4 import BeautifulSoup as Soup
from urllib.request import urlopen
from argparse import ArgumentParser
import re

def parse_args():
    parser = ArgumentParser()
    parser.add_argument("-u", "--url", dest="url", required=True,
                        help="Enter URL to comix page with nav element.")

    parser.add_argument("-s", "--selector", dest="selector", required=True,
                        help="Enter CSS selector to get all nav elements.")

    parser.add_argument("-a", "--attribute", dest="attribute", required=True,
                        help="Enter element's attribute to compare with.")

    parser.add_argument("-i", "--index", dest="index", type=int, default=-1,
                        help="Enter element's index to compare with.")

    parser.add_argument("-f", "--format", dest="format",
                        help="Enter format of string to compare with index-th element, you can use '{url}' with Pythonic slices like '[start:end]'")

    parser.add_argument("-d", "--debug", dest="debug", action="store_true",
                        help="Enables debug mode to see format and comparsions.")

    return vars(parser.parse_args())

def process_str(url, format):
    if format:
        regexp = re.compile("\{url\}\[(-?\d*)?:(-?\d*)?\]")
        fmt = regexp.search(format)

        if fmt:
            start = fmt.group(1) or  0
            end   = fmt.group(2) or -1
            start, end = int(start), int(end)

            full_match = fmt.group(0)
            format = format.replace(full_match, url[start:end])

        return format
    else:
        return url

def check_site(url, selector, attribute, index, format, debug):
    try:
        soup = Soup(urlopen(url), "lxml")
        links = soup.select(selector)
    except:
        return "[Error] Can't load site."
    else:
        query_str = links[index]
        if attribute == "innerHTML":
            query_str = query_str.text
        else:
            query_str = query_str[attribute]

        formated_str = process_str(url, format)

        if debug:
            print("Comparsion is: ", query_str, "==", formated_str)

        state = not (query_str == formated_str)

        if state:
            return True, query_str
        else:
            return False, ""

if __name__ == "__main__":
    args = parse_args()
    url = args["url"]
    selector = args["selector"]
    attribute = args["attribute"]
    compare_index = args["index"]
    format = args.get("format", None)
    debug = args.get("debug", False)

    state = check_site(url, selector, attribute,
                       compare_index, format, debug)
    print(state)
