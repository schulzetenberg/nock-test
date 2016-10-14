/*jshint esversion: 6 */

var Q = require('q');
var Client = require('node-rest-client').Client;

exports.getUserFollowers = function(username) {
  var defer = Q.defer();

  var client = new Client();

  var request = client.get(`https://api.github.com/users/${username}/followers`, function(data, response) {
    defer.resolve(data);
  });

  request.on('requestTimeout', function(req) {
    req.abort();
    defer.reject("Request has expired");
  });

  request.on('responseTimeout', function(res) {
    defer.reject("Response has expired");
  });

  request.on('error', function(err) {
    defer.reject("Request error", err.request.options);
  });

  return defer.promise;
};
