import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Header from "components/Header"
import Footer from "components/Footer";

const Home = lazy(() => import("pages/Home"))

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
  const appliedTheme = createTheme(theme? light : dark);
  return (
    <Router>
      <div id="box" className={theme ? "" : "dark" }>
        <ThemeProvider theme={appliedTheme}>     
          <Header/>
          <Switch>
            <Route path="/">      
                <div className="page-content">
                  <Route exact path="/" component={Home}/>
                </div>         
                <Footer />
             </Route>     
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  )
};

export default App;
