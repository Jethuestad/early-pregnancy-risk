
class Calculation:
    def __init__(self, json_dict: dict):
        self.risk_score = calculate(json_dict)

        # Add multiple risks here
        self.diabetes = diabetes_risk(self.risk_score)


# Spitting out the risk factor based on points
def diabetes_risk(risk_score: int) -> int:
    if 0 <= risk_score <= 5:
        return 0
    elif 6 <= risk_score <= 12:
        return 1
    elif 13 <= risk_score <= 20:
        return 2
    elif 21 <= risk_score <= 29:
        return 3
    elif 30 <= risk_score:
        return 4


def calculate(json_dict: dict) -> int:
    risk_score = 0

    # Age
    if json_dict["age"] <= 25:
        risk_score += 0
    elif 26 <= json_dict["age"] <= 35:
        risk_score += 4
    elif json_dict["age"] >= 35:
        risk_score += 6

    # Parity (Number of children)
    if json_dict["parity"] >= 2:
        risk_score += 2

    # History of GDM
    if json_dict["gdm"]:
        risk_score += 15

    # Congenital anomalies
    if json_dict["congenital"]:
        risk_score += 5

    # Stillbirth
    if json_dict["stillbirth"]:
        risk_score += 5

    # Miscarriage
    if json_dict["miscarriage"]:
        risk_score += 5

    # Preterm delivery
    if json_dict["preterm"]:
        risk_score += 5

    # Macrosomia
    if json_dict["macrosomia"]:
        risk_score += 8

    # BMI
    bmi = json_dict["weight"]/((json_dict["height"]/100)**2)
    if bmi >= 30:
        risk_score += 9
    elif bmi >= 25:
        risk_score += 5

    # Ethnicity | (might change to int later)
    if not json_dict["white"]:
        risk_score += 5

    # Family history of diabetes
    if json_dict["family_diabetes"]:
        risk_score += 6

    # Polycystic ovary syndrome
    if json_dict["polycystic"]:
        risk_score += 5

    # High blood pressure, with family history
    if json_dict["blood_pressure_family"]:
        risk_score += 5

    # High blood pressure, without family history
    if json_dict["blood_pressure_not_family"]:
        risk_score += 2

    # Diet
    diet_count = 0

    if json_dict["diet_not_varied"]:
        diet_count += 1
    if json_dict["diet_sugar"]:
        diet_count += 1
    if json_dict["diet_sweets"]:
        diet_count += 1
    if json_dict["diet_processed_meat"]:
        diet_count += 1
    if json_dict["diet_whole_grain"]:
        diet_count += 1
    if json_dict["diet_diary"]:
        diet_count += 1
    if json_dict["diet_vitamin_d"]:
        diet_count += 1

    if diet_count >= 5:
        risk_score += 4

    # Physical activity
    activity_count = 0

    if not json_dict["activity_walking_minute"]:
        activity_count += 1
    if not json_dict["activity_vigorous"]:
        activity_count += 1
    if not json_dict["activity_stairs"]:
        activity_count += 1

    if activity_count == 3:
        risk_score += 4

    return risk_score
