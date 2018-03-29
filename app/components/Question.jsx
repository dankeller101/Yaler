
var React = require('react');

var Question = React.createClass({
  render: function(){
    return (
      <h5 className="question"
        style={{
          padding: '0',
        }}>{this.props.content}</h5>
    );
  },
});

module.exports = Question;
