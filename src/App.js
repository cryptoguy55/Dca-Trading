import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Header from "components/Header"
import { CHANGE_ALERT } from "store/types";
import { loadMe } from "store/actions/auth";
import NavBar from "components/NavBar";
import Footer from "components/Footer";

const Home = lazy(() => import("pages/Home"))
const Login = lazy(() => import("pages/Auth/Login"))
const ForgotPassword = lazy(() => import("pages/Auth/ForgotPassword"))
const InputEmail = lazy(() => import("pages/Auth/InputEmail"))
// const LockScreen = lazy(() => import("pages/Auth/LockScreen"))
const Register = lazy(() => import("pages/Auth/Register"))
const Thankyou = lazy(() => import("pages/Auth/Thankyou"))
const VerifyEmail = lazy(() => import("pages/Auth/VerifyEmail"))
const TokenList = lazy(() => import("pages/token"))

const light = {
  palette: {
    type: "light"
  }
};
const dark = {
  palette: {
    type: "dark"
  }
};

const App = (props) => {
  const theme = useSelector((state) => state.common.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const appliedTheme = createTheme(theme? light : dark);
  const successAlert = useSelector((state) => state.common.successAlert);
  const errorAlert = useSelector((state) => state.common.errorAlert);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
    if( localStorage.getItem("token") ) {
      console.log(localStorage.getItem("token"))
      loadMe(dispatch);
    }
  }, []);
  useEffect(() => {
    if(successAlert) {
      toast.success(successAlert);
      dispatch({type: CHANGE_ALERT, payload: {success: 0}})
    }
    if(errorAlert) {
      toast.error(errorAlert);
      dispatch({type: CHANGE_ALERT, payload: {success: 0}})
    }
  }, [successAlert, errorAlert]);
  return (
    <Router>
      <div id="box" className={theme ? "" : "dark" }>
        <ThemeProvider theme={appliedTheme}>     
          <Header/>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/Thankyou-Register" component={Thankyou}/>   
            <Route path="/verifyEmail" component={VerifyEmail}/>         
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path='/input-email' component={InputEmail}/>
            <Route path="/">      
                <div className="page-content">
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/tokens" component={TokenList}/>
                </div>         
                <Footer />
             </Route>     
          </Switch>
          <ToastContainer />
        </ThemeProvider>
      </div>
    </Router>
  )
};

export default App;
