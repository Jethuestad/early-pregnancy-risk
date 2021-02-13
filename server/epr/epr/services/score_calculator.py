from ..utilities.request_utils import body_to_dict
from django.views.decorators.csrf import csrf_exempt
from ..utilities.decorators import exception_handler_request
from django.http import JsonResponse
from ..exceptions.api_exceptions import BadMethodException

@csrf_exempt
@exception_handler_request
def get_score(request):
    print("Hey")
    if request.method != "POST":
        raise BadMethodException(request.method, "POST")

    print(body_to_dict(request))

    return JsonResponse(body_to_dict(request), safe=False)

