import json
from ..exceptions.api_exceptions import BadJsonException

def body_to_dict(request) -> dict:
    '''Turns a JSON field in a POST request in to a dictornary'''
    try:
        return json.loads(request.body)
    except:
        raise BadJsonException()