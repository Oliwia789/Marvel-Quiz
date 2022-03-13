import React from "react";
import Header from "../Header/Index";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Landing from "../Landing/Index";
import Footer from "../Footer/Index";
import Welcome from "../Welcome/Index";
import Login from "../Login/Index";
import SignUp from "../SingUp/Index";
import ErrorPage from "../Error/Index";
import ForgetPassword from "../ForgetPassword/Index";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/welcome" component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/forgetPassword" component={ForgetPassword}/>
          <Route path="/signup" component={SignUp}/>
          <Route component={ErrorPage}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
