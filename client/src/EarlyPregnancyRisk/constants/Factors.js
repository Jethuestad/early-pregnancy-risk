module.exports = {
  factors: [
    {
      factor: "age",
      question: "What is your age?",
      answertype: "int",
      skippable: false,
      maxdigits: 2,
    },
    {
      factor: "parity",
      question:
          "How many times have you previously been pregnant, including births, miscarriages, and stillbirths",
      answertype: "int",
      skippable: false,
      maxdigits: 1,
      requirement: ">;0",
      subfactors: [
        {
          factor: "gdm",
          question:
              "Do you currently have, or have previously had Gestational diabetes?",
          answertype: "boolean",
          skippable: false,
        },
        {
          factor: "congenital",
          question: "Do you have any children with congenital disorder?",
          answertype: "boolean",
          skippable: false,
        },
        {
          factor: "stillbirth",
          question: "Have you previously had any stillbirths?",
          answertype: "boolean",
          skippable: false,
        },
        {
          factor: "miscarriage",
          question: "Have you had any miscarriages?",
          answertype: "boolean",
          skippable: false,
        },
        {
          factor: "preterm",
          question: "Have you previously had a preterm birth?",
          answertype: "boolean",
          skippable: false,
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
      answertype: "int",
      skippable: false,
      maxdigits: 3,
    },
    {
      factor: "weight",
      question: "What is your weight",
      answertype: "int",
      skippable: false,
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
      skippable: false,
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
      skippable: false,
    },
    {
      factor: "diet_not_varied",
      question: "Is your diet non-varied?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "diet_sugar",
      question:
          "Do you drink sugar/artificially sweetened beverages more than 4 times a week?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "diet_sweets",
      question:
          "Do you eat sweets such as ice cream, cakes, or cookies more than 2 times a week?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "diet_processed_meat",
      question:
          "Do you eat processed meat products more than zero times a week?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "diet_whole_grain",
      question: "Do you eat whole grain products less than 2 times a day?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "diet_diary",
      question: "Do you consume dairy products less than 2 times a day?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "diet_vitamin_d",
      question: "Do you have vitamin D intake less than 5 times a week?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "activity_walking_minute",
      question: "Do you excercise for at least 30min a day?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "activity_vigorous",
      question: "Do you take part in vigourous exercise?",
      answertype: "boolean",
      skippable: false,
    },
    {
      factor: "activity_stairs",
      question: "Do you climb at least 10 stairs a day?",
      answertype: "boolean",
      skippable: false,
    },
  ],
};