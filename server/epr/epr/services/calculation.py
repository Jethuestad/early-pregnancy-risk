from ..services.complications import diabetes, preeclampsia, preterm_birth, miscarriage, stillbirth, postpartum_depression, caesarean_section
from ..exceptions.api_exceptions import InternalServerError
from ..models import Translation, Complication_Risk


class Calculation:
    def __init__(self, json_dict: dict, language_code: str):
        self.language_code = language_code
        # Add multiple risks here
        self.diabetes = risk_dict_constructor(
            "gestational_diabetes_mellitus", diabetes.calculate(json_dict), language_code)
        self.preeclampsia = risk_dict_constructor(
            "preeclampsia", preeclampsia.calculate(json_dict), language_code)
        self.preterm_birth = risk_dict_constructor(
            "pre-term_birth", preterm_birth.calculate(json_dict), language_code)
        self.miscarriage = risk_dict_constructor(
            "miscarriage", miscarriage.calculate(json_dict), language_code)
        self.stillbirth = risk_dict_constructor(
            "still_birth", stillbirth.calculate(json_dict), language_code)
        self.postpartum_depression = risk_dict_constructor(
            "postpartum_depression", postpartum_depression.calculate(json_dict), language_code)
        self.caesarean_section = risk_dict_constructor(
            "caesarean_section", caesarean_section.calculate(json_dict), language_code)


def risk_dict_constructor(complication: str, risk_results: dict, language_code: str) -> dict:
    translated_comp = Translation.objects.get(
        belongs_to__name=complication, language_code__code=language_code).text
    if translated_comp is None:
        translated_comp = Translation.objects.get(
            belongs_to=complication, language__code="en").text

    if risk_results["severity"] == 0:
        severity = "severity_low"
    elif risk_results["severity"] == 1:
        severity = "severity_increased"
    elif risk_results["severity"] == 2:
        severity = "severity_moderate"
    elif risk_results["severity"] == 3:
        severity = "severity_high"
    elif risk_results["severity"] == 4:
        severity = "severity_very_high"

    severity_string = Translation.objects.get(
        belongs_to__name=severity, language_code__code=language_code).text
    if severity_string is None:
        severity_string = Translation.objects.get(
            belongs_to__name=severity, language_code__code="en").text

    percentage_translated = Translation.objects.get(
        belongs_to__name="percentage_of_pregnancies", language_code__code=language_code).text
    if percentage_translated is None:
        percentage_translated = Translation.objects.get(
            belongs_to__name="percentage_of_pregnancies", language_code__code="en").text

    percentage_risk = Complication_Risk.objects.get(
        related_complication__name=complication, severity="{}".format(risk_results["severity"])).percentage

    return {"complication": translated_comp, "severity_str": severity_string, "severity": risk_results["severity"], "risk_str": "{} {}".format(percentage_risk, percentage_translated), "risk_score": risk_results["risk"]}
