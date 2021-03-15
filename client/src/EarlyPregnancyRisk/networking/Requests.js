import Factors from "../constants/Factors";

let ENDPOINTS = require("../constants/Endpoints");
if (__DEV__) {
  ENDPOINTS = require("../constants/DebugEndpoints");
}

export const getTestJson = async () => {
  try {
    let response = await fetch(ENDPOINTS.test_request);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getLanguage = async (country_code) => {
  try {
    let response = await fetch([ENDPOINTS.translate, country_code].join("/"));
    let json = await response.json();
    return json;
  } catch {
    console.error(error);
  }
};

export const getLanguageComponent = async (country_code, component_id) => {
  try {
    let response = await fetch(
      [ENDPOINTS.translate, country_code, component_id].join("/")
    );
    let json = await response.json();
    return json;
  } catch {
    console.error(error);
  }
};

export const getFactors = async (country_code) => {
  try {
    let response = await fetch([ENDPOINTS.factors, country_code].join("/"));
    let json = await response.text();
    if (!json.success) return Factors.factors;
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
