import {
	RECLUTADOR_GUARDAR,
	RECLUTADOR_OBTENER,
	RECLUTADORES_OBTENER,
	RECLUTADOR_NOTIFICAR,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	guardarReclutadorResponse: [],
	obtenerReclutadorResponse: [],
	obtenerReclutadoresResponse: [],
	notificarReclutadorResponse: [],
	errorResponse: []
}

export function actionReclutador(state = initialState, action){
	switch (action.type) {
		case RECLUTADOR_GUARDAR:
			return Object.assign({}, state, {guardarReclutadorResponse: action.payload})
		case RECLUTADOR_OBTENER:
			return Object.assign({}, state, {obtenerReclutadorResponse: action.payload})
		case RECLUTADORES_OBTENER:
			return Object.assign({}, state, {obtenerReclutadoresResponse: action.payload})
		case RECLUTADOR_NOTIFICAR:
			return Object.assign({}, state, {notificarReclutadorResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}