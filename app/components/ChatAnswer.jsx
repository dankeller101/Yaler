var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Question = require('Question');
var AnswerOption = require('AnswerOption');


var ChatAnswer = React.createClass({
  getInitialState: function() {
    return {
      questionId: 0,
      question: "What do you want to say?",
      answerOptions: [
          {
            content: "Your hair looks very dashing"
          },
          {
            content: "My, what strong muscles you have"
          },
          {
            content: " I heard you sing once, and your voice sounds like a thousand baby sparrows coming together to create harmony that would cause angels to weep due to its beauty"
          }
      ],
      quizQuestions:[
        {
          question: "What do you want to say?",
          answers:[
              {
                content: "Your hair looks very dashing"
              },
              {
                content: "My, what strong muscles you have"
              },
              {
                content: " I heard you sing once, and your voice sounds like a thousand baby sparrows coming together to create harmony that would cause angels to weep due to its beauty"
              }
          ],
        },
        {
          question:"I swiped right because",
          answers:[
              {
                content: "I was just swept away by my feelings for you"
              },
              {
                content: "I was lost in your eyes, your beautiful, green eyes"
              },
              {
                content: "One time in our freshman seminar together you said something so profound, so moving, that I have continued thinking about it to this day.  Your words opened my heart."
              }
          ],
        }
      ],
    };
  },

  renderAnswerOptions: function(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        questionId={this.state.questionId}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  },

  handleAnswerSelected(event) {
    this.props.onNewMessage(event.currentTarget.textContent);
    setTimeout(() => {this.setNextQuestion()}, 300);
  },

  setNextQuestion() {
    console.log('hit');
    const questionId = this.state.questionId + 1;

    this.setState({
        questionId: questionId,
        question: this.state.quizQuestions[questionId].question,
        answerOptions: this.state.quizQuestions[questionId].answers,
        answer: '',
    });
  },

  render: function() {
    return (
      <ReactCSSTransitionGroup
        className="container custom-Answer"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div key={this.state.questionId}>
          <Question content={this.state.question}/>
          <ul className="answerOptions">
            {this.state.answerOptions.map(this.renderAnswerOptions)}
          </ul>
        </div>
      </ReactCSSTransitionGroup>
    );
  },
});

module.exports = ChatAnswer;
