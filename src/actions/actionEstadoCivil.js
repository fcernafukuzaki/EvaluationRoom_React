import axios from 'axios';
import { 
	ESTADOCIVIL_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerEstadosCiviles() {
	return (dispatch, getState) => {
		axios.get('/estadocivil/')
			.then((response) => { dispatch({ type: ESTADOCIVIL_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
