import React from 'react'

const Header = (props) => {
  return (
    <div>
      <header className="App-header">
        <h2><a className="landingHref" href="/">{props.text}</a></h2>
      </header>
    </div>
  );
};

export default Header
