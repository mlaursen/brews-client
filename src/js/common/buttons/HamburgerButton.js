var IconButton = require('./IconButton.react');

var HamburgerButton = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool,
    isLarge: React.PropTypes.bool,
    btnClasses: React.PropTypes.arrayOf(React.PropTypes.string),
    label: React.PropTypes.string.isRequired,
    helpPosition: React.PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
    onBtnClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      btnClasses: [],
      isOpen: false,
      isLarge: false
    };
  },
  
  render: function() {
    var btnClasses = ['hamburger-btn'];
    if(this.props.isOpen) {
      btnClasses.push('hamburger-open');
    }

    if(this.props.isLarge) {
      btnClasses.push('hamburger-btn-lg');
    }

    btnClasses = btnClasses.concat(this.props.btnClasses);
    return (
      <IconButton {...this.props} btnClasses={btnClasses}>
        <div className="left-bars" />
        <div className="right-bars" />
      </IconButton>
    );
  }
});

module.exports = HamburgerButton;
