import React from 'react';
import { } from 'react-router-dom';

function Error(props) {
	console.log('Error');
	if (props.errorMessage) {
		return <div>{props.errorMessage.code}</div>;
	} else {
		return <div />;
	}
}

export default Error;
