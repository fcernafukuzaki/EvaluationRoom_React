import axios from 'axios';
import { 
	CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function obtenerCandidatoTestPsicologicoIniciarExamen(token) {
	return (dispatch, getState) => {
		//axios.get('https://evaluationroom-iniciarexamen.herokuapp.com/v1/iniciar_examen'
		axios.get('http://localhost:5000/v1/iniciar_examen'
					,{headers: { Authorization: token }}
					)
			.then((response) => { dispatch({ type: CANDIDATO_TESTPSICOLOGICO_INICIAREXAMEN_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}