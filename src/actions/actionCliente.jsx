import axios from 'axios';
import { 
	CLIENTE_GUARDAR,
	CLIENTE_ACTUALIZAR,
	CLIENTE_OBTENER,
	CLIENTES_OBTENER,
	PUESTOS_LABORALES_GUARDAR,
	PUESTOS_LABORALES_ACTUALIZAR,
	JOBPOSITIONS_GET,
	JOBPOSITION_CANDIDATES_GET,
	JOBPOSITION_CANDIDATE_ADD,
	JOBPOSITION_CANDIDATE_DELETE,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function addClient(client) {
	console.log(client)
	return (dispatch, getState) => {
		axios.post('https://apirest.evaluationroom.com/v1/client', client)
			.then((response) => { dispatch({ type: CLIENTE_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function updateClient(client) {
	console.log(client)
	return (dispatch, getState) => {
		axios.put('https://apirest.evaluationroom.com/v1/client', client)
			.then((response) => { dispatch({ type: CLIENTE_ACTUALIZAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerCliente(idclient) {
	return (dispatch, getState) => {
		axios.get(('https://apirest.evaluationroom.com/v1/client')
					.concat(idclient ? ('/' + idclient) : ''))
			.then((response) => { dispatch({ type: CLIENTE_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerClientes() {
	return (dispatch, getState) => {
		axios.get(('https://apirest.evaluationroom.com/v1/client_info'))
			.then((response) => { dispatch({ type: CLIENTES_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarPuestosLaborales(datos) {
	console.log(datos)
	return (dispatch, getState) => {
		axios.post('https://apirest.evaluationroom.com/v1/jobposition', datos)
			.then((response) => { dispatch({ type: PUESTOS_LABORALES_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function actualizarPuestosLaborales(datos) {
	console.log(datos)
	return (dispatch, getState) => {
		axios.put('https://apirest.evaluationroom.com/v1/jobposition', datos)
			.then((response) => { dispatch({ type: PUESTOS_LABORALES_ACTUALIZAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function getJobPosition(idclient, idjobposition){
	return (dispatch, getState) => {
		axios.get(('https://apirest.evaluationroom.com/v1/jobposition')
					.concat(idclient ? ('/' + idclient) : '')
					.concat(idjobposition ? ('/' + idjobposition) : ''))
			.then((response) => { dispatch({ type: JOBPOSITIONS_GET, payload: response.data }) })
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
		axios.get(('https://apirest.evaluationroom.com/v1/jobpositioncandidate')
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
		axios.post('https://apirest.evaluationroom.com/v1/jobpositioncandidate', datos)
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
		axios.put('https://apirest.evaluationroom.com/v1/jobpositioncandidate', datos)
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