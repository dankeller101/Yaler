var React = require('react');
var AdviceModal = require('AdviceModal');
var firebase = require('firebaseapp');

var AdviceModalManager = React.createClass({

  getInitialState: function() {
    return {
      phone: "",
      modals: [
        {
          text:"Hey, in the first message they sent you, they asked when they were going to meet your parents, so we took the initiative and just unmatched them for you.",
          buttons:
          <div>
            <button
              onClick={this.props.handleClose}
              className="btn btn-primary">Thanks!</button>
          </div>,
        },
        {
          text: "Are you sure you want to match with them?",
          buttons:
          <div>
            <button
              onClick={this.props.handleClose}
              className="btn">You're right, I'm not sure</button>
              <button
                onClick={() => {this.props.handleActivate(2)}}
                className="btn btn-primary">Yes, I'm sure</button>
          </div>,
        },
        {
          text: "You’re probably already taking at least 4 credits, and people say that a relationship at Yale is at Least 2 and half, so do you really think you can handle 6.5 credits?",
          buttons:<div>
            <button
              onClick={this.props.handleClose}
              className="btn">You're right, I don't have time</button>
              <button
                onClick={() => {this.props.handleActivate(3)}}
                className="btn btn-primary">I can do it.</button>
          </div>,
        },
        {
          text: "You know what, finals are coming up.  You don’t have the time for the actual dates OR the emotional duress that will surely follow them.  I’m making the executive decision for you and swiping left.",
          buttons:<div>
            <button
              onClick={this.props.handleClose}
              className="btn btn-primary">Thank you!</button>
          </div>,
        },
        {
          text: "Unfortunately, their swipe indicated that they weren't just interested in that way, but 'they would love to grab a meal sometime, just as friends.'  Do you want us to try arrange something?",
          buttons:<div>
            <button
              onClick={this.props.handleClose}
              className="btn">No, screw that</button>
              <button
                onClick={() => {this.props.handleActivate(5)}}
                className="btn btn-primary">Sure!  I'll take a friendship even if something else doesn't work out!</button>
          </div>,
        },
        {
          text: "We reached out to their AI, but it appears that they're booked until August.",
          buttons:<div>
              <button
                onClick={this.props.handleClose}
                className="btn btn-primary">Oh.  Okay.</button>
          </div>,
        },
        {
          text: "In freshman year, you one time flirted with their friend’s suitemate’s best friend who totally had a crush on you even though you didn’t know it but then you totally went for that other person.  In order to avoid a civil war that would rend one of the most prominent friend groups at Yale apart, we can’t allow you to match with this person.",
          buttons:<div>
              <button
                onClick={() => {this.props.handleActivate(7)}}
                className="btn btn-primary">"Prominent friend group"?</button>
          </div>,
        },
        {
          text: "Clearly, you just don't get the importance of social image.",
          buttons: <div>
              <button
                onClick={this.props.handleClose}
                className="btn btn-primary">what?</button>
          </div>
        },
        {
          text: "You’re out of their league.  We’re gonna save you some time and swipe left.",
          buttons: <div>
              <button
                onClick={this.props.handleClose}
                className="btn btn-primary">Thanks?</button>
          </div>
        },
        {
          text: "You're clearly a bird.  They're clearly a fish.  This would never work out.",
          buttons: <div>
              <button
                onClick={this.props.handleClose}
                className="btn btn-primary">You're so right.</button>
          </div>
        },
        {
          text: "WHAT? WHAT?  WHAT ARE YOU THINKING?! NO! You’re sick.  We’re swiping left.",
          buttons: <div>
              <button
                onClick={this.props.handleClose}
                className="btn btn-primary">????</button>
          </div>
        },
        {
          text: "Congratulations!  You just matched with Danny, 22!",
          buttons:
          <div>
            <button
              onClick={this.props.handleMatchClose}
              className="btn btn-primary">
                Start Chat
            </button>
          </div>,
        },
        {
          text: "Congratulations!  You just matched with Danny, 22!  You clearly swiped right.  You definitely did.  Yup. Good choice.",
          buttons:
          <div>
            <button
              onClick={this.props.handleMatchClose}
              className="btn btn-primary">
                Start Chat
            </button>
          </div>,
        },
        {
          text: "C'mon, this Danny guy looks like quite a steal.  Don't you want to give him a chance?",
          buttons:
          <div>
            <button
              onClick={this.props.handleClose}
              className="btn">No</button>
              <button
                onClick={() => {this.props.handleActivate(11)}}
                className="btn btn-primary">Sure!</button>
          </div>,
        },
        {
          text: "You know what they say.  Danny could wind up on his feet anywhere, even a parking lot.  Sure 'They' is his mom, but why not reconsider?",
          buttons:
          <div>
            <button
              onClick={this.props.handleClose}
              className="btn">No</button>
              <button
                onClick={() => {this.props.handleActivate(11)}}
                className="btn btn-primary">Sure!</button>
          </div>,
        },
        {
          text: "I heard that Danny is emotionally competent, kind, and some say even a little funny.  Doesn't that sound great?  Once, again, also from his mother, but minor point.",
          buttons:
          <div>
            <button
              onClick={this.props.handleClose}
              className="btn">No</button>
              <button
                onClick={() => {this.props.handleActivate(11)}}
                className="btn btn-primary">Sure!</button>
          </div>,
        },
        {
          text: "Please share your phone number or Facebook name with the dashingly handsome Danny, 22.",
          buttons:
          <div>
            <input type="text" className="form-input" onChange={this.handleChangePhone}/>
              <button
                onClick={() => {this.handleSubmitPhone()}}
                className="btn btn-primary input-group-btn">
                Submit
              </button>
          </div>,
        },
      ],
    };
  },

  handleChangePhone: function(event) {
    this.setState({
      phone: event.target.value,
    });
  },

  handleSubmitPhone: function() {
    firebase.writeUserPhone(this.props.uid, this.state.phone);
    this.props.handleClose();
  },

  render: function(){
    var modal = this.state.modals[this.props.stage];
    return <AdviceModal
      content={modal.text}
      footer={modal.buttons}
      active={this.props.active}
    />;
  },
});

module.exports = AdviceModalManager;
