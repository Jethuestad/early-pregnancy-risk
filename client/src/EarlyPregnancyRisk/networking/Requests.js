import Factors from "../constants/Factors";
import Refrences from "../constants/Refrences";
import Translations from "../constants/Translations";

let ENDPOINTS = require("../constants/Endpoints");
if (__DEV__) {
  ENDPOINTS = require("../constants/DebugEndpoints");
}
export const getReferences = async (factor_name) => {
  try {
    let response = await fetch([ENDPOINTS.reference, factor_name].join("/"));
    let json = await response.text();
    if (!json.success) return Refrences.references;
    return JSON.parse(json).payload.references;
  } catch (error) {
    console.error(error);
    return Refrences.references;
  }
};

export const getTestJson = async () => {
  try {
    let response = await fetch(ENDPOINTS.test_request);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getTranslation = async (country_code) => {
  try {
    let response = await fetch([ENDPOINTS.translate, country_code].join("/"));
    let json = await response.text();
    if (!JSON.parse(json).success) return Translations.translation;
    return JSON.parse(json).payload.translation;
  } catch (error) {
    console.error(error);
    return Translations.translation;
  }
};

export const getFactors = async (country_code) => {
  try {
    let response = await fetch([ENDPOINTS.factors, country_code].join("/"));
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
    let response = await fetch(ENDPOINTS.calculate, data);
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
