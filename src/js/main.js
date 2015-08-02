window.React = require('react');

var BrewList = require('brews/brews/BrewList');
React.render(
  <div className="container">
    <BrewList />
  </div>
  , document.getElementById('app'));
