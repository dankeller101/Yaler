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
                graph.get(FBUid + "?fields=picture", function(err, res){
                  console.log(res);
                  var picture = res.picture.data.url;
                  var picture = picture.substring(0, picture.length - 17);
                  console.log(picture);
                });
                graph.get(FBUid + "?fields=id,name,birthday,gender", function(err, res) {
                  console.log(res);
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
          name: "Test",
          age: "20",
          bio: "The latest in filling space, I'll be the best at filling your space"
        },
        {
          name: "Emma",
          age: "19",
          bio: "Majoring in mechanical engineering and art history because some day I'd like to make a Van Gogh"
        },
        {
          name: "Tyler",
          age: "21",
          bio: "bada dada daa    I'm loving it."
        },
        {
          name: "Danny",
          age: "22",
          bio: "Hot, Fancy, Shmancy, the perfect Man",
        },
        {
          name: "Isaac",
          age: "20",
          bio: "6'0\" - 3\" + 2' / 2"
        },
        {
          name: "Nick",
          age: "22",
          bio: "Grindr broke"
        },
        {
          name: "Danny",
          age: "22",
          bio: "Rated by mothers across the globe as the perfect future husband"
        },
        {
          name: "Aïssa",
          age: "18",
          bio: "Haven't learned how to sleep at college yet"
        },
        {
          name: "Meg",
          age: "21",
          bio: "At Yale I'm majoring in Art History, but at home I'll always be a major dissapointment.",
        },
        {
          name: "Danny",
          age: "22",
          bio: "Ayyyyyy it's me again"
        }
      ],
    };
  },

  render: function() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' render={(props) => {
          return <CardContainer
            data={this.state.profiles}
            currentState={this.state.currentState}
            uid={this.state.current_uid}
          />;
        }}/>
        <Route exact path="/login" render={(props) => {
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
        <Route exact path="/chat" render={(props) => {
          return <Chat
            {...props}
          />;
        }}/>
      </Switch>
    </HashRouter>
  );
},
});



module.exports = Container;
