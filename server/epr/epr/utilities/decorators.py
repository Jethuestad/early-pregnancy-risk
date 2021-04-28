from ..exceptions.api_exceptions import InternalServerError, exception_response_constructor
from rest_framework.exceptions import APIException
import logging
logger = logging.getLogger("django.request")

def exception_handler_request(function, *args, **kwargs):
    '''This decorator handles otherwise unhandled errors and returns a generic error message'''
    def _function(request, *args, **kwargs):
        try:
            return function(request, *args, **kwargs)

        except APIException as handled_exception:
            logger.warning("\nip:{}\n\nendpoint:{}\nstack trace:{}".format(request.META.get('REMOTE_ADDR'), request.headers ,handled_exception), exc_info=1)
            return exception_response_constructor(handled_exception)

        except Exception as unhandled_exception:
            logger.error("\nip:{}\nbody:{}\nendpoint:{}\nstack trace:{}".format(request.META.get('REMOTE_ADDR'), request.body,request.headers ,unhandled_exception), exc_info=1)
            return exception_response_constructor(InternalServerError())
    return _function