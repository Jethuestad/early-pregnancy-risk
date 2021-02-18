from ..services.calculation import Calculation
from ..utilities.request_utils import body_to_dict
from django.views.decorators.csrf import csrf_exempt
from ..utilities.decorators import exception_handler_request
from django.http import JsonResponse
from ..exceptions.api_exceptions import BadMethodException

@csrf_exempt
@exception_handler_request
def get_score(request):
    if request.method != "POST":
        raise BadMethodException(request.method, "POST")

    print(body_to_dict(request))
    json_dict = body_to_dict(request)

    calc = Calculation(json_dict)   # Creates a risk calculation based on userinput
    calc.diabetes                   # Yields the risk of having diabetes based on calculation

    # TODO: Add proper json response
    return JsonResponse(body_to_dict(request), safe=False)

