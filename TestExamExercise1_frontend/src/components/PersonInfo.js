import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NewContact  from "./personinfo/NewContact.js";
import ContactInfo  from "./personinfo/ContactInfo.js";

function PersonInfo({}) {
	console.log('PersonInfo');
	return (
		<div>
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
		</div>
	);
}

export default PersonInfo;
