from typing import get_args
from ...exceptions.api_exceptions import InternalServerError


# Returning the risk_score and the severity of the risk_score
def antepartum_haemorrhage_risk(risk_score: int) -> dict:
    # TODO: This needs to be specified.
    return

# Calculating risk score unique for antepartum haemorrhage
def calculate(json_dict: dict) -> dict:
    risk_score = 0


    # Age
    if (age := json_dict.get("age")) == None:
        pass
    elif age > 35:
        risk_score += 4

    # Previous caesarean section
    if json_dict.get("previous_caesarean_section"):
        risk_score += 4.7

    # Previous abortion
    if json_dict.get("abortion"):
        risk_score += 2

    # Education
    if not json_dict.get("higher_education"):
        risk_score += 1.7

    # Family history of G6PD
    if json_dict.get("family_g6pd"):
        risk_score += 1.9

    # Family history of down syndrome
    if json_dict.get("family_down_syndrome"):
        risk_score += 1.9


    return antepartum_haemorrhage_risk(risk_score)
