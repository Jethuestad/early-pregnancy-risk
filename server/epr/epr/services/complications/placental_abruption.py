from typing import get_args
from ...exceptions.api_exceptions import InternalServerError


# Returning the risk_score and the severity of the risk_score
def placental_abruption_risk(risk_score: int) -> dict:
    # TODO: This needs to be specified.
    return

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
