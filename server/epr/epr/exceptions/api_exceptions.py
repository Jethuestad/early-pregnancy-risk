from django.core.exceptions import ValidationError
def bad_json_exception():
    raise ValidationError("Ill-formed JSON. Please reformat and try again.")