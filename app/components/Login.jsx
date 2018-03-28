var React = require('react');
var firebaseUISetup = require('FirebaseUISetup');

var firebase = require('firebaseapp');

var firebase = firebase.getFirebase();

var Login = React.createClass({
  componentDidMount() {
    var {current_uid} = this.props;
    if (!current_uid || current_uid === null) {
      firebaseUISetup
        .getUI()
        .start(
          '#firebaseui-auth-container',
          firebaseUISetup.getConfig()
        );
    }
  },
  handleLogout: function() {
    firebase.auth().signOut().then(() => {
    }).catch((e) => {
      console.log(e);
    });
  },
  render: function () {
    var login_logout = <div id="firebaseui-auth-container"></div>;
    var button = null;
    if (this.props.current_uid && this.props.current_uid !== null) {
      login_logout = <h3>You have been logged in.</h3>;
      button = <div className="columns">
            <div className="column col-3"/>
            <div className="column col-8">
              <h3>Logged in!</h3>
              <button onClick={this.handleLogout}>Log out </button>
            </div>
          </div>;
    }
    return (
      <div>
        {/* <NavBar current_uid={this.props.current_uid}/> */}
        <div className="container beneath-nav background-div">
          <div className="columns full-height">
            <div className="column col-2 "/>
            <div className="column col-8 focus-div">
              <div className="container vertical-center">
                {/* <CenteredHeader title="Login" size="small"/> */}
                <div className="columns">
                  <div className="column col-3"/>
                  <div className="column col-6 ">
                    {login_logout}
                    {button}
                  </div>
                  <div className="column col-3"/>
                </div>
              </div>
            </div>
            <div className="column col-2"/>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Login;
