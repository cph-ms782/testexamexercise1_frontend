import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Hobbies from './Hobbies.js';
import EmptyDB from './EmptyDB.js';

function Person(props) {
	console.log('Person');
	console.log('Person loggedIn', props.loggedIn);
	console.log('Person hobbies', props.hobbies);
	return (
		<div>
			<Router>
				<div className="newsContainer">
					<div className="newsContent">
						<Switch>
							<Route exact path="/empty">
								<EmptyDB />
							</Route>
							<Route exact path="/hobbies">
								<Hobbies
									apiFacade={props.apiFacade}
									loggedIn={props.loggedIn}
									hobbies={props.hobbies}
									updateHobbies={props.updateHobbies}
								/>
							</Route>
							{/* <Route>
                <NoMatch />
              </Route> */}
						</Switch>
					</div>
				</div>
			</Router>
		</div>
	);
}

export default Person;
