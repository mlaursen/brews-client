window.React = require('react');

var keycloak = require('keycloak')();

keycloak.init({
  onLoad: 'login-required'
})

keycloak.onAuthSuccess = function() {
  var BrewList = require('brews/brews/BrewList');
  React.render(
    <div className="container">
      <BrewList />
    </div>
    , document.getElementById('app'));
};
