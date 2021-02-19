import { 
	CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER,
    CANDIDATO_TESTPSICOLOGICO_RESPUESTA_REGISTRAR,
    CANDIDATO_TESTPSICOLOGICO_LOG_REGISTRAR,
	ERROR,
    ERROR_CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER
} from '../actions/actionTypes';

const initialState = {
    candidatoTestPsicologicoIniciarExamenResponse: [],
    registrarCandidatoTestPsicologicoRespuestaResponse: [],
    registrarCandidatoTestPsicologicoLogResponse: [],
    errorCandidatoTestPsicologicoIniciarExamenResponse: [],
	errorResponse: []
}

export function actionCandidatoTestPsicologicoIniciarExamen(state = initialState, action){
    switch (action.type) {
        case CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER:
            return Object.assign({}, state, {candidatoTestPsicologicoIniciarExamenResponse: action.payload})
        case CANDIDATO_TESTPSICOLOGICO_RESPUESTA_REGISTRAR:
            return Object.assign({}, state, {registrarCandidatoTestPsicologicoRespuestaResponse: action.payload})
        case CANDIDATO_TESTPSICOLOGICO_LOG_REGISTRAR:
            return Object.assign({}, state, {registrarCandidatoTestPsicologicoLogResponse: action.payload})
        case ERROR_CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER:
            return Object.assign({}, state, {errorCandidatoTestPsicologicoIniciarExamenResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}