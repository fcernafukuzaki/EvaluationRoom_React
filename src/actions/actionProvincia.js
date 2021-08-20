import axios from 'axios';
import { 
	PROVINCIA_OBTENER,
	PROVINCIA_NACIMIENTO_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';
import {EVALUATIONROOM_HOST} from './actionEnpoints';

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