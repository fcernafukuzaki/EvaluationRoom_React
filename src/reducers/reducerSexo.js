import {
	SEXO_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerSexosResponse: [],
	errorResponse: []
}

export function actionSexo(state = initialState, action){
	switch (action.type) {
		case SEXO_OBTENER:
			return Object.assign({}, state, {obtenerSexosResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}