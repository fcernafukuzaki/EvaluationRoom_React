import axios from 'axios';
import { 
	DOCUMENTOIDENTIDAD_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerDocumentosIdentidad() {
	return (dispatch, getState) => {
		axios.get('https://evaluationroom.herokuapp.com/v1/candidateform/documentoidentidad'
				,{headers: { Authorization: 'token' }}
				)
			.then((response) => { dispatch({ type: DOCUMENTOIDENTIDAD_OBTENER, payload: response.data.body.documentos_identidad }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}
