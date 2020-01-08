import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NewContact from "./personinfo/NewContact.js";
import ContactInfo from "./personinfo/ContactInfo.js";

function PersonInfo({ loggedIn }) {
	console.log('PersonInfo');
	console.log('loggedIn', loggedIn);
	return (
		<div>
			{loggedIn ?
				<Router>
					<Switch>
						<Route exact path="/newcontact">
							<NewContact />
						</Route>
						<Route exact path="/personinfo">
							<ContactInfo />
						</Route>
					</Switch>
				</Router>
				:
				<h2>Please login</h2>
			}
		</div>
	);
}

export default PersonInfo;
