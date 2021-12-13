import React from 'react';

export default function ToggleSwitch({name, onChange, checked}) {
  return (
    <div onClick={() => onChange(!checked)} className="toggle">
        <span className={checked? "active": ""}>Sats</span>
        <span className={!checked? "active": ""}>BTC</span>
      </div>
  );
}
