import {
	TESTPSICOLOGICOS_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerTestPsicologicosResponse: [],
	errorResponse: []
}

export function actionTestPsicologico(state = initialState, action){
	switch (action.type) {
		case TESTPSICOLOGICOS_OBTENER:
			return Object.assign({}, state, {obtenerTestPsicologicosResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}