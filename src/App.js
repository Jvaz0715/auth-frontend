import { BrowserRouter as Router, Route } from "react-router-dom";
//abouve we use react-router-dom in place of react from react to make an app with multiple pages

import { ToastContainer } from "react-toastify";
//above we use react toastify for our success and error message cards on signup

//below we import the components we created
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

/*

below, we create our multiple page app

*/ 
function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      {/* this will display only when submit is pressed and we either successfully create a user or if we get an error creating a user */}
      <Nav />
      {/* nav above will display on all pages */}
      <>
        {/* below routes use exact path so that the components only show in their respective url link and not show up on other pages */}
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
}

export default App;
