import {
	DISTRITO_OBTENER,
	DISTRITO_NACIMIENTO_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerDistritosResponse: [],
	obtenerDistritosNacimientoResponse: [],
	errorResponse: []
}

export function actionDistrito(state = initialState, action){
	switch (action.type) {
		case DISTRITO_OBTENER:
			return Object.assign({}, state, {obtenerDistritosResponse: action.payload})
		case DISTRITO_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerDistritosNacimientoResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}