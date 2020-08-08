import {
	DEPARTAMENTO_OBTENER,
	DEPARTAMENTO_NACIMIENTO_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerDepartamentosResponse: [],
	obtenerDepartamentosNacimientoResponse: [],
	errorResponse: []
}

export function actionDepartamento(state = initialState, action){
	switch (action.type) {
		case DEPARTAMENTO_OBTENER:
			return Object.assign({}, state, {obtenerDepartamentosResponse: action.payload})
		case DEPARTAMENTO_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerDepartamentosNacimientoResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}