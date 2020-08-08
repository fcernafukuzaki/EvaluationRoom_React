import axios from 'axios';
import { 
	DISTRITO_OBTENER,
	DISTRITO_NACIMIENTO_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerDistritos(idPais, idDepartamento, idProvincia) {
	return (dispatch, getState) => {
		axios.get(('/distrito/').concat(idPais,'/',idDepartamento,'/',idProvincia))
			.then((response) => { dispatch({ type: DISTRITO_OBTENER, payload: response.data }) })
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
		axios.get(('/distrito/').concat(idPais,'/',idDepartamento,'/',idProvincia))
			.then((response) => { dispatch({ type: DISTRITO_NACIMIENTO_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
