import React, { useState, useEffect } from 'react';
// import MAINURL from "../settings";
import loginFacade from './loginFacade';
import uuid from 'uuid/v1';

function Hobbies(props) {
	console.log('Hobbies');
	console.log('Hobbies apiFacade', props.apiFacade);
	console.log('Hobbies loggedIn', props.loggedIn);

	const [ hobbyID, setHobbyID ] = useState(0);
	const [ hobbyName, setHobbyName ] = useState('');
	const [ description, setDescription ] = useState('');
	console.log('Hobbies hobbies', props.hobbies);
	console.log('Hobbies hobbyName', hobbyName);
	console.log('Hobbies description', description);

	const newHobby = (evt) => {
		console.log('newHobby');
		let itemBody = {
			body: JSON.stringify({
				id: 0,
				name: hobbyName,
				description: description
			})
		};
		console.log('newHobby itemBody', itemBody);
		props.apiFacade.addEditItem(itemBody, props.loggedIn);
	};

	const onChange = (evt) => {
		console.log('onChange  ->', evt.target.id);
		if ([ evt.target.id ] == 'hobbyname') {
			console.log('hobbyName', evt.target.value);
			setHobbyName(evt.target.value);
		} else {
			console.log('description', evt.target.value);
			setDescription(evt.target.value);
		}
	};

	// const onChange = (evt) => {
	// 	console.log('onChange  ->', evt.target.id);
	// 	if ([ evt.target.id ] == 'id') {
	// 		console.log('hobbyName', evt.target.value);
	// 		setHobbyName(evt.target.value);
	// 	} else if ([ evt.target.id ] == 'hobbyname') {
	// 		console.log('hobbyName', evt.target.value);
	// 		setHobbyName(evt.target.value);
	// 	} else {
	// 		console.log('description', evt.target.value);
	// 		setDescription(evt.target.value);
	// 	}
	// };

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await loginFacade.fetchData('/api/hobby/hobbies');
				console.log('data', data);
				props.updateHobbies(data);
			} catch (e) {
				console.log('err', e);
			}
		};
		getData();
	}, []);

	if (Array.isArray(props.hobbies) && props.hobbies[0] != undefined) {
		return (
			<div>
				<h2>Hobbies</h2>
				<div style={{ textAlign: 'center' }}>
					<table className="table">
						<thead>
							<tr>
								<th>hobbyID</th>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{props.hobbies.map((element, index) => (
								<tr key={uuid()}>
									<td>{element.hobbyID}</td>
									<td>{element.name}</td>
									<td>{element.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div>
					<form onChange={onChange}>
						<button onClick={newHobby}>New Hobby</button>
						<input placeholder="Hobby Name" id="hobbyname" />
						<input placeholder="Description" id="hobbydescription" />
					</form>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h2>No Hobbies yet</h2>
				{props.hobbies.msg}
			</div>
		);
	}
}
export default Hobbies;
