import {
	TIPO_DIRECCION_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerTipoDireccionesResponse: [],
	errorResponse: []
}

export function actionTipoDireccion(state = initialState, action){
	switch (action.type) {
		case TIPO_DIRECCION_OBTENER:
			return Object.assign({}, state, {obtenerTipoDireccionesResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}