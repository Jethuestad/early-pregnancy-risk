from django.http import JsonResponse

def bad_json_exception():
    return _exception_constructor("bad_json_exception", "Ill-formated JSON! Please reformat and try again", 400)

def _exception_constructor(error_name: str, error_msg: str, error_code: int):
    error_dict = {"Error": {"Name": error_name, "Message": error_msg, "Code": error_code}}
    return JsonResponse(error_dict, safe=False, status = error_code)