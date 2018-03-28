var React = require('react');
var { ChatFeed, Message }  = require('react-chat-ui');
var ChatAnswer = require('ChatAnswer');

var Chat = React.createClass({
  getInitialState: function() {
    return {
      messages: [
        new Message({
          id: 1,
          message: "I'm the recipient! (The person you're talking to)",
        }),
      ],
    };
  },

  handleNewMessage: function(newMessage){
    var newMess = new Message({
      id: 0,
      message: newMessage,
    });
    this.setState({messages: this.state.messages.concat(newMess)});
  },

  render: function() {
    return (
      <div>
        <ChatFeed
          messages={this.state.messages} // Boolean: list of message objects
          isTyping={false} // Boolean: is the recipient typing
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
        />
        <ChatAnswer
          onNewMessage={this.handleNewMessage}
        />
      </div>
    );
  },
});

module.exports = Chat;
