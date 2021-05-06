from ...exceptions.api_exceptions import InternalServerError


# Returning the risk_score and the severity of the risk_score
def diabetes_risk(risk_score: int) -> dict:
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
        raise InternalServerError("Invalid score when calculating diabetes")

    return {"risk": risk_score, "severity": severity}

# Calculating risk score unique for diabetes


def calculate(json_dict: dict) -> dict:
    risk_score = 0
    # Age
    if (age := json_dict.get("age")) == None:
        pass
    elif age <= 25:
        risk_score += 0
    elif 26 <= age <= 35:
        risk_score += 2
    elif age > 35:
        risk_score += 3

    # Parity (Number of children)
    if (parity := json_dict.get("parity")) == None:
        pass
    elif parity >= 2:
        risk_score += 1.5

    # History of GDM
    if json_dict.get("gdm"):
        risk_score += 10

    # Congenital anomalies
    if json_dict.get("congenital"):
        risk_score += 2.5

    # Stillbirth
    if json_dict.get("stillbirth"):
        risk_score += 2.5

    # Miscarriage
    if json_dict.get("previous_miscarriage"):
        risk_score += 2.5

    # Preterm delivery
    if json_dict.get("preterm"):
        risk_score += 2.5

    # Macrosomia
    if json_dict.get("macrosomia"):
        risk_score += 4

    # BMI
    if None not in (bmi_info := (json_dict.get("weight"), json_dict.get("height"))):
        bmi = bmi_info[0]/((bmi_info[1]/100)**2)
        if bmi > 30:
            risk_score += 6
        elif bmi > 25:
            risk_score += 2.5

    # Ethnicity | (might change to int later)
    if not json_dict.get("white"):
        risk_score += 2.5

    # Family history of diabetes
    if json_dict.get("family_diabetes"):
        risk_score += 3

    # Polycystic ovary syndrome
    if json_dict.get("polycystic"):
        risk_score += 2.5

    # High blood pressure, with family history
    if json_dict.get("blood_pressure_family"):
        risk_score += 2.5

    # High blood pressure, without family history
    if json_dict.get("blood_pressure_not_family"):
        risk_score += 1.5

    # Diet
    diet_count = 0

    if json_dict.get("diet_not_varied"):
        diet_count += 1
    if json_dict.get("diet_sugar"):
        diet_count += 1
    if json_dict.get("diet_sweets"):
        diet_count += 1
    if json_dict.get("diet_processed_meat"):
        diet_count += 1
    if json_dict.get("diet_whole_grain"):
        diet_count += 1
    if json_dict.get("diet_diary"):
        diet_count += 1
    if json_dict.get("diet_vitamin_d"):
        diet_count += 1

    if diet_count >= 5:
        risk_score += 2

    # Physical activity
    activity_count = 0

    if not json_dict.get("activity_walking_minute"):
        activity_count += 1
    if not json_dict.get("activity_vigorous"):
        activity_count += 1
    if not json_dict.get("activity_stairs"):
        activity_count += 1

    if activity_count == 3:
        risk_score += 2

    return diabetes_risk(risk_score)
