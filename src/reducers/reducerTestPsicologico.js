import {
	TESTPSICOLOGICOS_OBTENER,
	TESTPSICOLOGICO_PREGUNTAS_OBTENER,
	TESTPSICOLOGICO_PARTES_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerTestPsicologicosResponse: [],
	obtenerTestPsicologicoPreguntasResponse: [],
	obtenerTestPsicologicosPartesResponse: [],
	errorResponse: []
}

export function actionTestPsicologico(state = initialState, action){
	switch (action.type) {
		case TESTPSICOLOGICOS_OBTENER:
			return Object.assign({}, state, {obtenerTestPsicologicosResponse: action.payload})
		case TESTPSICOLOGICO_PREGUNTAS_OBTENER:
			return Object.assign({}, state, {obtenerTestPsicologicoPreguntasResponse: action.payload})
		case TESTPSICOLOGICO_PARTES_OBTENER:
			return Object.assign({}, state, {obtenerTestPsicologicosPartesResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}