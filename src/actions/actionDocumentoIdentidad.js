import axios from 'axios';
import { 
	DOCUMENTOIDENTIDAD_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerDocumentosIdentidad() {
	return (dispatch, getState) => {
		axios.get('/documentoidentidad/')
			.then((response) => { dispatch({ type: DOCUMENTOIDENTIDAD_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
