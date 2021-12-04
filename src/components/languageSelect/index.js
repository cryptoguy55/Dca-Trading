import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import lanuguagesList from 'constants/lanuguagesList'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ReactCountryFlag from "react-country-flag"
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import './style.scss'
import { useState, useEffect, useRef } from 'react';

function useOutsideAlerter(ref, setActive) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

const LanguageSelect = ({theme}) => {
    const wrapperRef = useRef(null);
    const { t, i18n } = useTranslation();
    const [ active, setActive ] = useState(false);
    const [ value, setValue ] = useState("");
    const [ select, setSelect ] = useState({label: "English", value: "US"});
    const handleSelect = (item) => {
        setSelect(item);
        setActive(false);
        i18n.changeLanguage(item.value);
    }
    useOutsideAlerter(wrapperRef, setActive);    

    return (
        <div id="language-select" ref={wrapperRef}>
            <span onClick={() => setActive(!active)}><ReactCountryFlag countryCode={select.value} svg className="cp-modal-flag"/> { select.label } <ArrowDropDownIcon /></span>
            <div className={`cp-modal flex flex-col ${ active ? "active": ""} ${theme ? "" : "dark"}`}>
                <TextField
                    variant="outlined"
                    fullWidth
                    autoFocus
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                    onChange={(e) => setValue(e.target.value)}
                />
                <ul>                    
                    {
                        lanuguagesList.filter((item) => item.label.toLowerCase().indexOf(value.toLowerCase()) != -1).map((item, index) => 
                            <li key={index} onClick={()=> handleSelect(item)}>
                                <ReactCountryFlag countryCode={item.value} svg className="cp-modal-flag"/>
                                {item.label}
                                <span className="flex-grow"/>
                                { select.value == item.value && <CheckCircleOutlinedIcon /> }
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default LanguageSelect