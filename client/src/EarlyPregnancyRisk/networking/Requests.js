import Factors from "../constants/Factors";
import Translations from "../constants/Translations";

let ENDPOINTS = require("../constants/Endpoints");
if (__DEV__) {
  ENDPOINTS = require("../constants/DebugEndpoints");
}

async function fetchWithTimeout(resource, options) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

export const getReferences = async (factor_name, lang_code) => {
  try {
    let response = await fetchWithTimeout(
        [ENDPOINTS.references, factor_name,lang_code].join("/"),
        {
          timeout: 8000,
        }
    );
    let json = await response.text();
    if (!JSON.parse(json).success) return null;
    return JSON.parse(json).payload;
  } catch (error) {
    console.error(error);
    return null;
  }
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

export const getTranslation = async (country_code) => {
  try {
    let response = await fetchWithTimeout(
      [ENDPOINTS.translate, country_code].join("/"),
      {
        timeout: 8000,
      }
    );
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
    let response = await fetchWithTimeout(
      [ENDPOINTS.factors, country_code].join("/"),
      {
        timeout: 8000,
      }
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
    timeout: 12000,
  };

  try {
    let response = await fetchWithTimeout(ENDPOINTS.calculate, data);
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
