from ..utilities.request_utils import body_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from ..exceptions.api_exceptions import *

@csrf_exempt
def get_score(request):
    try:
        print(body_to_dict(request))
    except:
        raise bad_json_exception()
    return HttpResponse("{}".format(body_to_dict(request)))

