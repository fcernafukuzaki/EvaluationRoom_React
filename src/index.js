import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';
import EvaluationRoomApp from './entries/recruiter_view/EvaluationRoomApp_Recruiter';

import './assets/styles/estilos.scss'
import './assets/styles/estilos-login.scss'
import './assets/styles/candidate-card.scss'
import './assets/styles/selectionprocess-list.scss'
import './assets/styles/formulario.scss'
import './assets/styles/candidato-apreciacion-modal.scss'
import './assets/styles/candidatos-sin-asignacion.scss'

/* Redux */
const store = createStore(
	reducers,
	applyMiddleware(
		thunk/*,
		logger*/
	)
);

const clientId = "56017019162-bb4cfpv4dtpdl6ssmg0dbs4ik8hr6g9k.apps.googleusercontent.com"

const homeContainer = document.getElementById('home-container');
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<EvaluationRoomApp clientId={clientId} />
		</Provider>
	</BrowserRouter>
	, homeContainer);