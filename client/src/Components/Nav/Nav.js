import React, { useContext } from "react";
import "./Nav.css";
import AccountContext from "../../Context/AccountContext";

const Nav = ({ children }) => {


  const { userData } = useContext(AccountContext);


  return (
    <nav className="navbar navbar-expand-lg navbar-light background">
      {/* <div className="container-fluid background"> */}
        <img className="nav-logo" src="https://i.imgur.com/BGhAyqD.png" alt="logo"></img>
        <a className="navbar-brand brand-box-model kerning-ligature medieval" href="/">
          <span className="letter-big">H</span>all of <span className="letter-big">W</span>hispers
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex justify-content-end">
            <li className="nav-item">
              <a className="nav-link link-font" aria-current="page" href="/home" hidden={!userData.account?.charCreated}>
              <i className="fa fa-comment"></i> Dashboard
              </a>
            </li>
            <li className="nav-item misclick-deny link-font">
              <a className="nav-link" href="/character" hidden={!userData.account}>
              <i className="fa fa-users"></i> Character
              </a>
            </li>
            <li className="nav-item login">
              <a className="nav-link" href="/login" hidden={userData.account}>
              <i className="fa fa-sign-in icon-beautify"></i> Login
              </a>
              {children}
            </li>
          </ul>
        </div>

    </nav>
  );
};

export default Nav;
