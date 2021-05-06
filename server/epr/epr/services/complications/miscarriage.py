from ...exceptions.api_exceptions import InternalServerError
import math


# Returning the risk_score and the severity of the risk_score
def miscarriage_risk(risk_score: int) -> dict:
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
        raise InternalServerError("Invalid score when calculating miscarriage")
    
    return {"risk": risk_score, "severity": severity}

# Calculating risk score unique for miscarriage
def calculate(json_dict: dict) -> dict:
    risk_score = 0

    # Age
    if (age:=json_dict.get("age")) == None:
        pass
    elif age > 30:
        risk_score += 2
    elif age > 45:
        risk_score += 5

    # Ethnicity
    if (ethnicity:=json_dict.get("ethnicity")) == None:
        pass
    elif ethnicity != 0:    # not white
        risk_score += 1.4

    # No higher education
    if not json_dict.get("higher_education"):
        risk_score += 1.4
    
    # Nausea and vomiting in first trimester
    if json_dict.get("nausea"):
        risk_score += 0.5

    # Paternal age
    if (p_age:=json_dict.get("paternal_age")) == None:
        pass
    elif p_age > 45:
        risk_score += 5

    # Previous miscarriage 
    if (previous_miscarriages:=json_dict.get("previous_miscarriages")) == None:
        pass
    elif previous_miscarriages == 1:
        risk_score += 1.5
    elif previous_miscarriages == 2:
        risk_score += 2.2
    elif previous_miscarriages >= 3:
        risk_score += 4

    # Family history of miscarriage
    if json_dict.get("miscarriage_family"):
        risk_score += 2

    # Adverse childhood
    adverse_childhood_count = 0
    
    # 1) lived most of childhood in a single natural mother family
    if json_dict.get("adverse_childhood_1"):
        adverse_childhood_count += 1

    # 2) ever lived in institutions providing residential care for children (such as children’s home) or with foster parents
    if json_dict.get("adverse_childhood_2"):
        adverse_childhood_count += 1

    # 3) separation from mother for ≥6 months at age ≤16 years
    if json_dict.get("adverse_childhood_3"):
        adverse_childhood_count += 1
        
    # 4) victim of serious physical attack/assault at age ≤16 years
    if json_dict.get("adverse_childhood_4"):
        adverse_childhood_count += 1
        
    # 5) victim of sexual assault (including rape or harassment) at age ≤16 years
    if json_dict.get("adverse_childhood_5"):
        adverse_childhood_count += 1
        
    # 6) physically abusive parents at age <16 years
    if json_dict.get("adverse_childhood_6"):
        adverse_childhood_count += 1
        
    # 7) parents with substance abuse or mental health problems at age <16 years and
    if json_dict.get("adverse_childhood_7"):
        adverse_childhood_count += 1
        
    # 8) parents argued or fought very often at age <16 years
    if json_dict.get("adverse_childhood_8"):
        adverse_childhood_count += 1
        
    if adverse_childhood_count > 3:
        risk_score += 2

    # Previous preeclampsia
    if json_dict.get("preeclampsia"):
        risk_score += 2

    # interpregnancy interval in months
    if (interval:=json_dict.get("interpregnancy_interval")) == None:
        pass
    elif interval > 3:
        risk_score += 1.5

    # Frequency of night shift in nights per week
    if (frequency:=json_dict.get("night_shift_frequency")) == None:
        pass
    elif frequency > 1:
        risk_score += 1.5

    # Alcohol consuption in drinks per week
    if (alcohol:=json_dict.get("alcohol")) == None:
        pass
    elif alcohol > 4:
        risk_score += 2.5

    # Percieved stress 
    percieved_stress_count = 0
    
    # In the last month:
    # 1) have you often been upset because of something that happened unexpectedly?
    if json_dict.get("percieved_stress_1"):
        percieved_stress_count += 1

    # 2) have you often felt that you were unable to control the important things in your life?
    if json_dict.get("percieved_stress_2"):
        percieved_stress_count += 1
    
    # 3) have you often felt that things were not going your way? 
    if json_dict.get("percieved_stress_3"):
        percieved_stress_count += 1
    
    # 4) have you often found that you could not cope with all the things that you had to do?
    if json_dict.get("percieved_stress_4"):
        percieved_stress_count += 1
    
    # 5) have you often been able to control irritations in your life? 
    if json_dict.get("percieved_stress_5"):
        percieved_stress_count += 1
    
    # 6) have you often felt that you were on top of things?
    if json_dict.get("percieved_stress_6"):
        percieved_stress_count += 1
    
    # 7) have you often been angered because of things that happened that were outside of your control?  
    if json_dict.get("percieved_stress_7"):
        percieved_stress_count += 1
    
    # 8) have you often felt difficulties were piling up so high that you could not overcome them? 
    if json_dict.get("percieved_stress_8"):
        percieved_stress_count += 1
    
    if percieved_stress_count > 4:
        risk_score += 2
    
    # High energy no fatigue in first trimester
    if json_dict.get("high_energy"):
        risk_score += 2

    # Chronic hypertension
    if json_dict.get("chronic_hypertension"):
        risk_score += 2

    return miscarriage_risk(risk_score)