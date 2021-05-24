from typing import get_args
from ...exceptions.api_exceptions import InternalServerError

# TODO: This calculation model is not fully completed. It is missing some factors and the severity model is not accurate.

# Returning the risk_score and the severity of the risk_score
def placenta_praevia_risk(risk_score: int) -> dict:
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
        raise InternalServerError("Invalid score when calculating placenta praevia")

    return {"risk": risk_score, "severity": severity, "percent": percent}


# Calculating risk score unique for placenta praevia
def calculate(json_dict: dict) -> dict:
    risk_score = 0


    # Maternal age
    if (maternal_age := json_dict.get("maternal_age")) == None:
        pass
    elif maternal_age > 39:
        risk_score += 9

    # Parity
    if (parity := json_dict.get("parity")) == None:
        pass
    elif 1 <= parity <= 4:
        risk_score += 1.4
    elif parity > 4:
        risk_score += 3.5

    # Multiparity
    if (multiparity := json_dict.get("multiparity")) == None:
        pass
    elif multiparity > 4:
        risk_score += 2.3
    elif multiparity > 1:
        risk_score += 1.9

    # Previous caesarean section
    if json_dict.get("previous_caesarean_section"):
        risk_score += 2.7
    
    # Abortion
    if json_dict.get("abortion"):
        risk_score += 1.9

    # Alcohol during pregnancy
    if (alcohol := json_dict.get("alcohol")) == None:
        pass
    elif alcohol > 0:
        risk_score += 1.6
    
    # Gynacological diseases
    if json_dict.get("gynacological_diseases"):
        risk_score += 2.4
    
    # Smoking and cocaine use during pregnancy
    if json_dict.get("smoking") and json_dict("cocaine"):
        risk_score += 1.6

    # TODO: These last 3 factors need to be implemented
    # Previous history of evacuation of the uterus or dilation and curettage
    
    # Delivery by caesarean section in previous pregnancy 

    # Recurrent vaginal bleeding during the current pregnancy

    return placenta_praevia_risk(risk_score)
