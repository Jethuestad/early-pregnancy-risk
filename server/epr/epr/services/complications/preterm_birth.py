from ...exceptions.api_exceptions import InternalServerError


# Returning the risk_score and the severity of the risk_score
def preterm_birth_risk(risk_score: int) -> dict:
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
        raise InternalServerError("Invalid score when calculating spontaneous pre-term delivery")
    
    return {"risk": risk_score, "severity": severity}

# Calculating risk score unique for spontaneous pre-term delivery
def calculate(json_dict: dict) -> dict:
    risk_score = 0

    # Age
    if (age:=json_dict.get("age")) == None:
        pass
    elif age < 35:
        risk_score += 1.4
    
    # Ethnicity
    if (ethnicity:=json_dict.get("ethnicity")) == None:
        pass
    elif ethnicity == 1:    # black
        risk_score += 1.4

    # BMI
    if None not in (bmi_info:=(json_dict.get("weight"), json_dict.get("height"))):
        bmi = bmi_info[0]/((bmi_info[1]/100)**2)
        if bmi < 18.5:
            risk_score += 1.3
        elif 30 <= bmi <= 35: 
            risk_score += 1.6
        elif 35 <= bmi <= 40:
            risk_score += 2
        elif bmi > 40:
            risk_score += 3

    # Smoking
    if json_dict.get("smoking"):
        risk_score += 1.4
    
    # Stress
    if json_dict.get("stress"):
        risk_score += 2

    # PPT (previous pre-term)
    if json_dict.get("previous_preterm"):
        risk_score += 5

    # Cervical surgery, such as conization or trachelectomy 
    if json_dict.get("cervical_surgery"):
        risk_score += 2

    # Multiple gestations 
    if json_dict.get("multiple_gestations"):
        risk_score += 10

    # Hepatitis C 
    if json_dict.get("hepatitis_c"):
        risk_score += 2

    # diabetes 
    if json_dict.get("diabetes"):
        risk_score += 4

    # GDM
    if json_dict.get("gdm"):
        risk_score += 1.5

    # Hypertension
    if (json_dict.get("hypertension")):
        risk_score += 3

    # Eclampsia
    if (json_dict.get("eclampsia")):
        risk_score += 7

    # Infertility treatment
    if (json_dict.get("infertility_treatment")):
        risk_score += 5

    # Gonorhea or Syphilis
    if (json_dict.get("gonorhea") or json_dict.get("syphilis")):
        risk_score += 1.5

    return preterm_birth_risk(risk_score)