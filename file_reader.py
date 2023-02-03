import json
def readFile(filename):
    '''Reads a JSON file and returns the contents as an object/dictionary'''
    with open(filename) as file:
        return json.load(file)