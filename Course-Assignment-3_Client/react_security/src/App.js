import React, { useState, useEffect } from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';
// import loginFacade from "./components/loginFacade";
// import URL from "./settings";
import banner from './images/Banner_chrominium.png';
import Person from './components/Person.js';
import Search from './components/Search.js';
import PersonInfo from './components/PersonInfo.js';
import loginFacade from './components/loginFacade';
import LogIn from './components/LogIn';
import Data from './components/Data';
import Home from './components/Home';

function App({ apiFacade }) {
	console.log('App');
	const token = localStorage.getItem('jwtToken');
	const [ loggedIn, setLoggedIn ] = useState(token ? true : false);
	const [ hobbies, setHobbies ] = useState([]);

	const logout = () => {
		console.log('App - logout');
		loginFacade.logout();
		setLoggedIn(false);
		console.log('loggedIn', loggedIn);
	};
	const login = (user, pass) => {
		console.log('App - login');
		loginFacade.login(user, pass).then((res) => setLoggedIn(true));
		console.log('loggedIn', loggedIn);
	};
	const updateHobbies = (index) => {
		console.log('updateHobbies - index', index);
		setHobbies(index);
	};

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
							<i className="fa fa-sun-o" aria-hidden="true" id="sun" />
							<i className="fa fa-moon-o" aria-hidden="true" id="moon" />
						</button>
						<div id="top-content">
							<Search />
						</div>
					</div>

					<div className="container">
						<div id="header">
							<div id="logo">{/* <img alt="icon" src={logo} alt="Logo" /> */}</div>
							<div id="banner">
								<img src={banner} style={{ height: '100%' }} alt="banner" />
							</div>
						</div>
					</div>
					<div className="container">
						<div id="menubar">
							<MenuBar loggedIn={loggedIn} />
						</div>
					</div>
					<div className="container">
						<div id="newsticker">{/* <NewsTicker
              /> */}</div>
						<div id="cont-1">
							<div id="team" />
							<div id="userinfo" />
						</div>
						<div id="cont-2">
							<div id="part-1">
								<div id="map">{/* <Map /> */}</div>
								<div id="nextmatch">
									<PersonInfo loggedIn={loggedIn} />
								</div>
								{/* <div id="buy">
                </div> */}
							</div>
							<div id="news">
								<Person apiFacade={apiFacade} loggedIn={loggedIn} hobbies={hobbies} updateHobbies={updateHobbies} />
							</div>
						</div>
						<div id="cont-3">
							<div id="leaderboard">
								<LogIn loginFacade={loginFacade} updateHobbies={updateHobbies} loggedIn={loggedIn} login={login} logout={logout} />
							</div>
						</div>
					</div>
				</div>
			</Router>
		</div>
	);
}

function MenuBar({ loggedIn }) {
	console.log('MenuBar');
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
					<NavLink exact activeClassName="active" to="/hobbies">
						Hobbies
					</NavLink>
				</li>
				{/* <li>
          <NavLink exact activeClassName="active" to="/login">
            {loggedIn ? <div>Logout</div> : <div>Login</div>}
          </NavLink>
        </li> */}
			</ul>
		</div>
	);
}

export default App;
