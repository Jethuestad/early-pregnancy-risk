from ..exceptions.api_exceptions import InternalServerError, exception_response_constructor
from rest_framework.exceptions import APIException

def exception_handler_request(function):
    '''This decorator handles otherwise unhandled errors and returns a generic error message'''
    def _function(request, *args, **kwargs):
        try:
            return function(request)

        except APIException as handled_exception:
            print("Caught exception!\n{}".format(handled_exception))
            return exception_response_constructor(handled_exception)

        except Exception as unhandled_exception:
            # TODO: Implement proper logging
            print("Uncaught exception! \n{}".format(unhandled_exception))
            return exception_response_constructor(InternalServerError())
    return _function