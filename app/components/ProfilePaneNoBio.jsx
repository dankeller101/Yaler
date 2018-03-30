var React = require('react');

var ProfilePaneNoBio = React.createClass({
  render: function() {
    return (
      <div className="card">
        <div className="card-image">
          <img
            src={this.props.photo}
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
