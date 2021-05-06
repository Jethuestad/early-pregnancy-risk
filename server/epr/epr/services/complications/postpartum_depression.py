from typing import get_args
from ...exceptions.api_exceptions import InternalServerError
import math


# Returning the risk_score and the severity of the risk_score
def ppd_risk(risk_score: int) -> dict:
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
        raise InternalServerError(
            "Invalid score when calculating post-partum depression")

    return {"risk": risk_score, "severity": severity}

# Calculating risk score unique for post-partum depression


def calculate(json_dict: dict) -> dict:
    risk_score = 0

    # Age
    if (age := json_dict.get("age")) == None:
        pass
    elif age > 20:
        risk_score += 2

    # Parity
    if (parity := json_dict.get("parity")) == None:
        pass
    elif parity > 4:
        risk_score += 6

    # Ethnicity
    if (ethnicity := json_dict.get("ethnicity")) == None:
        pass
    elif ethnicity != 0:    # non-white
        risk_score += 2

    # Education
    if (education_years := json_dict.get("education_years")) == None:
        pass
    elif education_years <= 12:
        risk_score += 1.5

    # Smoking
    if json_dict.get("smoking"):
        risk_score += 2

    # Going through an extremely stressful event, like a job loss, financial problems, or health problems over the past year
    if json_dict.get("stressfull_event"):
        risk_score += 3

    # Had a mood disorder in the past, e.g. depression, postpartum depression, anxiety disorder, or bipolar disorder
    if json_dict.get("mood_disorder"):
        risk_score += 2

    # Child with special needs or health problems
    if json_dict.get("child_problems"):
        risk_score += 1.5

    # Gynecological disease during pregnancy (diabetes, hypertension/hypotension, hepatitis, chicken pox, and gynecological inflammation)
    if json_dict.get("diabetes") or json_dict.get("hypertension") or json_dict.get("hepatitis") or \
            json_dict.get("chicken_pox") or json_dict.get("gynecological_inflammation"):
        risk_score += 1.5

    # Infant birth weight (kg)
    if (infant_weight := json_dict.get("infant_weight")) == None:
        pass
    elif infant_weight < 1.5:
        risk_score += 8

    # Lack of support from friends, family, and other members of your community
    if json_dict.get("lacking_support"):
        risk_score += 4

    # Infant admission to NICU at birth
    if json_dict.get("infant_admission"):
        risk_score += 2

    # Dealing with relationship problems with your partner or spouse
    if json_dict.get("relationship_problems"):
        risk_score += 6

    # An unplanned or unwanted pregnancy
    if json_dict.get("unplanned"):
        risk_score += 4

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

    return ppd_risk(risk_score)
