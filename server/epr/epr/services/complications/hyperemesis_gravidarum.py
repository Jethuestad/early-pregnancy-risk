from typing import get_args
from ...exceptions.api_exceptions import InternalServerError

# TODO: This severity_risk is just assumed based on similar models.
# Returning the risk_score and the severity of the risk_score
def hyperemesis_gravidarum_risk(risk_score: int) -> dict:
    base_risk = 2
    percent = min(100, (base_risk * risk_score))

    severity = 0
    if 0 <= risk_score < 5:
        severity = 0
    elif 5 <= risk_score < 10:
        severity = 1
    elif 10 <= risk_score < 15:
        severity = 2
    elif 15 <= risk_score <= 25:
        severity = 3
    elif 25 < risk_score:
        severity = 4
    else:
        raise InternalServerError("Invalid score when calculating hyperemesis gravidarum")

    return {"risk": risk_score, "severity": severity, "percent": percent}

# Calculating risk score unique for hyperemesis gravidarum
def calculate(json_dict: dict) -> dict:
    risk_score = 0


    # Parity
    if (parity := json_dict.get("parity")) == None:
        pass
    elif parity == 0:
        risk_score += 1.2
    
    # Multiple pregnancies
    if json_dict.get("multiple_pregnancies"):
        risk_score += 2.4

    # Female fetus
    if json_dict.get("female_fetus"):
        risk_score += 1.3
    
    # Pre-pregnancy underweight (BMI)
    if None not in (bmi_info := (json_dict.get("weight"), json_dict.get("height"))):
        bmi = bmi_info[0]/((bmi_info[1]/100)**2)
        if bmi < 18:
            risk_score += 1.2

    # Hyperthyroid disorders
    if json_dict.get("hyperthyroid_disorders"):
        risk_score += 4.5
    
    # Psychiatric illness
    if json_dict.get("psychiatric_illness"):
        risk_score += 4.1

    # Previous molar pregnancy
    if json_dict.get("previous_molar_pregnancy"):
        risk_score += 3.3

    # Preexisting diabetes
    if json_dict.get("diabetes"):
        risk_score += 2.6
    
    # Gastrointestinal disorders
    if json_dict.get("gastrointestinal_disorders"):
        risk_score += 2.5

    # Asthma
    if json_dict.get("asthma"):
        risk_score += 1.5


    return hyperemesis_gravidarum_risk(risk_score)
