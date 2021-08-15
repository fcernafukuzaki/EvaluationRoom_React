import axios from 'axios';
import { 
	SEXO_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerSexos() {
	return (dispatch, getState) => {
		axios.get('https://evaluationroom.herokuapp.com/v1/candidateform/sexo'
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: SEXO_OBTENER, payload: response.data.body.sexo }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
