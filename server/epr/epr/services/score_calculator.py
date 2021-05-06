from ..utilities.json_utils import json_request_to_dict
from ..services.calculation import Calculation
from django.views.decorators.csrf import csrf_exempt
from ..utilities.decorators import exception_handler_request
from ..exceptions.api_exceptions import BadMethodException
from ..utilities.calculator_json_format import valid_json_format_calc
from ..utilities.request_utils import standard_json_response

@csrf_exempt
@exception_handler_request
def get_score(request, lang_code):
    if request.method != "POST":
        raise BadMethodException(request.method, "POST")

    json_dict = json_request_to_dict(request, valid_json_format_calc)

    calc = Calculation(json_dict, lang_code)   # Creates a risk calculation based on userinput

    diabetes = calc.diabetes
    preeclampsia = calc.preeclampsia
    preterm_birth = calc.preterm_birth
    miscarriage = calc.miscarriage
    stillbirth = calc.stillbirth
    postpartum_depression = calc.postpartum_depression
    caesarean_section = calc.caesarean_section


    response = []
    response.append(diabetes)
    response.append(preeclampsia)
    response.append(preterm_birth)
    response.append(miscarriage)
    response.append(stillbirth)
    response.append(postpartum_depression)
    response.append(caesarean_section)
    
    # TODO: Add proper json response
    return standard_json_response(True, response)