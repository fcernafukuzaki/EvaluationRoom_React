import { 
	CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER,
	ERROR
} from '../actions/actionTypes';

const initialState = {
    candidatoTestPsicologicoIniciarExamenResponse: [],
	errorResponse: []
}

export function actionCandidatoTestPsicologicoIniciarExamen(state = initialState, action){
    switch (action.type) {
        case CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER:
            return Object.assign({}, state, {candidatoTestPsicologicoIniciarExamenResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}