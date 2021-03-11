from ..models import Translation
from ..models import Language
from ..utilities.request_utils import standard_json_response
from ..utilities.decorators import exception_handler_request
from ..exceptions.api_exceptions import InternalServerError
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@exception_handler_request
def question_translation(request, lang_code: str):
    return translation_handler(lang_code, "Question")

@csrf_exempt
@exception_handler_request
def text_translation(request, lang_code: str):
    return translation_handler(lang_code, "Text")

def translation_handler(lang_code: str, content_type: str):
    # Two lines to make it less ugly. Querying is not actually done before accessing the object.
    # Hence no performance loss
    queried_objects = Translation.objects.filter(language_code__code=lang_code)
    queried_objects = queried_objects.filter(belongs_to__content_type=content_type)

    # Should only happen when a user submits an invalid country code
    if len(queried_objects) == 0:
        raise InternalServerError(custom_msg="Invalid country code")

    translation = {"translation": {"country_code":lang_code}}
    # Properly format the queried objects and add them to dictionary
    for queried_object in queried_objects:
        translation["translation"][queried_object.belongs_to.name] = queried_object.text

    return standard_json_response(True, translation)