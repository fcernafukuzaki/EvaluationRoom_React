import axios from 'axios';
import { 
	CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER,
	CANDIDATO_TESTPSICOLOGICO_RESPUESTA_REGISTRAR,
	CANDIDATO_TESTPSICOLOGICO_LOG_REGISTRAR,
	ERROR,
	ERROR_CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerCandidatoTestPsicologicoIniciarExamen(token, obtenerCandidatoTestPsicologicoIniciarExamen) {
	return (dispatch, getState) => {
		axios.get('https://evaluationroom-iniciarexamen.herokuapp.com/v1/iniciar_examen'
					, obtenerCandidatoTestPsicologicoIniciarExamen
					,{headers: { Authorization: token }}
					)
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR_CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR_CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER, payload: error.response.data })
				}
			})
	}
}

export function guardarCandidatoTestPsicologicoRespuesta(token, guardarCandidatoTestPsicologicoRespuesta) {
	return (dispatch, getState) => {
		axios.get('https://evaluationroom-iniciarexamen.herokuapp.com/v1/registrar_respuesta'
					, guardarCandidatoTestPsicologicoRespuesta
					,{headers: { Authorization: token }}
					)
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICO_RESPUESTA_REGISTRAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarCandidatoTestPsicologicoLog(token, guardarCandidatoTestPsicologicoLog) {
	return (dispatch, getState) => {
		axios.get('https://evaluationroom-iniciarexamen.herokuapp.com/v1/guardar_accion'
					, guardarCandidatoTestPsicologicoLog
					,{headers: { Authorization: token }}
					)
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICO_LOG_REGISTRAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}