from django.http import JsonResponse

def standard_json_response(success: bool, payload: dict, status_code=200):
    response = {"success": success}
    if not success:
        response["error"] = payload
    else:
        response["payload"] = payload
    print(response)
    return JsonResponse(response, safe=False, status=status_code)