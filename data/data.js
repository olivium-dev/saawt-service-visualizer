// data.js

// The global array that holds all flows (scenarios).
window.scenarioData = [];

/**
 * Appends the given flows array into the global scenarioData.
 * @param {Array} flows - Array of scenario objects to be merged
 */
window.appendFlows = function (flows) {
  window.scenarioData.push(...flows);
};
