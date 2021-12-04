import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import logo from 'assets/images/logo-white.png';
import logo_white from 'assets/images/logo.png';
import './style.scss';

const NavBar = (props) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.auth.isAuthenticated);
  const theme = useSelector((state) => state.common.theme);
  const me = useSelector((state) => state.auth.me);
  return (
    <>
      <div className={theme ? "nav-bar" : "nav-bar dark" }>
        { theme ? <img src={logo} width="130" alt="logo" /> :<img src={logo_white} width="130" alt="logo" /> }
        <Link to="" >Cryptocurrencies</Link>
        <Link to="/tokens" >NFTs</Link>
        <Link to="" >NFT</Link>
        <Link to="" >Portfolio</Link>
        <Link to="" >Watchlist</Link>
        <span className="flex-grow" />
        {!currentUser? (
            <>
            <Link to="/Login">{t('browse.login')}</Link>
            <Link to="/register">
                <Button variant="contained" color="secondary">
                    {t('browse.signup')}
                </Button>
            </Link>
            </>
            ) : 
            (
            <>
            <div className="dropdown mr-3">
                <span className="dropbtn"> <img src={`${process.env.REACT_APP_BACKEND_URL + me.avatar}`} className="rounded-full" width="40"/><ArrowDropDownIcon/></span>
                <div className="dropdown-content">
                    <a><ExitToAppIcon />{t('browse.logout')}</a>
                </div>                  
            </div>
        </>                      
        )
        }        
      </div>
    </>
  )
}

export default NavBar