from ..exceptions.api_exceptions import InternalServerError
from ..models import Translation, Complication_Risk

class Calculation:
    def __init__(self, json_dict: dict, language_code: str):
        self.language_code = language_code
        self.risk_score = calculate(json_dict)

        # Add multiple risks here
        self.diabetes = diabetes_risk(self.risk_score,language_code)

def risk_dict_constructor(risk_score: int,  complication: str, severity: int, language_code: str) -> dict:
    translated_comp = Translation.objects.get(belongs_to__name=complication, language_code__code=language_code).text
    if translated_comp is None:
        translated_comp = Translation.objects.get(belongs_to=complication, language__code="en").text
    
    percentage_translated = Translation.objects.get(belongs_to__name="percentage_of_pregnancies", language_code__code=language_code).text

    percentage_risk = Complication_Risk.objects.get(related_complication__name=complication, severity = "{}".format(severity)).percentage


    return  {"complication" : translated_comp, "severity": severity, "risk_str":"{} {}".format(percentage_risk, percentage_translated), "risk_score": risk_score}

# Spitting out the risk factor based on points
def diabetes_risk(risk_score: int, language_code: str) -> dict:
    severity = 0
    if 0 <= risk_score <= 5:
        severity = 0
    elif 6 <= risk_score <= 12:
        severity = 1
    elif 13 <= risk_score <= 20:
        severity = 2
    elif 21 <= risk_score <= 29:
        severity = 3
    elif 30 <= risk_score:
        severity = 4
    else:
        raise InternalServerError("Invalid score when calculating diabetes")
    
    return risk_dict_constructor(risk_score, "gestational_diabetes_mellitus", severity, language_code)

def calculate(json_dict: dict) -> int:
    risk_score = 0

    # Age
    if (age:=json_dict.get("age")) == None:
        pass
    elif age <= 25:
        risk_score += 0
    elif 26 <= age <= 35:
        risk_score += 4
    elif age >= 35:
        risk_score += 6

    # Parity (Number of children)
    if (parity:=json_dict.get("parity")) == None:
        pass
    elif parity >= 2:
        risk_score += 2

    # History of GDM
    if json_dict.get("gdm"):
        risk_score += 15

    # Congenital anomalies
    if json_dict.get("congenital"):
        risk_score += 5

    # Stillbirth
    if json_dict.get("stillbirth"):
        risk_score += 5

    # Miscarriage
    if json_dict.get("miscarriage"):
        risk_score += 5

    # Preterm delivery
    if json_dict.get("preterm"):
        risk_score += 5

    # Macrosomia
    if json_dict.get("macrosomia"):
        risk_score += 8

    # BMI
    if None not in (bmi_info:=(json_dict.get("weight"), json_dict.get("height"))):
        bmi = bmi_info[0]/((bmi_info[1]/100)**2)
        if bmi >= 30:
            risk_score += 9
        elif bmi >= 25:
            risk_score += 5

    # Ethnicity | (might change to int later)
    if not json_dict.get("white"):
        risk_score += 5

    # Family history of diabetes
    if json_dict.get("family_diabetes"):
        risk_score += 6

    # Polycystic ovary syndrome
    if json_dict.get("polycystic"):
        risk_score += 5

    # High blood pressure, with family history
    if json_dict.get("blood_pressure_family"):
        risk_score += 5

    # High blood pressure, without family history
    if json_dict.get("blood_pressure_not_family"):
        risk_score += 2

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
        risk_score += 4

    # Physical activity
    activity_count = 0

    if not json_dict.get("activity_walking_minute"):
        activity_count += 1
    if not json_dict.get("activity_vigorous"):
        activity_count += 1
    if not json_dict.get("activity_stairs"):
        activity_count += 1

    if activity_count == 3:
        risk_score += 4

    return risk_score
