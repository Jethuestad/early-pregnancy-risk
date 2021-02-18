from ..utilities.request_utils import json_request_to_dict
from ..services.calculation import Calculation
from django.views.decorators.csrf import csrf_exempt
from ..utilities.decorators import exception_handler_request
from django.http import JsonResponse
from ..exceptions.api_exceptions import BadMethodException
from ..utilities.calculator_json_format import valid_json_format_calc

@csrf_exempt
@exception_handler_request
def get_score(request):
    if request.method != "POST":
        raise BadMethodException(request.method, "POST")

    print(json_request_to_dict(request, valid_json_format_calc))
    json_dict = json_request_to_dict(request, valid_json_format_calc)
    calc = Calculation(json_dict)   # Creates a risk calculation based on userinput
    calc.diabetes                   # Yields the risk of having diabetes based on calculation
    # TODO: Add proper json response
    return JsonResponse(answer_dict, safe=False)