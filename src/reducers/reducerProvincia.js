import {
	PROVINCIA_OBTENER,
	PROVINCIA_NACIMIENTO_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerProvinciasResponse: [],
	obtenerProvinciasNacimientoResponse: [],
	errorResponse: []
}

export function actionProvincia(state = initialState, action){
	switch (action.type) {
		case PROVINCIA_OBTENER:
			return Object.assign({}, state, {obtenerProvinciasResponse: action.payload})
		case PROVINCIA_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerProvinciasNacimientoResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}