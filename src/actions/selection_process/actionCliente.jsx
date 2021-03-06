import axios from 'axios';
import { 
	CLIENTE_GUARDAR,
	CLIENTE_ACTUALIZAR,
	CLIENTE_OBTENER,
	CLIENTES_OBTENER,
	PUESTOS_LABORALES_GUARDAR,
	PUESTOS_LABORALES_ACTUALIZAR,
	JOBPOSITION_GET,
	JOBPOSITIONS_GET,
	JOBPOSITION_CANDIDATES_GET,
	JOBPOSITION_CANDIDATE_ADD,
	JOBPOSITION_CANDIDATE_DELETE,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from '../actionTypes';
import {EVALUATIONROOM_HOST} from '../actionEnpoints';

export function obtenerClientes(token, correoElectronico) {
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/clients/')
		axios.get(url, header)
			.then((response) => { dispatch({ type: CLIENTES_OBTENER, payload: response.data.body.clients }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function addClient(body, token, correoElectronico) {
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/clients/')
		axios.post(url, body, header)
			.then((response) => { dispatch({ type: CLIENTE_GUARDAR, payload: response.data.body.client }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function updateClient(body, token, correoElectronico) {
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/clients/')
		axios.put(url, body, header)
			.then((response) => { dispatch({ type: CLIENTE_ACTUALIZAR, payload: response.data.body.client }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerCliente(idClient, token, correoElectronico) {
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/clients/', idClient)
		axios.get(url, header)
			.then((response) => { dispatch({ type: CLIENTE_OBTENER, payload: response.data.body.client }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function getJobPositions(idclient, token, correoElectronico){
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/jobposition/', idclient)
		axios.get(url, header)
			.then((response) => { dispatch({ type: JOBPOSITIONS_GET, payload: response.data.body.jobpositions }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function getJobPosition(idclient, idjobposition, token, correoElectronico){
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/jobposition/', idclient, '/', idjobposition)
		axios.get(url, header)
			.then((response) => { dispatch({ type: JOBPOSITION_GET, payload: response.data.body.jobposition }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarPuestosLaborales(datos, token, correoElectronico) {
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/jobposition/')
		axios.post(url, datos, header)
			.then((response) => {dispatch({type: PUESTOS_LABORALES_GUARDAR, payload: response.data.body.jobposition})})
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function actualizarPuestosLaborales(datos, token, correoElectronico) {
	return (dispatch, getState) => {
		const header = {headers: {Authorization:token, correoElectronico:correoElectronico}}
		const url = (EVALUATIONROOM_HOST).concat('/v1/jobposition/')
		axios.put(url, datos, header)
			.then((response) => { dispatch({ type: PUESTOS_LABORALES_ACTUALIZAR, payload: response.data.body.jobposition }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function getCandidatesFromJobPosition(idclient, idjobposition){
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/jobpositioncandidate')
					.concat(idclient ? ('/' + idclient) : '')
					.concat(idjobposition ? ('/' + idjobposition) : ''))
			.then((response) => { dispatch({ type: JOBPOSITION_CANDIDATES_GET, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function addCandidateToJobPosition(datos) {
	/* Estructura esperada:
		{
			"idclient": 2,
			"idjobposition": 1,
			"idcandidate": 3
		}
	*/
	return (dispatch, getState) => {
		console.log(datos)
		axios.post((EVALUATIONROOM_HOST).concat('/v1/jobpositioncandidate'), datos)
			.then((response) => { dispatch({ type: JOBPOSITION_CANDIDATE_ADD, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function deleteCandidateToJobPosition(datos) {
	/* Estructura esperada:
		{
			"idclient": 2,
			"idjobposition": 1,
			"idcandidate": 3
		}
	*/
	return (dispatch, getState) => {
		console.log(datos)
		axios.put((EVALUATIONROOM_HOST).concat('/v1/jobpositioncandidate'), datos)
			.then((response) => { dispatch({ type: JOBPOSITION_CANDIDATE_DELETE, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}