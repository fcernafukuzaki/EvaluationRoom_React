import axios from 'axios';
import {
	TESTPSICOLOGICOS_INFO_OBTENER, 
	ERROR,
	OBJ_ERROR_TIME_OUT
} from '../actionTypes';
import {EVALUATIONROOM_HOST} from '../actionEnpoints';

export function obtenerTestPsicologicosInfo(token, correoElectronico) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/testpsicologicos/info/email=', correoElectronico),
					{headers: { Authorization: token }})
			.then((response) => { dispatch({ type: TESTPSICOLOGICOS_INFO_OBTENER, payload: response.data.body.psychologicaltests }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}