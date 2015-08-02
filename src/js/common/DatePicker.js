var IconButton = require('brews/common/buttons/IconButton');

var DatePicker = React.createClass({
  propTypes: {
    locales: React.PropTypes.arrayOf(React.PropTypes.string),
    value: React.PropTypes.instanceOf(Date),
    icon: React.PropTypes.element,
    defaultIcon: React.PropTypes.bool,
    className: React.PropTypes.string,
    inputClassName: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      locales: ['en-US'],
      format: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      value: '',
      icon: null,
      defaultIcon: false,
      className: '',
      inputClassName: ''
    };
  },

  getInitialState: function() {
    return {
      isCalendarOpen: false
    };
  },
  
  
  render: function() {
    var classes = ['datepicker-container'];
    this.props.className && clases.push(this.props.inputClassName);

    var textClasses = this.props.inputClassName ? [this.props.inputClassName] : [];
    if(this.props.icon || this.props.defaultIcon) {
      classes.push('input-group');
      textClasses.push('form-control');
    }
    return (
      <div className={classes.join(' ')}>
        <input type="text" ref="date" className={textClasses.join(' ')} defaultValue={this._format(this.props.value)} onClick={this.toggleCalendar} />
        {this._getIcon()}
        {this.state.isCalendarOpen && <Calendar {...this.props} />}
      </div>
    );
  },

  toggleCalendar: function() {
    this.setState({
      isCalendarOpen: !this.state.isCalendarOpen
    });
  },

  _format: function(date) {
    return new Intl.DateTimeFormat(this.props.locales, this.props.format).format(date);
  },

  _getIcon: function() {
    if(this.props.defaultIcon) {
      return (
        <div className="datepicker-icon input-group-addon" role="button" onClick={this.toggleCalendar}>
          <div className="fa fa-calendar" aria-hidden="true" />
        </div>
      );
    }

    var icon = this.props.icon;
    if(icon) {
      return icon.bind(this, this.toggleCalendar);
    }
    
    return null;
  }
});

var Calendar = React.createClass({
  
  render: function() {
    var weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    var weeks = [{ days: [1, 2, 3, 4, 5, 6, 7] }, { days: [8, 9, 10, 11, 12, 13] }];
    return (
      <div className="datepicker-calendar">
        <nav>
          <IconButton onBtnClick={this.previousMonth} faIcon="chevron-left" label="Previous Month" />
          <span className="month-year"></span>
          <span className="info-text">Click on a date to view more info</span>
          <IconButton onBtnClick={this.nextMonth} faIcon="chevron-right" label="Next Month" />
        </nav>
        <div className="calendar-container">
          <header>
            {weekdays.map(function(day) { return <div key={day}>{day}</div> })}
          </header>

          <div className="calendar-body">
            {weeks.map(function(week, i) {
              return (
                <div className="week" key={week + i}>
                  {week.days.map(function(day) {
                    return (
                      <div role="button" className={this._getDayClassName} onClick={this.selectDay.bind(day)} key={day}>
                        {day.number}
                      </div>
                    );
                  }.bind(this))}
                </div>
              );
            }.bind(this))}
          </div>
        </div>
      </div>
    );
  },

  previousMonth: function() {

  },

  nextMonth: function() {

  },

  selectDay: function(day) {

  }
});

module.exports = DatePicker;
