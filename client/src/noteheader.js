import React from "react";

const AppHeader = props => {
  return (
    <div className="navbar navbar-light bg-light" style={{'marginBottom': '30px'}}>
      <a className="navbar-brand" href={window.location.href.substring(0, window.location.href.length - 3)}>
        Spill
      </a>
      <a href="https://www.github.com/joshuamango/spill" className="btn btn-outline-dark" role="button">
          About
        </a>    </div>
  );
};

export default AppHeader;
