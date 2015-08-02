var request = require('request').defaults({
  withCredentials: false,
  json: true,
  headers: {
    
  }
});

var URI = require('brews-config').API_URI + '/api';
var OK = 200;
var CREATED = 201;
var NO_CONTENT = 204;
var NOT_FOUND = 404;

var API = {
  /**
   * Gets an object from the server and passes it to the action callback if it
   * was a successful get. Otherwise displays an error.
   *
   * This function just returns the response body.
   *
   * @param {String} endpoint the endpoint to get from
   * @param {function(Object)} actionCallback the function to pass the retrieved body into.
   * @param {String} errorMsg? the error message to display
   */
  get: function(endpoint, actionCallback, errorMsg) {
    request({
      uri: URI + endpoint
    }, function(error, response, body) {
      if(!error && response.statusCode === OK) {
        actionCallback(body);
      } else {
        console.error(errorMsg || error.message);
      };
    });
  },

  /**
   * Gets an object from the server and passes it to the action callback if it
   * was a successful get. Otherwise it displays an error.
   *
   * This function just returns the response body.data
   *
   * @param {String} endpoint the endpoint to get from
   * @param {function(Object)} actionCallback the function to pass the retrieved body into.
   * @param {String} errorMsg? the error message to display
   */
  getBody: function(endpoint, actionCallback, errorMsg) {
    this.get(endpoint, function(body) {
      actionCallback(body.data);
    }, errorMsg);
  },

  /**
   * Gets a list of objects from the server and passes it to the action callback if it
   * was a successful get. Otherwise it displays an error.
   *
   * @param {String} endpoint the endpoint to get from
   * @param {function(Object)} actionCallback the function to pass the retrieved body into.
   * @param {String} errorMsg? the error message to display
   */
  getList: function(endpoint, actionCallback, errorMsg) {
    this.getListTransform(endpoint, actionCallback, function(body) {
      return body.map(function(elem) {
        return elem.data;
      });
    }, errorMsg);
  },

  /**
   * Gets a list of objects from the server and passes it to the action callback if it
   * was a successful get. Otherwise it displays an error.
   *
   * @param {String} endpoint the endpoint to get from
   * @param {function(Object)} actionCallback the function to pass the retrieved body into.
   * @param {function(Object)} transform the transformation function that takes the response body
   * @param {String} errorMsg? the error message to display
   */
  getListTransform: function(endpoint, actionCallback, transform, errorMsg) {
    this.get(endpoint, function(body) {
      actionCallback(transform(body));
    }, errorMsg);
  },

  /**
   * Gets a list of objects from the server and passes it to the action callback if it
   * was a successful get. Otherwise it displays an error.
   *
   * @param {String} endpoint the endpoint to get from
   * @param {Object} json the json object to create
   * @param {String} errorMsg? the error message to display
   * @param {function(Object)} actionCallback? the function to pass the retrieved body into.
   */
  create: function(endpoint, json, errorMsg, actionCallback) {
    request({
      type: 'POST',
      body: json
    }, function(error, reponse,  body) {
      if(!error && response.statusCode === CREATED) {
        actionCallback && actionCallback(response, body);
      } else {
        console.error(errorMsg || error.message);
      }
    });
  },

  update: function(endpoint, json, errorMsg, actionCallback) {
    request({
      type: 'PUT',
      body: json
    }, function(error, response, body) {
      if(!error && response.statusCode === OK || response.statusCode === NO_CONTENT) {
        actionCallback && actionCallback(response, body);
      } else {
        console.error(errorMsg || error.message);
      }
    });

  },

  /**
   * Deletes an object from the server
   *
   * @param {string} the endpoint
   * @param {string} errorMsg? the error message
   * @param {function} actionCallback? the callback on successful delete
   */
  delete: function(endpoint, errorMsg, actionCallback) {

  },

  Endpoints: {
    BREWS: '/brews'
  }

};
module.exports = API;
