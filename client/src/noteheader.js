import React from "react";

const AppHeader = props => {
  return (
    <div className="navbar navbar-light bg-light" style={{ 'marginBottom': '30px' }}>
      <a className="navbar-brand" href={window.location.href.substring(0, window.location.href.length - 3)}>
        Spill
      </a>
      <button className="btn btn-outline-dark" onClick={() => {window.location = 'https://github.com/joshuamango/spill'}}>About</button>
   </div>
  );
};

export default AppHeader;
