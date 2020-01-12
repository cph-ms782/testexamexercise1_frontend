import React, { useState, useEffect } from 'react';
// import MAINURL from "../settings";
import loginFacade from './loginFacade';
import postNumbers from '../postNumbers.json';
import uuid from 'uuid/v1';

function Hobbies(props) {
	console.log('Hobbies');
	// console.log('Hobbies apiFacade', props.apiFacade);
	console.log('Hobbies loggedIn', props.loggedIn);

	const emptyHobby = { hobbyID: 0, name: '', description: '' };
	const [ hobby, setHobby ] = useState({ ...emptyHobby });

	const [ persons, setPersons ] = useState([]);
	const [ hobbyID, setHobbyID ] = useState(0);
	const [ hobbies, setHobbies ] = useState([]);
	const [ personID, setPersonID ] = useState(0);
	const [ email, setEmail ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ street, setStreet ] = useState('');
	const [ additionalInfo, setAdditionalInfo ] = useState('');
	const [ zipCode, setZipCode ] = useState(0);
	const [ city, setCity ] = useState('');
	console.log('Hobbies hobbies', hobbies);
	console.log('Hobbies persons', persons);

	const newHobby = (evt) => {
		console.log('newHobby');
		console.log('newHobby hobby');
		let itemBody = {
			hobbyID: 0,
			name: hobby.name,
			description: hobby.description
		};
		console.log('newHobby itemBody', itemBody);
		props.apiFacade.addEditItem(itemBody, props.loggedIn, '/api/hobby/add', hobby.hobbyID);
		setHobby({ ...emptyHobby });
		setTimeout(() => {
			console.log('setTimeout firing');
			getHobbyData();
		}, 1000);
	};
	const editHobby = (evt) => {
		console.log('editHobby');
		console.log('editHobby hobby');
		let itemBody = {
			hobbyID: hobby.hobbyID,
			name: hobby.name,
			description: hobby.description
		};
		console.log('editHobby itemBody', itemBody);
		props.apiFacade.addEditItem(itemBody, props.loggedIn, '/api/hobby/edit', hobby.hobbyID);
		setHobby({ ...emptyHobby });
		setTimeout(() => {
			console.log('setTimeout firing');
			getHobbyData();
		}, 3000);
	};
	const deleteHobby = (evt) => {
		console.log('deleteHobby');
		props.apiFacade.deleteItem(props.loggedIn, '/api/hobby/delete/' + hobby.hobbyID, hobby.hobbyID);
		setTimeout(() => {
			console.log('setTimeout firing');
			getHobbyData();
		}, 1000);
	};
	const newPerson = (evt) => {
		console.log('newPerson');
		let itemBody = {
			personID: 0,
			email: email,
			firstName: firstName,
			lastName: lastName,
			street: street,
			additionalInfo: additionalInfo,
			zipCode: zipCode,
			city: city
		};
		console.log('newPerson itemBody', itemBody);
		props.apiFacade.addEditItem(itemBody, props.loggedIn, '/api/person/add', personID);
		setTimeout(() => {
			console.log('setTimeout firing');
			getHobbyData();
			getPersonData();
		}, 1000);
	};
	const editPerson = (evt) => {
		console.log('editPerson');
		let itemBody = {
			personID: personID,
			email: email,
			firstName: firstName,
			lastName: lastName,
			street: street,
			additionalInfo: additionalInfo,
			zipCode: zipCode,
			city: city
		};
		console.log('editPerson itemBody', itemBody);
		props.apiFacade.addEditItem(itemBody, props.loggedIn, '/api/person/edit', personID);
		setTimeout(() => {
			console.log('setTimeout firing');
			getHobbyData();
			getPersonData();
		}, 1000);
	};
	const deletePerson = (evt) => {
		console.log('deletePerson');
		props.apiFacade.deleteItem(props.loggedIn, '/api/person/delete/' + personID, personID);
		setTimeout(() => {
			console.log('setTimeout firing');
			getHobbyData();
			getPersonData();
		}, 1000);
	};

	const handleHobbyChange = (evt) => {
		console.log('handleHobbyChange');
		const newHobby = { ...hobby };
		const target = evt.target;
		const id = evt.target.id;
		setHobby({ ...newHobby, [id]: target.value });
		console.log('handleHobbyChange hobby', hobby);
	};
	const onChangePerson = (evt) => {
		console.log('onChangePerson  ->', evt.target.id);
		switch (evt.target.id) {
			case 'personID':
				console.log('personID', evt.target.value);
				setPersonID(Number(evt.target.value));
				break;
			case 'email':
				console.log('email', evt.target.value);
				setEmail(evt.target.value);
				break;
			case 'firstName':
				console.log('firstName', evt.target.value);
				setFirstName(evt.target.value);
				break;
			case 'lastName':
				console.log('lastName', evt.target.value);
				setLastName(evt.target.value);
				break;
			case 'street':
				console.log('street', evt.target.value);
				setStreet(evt.target.value);
				break;
			case 'additionalInfo':
				console.log('additionalInfo', evt.target.value);
				setAdditionalInfo(evt.target.value);
				break;
			case 'zipCode':
				console.log('zipCode', evt.target.value);
				setZipCode(evt.target.value);
				console.log('zipCode zipCode', zipCode);
				const cityName = postNumbers.find((postNumber, index) => {
					return postNumber.nr == evt.target.value;
				});
				if (cityName != undefined) {
					console.log('cityName.navn', cityName.navn);
					setCity(cityName.navn);
				} else {
					console.log('cityName undefined');
					setCity('');
				}
				break;

			default:
				console.log('default, doing nothing,', evt.target.value);
		}
	};

	const getHobbyData = async () => {
		try {
			const data = await loginFacade.fetchData('/api/hobby/hobbies');
			console.log('getHobbyData data', data);
			setHobbies(data);
		} catch (e) {
			console.log('err', e);
		}
	};
	const getPersonData = async () => {
		try {
			const data = await loginFacade.fetchData('/api/person/persons');
			console.log('getPersonData data', data);
			setPersons(data);
		} catch (e) {
			console.log('err', e);
		}
	};

	useEffect(() => {
		getHobbyData();
		getPersonData();
	}, []);

	if (Array.isArray(hobbies) && hobbies[0] != undefined) {
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
							{hobbies.map((element) => (
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
					<form>
						<div className="form-group">
							<div className="col-sm-9">
								<button onClick={newHobby}>New Hobby</button>
								<input
									type="text"
									className="form-control"
									placeholder="Hobby Name"
									id="name"
									onChange={handleHobbyChange}
									value={hobby.name}
								/>
								<input
									type="text"
									className="form-control"
									placeholder="Description"
									id="description"
									onChange={handleHobbyChange}
									value={hobby.description}
								/>
							</div>
						</div>
					</form>
				</div>
				<div>
					<form>
						<div className="form-group">
							<div className="col-sm-9">
								<button onClick={editHobby}>Edit Hobby</button>
								<input
									type="text"
									className="form-control"
									placeholder="Hobby ID"
									id="hobbyID"
									onChange={handleHobbyChange}
									value={hobby.hobbyID}
								/>
								<input
									type="text"
									className="form-control"
									placeholder="Hobby Name"
									id="name"
									onChange={handleHobbyChange}
									value={hobby.name}
								/>
								<input
									type="text"
									className="form-control"
									placeholder="Description"
									id="description"
									onChange={handleHobbyChange}
									value={hobby.description}
								/>
							</div>
						</div>
					</form>
				</div>
				<div>
					<form onChange={handleHobbyChange}>
						<button onClick={deleteHobby}>Delete Hobby</button>
						<input placeholder="Hobby ID" id="hobbyID" />
					</form>
				</div>
				<br />
				<br />
				<div style={{ textAlign: 'center' }}>
					<table className="table">
						<thead>
							<tr>
								<th>personID</th>
								<th>email</th>
								<th>firstName</th>
								<th>lastName</th>
								<th>Street</th>
							</tr>
						</thead>
						<tbody>
							{persons.map((element) => (
								<tr key={uuid()}>
									<td>{element.personID}</td>
									<td>{element.email}</td>
									<td>{element.firstName}</td>
									<td>{element.lastName}</td>
									<td>{element.street}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div>
					<form onChange={onChangePerson}>
						<button onClick={newPerson}>New Person</button>
						<input placeholder="email (required)" id="email" />
						<input placeholder="firstName (required)" id="firstName" />
						<input placeholder="lastName (required)" id="lastName" />
						<input placeholder="street" id="street" />
						<input placeholder="additionalInfo" id="additionalInfo" />
						<input placeholder="zipCode" id="zipCode" />
						<input placeholder="city" id="city" value={city} />
					</form>
				</div>
				<div>
					<form onChange={onChangePerson}>
						<button onClick={editPerson}>Edit Person</button>
						<input placeholder="Person ID" id="personID" />
						<input placeholder="email (required)" id="email" />
						<input placeholder="firstName (required)" id="firstName" />
						<input placeholder="lastName (required)" id="lastName" />
						<input placeholder="street" id="street" />
						<input placeholder="additionalInfo" id="additionalInfo" />
						<input placeholder="zipCode" id="zipCode" />
						<input placeholder="city" id="city" value={city} />
					</form>
				</div>
				<div>
					<form onChange={onChangePerson}>
						<button onClick={deletePerson}>Delete Person</button>
						<input placeholder="Person ID" id="personID" />
					</form>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h2>No Hobbies yet</h2>
				{hobbies.msg}
			</div>
		);
	}
}
export default Hobbies;
