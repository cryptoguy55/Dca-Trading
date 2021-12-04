import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Lottie from 'react-lottie';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import logo from 'assets/images/logo-white.png';
import LoginImage from "assets/images/login.jpg"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import TwitterIcon from '@material-ui/icons/Twitter';
import animationData from "constants/loding"
import { registerUserWithEmail } from "store/actions/auth"

const savingOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading)
  const history = useHistory();
  const [ value, setValue ] = useState({
    email: "",
    password: ""
  });
  const changeValue = (name, item) => {
    setValue({...value, [name]: item});
  };
  const handlechange = (e) => {
    changeValue(e.target.name, e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();    
    registerUserWithEmail(dispatch, history, value);
  }
  return (
    <div className="grid lg:grid-cols-2 login-panel">
      <div className="image">
        <Link to="/">
          <img src={logo} width="120" height="auto" alt="logo" /> 
        </Link>
        <img src={LoginImage} />
      </div>
      <div className="login-panel-content">
        <form onSubmit={onSubmit} >
          <p className="text-center text-4xl">Sign Up</p><br/>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="contained" color="default" startIcon={<EmailOutlinedIcon/>}>with google</Button>
            <Button variant="contained" color="primary" startIcon={<TwitterIcon />}>with twitter</Button>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            autoFocus
            onChange={handlechange} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            onChange={handlechange} 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="confirm Password"
            type="password"
            name="repeatPassword"
            onChange={handlechange} 
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            <span className="flex">
              { isLoading && <Lottie options={savingOptions} height={25} width={25} /> }
              Sign Up
            </span>

          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/input-email">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login">
                Have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </form>
        <p className="text-center  my-4">
          copyright @ website.com 2021.7.5
        </p>
      </div>
    </div>

  )
}

export default Register;
