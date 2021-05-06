from ...exceptions.api_exceptions import InternalServerError
import math


# Returning the risk_score and the severity of the risk_score
def preeclampsia_risk(risk_score: int) -> dict:
    severity = 0
    if 0 <= risk_score < 3:
        severity = 0
    elif 3 <= risk_score < 6:
        severity = 1
    elif 6 <= risk_score <= 9:
        severity = 2
    elif 10 <= risk_score <= 15:
        severity = 3
    elif 15 < risk_score:
        severity = 4
    else:
        raise InternalServerError("Invalid score when calculating preeclampsia")
    
    return {"risk": risk_score, "severity": severity}

# Calculating risk score unique for preeclampsia
def calculate(json_dict: dict) -> dict:
    risk_score = 0

    # Age
    if (age:=json_dict.get("age")) == None:
        pass
    elif age < 36:
        risk_score += 0
    elif 36 <= age <= 44:
        risk_score += (age - 35)
    elif age <= 45:
        risk_score += 10

    # Height (cm)
    if (height:=json_dict.get("height")) == None:
        pass
    elif height >= 184:
        risk_score += 0
    elif 148 <= height <= 183:
        risk_score += math.ceil((184 - height)/2)
    elif height < 148:
        risk_score += 19

    # Ethnicity
    if (ethnicity:=json_dict.get("ethnicity")) == None:
        pass
    elif ethnicity == 2:    # Afro-Caribbean
        risk_score += 13
    elif ethnicity == 3:    # South Asian
        risk_score += 5
    else:                   # Other
        risk_score += 0

    # Chronic hypertension
    if json_dict.get("chronic_hypertension"):
        risk_score += 35

    # Systemic lupus erythematosus or antiphospholipid syndrome
    if json_dict.get("systemic_lupus_erythematosus") or json_dict.get("antiphospholipid_syndrome"):
        risk_score += 15
    
    # Conception by IVF or Spontaneous conception
    if json_dict.get("conception_by_ivf"):
        risk_score += 8

    # Parous with previous PE (PPE)
    if json_dict.get("preeclampsia"):
        risk_score += 39

        # If PPE=1:
        # Gestational age
        if (g_age:=json_dict.get("gestational_age")) == None:
            pass
        elif g_age < 26:
            risk_score += 0
        elif g_age == 26:
            risk_score -= 1
        elif g_age == 27:
            risk_score -= 1
        elif g_age == 28:
            risk_score -= 2
        elif g_age == 29:
            risk_score -= 3
        elif g_age == 30:
            risk_score -= 5
        elif g_age == 31:
            risk_score -= 6
        elif g_age == 32:
            risk_score -= 8
        elif g_age == 33:
            risk_score -= 11
        elif g_age == 34:
            risk_score -= 13
        elif g_age == 35:
            risk_score -= 16
        elif g_age == 36:
            risk_score -= 19
        elif g_age == 37:
            risk_score -= 22
        elif g_age == 38:
            risk_score -= 26
        elif g_age == 39:
            risk_score -= 30
        elif g_age == 40:
            risk_score -= 34
        elif g_age > 40:
            risk_score -= 39

    # Parous with no previous PE
    if json_dict.get("preeclampsia") == False:
        risk_score += 21
    
        # If PPE=0
        # Inter-pregnancy interval (years)
        if (ip_interval:=json_dict.get("interpregnancy_interval")) == None:
            pass
        elif ip_interval == 1:
            risk_score -= 25
        elif ip_interval == 2:
            risk_score -= 21
        elif ip_interval == 3:
            risk_score -= 19
        elif ip_interval == 4:
            risk_score -= 17
        elif ip_interval == 5:
            risk_score -= 16
        elif ip_interval == 6:
            risk_score -= 15
        elif ip_interval == 7:
            risk_score -= 14
        elif 8 <= ip_interval <= 9:
            risk_score -= 13
        elif ip_interval == 10:
            risk_score -= 12
        elif 11 <= ip_interval <= 12:
            risk_score -= 11
        elif 13 <= ip_interval <= 17:
            risk_score -= 10
        elif ip_interval >= 18:
            risk_score -= 9

        # If PPE=0  
        # Gestational age
        if (g_age:=json_dict.get("gestational_age")) == None:
            pass
        elif g_age < 27:
            risk_score += 0
        elif g_age == 27:
            risk_score -= 1
        elif g_age == 28:
            risk_score -= 1
        elif g_age == 29:
            risk_score -= 2
        elif g_age == 30:
            risk_score -= 3
        elif g_age == 31:
            risk_score -= 4
        elif g_age == 32:
            risk_score -= 5
        elif g_age == 33:
            risk_score -= 6
        elif g_age == 34:
            risk_score -= 7
        elif g_age == 35:
            risk_score -= 9
        elif g_age == 36:
            risk_score -= 11
        elif g_age == 37:
            risk_score -= 13
        elif g_age == 38:
            risk_score -= 15
        elif g_age == 39:
            risk_score -= 17
        elif g_age == 40:
            risk_score -= 19
        elif g_age == 41:
            risk_score -= 22
        elif g_age == 42:
            risk_score -= 24
        elif g_age >= 43:
            risk_score -= 27

    
    # Weight (kg)
    if (weight:=json_dict.get("weight")) == None:
        pass
    elif weight < 45:
        risk_score += 0
    elif 45 <= weight <= 119:
        risk_score += math.ceil((weight-44)/3)
    elif weight >= 120:
        risk_score += 26


    # Family history of preeclampsia
    if json_dict.get("preeclampsia_familiy"):
        risk_score += 8

    # Diabetes mellitus type 1 or 2
    if json_dict.get("diabetes"):
        risk_score += 16


    return preeclampsia_risk(risk_score)