var FluxIt = require('brews/common/FluxIt');

var BrewStore = require('./BrewStore');
var BrewAPI = require('./BrewAPI');
var BrewedDrink = require('brews/prototypes/BrewedDrink');
var CreateBrew = require('./CreateBrew');

var utils = require('brews/common/utils');

var BrewList = React.createClass({
  propTypes: {
    brews: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>
        <h1>Hello, World!!</h1>
        <CreateBrew />
        <hr />
        {utils.toList(this.props.brews).map(function(brew) {
          return (
            <h3>{brew.name}</h3>
          );
        })}
      </div>
    );
  }
});

Brew = 
  FluxIt.init(
    BrewList,
    function() {
      return {
        brews: BrewStore.getBrews()
      };
    },
    [BrewStore],
    [BrewAPI.fetchAll]
  );

module.exports = Brew;
