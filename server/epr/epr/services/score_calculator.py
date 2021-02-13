from ..utilities.request_utils import request_to_dict

def get_score(request):
    print(request_to_dict(request, "data"))