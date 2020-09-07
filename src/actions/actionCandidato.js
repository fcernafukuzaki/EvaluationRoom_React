import axios from 'axios';
import { 
	CANDIDATES_GET,
	CANDIDATO_GUARDAR,
	CANDIDATO_OBTENER,
	CANDIDATOS_OBTENER,
	CANDIDATO_REGISTRADO_VALIDAR,
	CANDIDATO_TESTPSICOLOGICO_RECLUTADOR_GUARDAR,
	CANDIDATO_TESTPSICOLOGICO_GUARDAR,
	CANDIDATO_TESTPSICOLOGICOS_PREGUNTAS_OBTENER,
	CANDIDATO_TESTPSICOLOGICOS_FINALIZADO_VALIDAR,
	CANDIDATO_TESTPSICOLOGICOS_RESPUESTAS_OBTENER,
	CANDIDATO_TESTPSICOLOGICOS_RESULTADO_GRAFICO_OBTENER,
	CANDIDATO_TESTPSICOLOGICOS_OBTENER,
	CANDIDATO_RESPUESTAS_OBTENER,
	CANDIDATO_TESTPSICOLOGICOSDETALLE_OBTENER,
	CANDIDATO_GUARDAR_RESPUESTA,
	INTERPRETACION_OBTENER,
	INFORME_GENERAR,
	CANDIDATO_PUESTO_LABORAL_OBTENER,
	CANDIDATOS_SIN_PUESTO_LABORAL_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function guardarCandidato(candidato) {
	return (dispatch, getState) => {
		axios.post('/candidato/', candidato)
			.then((response) => { dispatch({ type: CANDIDATO_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else if(error.response.status == '409'){
					dispatch({ type: ERROR, payload: error.response.data })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerCandidato(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/candidato/id/').concat(idCandidato))
			.then((response) => { dispatch({ type: CANDIDATO_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerCandidatos() {
	return (dispatch, getState) => {
		axios.get('/candidato/')
			.then((response) => { dispatch({ type: CANDIDATOS_OBTENER, payload: response.data }) })
			.catch((error) => {
				//console.log(error.toString());
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function getCandidates() {
	return (dispatch, getState) => {
		axios.get('https://apirest.evaluationroom.com/v1/candidate_info')
			.then((response) => { dispatch({ type: CANDIDATES_GET, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function validarCandidatoRegistrado(candidato) {
	return (dispatch, getState) => {
		axios.post('/candidato/validar/', candidato)
			.then((response) => { dispatch({ type: CANDIDATO_REGISTRADO_VALIDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarCandidatoTestPsicologicoRecruiter(candidatoTest) {
	return (dispatch, getState) => {
		axios.post('/candidato/test/recruiter/',candidatoTest)
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICO_RECLUTADOR_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else if(error.response.status == '500'){
					dispatch({ type: ERROR, payload: error.response.message })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarCandidatoTestPsicologico(candidatoTest) {
	return (dispatch, getState) => {
		axios.post('/candidato/test/',candidatoTest)
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICO_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else if(error.response.status == '500'){
					dispatch({ type: ERROR, payload: error.response.message })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerCandidatoTestPsicologicosPreguntas(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/candidato/tests/id/').concat(idCandidato))
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICOS_PREGUNTAS_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function validarTestPsicologicosFinalizado(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/candidato/tests/finalizado/id/').concat(idCandidato))
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICOS_FINALIZADO_VALIDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerCandidatoTestPsicologicosRespuestas(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/candidato/tests/respuesta/id/').concat(idCandidato))
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICOS_RESPUESTAS_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerCandidatoTestPsicologicosResultadoData(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/candidato/tests/resultado/data/id/').concat(idCandidato))
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICOS_RESULTADO_GRAFICO_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerCandidatoTestPsicologicos(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/candidato/test/id/').concat(idCandidato))
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICOS_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerCandidatoRespuestas(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/candidato/test/respuestas/id/').concat(idCandidato))
			.then((response) => { dispatch({ type: CANDIDATO_RESPUESTAS_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerCandidatoTestPsicologicosDetalle(idCandidato, idTestPsicologico) {
	return (dispatch, getState) => {
		axios.get(('/candidato/test/id/').concat(idCandidato, '/', idTestPsicologico))
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICOSDETALLE_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function guardarCandidatoRespuesta(candidatoTestDetalle) {
	return (dispatch, getState) => {
		axios.post('/candidato/test/respuesta/',candidatoTestDetalle)
			.then((response) => { dispatch({ type: CANDIDATO_GUARDAR_RESPUESTA, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else if(error.response.status == '409'){
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerInterpretacion(idCandidato) {
	return (dispatch, getState) => {
		axios.get(('/testpsicologico/interpretacion/candidato/').concat(idCandidato))
			.then((response) => { dispatch({ type: INTERPRETACION_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function generarInforme(datosInforme) {
	return (dispatch, getState) => {
		let url = ('/testpsicologico/download/informe/').concat(datosInforme.idCandidato);
		axios.get(url) 
			.then((response) => { dispatch({ type: INFORME_GENERAR, payload: url }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerPuestoLaboralCandidato(idCliente, idPuestoLaboral) {
	return (dispatch, getState) => {
		axios.get(('/candidato/puestolaboral/id/').concat(idCliente, '/', idPuestoLaboral))
			.then((response) => { dispatch({ type: CANDIDATO_PUESTO_LABORAL_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}

export function obtenerCandidatosSinAsignacion(token, email) {
	var body = {
		headers: {
			'Authorization': token,
			correoelectronico: email
		}
	}

	return (dispatch, getState) => {
		axios.post('https://apirest.evaluationroom.com/v1/candidatewithoutselectionprocess', body)
			.then((response) => { dispatch({ type: CANDIDATOS_SIN_PUESTO_LABORAL_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}