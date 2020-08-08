import axios from 'axios';
import { 
	CLIENTE_GUARDAR,
	CLIENTE_OBTENER,
	CLIENTES_OBTENER,
	PUESTOS_LABORALES_GUARDAR,
	CLIENTE_PUESTOS_LABORALES_OBTENER,
	PUESTO_LABORAL_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function guardarCliente(cliente) {
	return (dispatch, getState) => {
		axios.post('/cliente/', cliente)
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

export function obtenerCliente(idCliente) {
	return (dispatch, getState) => {
		axios.get(('/cliente/id/').concat(idCliente))
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
		axios.get('/cliente/')
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

export function guardarPuestosLaborales(cliente) {
	return (dispatch, getState) => {
		axios.post('/cliente/puestos/',cliente)
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
