import React, { useState, useEffect } from 'react';
// import MAINURL from "../settings";
import loginFacade from './loginFacade';
import postNumbers from '../postNumbers.json';
import uuid from 'uuid/v1';

function Hobbies(props) {
	console.log('Hobbies');
	// console.log('Hobbies apiFacade', props.apiFacade);
	console.log('Hobbies loggedIn', props.loggedIn);

	const [ hobbyID, setHobbyID ] = useState(0);
	const [ hobbyName, setHobbyName ] = useState('');
	const [ description, setDescription ] = useState('');
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

	const newHobby = (evt) => {
		console.log('newHobby');
		let itemBody = {
			hobbyID: 0,
			name: hobbyName,
			description: description
		};
		console.log('newHobby itemBody', itemBody);
		props.apiFacade.addEditItem(itemBody, props.loggedIn, '/api/hobby/add', hobbyID);
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
	};
	const editHobby = (evt) => {
		console.log('editHobby');
		let itemBody = {
			hobbyID: hobbyID,
			name: hobbyName,
			description: description
		};
		console.log('editHobby itemBody', itemBody);
		props.apiFacade.addEditItem(itemBody, props.loggedIn, '/api/hobby/edit', hobbyID);
	};
	const deleteHobby = (evt) => {
		console.log('deleteHobby');
		props.apiFacade.deleteItem(props.loggedIn, '/api/hobby/delete/' + hobbyID, hobbyID);
	};

	const onChange = (evt) => {
		console.log('onChange  ->', evt.target.id);
		if ([ evt.target.id ] == 'hobbyID') {
			console.log('hobbyID', evt.target.value);
			setHobbyID(Number(evt.target.value));
		} else if ([ evt.target.id ] == 'hobbyname') {
			console.log('hobbyName', evt.target.value);
			setHobbyName(evt.target.value);
		} else {
			console.log('description', evt.target.value);
			setDescription(evt.target.value);
		}
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
				console.log("zipCode zipCode", zipCode);
				const cityName = postNumbers.find((postNumber, index) => {
					return postNumber.nr == evt.target.value;
				});
				if (cityName != undefined) {
					console.log('cityName.navn', cityName.navn);
					setCity(cityName.navn);
				} else {
					console.log('cityName undefined');
					setCity("");
				}
				break;

			default:
				console.log('default, doing nothing,', evt.target.value);
		}
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await loginFacade.fetchData('/api/hobby/hobbies');
				console.log('data', data);
				setHobbies(data);
			} catch (e) {
				console.log('err', e);
			}
		};
		getData();
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
					<form onChange={onChange}>
						<button onClick={newHobby}>New Hobby</button>
						<input placeholder="Hobby Name" id="hobbyname" />
						<input placeholder="Description" id="hobbydescription" />
					</form>
				</div>
				<div>
					<form onChange={onChange}>
						<button onClick={editHobby}>Edit Hobby</button>
						<input placeholder="Hobby ID" id="hobbyID" />
						<input placeholder="Hobby Name" id="hobbyname" />
						<input placeholder="Description" id="hobbydescription" />
					</form>
				</div>
				<div>
					<form onChange={onChange}>
						<button onClick={deleteHobby}>Delete Hobby</button>
						<input placeholder="Hobby ID" id="hobbyID" />
					</form>
				</div>
				<div>
					<form onChange={onChangePerson}>
						<button onClick={newPerson}>New Person</button>
						{/* <input placeholder="Person ID" id="personID" /> */}
						<input placeholder="email" id="email" />
						<input placeholder="firstName" id="firstName" />
						<input placeholder="lastName" id="lastName" />
						<input placeholder="street" id="street" />
						<input placeholder="additionalInfo" id="additionalInfo" />
						<input placeholder="zipCode" id="zipCode"/>
						<input placeholder="city" id="city" value={city}/>
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
