import React from "react";

const Dropdown = ({ icon, options }) => {
  return (
    <div className="dropdown">
      <button disabled={true}>{icon}</button>
      <div className="content">
        {options.map((option, index) => <DropdownOption key={`option-${index}`} option={option} />)}
      </div>
    </div>
  );
};

const DropdownOption = ({ option }) => {
  const { cmd, text, arg } = option;

  const handleClick = (event) => {
    event.preventDefault();
    document.execCommand(cmd, false, arg);
  };

  return (
    <span onMouseDown={handleClick}>{text}</span>
  );
};

export default Dropdown;