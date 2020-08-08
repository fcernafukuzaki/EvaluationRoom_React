import {
	ESTADOCIVIL_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerEstadosCivilesResponse: [],
	errorResponse: []
}

export function actionEstadoCivil(state = initialState, action){
	switch (action.type) {
		case ESTADOCIVIL_OBTENER:
			return Object.assign({}, state, {obtenerEstadosCivilesResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}