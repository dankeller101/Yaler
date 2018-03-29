var React = require('react');
var ProfilePane = require('ProfilePane');

var ProfileModal = React.createClass({

  render: function() {
    return (
      <div
        className={" modal " + (this.props.active ? "active" : " ")}
        id="modal-id">
        <a onClick={this.props.onClose} className="modal-overlay" aria-label="Close"></a>
        <div className="modal-override modal-container">
        <div className="modal-body modal-body-override"
          >
          <div className="content">
            <ProfilePane
              name={this.props.name}
              age={this.props.age}
              profileIMG="https://lookaside.facebook.com/platform/profilepic/?asid=1815247825152279&height=250&width=250"
              bio={this.props.bio}
            />
          </div>
        </div>
      </div>
    </div>
    );
  },

});

module.exports = ProfileModal;
