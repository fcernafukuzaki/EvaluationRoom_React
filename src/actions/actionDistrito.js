import axios from 'axios';
import { 
	DISTRITO_OBTENER,
	DISTRITO_NACIMIENTO_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';
import {EVALUATIONROOM_HOST} from './actionEnpoints';

export function obtenerDistritos(idPais, idDepartamento, idProvincia) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais,'/',idDepartamento,'/',idProvincia)
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: DISTRITO_OBTENER, payload: response.data.body.distritos }) })
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
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/ubigeo/').concat(idPais,'/',idDepartamento,'/',idProvincia)
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: DISTRITO_NACIMIENTO_OBTENER, payload: response.data.body.distritos }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
