from ...exceptions.api_exceptions import InternalServerError


# Returning the risk_score and the severity of the risk_score
def caesearean_delivery_risk(risk_score: int) -> dict:
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
        raise InternalServerError("Invalid score when calculating caesarean delivery")
    
    return {"risk": risk_score, "severity": severity}

# Calculating risk score unique for caesarean delivery
def calculate(json_dict: dict) -> dict:
    risk_score = 0

    # Age
    if (age:=json_dict.get("age")) == None:
        pass
    elif age > 35:
        risk_score += 1.5
    elif age > 37:
        risk_score += 2
    elif age > 40:
        risk_score += 2.5

    # Height (cm)
    if (height:=json_dict.get("height")) == None:
        pass
    elif height < 157:
        risk_score += 1.5
    elif height < 153:
        risk_score += 2
    elif height < 149:
        risk_score += 3
    elif height < 144:
        risk_score += 6

    # Gestational time in weeks
    if (gestatioal_age:=json_dict.get("gestational_age")) == None:
        pass
    elif gestatioal_age > 41:
        risk_score += 1.5

    # Sex
    if json_dict.get("sex") == 0:
        risk_score += 1.2

    return caesearean_delivery_risk(risk_score)