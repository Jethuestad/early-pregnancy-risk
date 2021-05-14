from django.db.models.manager import BaseManager
from ..models import Factor, FactorValue, Translation, Reference
from ..utilities.request_utils import standard_json_response
from ..utilities.decorators import exception_handler_request
from ..exceptions.api_exceptions import InternalServerError
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@exception_handler_request
def get_factors(request, lang_code: str):
    return factor_handler(lang_code)


@csrf_exempt
@exception_handler_request
def get_references(request, lang_code: str, factor_name_query: str):
    complications = Factor.objects.get(
        factor_name=factor_name_query).complications.all()
    response = []
    for complication in complications:
        reference_dict = {"references": []}
        trans_complication = Translation.objects.get(
            belongs_to=complication, language__code=lang_code)

        if trans_complication is None:
            continue

        reference_dict["name"] = trans_complication.text
        references = Reference.objects.filter(related_disease=complication)

        for reference in references:
            reference_dict["references"].append(reference.reference_string)

        response.append(reference_dict)

    return standard_json_response(True, response)


def serialize_factor_value(factor_value: FactorValue, lang_code: str) -> list:

    factor_value_content = Translation.objects.filter(
        belongs_to=factor_value.content).first()
    if (factor_value_content != None):
        return [factor_value_content.text, factor_value.value]


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

    queried_factor_values = FactorValue.objects.filter(belongs_to=factor)
    multiple_choices = []
    for fv in queried_factor_values:
        choice = serialize_factor_value(fv, lang_code)
        if (choice != None):
            multiple_choices.append(choice)

    return {
        "factor": factor.factor_name,
        "question": question.first().text,
        "answertype": factor.answertype.type,
        "values": multiple_choices,
        "unit": factor.unit,
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
