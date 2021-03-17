from django.db.models.manager import BaseManager
from ..models import Factor, Translation
from ..utilities.request_utils import standard_json_response
from ..utilities.decorators import exception_handler_request
from ..exceptions.api_exceptions import InternalServerError
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@exception_handler_request
def get_factors(request, lang_code: str):
    return factor_handler(lang_code)


def serialize_factor(factor: Factor, questions: BaseManager, lang_code: str, isSubfactor: bool = False) -> dict:

    # Factors which have a parent factor should not be added.
    if factor.parent_factor != None and not isSubfactor:
        return None

    # Find all questions which belong to this factor
    question = questions.filter(belongs_to=factor.question)

    if (len(question) != 1):
        return None

    # Find all factors which has this factor as a parent
    queried_sub_factors = Factor.objects.filter(
        parent_factor=factor)

    sub_factors = [serialize_factor(f, questions, lang_code, True)
                   for f in queried_sub_factors]

    return {
        "factor": factor.factor_name,
        "question": question.first().text,
        "answertype": factor.answertype.type,
        "skippable": factor.skippable,
        "maxdigits": factor.max_digits,
        "requirement": factor.requirement,
        "subfactors": sub_factors

    }


def factor_handler(lang_code: str):
    queried_objects = Factor.objects.all()
    questions = Translation.objects.filter(
        language_code__code=lang_code)

    json = {"factors": []}

    # Properly format the queried objects and add them to dictionary
    for queried_object in queried_objects:
        if ((factor := serialize_factor(queried_object, questions, lang_code)) != None):
            json["factors"].append(factor)

    return standard_json_response(True, json)
