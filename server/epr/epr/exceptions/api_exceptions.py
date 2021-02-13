from rest_framework.exceptions import APIException
from django.http import JsonResponse

class BadJsonException(APIException):
    status_code = 400
    default_detail = "Ill-formated JSON! Please reformat and try again"
    default_code = "bad_json_exception"

class BadMethodException(APIException):
    default_code= "method_not_allowed"
    default_detail = "Unexpected method"
    status_code = 405

    def __init__(self, method_got: str, method_expected: str):  
        BadMethodException.detail = "Expected {} method but got {} method instead".format(method_expected, method_got)


class InternalServerError(APIException):
    default_code = "internal_server_error"
    default_detail = "Unexpected error"
    status_code = 500

def exception_constructor(exception: APIException):
    error_dict = {"error": {"Name": exception.default_code, "Message": exception.detail,
         "Code": exception.status_code}}
    return JsonResponse(error_dict, safe=False, status = exception.status_code)