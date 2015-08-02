
var callback = null;
/**
 * Creates an Icon button. (A button with no borders or background).
 * If the faIcon prop is not supplied, it will attempt to render the children
 * of this component instead of creating a font-awesome icon button
 *
 * @prop btnClasses an array of additional css classes to apply to the button
 * @prop label The aria label and the help text to display for the button.
 * @prop helpPosition the position of the help text.
 * @prop faIcon the font-awesome icon name to use (without the 'fa-' prefix)
 * @prop onBtnClick The function to call when the button is clicked.
 * @children The content to render if the icon button is not a font-awesome icon button.
 */
var IconButton = React.createClass({
  propTypes: {
    btnClasses: React.PropTypes.arrayOf(React.PropTypes.string),
    label: React.PropTypes.string.isRequired,
    helpPosition: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    faIcon: React.PropTypes.string,
    type: React.PropTypes.oneOf(['button', 'reset', 'submit']),
    onBtnClick: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      isTabFocused: false,
      isHelpTextVisible: false
    };
  },

  getDefaultProps: function() {
    return {
      btnClasses: [],
      faIcon: '',
      helpPosition: 'bottom',
      type: 'button',
      onBtnClick: function() {}
    };
  },

  handleKeyPress: function(e) {
    var key = e.which || e.keyCode;
    if(key === 9) {
      this.viewHelpText();
      this.setState({ isTabFocused: true });
    } else if(key === 32) {
      this.hideHelpText();
    }
  },

  removeTabFocus: function() {
    this.hideHelpText();
    this.setState({ isTabFocused: false });
  },

  viewHelpText: function() {
    if(callback) {
      return;
    }

    // View help text after 1 second
    callback = setTimeout(function() {
      this.setState({ isHelpTextVisible: true });
    }.bind(this), 1000);
  },

  hideHelpText: function() {
    if(callback) {
      clearTimeout(callback);
    }

    callback = null;
    this.setState({ isHelpTextVisible: false });
  },

  handleClick: function(e) {
    this.hideHelpText();
    this.props.onBtnClick(e);
  },

  render: function() {
    var classes = ['icon-btn'];
    if(this.state.isTabFocused) {
      classes.push('tab-focus');
    }

    if(this.state.isHelpTextVisible) {
      classes.push('help-text-visible');
    }

    var className = classes.concat(this.props.btnClasses).join(' ');
    var content = this.props.faIcon ?
      <span className={'fa fa-' + this.props.faIcon} /> :
      this.props.children;
    return (
      <button type={this.props.type} className={className} onClick={this.handleClick} aria-label={this.props.label}
            onKeyUp={this.handleKeyPress} onBlur={this.removeTabFocus} onMouseOver={this.viewHelpText} onMouseLeave={this.hideHelpText}>
        {content}
        <div className={'help-text-' + this.props.helpPosition}>{this.props.label}</div>
      </button>
    );
  }
});

module.exports = IconButton;
