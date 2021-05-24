import Factors from "../constants/Factors";
import Translations, { languages } from "../constants/Translations";

let ENDPOINTS = require("../constants/Endpoints");
if (__DEV__) {
  ENDPOINTS = require("../constants/DebugEndpoints");
}
export const getReferences = async (factor_name, lang_code) => {
  try {
    let response = await fetch(
      ENDPOINTS.base +
        [ENDPOINTS.references, factor_name, lang_code, "references"].join("/")
    );
    let json = await response.text();
    if (!JSON.parse(json).success) {
      return null;
    }
    return JSON.parse(json).payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTranslation = async (country_code) => {
  try {
    let response = await fetch(
      ENDPOINTS.base + [ENDPOINTS.translate, country_code].join("/")
    );
    let json = await response.text();
    if (!JSON.parse(json).success) return Translations.translation;
    return JSON.parse(json).payload.translation;
  } catch (error) {
    console.error(error);
    return Translations.translation;
  }
};

export const getLanguages = async () => {
  try {
    let response = await fetch(ENDPOINTS.base + ENDPOINTS.languages);
    let json = await response.text();
    if (!JSON.parse(json).success) return [];
    return JSON.parse(json).payload.languages;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFactors = async (country_code) => {
  try {
    let response = await fetch(
      ENDPOINTS.base + [ENDPOINTS.factors, country_code].join("/")
    );
    let json = await response.text();
    if (!JSON.parse(json).success) return Factors.factors;
    return JSON.parse(json).payload.factors;
  } catch (error) {
    console.error(error);
    return Factors.factors;
  }
};

export const postFactors = async (factors) => {
  let data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(factors),
  };

  try {
    let response = await fetch(
      ENDPOINTS.base + [ENDPOINTS.calculate, "en"].join("/"),
      data
    );
    let json = await response.text();
    return JSON.parse(json);
  } catch (error) {
    console.error(error);
    if (error instanceof ReferenceError) {
      return;
    }
    return null;
  }
};
