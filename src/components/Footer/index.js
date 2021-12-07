import React from 'react';
import logo from 'assets/images/logo.png';

export default function Footer() {

  return (
    <div className="flex bg-black text-white" style={{padding: '10px 50px 10px 30px'}}>
        <div className="pt-4">
            <img src={logo} width="100" alt="logo" />
            dca.trading
        </div>
        <div className="pt-12 px-4">
            @2021 dca.trading All Rights Reserved
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col px-4">
            About dca.trading<br/>
            About us<br/>
            FAQ<br/>
            Contact us
        </div>
        <div>
            Legal<br/>
            Privacy policy<br/>
            Terms of service  
        </div>
    </div>
  );
}
