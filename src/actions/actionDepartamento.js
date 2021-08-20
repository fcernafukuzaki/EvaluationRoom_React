import axios from 'axios';
import { 
	DEPARTAMENTO_OBTENER,
	DEPARTAMENTO_NACIMIENTO_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';
import {EVALUATIONROOM_HOST} from './actionEnpoints';

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
