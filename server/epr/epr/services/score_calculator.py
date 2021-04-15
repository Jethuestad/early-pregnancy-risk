from server.epr.epr.services.complications.preeclampsia import preeclampsia_risk
from ..utilities.json_utils import json_request_to_dict
from ..services.calculation import Calculation
from django.views.decorators.csrf import csrf_exempt
from ..utilities.decorators import exception_handler_request
from ..exceptions.api_exceptions import BadMethodException
from ..utilities.calculator_json_format import valid_json_format_calc
from ..utilities.request_utils import standard_json_response

@csrf_exempt
@exception_handler_request
def get_score(request):
    if request.method != "POST":
        raise BadMethodException(request.method, "POST")

    json_dict = json_request_to_dict(request, valid_json_format_calc)
    calc = Calculation(json_dict)   # Creates a risk calculation based on userinput
    diabetes = calc.diabetes
    diabetes1 = calc.diabetes1
    preeclampsia = calc.preeclampsia

    response = []
    response.append(diabetes)
    response.append(diabetes1)
    #response.append(preeclampsia) | The calculation contains questions that is not yet implemented
    
    # TODO: Add proper json response
    return standard_json_response(True, response)