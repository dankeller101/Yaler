var React = require('react');


var AdviceModal = React.createClass({

  render: function(){
    return <div className={"modal " + (this.props.active ? "active" : "")} id="modal-id">
      <a className="modal-overlay" aria-label="Close"></a>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title h5">The Yaler AI</div>
        </div>
        <div className="modal-body">
          <div className="content">
            {this.props.content}
          </div>
        </div>
        <div className="modal-footer">
          {this.props.footer}
        </div>
      </div>
    </div>;
  },
});

module.exports = AdviceModal;
