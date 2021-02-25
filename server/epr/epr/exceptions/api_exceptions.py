from rest_framework.exceptions import APIException
from ..utilities.request_utils import standard_json_response

class BadJsonException(APIException):
    status_code = 400
    default_detail = "Ill-formated JSON! Please reformat and try again"
    default_code = "bad_json_exception"
    
    def __init__(self, custom_msg = None):
        if custom_msg is not None:
            BadJsonException.detail = custom_msg
        else:
            BadJsonException.detail = self.default_detail

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

    def __init__(self, custom_msg = None):
        if custom_msg is not None:
            InternalServerError.detail = custom_msg
        else:
            InternalServerError.detail = self.default_detail

def exception_response_constructor(exception: APIException):
    error_dict ={"Name": exception.default_code, "Message": exception.detail,
         "Code": exception.status_code}
    return standard_json_response(False, error_dict, status_code = exception.status_code)