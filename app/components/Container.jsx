const {
  HashRouter,
  Switch,
  Route
} = require('react-router-dom');
var React = require('react');
var CardContainer = require('CardContainer');
var Login = require('Login');
var Profile = require('Profile');
var baseFirebase = require('firebase');
var Chat = require('Chat');
var firebase = require('firebaseapp');
var graph = require('fbgraph');
var PrivacyandTos = require('PrivacyandTos');

var Container = React.createClass({
  componentWillMount(){
    baseFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({current_uid: user.uid});
        firebase.readCurrentState(user.uid)
          .then((currentState) => {
            if (currentState && currentState !== null) {
              this.setState({
                currentState: currentState,
                profiles: this.state.profiles.slice(currentState),
              });
            } else {
              this.setState({
                currentState: 0,
                profiles: this.state.profiles.slice(currentState),
              });
            }
          }).catch((e) => {console.log(e);});
        firebase.readUserBio(user.uid)
          .then((bio) => {
            this.setState({
              bio: bio,
            });
          }).catch((e) => {console.log(e);});
        firebase.readFBuid(user.uid)
          .then((FBUid) => {
            firebase.readFBAuth(user.uid)
              .then((FBAuth) => {
                this.setState({
                  OAuth: FBAuth,
                  FBid: FBUid
                });
                graph.setAccessToken(FBAuth);
                var params = {
                  fields: "picture.height(250).width(250)",
                };
                graph.get(FBUid, params, (err, res) => {
                  var picture = res.picture.data.url;
                  this.setState({
                    profile:picture,
                  });
                });
                graph.get(FBUid + "?fields=id,name,gender", (err, res) => {
                  var name = res.name.split(" ");
                  name = name[0];
                  this.setState({
                    name: name,
                  });
                });
            }).catch((e) => {console.log(e);});
          }).catch((e) => {console.log(e);});
      } else {
        this.setState({current_uid: null});
      }
    });
  },

  getInitialState(){
    return {
      current_uid: null,
      OAuth: null,
      FBid: null,
      bio: "",
      name: "",
      profile: "",
      currentState: 0,
      profiles: [
        {
          name: "Emil",
          age: "21",
          bio: <div>
            Psych Major
            <div className="text-break"></div>
              (6’ 3” -5” + 3”) / 2 + 29.5”
            <div className="text-break"></div>
              Queso or don’t talk"
          </div>,
          photo: "./img/Emil.jpg",
        },
        {
          name: "Emma",
          age: "19",
          bio: <div>
Got drunk and bought a tandem bike
            <div
              className="text-break"
              style={{height:'40px'}}></div>;)
          </div>,
          photo: "./img/Emma.jpg",
        },
        {
          name: "Tyler",
          age: "21",
          bio: <div>
            On this after a long relationship
            <div
              className="text-break"
              style={{height:'40px'}}></div>
              Gertude, take me back
          </div>,
          photo: "./img/Tyler.jpg",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Founder of Yaler</div>,
          photo: "./img/Danny1.png",
        },
        {
          name: "Isaac",
          age: "20",
          bio: <div>
            Girlfriend Gertrude and I are looking for a third
          </div>,
          photo: "./img/Isaac.jpg",
        },
        {
          name: "Mary",
          age: "22",
          bio: <div> Looking for a kidney, ideally ASAP
          </div>,
          photo: "./img/Mary.jpg",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Rated by mothers across the globe as the perfect future husband</div>,
          photo: "./img/Danny2.png",
        },
        {
          name: "Ana",
          age: "21",
          bio: <div>
            At Yale I'm majoring in Poli Sci, but at home I'll always be a major dissapointment.
          </div>,
          photo: "./img/Ana.png",
        },
        {
          name: "Meg",
          age: "21",
          bio: <div>
            Venmo me $10 and I’ll have a good time
          </div>,
          photo: "./img/Tandoor.jpg",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>I don’t kiss with tongue, change my mind</div>,
          photo: "./img/Danny3.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Cole Aronson Groupie</div>,
          photo: "./img/Danny4.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Locke in the streets and hobbes in the sheets</div>,
          photo: "./img/Danny5.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>I'm THAT boy the pipes are calling</div>,
          photo: "./img/DannySci1.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Check out my sound cloud: https://soundcloud.com/user-308577675-250796007</div>,
          photo: "./img/DannySci2.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>
            Today is gonna be the day
That they're gonna throw it back to you
By now you should've somehow
Realized what you gotta do
I don't believe that anybody
Feels the way I do, about you now
          </div>,
          photo: "./img/DannySci3.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Responsible, caring, willing to not pursue a career and instead provide childcare</div>,
          photo: "./img/DannyVod1.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Respectable enough to bring to any PTA meeting</div>,
          photo: "./img/DannyVod2.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Definitely going to be a great dad someday</div>,
          photo: "./img/DannyVod3.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>
            Backbeat, the word was on the street
            That the fire in your heart is out
            I'm sure you've heard it all before
            But you never really had a doubt
            I don't believe that anybody
            Feels the way I do about you now
          </div>,
          photo: "./img/DannyJew1.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>
            And all the roads we have to walk are winding
And all the lights that lead us there are blinding
There are many things that I
Would like to say to you but I don't know how
Because maybe, you're gonna be the one that saves me
And after all, you're my wonderwall
          </div>,
          photo: "./img/DannyJew2.png",
        },
        {
          name: "Danny",
          age: "22",
          bio: <div>Putting the N into NJB.  Well, also, really the J.  And the B.</div>,
          photo: "./img/DannyJew3.png",
        },
      ],
    };
  },

  render: function() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/swipe' render={(props) => {
          return <CardContainer
            data={this.state.profiles}
            currentState={this.state.currentState}
            uid={this.state.current_uid}
          />;
        }}/>
        <Route exact path="/" render={(props) => {
          return <Login
            {...props}
            current_uid={this.state.current_uid}
          />;
        }}/>
        <Route exact path="/profile" render={(props) => {
          return <Profile
            {...props}
            bio={this.state.bio}
            name={this.state.name}
            profileIMG={this.state.profile}
            current_uid={this.state.current_uid}
          />
        }}/>
        <Route exact path="/privacy"
          render={(props) => {
            return <PrivacyandTos/>
          }}/>
      </Switch>
    </HashRouter>
  );
},
});



module.exports = Container;
