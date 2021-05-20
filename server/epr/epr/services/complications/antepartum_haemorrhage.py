from typing import get_args
from ...exceptions.api_exceptions import InternalServerError

# TODO: This severity_risk is just assumed based on similar models.
# Returning the risk_score and the severity of the risk_score
def antepartum_haemorrhage_risk(risk_score: int) -> dict:
    base_risk = 3
    percent = min(100, (base_risk * risk_score))

    severity = 0
    if 0 <= risk_score < 4:
        severity = 0
    elif 4 <= risk_score < 8:
        severity = 1
    elif 8 <= risk_score < 12:
        severity = 2
    elif 12 <= risk_score <= 20:
        severity = 3
    elif 20 < risk_score:
        severity = 4
    else:
        raise InternalServerError("Invalid score when calculating antepartum haemorrhage")

    return {"risk": risk_score, "severity": severity, "percent": percent}

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
