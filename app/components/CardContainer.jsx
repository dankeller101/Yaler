var React = require('react');
import Cards, { Card } from 'react-swipe-card';
var ProfileModal = require('ProfileModal');
var ProfilePaneNoBio = require('ProfilePaneNoBio');
var firebase = require('firebaseapp');
var Panel = require('Panel');
var Chat = require('Chat');


var CardContainer = React.createClass({

  getInitialState: function() {
    return {
      active: " ",
      currentState: this.props.currentState,
      open: true,
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      currentState: nextProps.currentState,
    });
  },

  activateModal: function(bio) {
    this.setState({
      active: bio
    });
  },

  deactivateModal: function() {
    this.setState({
      active: " ",
    });
  },

  render: function() {
    var {data} = this.props;
    var cards = <div className="columns">
                <div className="column col-12">
                  <Cards onEnd={this.end} className='master-root card-pos' id="card-container">
                    {data.map(item =>
                      <Card
                        key={item.name}
                        id={item.bio}
                        onSwipeLeft={this.left}
                        onSwipeRight={this.right}
                        >
                         <div>
                            <ProfilePaneNoBio
                              activateModal={this.activateModal}
                              name={item.name}
                              age={item.age}
                              bio={item.bio}
                            />
                          </div>
                        </Card>
                      )}
                    </Cards>
                </div>
                <div>
                  <h5 className="swipe-left-pos">
                    Swipe <i className="icon icon-back"></i> if you aren't interested!
                  </h5>
                  <h5 className="swipe-right-pos">
                    Swipe <i className="icon icon-forward"></i> if you are interested!
                  </h5>
                  <h5 className="bio-info-pos">
                    For more info, click on their <i className="icon icon-photo"></i>!
                  </h5>
                </div>
              </div>;
    if (this.state.currentState < 0) {
      cards = <div className="columns">
                  <div className="column col-12">
                    <Chat/>
                  </div>
              </div>;
    }
    return (
      <div className="columns">
        <header className="navbar navbar-custom">
          <section className="navbar-section" style={{
            position: 'relative',
            left: '10px',
          }}>
            <h5 href="#" className="btn btn-link">Yaler</h5>
          </section>
          <section className="navbar-center">
            YALER
          </section>
          <section className="navbar-section" style={{
            position: 'relative',
            right: '20px',
          }}>
            <button href="#" className="btn btn-primary">Login</button>
          </section>
        </header>
        <div className="column col-3">
          <Panel/>
        </div>
        <div className="column col-9">
          {cards}
       </div>
       <div>
         {data.map(item =>
           <ProfileModal
             key={item.bio}
             active={this.state.active === item.bio}
             bio={item.bio}
             age={item.age}
             name={item.name}
             onClose={this.deactivateModal}
           />
        )}
       </div>
     </div>
    );
  },

  end: function() {
    console.log('end');
  },

  left: function() {
    event.stopPropagation();
    this.updateCurrentState();
  },

  right: function() {
    event.stopPropagation();
    if (this.state.currentState % 3 === 0) {
      this.moveToChat();
    } else {
      this.updateCurrentState();
    }
  },

  moveToChat: function () {
    this.setState({currentState: -1});
    firebase.writeCurrentState(this.props.uid, -1);
  },

  firstRight: function() {
    this.setState({
      open: false,
    });
  },

  updateCurrentState: function() {
    var newState = this.state.currentState + 1;
    this.setState({currentState: newState});
    firebase.writeCurrentState(this.props.uid, newState);
  },
});

module.exports = CardContainer;
