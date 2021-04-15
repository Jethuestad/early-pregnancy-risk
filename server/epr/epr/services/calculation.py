from server.epr.epr.services.complications import diabetes, preeclampsia
from ..exceptions.api_exceptions import InternalServerError

class Calculation:
    def __init__(self, json_dict: dict):

        # Add multiple risks here
        self.diabetes = risk_dict_constructor("diabetes", diabetes.calculate(json_dict))
        self.preeclampsia = risk_dict_constructor("preeclampsia", preeclampsia.calculate(json_dict))



def risk_dict_constructor(complication: str, risk_results: dict) -> dict:
    return  {"complication" : complication, "severity": risk_results["severity"], "risk_score": risk_results["risk"]}

