var React = require('react');
var { ChatFeed, Message }  = require('react-chat-ui');
var ChatAnswer = require('ChatAnswer');

var Chat = React.createClass({
  getInitialState: function() {
    return {
      messages: [
        new Message({
          id: 1,
          message: "Hey, what's up?",
        }),
      ],
      isTyping: false,
      stage: 0,
    };
  },

  sleep: function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  },

  handleNewMessage: function(newMessage){
    var newMess;
    if (this.state.stage === 1) {
      newMess = new Message({
        id: 0,
        message: "I swiped right because " + newMessage,
      });
    } else if (this.state.stage === 2) {
      newMess = new Message({
        id: 0,
        message: "If I had not matched with you, I would have been " + newMessage,
      });
    } else if (this.state.stage === 3) {
      newMess = new Message({
        id: 0,
        message: newMessage,
      });
      if (newMessage === "Yes.  This app was decently funny and he's actually pretty cute.") {
        this.props.handleAdviceModal(16);
      }
    } else if (this.state.stage === 4) {
      newMess = new Message({
        id: 0,
        message: newMessage,
      });
      this.props.handleRefresh();
    } else {
      newMess = new Message({
        id: 0,
        message: newMessage,
      });
    }
    var stage = this.state.stage;
    this.setState({
      messages: this.state.messages.concat(newMess),
      stage: stage + 1,
      isTyping: true,
    }, () => {
      if (stage + 1 === 1) {
        var newMess = new Message({
          id: 1,
          message: "Oh, you're way too kind.",
        });
        this.setState({
          messages: this.state.messages.concat(newMess),
          isTyping: false,
        });
      } else if (stage + 1 === 2) {
        var newMess = new Message({
          id: 1,
          message: "Wow, I didn't know you felt that way.",
        });
        this.setState({
          messages: this.state.messages.concat(newMess),
          isTyping: false,
        });
      } else if (stage + 1 === 3) {
        var newMess1 = new Message({
          id: 1,
          message: "Same, i feel the exact same way",
        });
        var newMess2 = new Message({
          id: 1,
          message: "I know this is a bit forward, but could I grab your number?",
        });
        var newMesses = [newMess1, newMess2];
        this.setState({
          messages: this.state.messages.concat(newMesses),
          isTyping: false,
        });
      } else if (stage + 1 === 4) {
        var newMess1 = new Message({
          id: 1,
          message: "Sorry, but I need to run now.  I hope you enjoyed the app!",
        });
        this.setState({
          messages: this.state.messages.concat(newMess1),
          isTyping: false,
        });
      } else {
        this.setState({
          isTyping: false,
        });
      }
    });
  },

  render: function() {
    return (
      <div>
        <div className="chat-container">
        <ChatFeed
          messages={this.state.messages} // Boolean: list of message objects
          isTyping={this.state.isTyping} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={
            {
              text: {
                fontSize: 30
              },
              chatbubble: {
                borderRadius: 70,
                padding: 40
              }
            }
          }
        /></div>
        <div id="myotherdiv">
        <ChatAnswer
          onNewMessage={this.handleNewMessage}
        />
        </div>
      </div>
    );
  },
});

module.exports = Chat;
