import React, { Component, Fragment } from 'react';

import Escena from '../../components/webvr/Escena';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../../../reducers';

/* Redux */
const store = createStore(
	reducers,
	applyMiddleware(
		thunk/*,
		logger*/
	)
);

export default class EvaluationRoomVR extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<Provider store={store}>
				<Fragment>
					<Escena />
				</Fragment>
			</Provider>
		);
	}
}