import utility from "../utility/utility";

const prod = {
  url: {
    API_URL: "http://127.0.0.1:8080",
  },
};
const dev = {
  url: {
    API_URL: "http://127.0.0.1:8080",
  },
};

function getEnvConfig() {
  var config;
  if (utility.removeSpace(process.env.REACT_APP_ENV_VAR) === "development") {
    config = dev;
  } else {
    config = prod;
    // config = dev
  }
  return config;
}

export const ServerConfig = getEnvConfig();
