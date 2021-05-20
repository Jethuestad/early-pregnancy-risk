from typing import get_args
from ...exceptions.api_exceptions import InternalServerError


# TODO: This severity_risk is just assumed based on similar models.
# Returning the risk_score and the severity of the risk_score
def placental_abruption_risk(risk_score: int) -> dict:
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
        raise InternalServerError("Invalid score when calculating placental abruption")

    return {"risk": risk_score, "severity": severity, "percent": percent}

# Calculating risk score unique for placental abruption


def calculate(json_dict: dict) -> dict:
    risk_score = 0

    # Hypertension
    if json_dict.get("hypertension"):
        risk_score += 2

    # Preeclampsia
    if json_dict.get("preeclampsia"):
        risk_score += 2

    # Fetal Growth Reduction
    if json_dict.get("fetal_growth_reduction"):
        risk_score += 3

    # Age
    if (age := json_dict.get("age")) == None:
        pass
    elif age >= 35:
        risk_score += 1.5

    # Irregular prenatal care
    if json_dict.get("irregular_prenatal_care"):
        risk_score += 3

    # Parity
    if (parity := json_dict.get("parity")) == None:
        pass
    elif 1 <= parity <= 2:
        risk_score += 2
    elif parity == 3:
        risk_score += 3

    # Anemia
    if (anemia := json_dict.get("anemia")) == None:
        pass
    elif anemia == 0: # Mild anemia
        2
    elif anemia == 1: # Moderate anemia
        3
    elif anemia == 2: # Severe anemia
        5

    # Premature rupture of the membranes
    if json_dict.get("premature_rupture_of_membranes"):
        risk_score += 2

    # Antepartum haemorrhage
    if json_dict.get("antepartum_haemorrhage"):
        risk_score += 25
    
    # Placenta Paevia
    if json_dict.get("placenta_paevia"):
        risk_score += 3

    return placental_abruption_risk(risk_score)
