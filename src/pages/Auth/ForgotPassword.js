import React, { useState, useEffect }  from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux";
import Container from '@material-ui/core/Container'
import logo from '../../assets/images/reset-password.png';

import {
  useLocation,
  Link
} from "react-router-dom";

export default function VerifyEmail() {
  const [password, setPassword] = useState("")
  let query = new URLSearchParams(useLocation().search);
  let  token = query.get("reset_token");
  const dispatch = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();
  //  dispatch({ type: "Verify", payload: agent.Auth.verifyPassword(token, password) })
  }
    return (
      <Container component="main" maxWidth="md" className=" mt-20">
        
      <div className="flex flex-col items-center ">
        <img
          src={logo}
          alt="underMaintenance"
          className="img-fluid align-self-center mt-75"
        />
        <form onSubmit={submitForm } >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            onChange={(e) => {setPassword(e.target.value)}} 
          />
           <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          </form>
      </div>     
    </Container>
   )
  
}

