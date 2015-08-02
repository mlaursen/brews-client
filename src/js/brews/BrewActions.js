var AppDispatcher = require('brews/common/AppDispatcher');
var BrewActionConstants = require('./BrewActionConstants');

var BrewActions = {
  fetch: function(brew) {
    AppDispatcher.handleAction({
      actionType: BrewActionConstants.BREW_FETCH,
      brew: brew
    });
  },

  fetchAll: function(data) {
    AppDispatcher.handleAction({
      actionType: BrewActionConstants.BREW_FETCH_ALL,
      data: data
    });
  }
  
};

module.exports = BrewActions;
