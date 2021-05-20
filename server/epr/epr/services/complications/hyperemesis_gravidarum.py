from typing import get_args
from ...exceptions.api_exceptions import InternalServerError


# Returning the risk_score and the severity of the risk_score
def hyperemesis_gravidarum_risk(risk_score: int) -> dict:
    # TODO: This needs to be specified.
    return

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
