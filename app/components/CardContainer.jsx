var React = require('react');
import Cards, { Card } from 'react-swipe-card';
var ProfileModal = require('ProfileModal');
var firebase = require('firebaseapp');
var $ = require('jquery');

var CardContainer = React.createClass({

  getInitialState: function() {
    return {
      active: " ",
      currentState: this.props.currentState,
    };
  },

  activateModal: function() {
    this.setState({
      active: "active"
    });
  },

  render: function() {
    var {data} = this.props;
    return (
      <div>
	     <Cards onEnd={this.end} className='master-root' id="card-container">
         {data.map(item =>
           <Card
             key={item.name}
             id={item.bio}
             onSwipeLeft={this.left}
             onSwipeRight={this.right}
             >
            <div>
             <div className="card">
               <div className="card-image">
                 <img src="./img/Whiffs.jpg" className="img-responsive rounded"/>
               </div>
               <div className="card-header">
                 <div className="card-title h5">{item.name + ", " + item.age}</div>
                 <div className="card-subtitle text-gray">Yale University</div>
               </div>
               <div className="card-body">
                 {item.bio}
               </div>
                <div className="card-footer">
                  <button
                    onClick={this.activateModal}
                    className="btn btn-primary">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
           </Card>
         )}
       </Cards>
       <ProfileModal active={this.state.active}/>
     </div>
    );
  },

  end: function() {
    console.log('end');
  },

  left: function() {
    this.updateCurrentState();
  },

  right: function() {
    this.updateCurrentState();
  },

  updateCurrentState: function() {
    var newState = this.state.currentState + 1;
    this.setState({currentState: newState});
    firebase.writeCurrentState(this.props.uid, newState);
  },
});

module.exports = CardContainer;
