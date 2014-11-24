'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  runsSummary = mongoose.model('runsSummary'),
  Q = require('q');

var saveToDb = function(data, userId) {
  var result = Q.defer();
  var summary;
  data.user = userId;
  summary = new runsSummary(data);
  summary.save(function (err) {
    if (err) {
      console.log('error ' + err);
    }
      else {
          result.resolve(summary);
      }
  });
  return result.promise;
};

module.exports = saveToDb;


