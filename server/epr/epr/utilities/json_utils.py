import json
from ..exceptions.api_exceptions import BadJsonException
from django.http import JsonResponse


def json_request_to_dict(request, valid_format: dict) -> dict:
    '''Turns a JSON field in a POST request in to a dictornary'''
    try:
        request_dict = json.loads(request.body)
    except:
        raise BadJsonException()

    # TODO: This is just so things work, should be removed at some point.
    return request_dict

    # if len(request_dict) > len(valid_format):
    #     raise BadJsonException("JSON object too large")

    validated_dict = {}
    valid_format_copy = valid_format.copy()

    for key, value in request_dict.items():
        if key not in valid_format_copy:
            raise BadJsonException(f"Unknown key ({key}) in the JSON object")

        if type(value) != valid_format_copy[key]:
            raise BadJsonException("Invalid type of element located at key '{}'. Should be of type {}."
                                   .format(key, valid_format_copy[key]))

        validated_dict[key] = value
        # In case the same entry appears more than once
        del valid_format_copy[key]

    return validated_dict
