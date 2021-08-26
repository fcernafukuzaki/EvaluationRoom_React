import axios from 'axios';
import {
	USUARIO_OBTENER_OAUTH, 
	ERROR,
	OBJ_ERROR_TIME_OUT
} from '../actionTypes';
import {EVALUATIONROOM_HOST} from '../actionEnpoints';

export function obtenerUsuarioOAuth(token, correoElectronico) {
	return (dispatch, getState) => {
		const body = {correoelectronico: correoElectronico}
		axios.post((EVALUATIONROOM_HOST).concat('/login/authenticate'), body
				,{headers: { Authorization: token }}
				)
			.then((response) => { dispatch({ type: USUARIO_OBTENER_OAUTH, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: USUARIO_OBTENER_OAUTH, payload: error.response.data })
				}
			})
	}
}