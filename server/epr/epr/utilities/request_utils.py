import json

def request_to_dict(request, field_name: str) -> dict:
    '''Turns a JSON field in a POST request in to a dictornary'''
    return json.loads(request.POST[field_name])