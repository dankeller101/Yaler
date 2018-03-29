var React = require('react');

var ProfilePaneNoBio = React.createClass({
  render: function() {
    return (
      <div className="card">
        <div className="card-image">
          <img
            src="https://lookaside.facebook.com/platform/profilepic/?asid=1815247825152279&height=250&width=250"
            className="img-responsive rounded"
            onClick={() => {
             this.props.activateModal(this.props.bio);
            }}
          />
        </div>
        <div className="card-header">
          <div className="card-title h5">{this.props.name + ", " + this.props.age}</div>
          <div className="card-subtitle text-gray">Yale University</div>
        </div>
       </div>
    );
  },
});

module.exports = ProfilePaneNoBio;
