import axios from 'axios';
import { 
	PAIS_OBTENER,
	PAIS_NACIMIENTO_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerPaises() {
	return (dispatch, getState) => {
		axios.get('/pais/')
			.then((response) => { dispatch({ type: PAIS_OBTENER, payload: response.data }) })
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
		axios.get('/pais/')
			.then((response) => { dispatch({ type: PAIS_NACIMIENTO_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}