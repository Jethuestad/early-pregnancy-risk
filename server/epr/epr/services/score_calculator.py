from ..utilities.request_utils import body_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from ..exceptions.api_exceptions import *

@csrf_exempt
def get_score(request):
    if request.method != "POST":
        return bad_method_exception(request.method, "POST")

    try:
        print(body_to_dict(request))
    except:
        return bad_json_exception()

    return JsonResponse(body_to_dict(request), safe=False)

