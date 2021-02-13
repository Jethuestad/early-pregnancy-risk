import json

def body_to_dict(request) -> dict:
    '''Turns a JSON field in a POST request in to a dictornary'''
    return json.loads(request.body)