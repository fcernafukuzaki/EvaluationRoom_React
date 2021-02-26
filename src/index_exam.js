import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';
import EvaluationRoomExam from './entries/candidate_view/candidate_tests_web/container/EvaluationRoomExam';

import './assets/styles/estilos.scss'
import './assets/styles/estilos-exam-web.scss'
//import './assets/styles/candidate-card.scss'
//import './assets/styles/selectionprocess-list.scss'
import './assets/styles/soportetecnico-notificacion-modal.scss'

/* Redux */
const store = createStore(
	reducers,
	applyMiddleware(
		thunk/*,
		logger*/
	)
);

const homeContainer = document.getElementById('home-container');
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<EvaluationRoomExam />
		</Provider>
	</BrowserRouter>
	, homeContainer);