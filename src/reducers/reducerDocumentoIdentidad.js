import {
	DOCUMENTOIDENTIDAD_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	obtenerDocumentosIdentidadResponse: [],
	errorResponse: []
}

export function actionDocumentoIdentidad(state = initialState, action){
	switch (action.type) {
		case DOCUMENTOIDENTIDAD_OBTENER:
			return Object.assign({}, state, {obtenerDocumentosIdentidadResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}