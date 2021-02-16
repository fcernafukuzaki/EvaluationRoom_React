import { 
	CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER,
    CANDIDATO_TESTPSICOLOGICO_RESPUESTA_REGISTRAR,
	ERROR
} from '../actions/actionTypes';

const initialState = {
    candidatoTestPsicologicoIniciarExamenResponse: [],
    registrarCandidatoTestPsicologicoRespuestaResponse: [],
	errorResponse: []
}

export function actionCandidatoTestPsicologicoIniciarExamen(state = initialState, action){
    switch (action.type) {
        case CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER:
            return Object.assign({}, state, {candidatoTestPsicologicoIniciarExamenResponse: action.payload})
        case CANDIDATO_TESTPSICOLOGICO_RESPUESTA_REGISTRAR:
            return Object.assign({}, state, {registrarCandidatoTestPsicologicoRespuestaResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}