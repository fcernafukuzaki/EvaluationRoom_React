import axios from 'axios';
import { 
	TIPO_DIRECCION_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';
import {EVALUATIONROOM_HOST} from './actionEnpoints';

export function obtenerTipoDirecciones() {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/candidateform/tipodireccion')
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: TIPO_DIRECCION_OBTENER, payload: response.data.body.tipos_direccion }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
