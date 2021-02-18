from ..utilities.request_utils import json_request_to_dict
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
    
    answer_dict = json_request_to_dict(request, valid_json_format_calc)
    # TODO: Add proper json response
    return JsonResponse(answer_dict, safe=False)