// Managing session data

const engine = require("../questions/engine.js");

const getValue = (request, key) => { // Find the value of a key in the session
  request.session = request.session ?? {}

  return request.session[key];
};

const setValue = (request, key, newValue) => { // Set the new value of a key in the session
  request.session = request.session ?? {}

  request.session[key] = newValue;
};

module.exports = { getValue, setValue };