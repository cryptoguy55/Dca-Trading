import React from 'react';

export default function ToggleSwitch({name, onChange, checked}) {

  return (
    <span className="toggle-switch">
      <label className="switch">
        <input type="checkbox" id="togBtn" name={name} checked={checked} onChange={onChange} />
        <div className="slider round">
        <span className="on">SAT</span>
        <span className="off">BTC</span>
        </div>
      </label>
   </span>
  );
}
