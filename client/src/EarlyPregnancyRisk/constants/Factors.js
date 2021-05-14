module.exports = {
  factors: [
    {
      factor: "ethnicity",
      question: "What is your ethnicity?",
      answertype: "multiple",
      values: [
        ["White", 0],
        ["Black", 1],
        ["Afro Caribean", 2],
        ["South Asian", 3],
        ["Other", 4],
      ],
      skippable: true,
    },
    {
      factor: "age",
      question: "What is your age?",
      answertype: "integer",
      skippable: true,
      maxdigits: 2,
    },
    {
      factor: "parity",
      question:
        "How many times have you previously been pregnant, including births, miscarriages, and stillbirths",
      answertype: "integer",
      skippable: true,
      maxdigits: 1,
      requirement: ">;0",
      subfactors: [
        {
          factor: "gdm",
          question:
            "Do you currently have, or have previously had Gestational diabetes?",
          answertype: "boolean",
          skippable: true,
        },
        {
          factor: "congenital",
          question: "Do you have any children with congenital disorder?",
          answertype: "boolean",
          skippable: true,
        },
        {
          factor: "stillbirth",
          question: "Have you previously had any stillbirths?",
          answertype: "boolean",
          skippable: true,
        },
        {
          factor: "miscarriage",
          question: "Have you had any miscarriages?",
          answertype: "boolean",
          skippable: true,
        },
        {
          factor: "preterm",
          question: "Have you previously had a preterm birth?",
          answertype: "boolean",
          skippable: true,
        },
        {
          factor: "macrosomia",
          question: "Have you had any children with Macrosomia?",
          answertype: "boolean",
          skippable: true,
        },
      ],
    },
    {
      factor: "height",
      question: "What is your height",
      answertype: "integer",
      unit: "cm",
      skippable: true,
      maxdigits: 3,
    },
    {
      factor: "weight",
      question: "What is your weight",
      answertype: "integer",
      unit: "kg",
      skippable: true,
      maxdigits: 3,
    },
    {
      factor: "family_diabetes",
      question: "Does your family have a history of diabetes?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "polycystic",
      question: "Do you have polycystic ovarian syndrome?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "blood_pressure_family",
      question: "Does your family have a history of high blood pressure?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "blood_pressure_not_family",
      question: "Do you have high blood pressure?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "diet_not_varied",
      question: "Is your diet non-varied?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "diet_sugar",
      question:
        "Do you drink sugar/artificially sweetened beverages more than 4 times a week?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "diet_sweets",
      question:
        "Do you eat sweets such as ice cream, cakes, or cookies more than 2 times a week?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "diet_processed_meat",
      question:
        "Do you eat processed meat products more than zero times a week?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "diet_whole_grain",
      question: "Do you eat whole grain products less than 2 times a day?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "diet_diary",
      question: "Do you consume dairy products less than 2 times a day?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "diet_vitamin_d",
      question: "Do you have vitamin D intake less than 5 times a week?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "activity_walking_minute",
      question: "Do you excercise for at least 30min a day?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "activity_vigorous",
      question: "Do you take part in vigourous exercise?",
      answertype: "boolean",
      skippable: true,
    },
    {
      factor: "activity_stairs",
      question: "Do you climb at least 10 stairs a day?",
      answertype: "boolean",
      skippable: true,
    },
  ],
};
