var React = require('react');


var AnswerOption = React.createClass({
  render: function() {
    var props = this.props;
    return (
      <li className="answerOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
        />
        <label
          className="radioCustomLabel"
          htmlFor={props.answerContent}
          onClick={props.onAnswerSelected}>
          {props.answerContent}
        </label>
      </li>
    );
  },
});

module.exports = AnswerOption;
