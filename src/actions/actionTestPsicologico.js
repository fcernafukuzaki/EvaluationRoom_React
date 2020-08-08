import axios from 'axios';
import { 
	TESTPSICOLOGICOS_OBTENER,
	TESTPSICOLOGICO_PREGUNTAS_OBTENER,
	TESTPSICOLOGICO_PARTES_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerTestPsicologicos() {
	return (dispatch, getState) => {
		axios.get('/testpsicologico/')
			.then((response) => { dispatch({ type: TESTPSICOLOGICOS_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerTestPsicologicoPreguntas(idTestPsicologico) {
	return (dispatch, getState) => {
		axios.get(('/testpsicologico/').concat(idTestPsicologico).concat('/preguntas'))
			.then((response) => { dispatch({ type: TESTPSICOLOGICO_PREGUNTAS_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerTestPsicologicosPartes() {
	return (dispatch, getState) => {
		axios.get('/testpsicologico/partes/')
			.then((response) => { dispatch({ type: TESTPSICOLOGICO_PARTES_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				}
			})
	}
}