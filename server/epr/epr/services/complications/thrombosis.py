from typing import get_args
from ...exceptions.api_exceptions import InternalServerError


# Returning the risk_score and the severity of the risk_score
def thrombosis_risk(risk_score: int) -> dict:
    # TODO: This needs to be specified.
    return

# Calculating risk score unique for thrombosis
def calculate(json_dict: dict) -> dict:
    risk_score = 0


    # Age
    if (age := json_dict.get("age")) == None:
        pass
    elif age > 35:
        risk_score += 2.3

    # Previous caesarean section
    if json_dict.get("previous_caesarean_section"):
        risk_score += 2.8

    # Parity
    if (parity := json_dict.get("parity")) == None:
        pass
    elif parity > 3:
        risk_score += 1.3

    # Ethnicity
    if (ethnicity:=json_dict.get("ethnicity")) == None:
        pass
    elif ethnicity == 1:    # black
        risk_score += 1.6

    # Antepartum haemorrhage
    if json_dict.get("antepartum_haemorrhage"):
        risk_score += 1.6
    
    # Hypertension
    if json_dict.get("hypertension"):
        risk_score += 1.8
    
    # Heart disease
    if json_dict.get("heart_disease"):
        risk_score += 7.1
    
    # Thrombophilia
    if json_dict.get("thrombophilia"):
        risk_score += 51.8

    # History of thrombosis
    if json_dict.get("thrombosis"):
        risk_score += 24.8
    
    # Antiphospholipid syndrome
    if json_dict.get("antiphospholipid_syndrome"):
        risk_score += 15.8
    
    # Sickle cell disease
    if json_dict.get("sickle_cell_disease"):
        risk_score += 6.7

    # Lupus
    if json_dict.get("lupus"):
        risk_score += 8.7
    
    # Diabetes
    if json_dict.get("diabetes"):
        risk_score += 2.0
    
    # Obesity
    if json_dict.get("obesity"):
        risk_score += 4.4
    
    # Smoking
    if json_dict.get("smoking"):
        risk_score += 1.7
    
    # Substance abuse
    if json_dict.get("substance_abuse"):
        risk_score += 1.1


    return thrombosis_risk(risk_score)
