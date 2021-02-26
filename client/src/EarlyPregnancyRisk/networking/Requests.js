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
    return json;
  } catch (e) {
    if (e instanceof ReferenceError) {
      //TODO: Handle error
      return;
    }
  }
};
