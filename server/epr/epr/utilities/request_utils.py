from typing import Union
from django.http import JsonResponse


def standard_json_response(success: bool, payload: Union[dict, list], status_code=200):
    response = {"success": success}
    if not success:
        response["error"] = payload
    else:
        response["payload"] = payload
    return JsonResponse(response, safe=False, status=status_code)
