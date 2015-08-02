
var callback = null;
var Button = React.createClass({
  propTypes: {
    btnClasses: React.PropTypes.arrayOf(React.PropTypes.string),
    label: React.PropTypes.string,
    helpPosition: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    onBtnClick: React.PropTypes.func,
    helpTextTime: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      isTabFocused: false,
      isHelpTextDisplayed: false
    };
  },

  getDefaultProps: function() {
    return {
      btnClasses: [],
      faIcon: '',
      helpPosition: 'bottom',
      type: 'button',
      onBtnClick: function() {},
      helpTextTime: 1000
    };
  },

  handleKeyPress: function(e) {
    var key = e.which || e.keyCode;
    if(key === 9) {
      this.viewHelpText(e);
      this.setState({ isTabFocused: true });
    }
  },

  removeTabFocus: function() {
    this.hideHelpText();
    this.setState({ isTabFocused: false });
  },


  viewHelpText: function(e) {
    if(callback) {
      return;
    }

    callback = setTimeout(function() {
      this.setState({ isHelpTextDisplayed: true });
    }.bind(this), this.props.helpTextTime);
  },

  hideHelpText: function(e) {
    if(callback) {
      clearTimeout(callback);
    }

    callback = null;
    this.setState({ isHelpTextDisplayed: false });
  },

  render: function() {
    var classes = this.props.btnClasses;
    if(this.state.isTabFocused) {
      classes.push('tab-focus');
    }

    if(this.state.isHelpTextDisplayed) {
      classes.push('help-text-visible');
    }

    var className = classes.join(' ');
    var helpText = this.props.label
        ? <div className={'help-text-' + this.props.helpPosition}>{this.props.label}</div>
        : null;

    return (
      <button type={this.props.type} className={className} onClick={this.props.onBtnClick} aria-label={this.props.label}
            onKeyUp={this.handleKeyPress} onBlur={this.removeTabFocus} onMouseOver={this.viewHelpText} onMouseLeave={this.hideHelpText}>
        {this.props.children}
        {helpText}
      </button>
    );
  }
});

module.exports = Button;
