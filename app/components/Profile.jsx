var React = require('react');
var firebase = require('firebaseapp');
var ProfilePane = require('ProfilePane');


var Profile = React.createClass({
  getInitialState(){
    return {
      FBUid: null,
      FBAuth: null,
      bio: this.props.bio,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      bio: nextProps.bio,
    });
  },

  getProfile: (current_uid, obj) => {
    //FBid, auth
    firebase.readFBuid(current_uid)
      .then((newFBUid) => {
        obj.setState({
          FBUid: newFBUid,
        });
      })
      .catch((e) => {console.log(e);});
    firebase.readFBAuth(current_uid)
      .then((newFBAuth) => {
        obj.setState({
          FBAuth: newFBAuth,
        });
      })
      .catch((e) => {console.log(e);});
  },

  onChangeBio: function(event) {
    this.setState({
      bio: event.target.value,
    });
    firebase.writeUserBio(this.props.current_uid, event.target.value);
  },

  render: function() {
    return (
      <div>
        <header className="navbar navbar-custom">
          <section className="navbar-section" style={{
            position: 'relative',
            left: '10px',
          }}>
            <h5 href="#" className="btn btn-link">
              YALER
            </h5>
          </section>
          <section className="navbar-center">
            <img src="./img/Logo.png" style={{
              height: '40px',
            }}/>
          </section>
          <section className="navbar-section" style={{
            position: 'relative',
            right: '20px',
          }}>
            <button href="#" className="btn btn-link">Logout</button>
          </section>
        </header>
      <div className="container">
        <div className="column col-12 space-y-1"/>
        <div className="columns">
          <div className="column col-4">
            <div className="columns">
              <div className="column col-7 centered">
                <h3>Update Your Bio</h3>
              </div>
            </div>
            <form className="form">

              <div className="column col-12 space-y-1"></div>

              <div className="columns">
                <div className="column col-1"></div>
                <div className="column col-11">
                  <div className="form-group">
                    <label className="form-label" for="input-example-3">Bio</label>
                    <textarea className="form-input" id="input-example-3"
                      placeholder="Textarea" rows="3"
                      onChange={this.onChangeBio}
                      value={this.state.bio}
                      ></textarea>
                  </div>
                  <div className="form-group">
                    <button
                      onClick={() => {
                        this.props.history.push('/swipe');
                      }}
                      className="btn btn-primary">
                      Get Swiping!
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="column col-1" style={{height: '700px'}}>
            <div className="divider-vert" style={{height: '700px'}}></div>
          </div>
          <div className="column col-7">
            <div className="container">
              <div className="columns">
                <div className="column col-4"></div>
                <div className="column col-4">
                  <h2>Profile Preview</h2>
                </div>
                <div className="column col-4"></div>
              </div>
            </div>
            <div className="container">
              <div className="columns">
                <div className="column col-12 space-y-2"></div>
                <div className="column col-3"></div>
                <div className="column col-4">
                  <ProfilePane
                    profileIMG={this.props.profileIMG}
                    name={this.props.name}
                    bio={this.state.bio}
                  />
                </div>
                <div className="column col-4"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    );
  },
});

module.exports = Profile;
