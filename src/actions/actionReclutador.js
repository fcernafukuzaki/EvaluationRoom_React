import axios from 'axios';
import { 
	RECLUTADOR_GUARDAR,
	RECLUTADOR_OBTENER,
	RECLUTADORES_OBTENER,
	RECLUTADOR_NOTIFICAR,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function guardarReclutador(reclutador) {
	return (dispatch, getState) => {
		axios.post('/reclutador/', reclutador)
			.then((response) => { dispatch({ type: RECLUTADOR_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerReclutador(idReclutador) {
	return (dispatch, getState) => {
		axios.get(('/reclutador/id/').concat(idReclutador))
			.then((response) => { dispatch({ type: RECLUTADOR_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerReclutadores() {
	return (dispatch, getState) => {
		axios.get('/reclutador/')
			.then((response) => { dispatch({ type: RECLUTADORES_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function notificarReclutador(reclutador) {
	console.log('notificarReclutador:' , reclutador);
	return (dispatch, getState) => {
		/*axios.defaults.baseURL = 'https://api.evaluationroom.com';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';*/
		axios.post('https://api.evaluationroom.com/v1/candidatefinishedexam/notify/recruiter', reclutador)
			.then((response) => { dispatch({ type: RECLUTADOR_NOTIFICAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
