var React = require('react');

var CenteredHeader = ({title, size}) => {
  if (size == "small") {
    return (
      <div className="columns">
        <div className="column col-5"/>
        <div className="column col-2">
          <h1>{title}</h1>
        </div>
        <div className="column col-5"/>
      </div>
    );
  } else if (size == "medium") {
    return (
      <div className="columns">
        <div className="column col-4"/>
        <div className="column col-4">
          <h1>{title}</h1>
        </div>
        <div className="column col-4"/>
      </div>
    );
  } else {
    return (
      <div className="columns">
        <div className="column col-4"/>
        <div className="column col-5">
          <h1>{title}</h1>
        </div>
        <div className="column col-3"/>
      </div>
    );
  }
};

module.exports = CenteredHeader;
