import axios from 'axios';
import { 
	PAIS_OBTENER, PAIS_NACIMIENTO_OBTENER,
	DEPARTAMENTO_OBTENER, DEPARTAMENTO_NACIMIENTO_OBTENER,
	PROVINCIA_OBTENER, PROVINCIA_NACIMIENTO_OBTENER,
	DISTRITO_OBTENER, DISTRITO_NACIMIENTO_OBTENER,
	SEXO_OBTENER,
	TIPO_DIRECCION_OBTENER,
	ESTADOCIVIL_OBTENER,
	DOCUMENTOIDENTIDAD_OBTENER,
	TESTPSICOLOGICOS_OBTENER,
	CANDIDATO_OBTENER,
	CANDIDATO_REGISTRADO_VALIDAR,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from '../actionTypes';
import {EVALUATIONROOM_HOST} from '../actionEnpoints';

export function obtenerPaises() {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo')
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ 
				type: PAIS_OBTENER, 
				payload: response.data.body.paises
			}) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerPaisesNacimiento() {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo')
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ 
				type: PAIS_NACIMIENTO_OBTENER, 
				payload: response.data.body.paises 
			}) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerDepartamentos(idPais) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais)
				  ,{headers: { Authorization: 'token' }}
				 )
			.then((response) => { dispatch({ type: DEPARTAMENTO_OBTENER, payload: response.data.body.departamentos }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerDepartamentosNacimiento(idPais) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais)
				  ,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: DEPARTAMENTO_NACIMIENTO_OBTENER, payload: response.data.body.departamentos }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerProvincias(idPais, idDepartamento) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais,'/',idDepartamento)
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: PROVINCIA_OBTENER, payload: response.data.body.provincias }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerProvinciasNacimiento(idPais, idDepartamento) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais,'/',idDepartamento)
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: PROVINCIA_NACIMIENTO_OBTENER, payload: response.data.body.provincias }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerDistritos(idPais, idDepartamento, idProvincia) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais,'/',idDepartamento,'/',idProvincia)
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: DISTRITO_OBTENER, payload: response.data.body.distritos }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerDistritosNacimiento(idPais, idDepartamento, idProvincia) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais,'/',idDepartamento,'/',idProvincia)
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: DISTRITO_NACIMIENTO_OBTENER, payload: response.data.body.distritos }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerSexos() {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/sexo')
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: SEXO_OBTENER, payload: response.data.body.sexo }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerTipoDirecciones() {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/tipodireccion')
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: TIPO_DIRECCION_OBTENER, payload: response.data.body.tipos_direccion }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerEstadosCiviles() {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/estadocivil')
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: ESTADOCIVIL_OBTENER, payload: response.data.body.estados_civil }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerDocumentosIdentidad() {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/documentoidentidad')
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: DOCUMENTOIDENTIDAD_OBTENER, payload: response.data.body.documentos_identidad }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

// RECRUITER VIEW
export function obtenerTestPsicologicos(token) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/testpsicologicos'),
					{headers: { Authorization: token }})
			.then((response) => { dispatch({ type: TESTPSICOLOGICOS_OBTENER, payload: response.data.body.psychologicaltests }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerCandidato(idCandidato, token) {
	/*
	 * Obtener información de un candidato a partir de su uid.
	 * Return: Información del candidato.
	 */
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidate/uid=').concat(idCandidato),
					{headers: { Authorization: token }})
			.then((response) => { dispatch({ type: CANDIDATO_OBTENER, payload: response.data.body.candidato }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data.error })
				}
			})
	}
}
// CANDIDATE VIEW
export function validarCandidatoRegistrado(correoElectronico) {
	/*
	 * Validar si el candidato se encuentra registrado a partir de su email.
	 * Return: Información para completar el formulario de registro.
	 */
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidate/email=').concat(correoElectronico),
					{headers: { Authorization: 'token' }})
			.then((response) => { dispatch({ type: CANDIDATO_REGISTRADO_VALIDAR, payload: response.data.body.candidato }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data.error })
				}
			})
	}
}
