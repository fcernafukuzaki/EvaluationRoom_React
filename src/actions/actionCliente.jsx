import axios from 'axios';
import { 
	CLIENTE_GUARDAR,
	CLIENTE_ACTUALIZAR,
	CLIENTE_OBTENER,
	CLIENTES_OBTENER,
	PUESTOS_LABORALES_GUARDAR,
	PUESTOS_LABORALES_ACTUALIZAR,
	CLIENTE_PUESTOS_LABORALES_OBTENER,
	PUESTO_LABORAL_OBTENER,
	JOBPOSITIONS_GET,
	JOBPOSITION_CANDIDATES_GET,
	JOBPOSITION_CANDIDATE_ADD,
	JOBPOSITION_CANDIDATE_DELETE,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function guardarCliente(cliente) {
	return (dispatch, getState) => {
		//axios.post('/cliente/', cliente)
		axios.post('http://127.0.0.1:5000/v1/client', cliente)
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

export function actualizarCliente(cliente) {
	return (dispatch, getState) => {
		axios.put('http://127.0.0.1:5000/v1/client', cliente)
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
		//axios.get(('/cliente/id/').concat(idCliente))
		axios.get(('http://127.0.0.1:5000/v1/client')
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
		//axios.get('/cliente/')
		axios.get(('http://127.0.0.1:5000/v1/client'))
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
	return (dispatch, getState) => {
		//axios.post('/cliente/puestos/',cliente)
		axios.post('http://127.0.0.1:5000/v1/jobposition', datos)
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
	return (dispatch, getState) => {
		axios.put('http://127.0.0.1:5000/v1/jobposition', datos)
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

export function obtenerPuestosLaboralesPorCliente(idCliente) {
	return (dispatch, getState) => {
		axios.get(('/cliente/puestos/id/').concat(idCliente))
			.then((response) => { dispatch({ type: CLIENTE_PUESTOS_LABORALES_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerPuestoLaboral(idCliente, idPuestoLaboral) {
	return (dispatch, getState) => {
		axios.get(('/cliente/').concat(idCliente,'/puesto/id/',idPuestoLaboral))
			.then((response) => { dispatch({ type: PUESTO_LABORAL_OBTENER, payload: response.data }) })
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
		axios.get(('http://127.0.0.1:5000/v1/jobposition')
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
		axios.get(('http://127.0.0.1:5000/v1/jobpositioncandidate')
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
		axios.post('http://127.0.0.1:5000/v1/jobpositioncandidate', datos)
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
		axios.put('http://127.0.0.1:5000/v1/jobpositioncandidate', datos)
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