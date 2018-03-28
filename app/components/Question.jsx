
var React = require('react');

var Question = React.createClass({
  render: function(){
    return (
      <h2 className="question">{this.props.content}</h2>
    );
  },
});

module.exports = Question;
