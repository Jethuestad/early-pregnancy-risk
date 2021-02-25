import json
from ..exceptions.api_exceptions import BadJsonException
from django.http import JsonResponse

def json_request_to_dict(request, valid_format: dict) -> dict:
    '''Turns a JSON field in a POST request in to a dictornary'''
    try:
        request_dict = json.loads(request.body)
    except:
        raise BadJsonException()

    if len(request_dict) != len(valid_format):
        print("Invalid length of dict")
        raise BadJsonException()
    
    for key, value in request_dict.items():
        if key not in valid_format:
            print("The key \"{}\" should not exist".format(key))
            raise BadJsonException()

        if type(value) != valid_format[key]:
            print("Invalid type of element located in {}. Should be {} but is {}"
                .format(key, valid_format[key], type(value)))
            raise BadJsonException()
    
    return request_dict