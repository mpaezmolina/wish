import React from "react";

function Button(props) {
  return (
    <div>
      <button type="button" className="roller-button">
        <div className="roller-button-text-wrapper">
          <span className="roller-button-text">{props.children}</span>
        </div>
      </button>
    </div>
  );
}

export default Button;
