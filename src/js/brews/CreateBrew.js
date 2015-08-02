var DatePicker = require('brews/common/DatePicker');

var CreateBrew = React.createClass({
  
  render: function() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="brewName">Brew Name</label>
          <input type="text" id="brewName" name="brewName" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="brewName">Original Gravity</label>
          <input type="text" id="originalGravity" name="originalGravity" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="brewName">Date Brewed</label>
          <DatePicker value={new Date()} defaultIcon={true} />
        </div>
      </form>
    );
  }
});

module.exports = CreateBrew;
