var React = require('React');

var Panel = React.createClass({
  render: function() {
    var emptyTitle = this.props.currentState >= 0
      ? "You do not have any matches."
      : "You have found the perfect match.";
    var emptySub = this.props.currentState >= 0
      ? "Swipe more to find love!"
      : "His name is Danny.  You should feel blessed.";
    var emptyFacts = this.props.currentState >= 0
      ? ""
      : "Fun facts about Danny: \
      1.  Danny likes to read. \
      2.  Danny likes to be there for his friends \
      3.  Danny one time sang lead in a prog metal band. \
      ";
    var ChatAdvice = this.props.currentState >= 0
      ? ""
      : "You can scroll through messages to see all of them.";
    return (
      <div className="panel custom-panel">
        <div className="panel-body">
          <div className="empty custom-empty">
              <p className="empty-title h5">{emptyTitle}</p>
              <p className="empty-subtitle">{emptySub}</p>
              <p className="empty-subtitle">
                {emptyFacts}
              </p>
              <p className="empty-subtitle">
                {ChatAdvice}
              </p>
            </div>
        </div>
      </div>
    );
  },
});

module.exports = Panel;
