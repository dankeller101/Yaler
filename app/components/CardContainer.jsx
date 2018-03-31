var React = require('react');
import Cards, { Card } from 'react-swipe-card';
var ProfileModal = require('ProfileModal');
var ProfilePaneNoBio = require('ProfilePaneNoBio');
var firebase = require('firebaseapp');
var Panel = require('Panel');
var Chat = require('Chat');
var AdviceModalManager = require('AdviceModalManager');


var CardContainer = React.createClass({

  getInitialState: function() {
    return {
      active: " ",
      currentState: this.props.currentState,
      open: true,
      adviceModal: false,
      stageAdviceModal: 0,
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

  closeAdviceModal: function() {
    this.setState({
      adviceModal: false,
    });
  },

  closeMatchModal: function() {
    this.moveToChat();
    this.setState({
      adviceModal: false,
    });
  },

  activateAdviceModal: function(stage) {
    this.setState({
      adviceModal: true,
      stageAdviceModal: stage,
    });
  },

  render: function() {
    var {data} = this.props;
    var cards = <div className="columns">
                <div className="column col-12">
                  <Cards onEnd={this.end} className='master-root card-pos' id="card-container">
                    {data.map(item =>
                      <Card
                        key={item.picture}
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
                              photo={item.photo}
                            />
                          </div>
                        </Card>
                      )}
                    </Cards>
                </div>
                <div>
                  <h5 className="swipe-left-pos">
                    Swipe <i className="icon icon-back"></i> if you want to pass!
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
                    <Chat
                      handleRefresh={this.resetCurrentState}
                      handleAdviceModal={this.activateAdviceModal}
                    />
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
            <h5 href="#" className="btn btn-link">
              {this.props.currentState >= 0 ? "YALER" : "The Danny App"}
            </h5>
          </section>
          <section className="navbar-center">
            {this.props.currentState >= 0
              ? <img src="./img/Logo.png" style={{
                  height: '40px',
                }}/>
              : "Danny, 22 Messenger"}
          </section>
          <section className="navbar-section" style={{
            position: 'relative',
            right: '20px',
          }}>
            <button href="#" className="btn btn-link">Logout</button>
          </section>
        </header>
        <div className="column col-3">
          <Panel
            currentState={this.state.currentState}
          />
        </div>
        <div className="column col-9">
          {cards}
       </div>
       <div>
         <AdviceModalManager
           handleMatchClose={this.closeMatchModal}
           handleClose={this.closeAdviceModal}
           handleActivate={this.activateAdviceModal}
           active={this.state.adviceModal}
           stage={this.state.stageAdviceModal}
           uid={this.props.uid}
         />
       </div>
       <div>
         {data.map(item =>
           <ProfileModal
             key={item.picture}
             active={this.state.active === item.bio}
             bio={item.bio}
             photo={item.photo}
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
    if (this.state.currentState === 20) {
      this.activateAdviceModal(12)
    } else if (this.state.currentState === 11) {
      this.activateAdviceModal(13);
      this.updateCurrentState();
    } else if (this.state.currentState === 14) {
      this.activateAdviceModal(14);
      this.updateCurrentState();
    } else if (this.state.currentState === 17) {
      this.activateAdviceModal(15);
      this.updateCurrentState();
    } else {
      this.updateCurrentState();
    }
  },

  right: function() {
    event.stopPropagation();
    if ((this.state.currentState % 3 === 0 && this.state.currentState !== 0) ||
      this.state.currentState > 9) {
      this.activateAdviceModal(11);
    } else if (this.state.currentState === 0) {
      this.activateAdviceModal(0);
      this.updateCurrentState();
    } else if (this.state.currentState === 1) {
      this.activateAdviceModal(1);
      this.updateCurrentState();
    } else if (this.state.currentState === 2) {
      this.activateAdviceModal(4);
      this.updateCurrentState();
    } else if (this.state.currentState === 4) {
      this.activateAdviceModal(6);
      this.updateCurrentState();
    } else if (this.state.currentState === 5) {
      this.activateAdviceModal(8);
      this.updateCurrentState();
    } else if (this.state.currentState === 7) {
      this.activateAdviceModal(9);
      this.updateCurrentState();
    } else if (this.state.currentState === 8) {
      this.activateAdviceModal(10);
      this.updateCurrentState();
    } else {
      this.updateCurrentState();
    }
  },

  moveToChat: function () {
    this.setState({currentState: -1});
    firebase.writeCurrentState(this.props.uid, -1);
  },

  updateCurrentState: function() {
    var newState = this.state.currentState + 1;
    this.setState({currentState: newState});
    firebase.writeCurrentState(this.props.uid, newState);
  },

  resetCurrentState: function() {
    this.setState({currentState: 0});
    firebase.writeCurrentState(this.props.uid, 0);
  },
});

module.exports = CardContainer;
