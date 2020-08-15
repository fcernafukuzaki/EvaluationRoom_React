import axios from 'axios';
import { 
	TIPO_DIRECCION_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerTipoDirecciones() {
	return (dispatch, getState) => {
		axios.get('/tipodireccion/')
			.then((response) => { dispatch({ type: TIPO_DIRECCION_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}