const COUNTRY_CODES = require("../constants/CountryCodes");
module.exports = {
  languages: [
    {
      flag_url: "",
      country_code: COUNTRY_CODES.norwegian,
    },
    {
      flag_url: "",
      country_code: COUNTRY_CODES.french,
    },
  ],
  translation: {
    title: "Early Pregnancy Risk",
    front_page_paragraph_1:
      "Pregnant or planning for a baby? This tool will make you assess your health status for a healthy pregnancy and a complication free birth. By filling in your personal health measurements, this tool will estimate risk for developing common pregnancy complications below.",
    front_page_paragraph_2:
      "It is important to note that the tool will provide you with the risk of an ‘average‘ woman with your health measures and NOT your personal risk score. It is also important to note that the model does not take into many other psychosocial factors affecting maternal outcome.",
    front_page_list:
      "Miscarriage;Gestational Diabetes Mellitus;Preeclampsia;Pre-term birth;Still birth;Caesarean section;Postpartum depression",
    button_start: "Start Risk Assessment",
    button_yes: "Yes",
    button_no: "No",
    button_skip: "Skip",
    button_continue: "Continue",
    button_previous: "Previous",
    footer_privacy: "Click here to read about our privacy policy",
    loading: "Loading",
    loading_risk: "Calculating risk",
    skipped_warning_singular:
      "You skipped one question, this can affect your test results",
    skipped_warning_plural:
      "You skipped %d questions, this can affect your test results",
  },
};
