from ..exceptions.api_exceptions import internal_server_error

def safe_fail_request(function):
    '''This decorator handles otherwise unhandled errors and returns a generic error message'''
    def _function(request, *args, **kwargs):
        try:
            return function(request)
        except:
            return internal_server_error()
    return _function