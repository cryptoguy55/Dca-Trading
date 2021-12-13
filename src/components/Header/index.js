import React, { useState } from 'react';
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
  const drop = useSelector((state) => state.common.drop)
  const dispatch = useDispatch()
  return (
    <>
      <div className={`border-b flex px-8 py-4 nav-bar ${theme ? "" : "dark"}`}>
        <a href="/">{ theme ? <img src={logo} width="130" alt="logo" /> :<img src={logo_white} width="130" alt="logo" /> }</a>
        <div className="dropdown mr-3">
          <span className="dropbtn" onClick={() => dispatch({type: "CHANGE_DROP", payload: !drop})}>Guide &#11167;</span>
          <div className={`dropdown-content right-0 sm:left-0 ${theme ? "" : "dark"} ${drop ? "show" : ""}`}>
            <Link to="/scroll">Who does the DCA tool work?</Link>
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