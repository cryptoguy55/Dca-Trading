import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Header from "components/Header"
import Footer from "components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = lazy(() => import("pages/Home"))
const WhoToDca = lazy(() => import("pages/WhoToDca"))
const About = lazy(() => import("pages/About"))
const Faq = lazy(() => import("pages/Faq"))
const PrivacyPolicy = lazy(() => import("pages/PrivacyPolicy"))
const TermsOfService = lazy(() => import("pages/TermsOfService"))

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
                <div className="p-8 page-content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/who_to_dca" component={WhoToDca}/>
                  <Route path="/about" component={About}/>
                  <Route path="/faq" component={Faq}/>
                  <Route path="/privacy_policy" component={PrivacyPolicy}/>
                  <Route path="/terms_of_service" component={TermsOfService}/>
                  <Route exact path="/scroll" component={Home}/>
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
