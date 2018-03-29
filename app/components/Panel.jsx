var React = require('React');

var Panel = React.createClass({
  render: function() {
    return (
      <div className="panel custom-panel">
        <div className="panel-body">
          <div className="empty custom-empty">
              <p className="empty-title h5">You do not have any matches.</p>
              <p className="empty-subtitle">Swipe more to find love!</p>
            </div>
        </div>
      </div>
    );
  },
});

module.exports = Panel;
