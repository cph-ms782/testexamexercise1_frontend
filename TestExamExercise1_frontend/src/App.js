import React, { useState, useEffect } from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";
// import loginFacade from "./components/loginFacade";
// import URL from "./settings";
import banner from "./images/Banner_chrominium.png";
import Person from "./components/Person.js";
import Search from "./components/Search.js";
import PersonInfo from "./components/PersonInfo.js";

function App({ apiFacade }) {
  console.log("App");
  const savedChosenTeam = localStorage.getItem("chosenTeam");
  const savedCrestURL = localStorage.getItem("chosenTeamCrestUrl");

  const [airports, setAirports] = useState([]);
  const [chosenTeam, setChosenTeam] = useState(savedChosenTeam ? savedChosenTeam : "");
  const [crestURL, setCrestURL] = useState(savedCrestURL ? savedCrestURL : "");
  const [flightDate, setFlightDate] = useState("");               //useState("12/02/2019");

  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  return (
    <div>
      <Router>
        <div>
          <div className="container">
            <button type="button" name="daynight" id="daynight">
              <i className="fa fa-sun-o" aria-hidden="true" id="sun"></i>
              <i className="fa fa-moon-o" aria-hidden="true" id="moon"></i>
            </button>
            <div id="top-content">
              <Search
              />
            </div>
          </div>

          <div className="container">
            <div id="header">
              <div id="logo">
                {/* <img alt="icon" src={logo} alt="Logo" /> */}
              </div>
              <div id="banner">
                <img src={banner}
                  style={{ 'height': "100%" }}
                  alt="banner"
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div id="menubar">
              <MenuBar />
            </div>
          </div>
          <div className="container">
            <div id="newsticker">
              {/* <NewsTicker
              /> */}
            </div>
          </div>

          <div className="container">
            <div id="cont-1">
              <div id="team">
                {/* <TeamCrest
                /> */}
              </div>
              <div id="userinfo">
                {/* <UserInfo
                /> */}
              </div>
            </div>
            <div id="cont-2">
              <div id="part-1">
                {/* <div id="map"><Map /></div> */}
                <div id="nextmatch">
                  {/* <NextMatch
                    teamDates={teamDates} /> */}
                  </div>
                <div id="buy">
                  <PersonInfo
                  />
                </div>
              </div>
              <div id="news">
                <Person
                />
              </div>
            </div>
            <div id="cont-3">
              <div id="leaderboard">
                {/* <Leaderboard
                /> */}
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

function MenuBar() {
  console.log("MenuBar");
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/newcontact">
            New Contact
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/fill">
            Fill DB
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/empty">
            Empty DB
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default App;
