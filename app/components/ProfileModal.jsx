var React = require('react');
var ProfilePane = require('ProfilePane');

var ProfileModal = React.createClass({

  getInitialState: function() {
    return {
      active: this.props.active,
    };
  },

  closeModal: function() {
    this.setState({
      active: " ",
    });
  },

  componentWillReceiveProps: function() {
    this.setState({
      active: this.props.active,
    });
  },

  render: function() {
    return (
      <div className={"modal-override modal " + this.state.active} id="modal-id">
        <a onClick={this.closeModal} className="modal-overlay" aria-label="Close"></a>
        <div className="modal-container">
          <div className="modal-header">
            <a onClick={this.closeModal} className="btn btn-clear float-right" aria-label="Close"></a>
          </div>
        <div className="modal-body">
          <div className="content">
            <ProfilePane/>
          </div>
        </div>
      </div>
    </div>
    );
  },

});

module.exports = ProfileModal;
