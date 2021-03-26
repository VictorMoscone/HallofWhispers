import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Wrapper from "./Components/Wrapper/Wrapper";
import Character from "./Pages/Character";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
// import Register from "./Pages/TestPages/Register";
import AccountContext from "./Context/AccountContext";
import axios from "axios";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import background from "../src/assets/images/vintage-concrete.png"

function LoginRegister() {

  const [formMode, setFormMode] = useState("login")

  const toggleForm = () => {
    if (formMode === "login") {
      setFormMode("register")
    } else {
      setFormMode("login")
    }
  }

  return (
    <div>
      <button onClick={toggleForm}>
        {formMode === "login" ? "Sign up here" : "Login here"}
      </button>
      {formMode === "login" ? < LoginForm /> : <RegisterForm />}

    </div>
  )
}


function App() {
  const [userData, setUserData] = useState({
    account: undefined,
    token: undefined,
    pending: true,
    character: undefined
  });


  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (!token) {
      setUserData({ ...userData, pending: false });
      localStorage.setItem("auth-token", "");
    } else {
      try {
        const { data } = await axios.get("/api/accounts", {
          headers: { "x-auth-token": token },
        });
        setUserData({ token, account: data, pending: false });
        console.log(data.charCreated);
        //TODO - set character data to userData global
        if (data.charCreated) {
          try {
            const chrData = await axios.get(`/api/characters/${data.id}`);
            console.log(chrData.data[0])
            setUserData({ ...userData, token, account: data, pending: false, character: chrData.data[0] });
          } catch (error) {
            console.log(error)
          };
        };
      } catch (err) {
        console.log("User must login");
      }
    }
  }

  //Logout function
  const onClick = (e) => {
    e.preventDefault();
    setUserData({ token: undefined, account: undefined, pending: false });
    localStorage.removeItem("auth-token");
    //better way of doing this? 
    window.location = "/login"
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);


  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <Wrapper>
        <AccountContext.Provider value={{ userData, setUserData }}>
          <Nav>
            <li className="nav-item nav-link link-font beautify-text cursor" onClick={onClick} hidden={!userData.account}><i className="fa fa-sign-out"></i> Logout</li>
          </Nav>
          <Router>
            <Switch>
              <Route exact path="/character" >
                <Character />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </AccountContext.Provider>
      </Wrapper>
    </div>
  );
}

export default App;
