var AppDispatcher = require('brews/common/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BrewActionConstants = require('./BrewActionConstants');
var _ = require('underscore');

var BrewedDrink = require('brews/prototypes/BrewedDrink');

var _brews = {};

function setBrews(json) {
  json.map(BrewedDrink.fromJson).forEach(function(brew) {
    _brews[brew.id] = brew;
  });
}

var BrewStore = _.extend({}, EventEmitter.prototype, {
  getBrews: function() {
    return _brews;
  },
  
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case BrewActionConstants.BREW_FETCH_ALL:
      setBrews(action.data);
      break;
    
    default:
      return true;
  }

  BrewStore.emitChange();
  return true;
});

module.exports = BrewStore;
