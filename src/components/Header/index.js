import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import { changeTheme } from 'store/actions/common'
import logo from 'assets/images/logo-white.png';
import logo_white from 'assets/images/logo.png';
import {
  Link
} from "react-router-dom";

const Header = (props) => {
  const theme = useSelector((state) => state.common.theme)
  const dispatch = useDispatch()
  return (
    <>
      <div className={`border-b flex px-8 py-4 nav-bar ${theme ? "" : "dark"}`}>
        <Link to="/">{ theme ? <img src={logo} width="130" alt="logo" /> :<img src={logo_white} width="130" alt="logo" /> }</Link>
        <Link to="/">Home</Link>
        <div className="dropdown mr-3">
          <span className="dropbtn">Guide &#11167;</span>
          <div className={`dropdown-content ${theme ? "" : "dark"}`}>
            <a href="#" onClick={(evt)=> { evt.preventDefault(); document.getElementById("explaination").scrollIntoView(true)}}>Who does the DCA tool work?</a>
            <Link to="/who_to_dca">Who to DCA?</Link> 
            <Link to="/about">About DCA.trading</Link>
          </div>                  
        </div>
        <div className="flex-grow"/>
        <IconButton
          edge="end"
          color="inherit"
          style={{padding: "3px"}}
          aria-label="mode"
          onClick={() => changeTheme(dispatch, !theme) }>
             {!theme ? <Brightness7Icon style={{ color: "yellow" }}/> : <Brightness3Icon />}
        </IconButton>

      </div>
    </>
  )
}

export default Header