from typing import get_args
from ...exceptions.api_exceptions import InternalServerError
import math


# Returning the risk_score and the severity of the risk_score
def stillbirth_risk(risk_score: int) -> dict:
    severity = 0
    if 0 <= risk_score < 3:
        severity = 0
    elif 3 <= risk_score < 6:
        severity = 1
    elif 6 <= risk_score <= 9:
        severity = 2
    elif risk_score >= 10:
        severity = 3
    else:
        raise InternalServerError("Invalid score when calculating still-birth")
    
    return {"risk": risk_score, "severity": severity}

# Calculating risk score unique for still-birth
def calculate(json_dict: dict) -> dict:
    risk_score = 0

    # Gestational time in weeks
    if (gestatioal_age:=json_dict.get("gestational_age")) == None:
        pass
    elif gestatioal_age > 41:
        risk_score += 4

    # Sex
    if json_dict.get("sex") == 0:
        risk_score += 1.1

    # Age
    if (age:=json_dict.get("age")) == None:
        pass
    elif age > 19:
        risk_score += 2
    elif age > 44:
        risk_score += 2.5

    # Infection (Syphilis, Malaria)
    if (json_dict.get("infection")):
        risk_score += 2.5

    # Ethnicity
    if (ethnicity:=json_dict.get("ethnicity")) == None:
        pass
    elif ethnicity == 1 or ethnicity == 2:    # black or afro-caribbean
        risk_score += 2.5

    # Parity
    if not json_dict.get("parity") == 0:
        risk_score += 1.5
    
    # BMI
    if None not in (bmi_info:=(json_dict.get("weight"), json_dict.get("height"))):
        bmi = bmi_info[0]/((bmi_info[1]/100)**2)
        if bmi > 30:
            risk_score += 1.5
        elif bmi > 40:
            risk_score += 2.5

    # Smoking
    if json_dict.get("smoking"):
        risk_score += 1.5

    # chronic hypertnesion
    if json_dict.get("chronic_hypertension"):
        risk_score += 2.5

    # GDM
    if json_dict.get("gdm"):
        risk_score += 2.5

    # Preeclampsia or eclampsia
    if json_dict.get("preeclampsia") or json_dict.get("eclampsia"):
        risk_score += 1.5
    
    # Rhesus deisease
    if json_dict.get("rhesus_disease"):
        risk_score += 1.2

    return stillbirth_risk(risk_score)