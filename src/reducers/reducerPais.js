import {
	PAIS_OBTENER,
	PAIS_NACIMIENTO_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerPaisesResponse: [],
	obtenerPaisesNacimientoResponse: [],
	errorResponse: []
}

export function actionPais(state = initialState, action){
	switch (action.type) {
		case PAIS_OBTENER:
			return Object.assign({}, state, {obtenerPaisesResponse: action.payload})
		case PAIS_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerPaisesNacimientoResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}