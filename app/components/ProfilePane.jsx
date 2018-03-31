var React = require('react');



var ProfilePane = React.createClass({

  render: function() {
    return (
      <div className="card card-override">
        <div className="card-image">
          <img
            src={this.props.profileIMG}
            className="img-responsive rounded"/>
        </div>
        <div className="card-header">
          <div className="card-title h5">{this.props.name}</div>
          <div className="card-subtitle text-gray">Yale University</div>
        </div>
        <div className="card-body">
          {this.props.bio}
        </div>
         <div className="card-footer">
           <div className="btn-group btn-group-block">
             <button
               onClick={this.props.onClose}
               className="btn btn-error">
               Close
             </button>
           </div>
         </div>
      </div>
    );
  }
});

module.exports = ProfilePane;
