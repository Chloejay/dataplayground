'use strict';

const underscore = require('underscore');

const namingStrategies = {
  model: val => val,
  underscore,
  lowerCase: val => val ? val.toLowerCase() : val,
  upperCase: val => val ? val.toUpperCase() : val,
};

// Override Connector.prototype.dbName in loopback-connector to support
// settings.namingStrategies.
module.exports = function(app) {
  for (let source of Object.values(app.dataSources)) {
    const connector = source.connector;
    const strategy = connector.settings.namingStrategy;
    const dbName = typeof strategy === 'function' ? strategy :
      namingStrategies[strategy];
    if (dbName) {
      connector.dbName = dbName;
    }
  };
};
