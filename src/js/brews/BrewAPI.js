var API = require('brews/common/API');
var BeerActions = require('./BrewActions');
var Endpoints = API.Endpoints;

module.exports = {
  fetch: function(id) {
    API.getBody(Endpoints.BREWS, BeerActions.fetch);
  },

  fetchAll: function() {
    API.getList(Endpoints.BREWS, BeerActions.fetchAll);
  },

  create: function(brew) {
    API.create(Endpoints.BREWS, brew);
  },

  update: function(brew) {
    API.create(Endpoints.BREWS, brew);
  },

  delete: function(id) {
    API.delete(Endpoints.BREWS + '/' + id);
  }
};
