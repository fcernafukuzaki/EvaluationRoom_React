import axios from 'axios';
import { 
	CANDIDATOAPRECIACION_GET,
	CANDIDATOAPRECIACION_ADD,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function getCandidatoApreciacion(token, email, idcandidato, idcliente_idpuestolaboral, idreclutador) {
	var body = {
			headers: {
				'Authorization': token,
				correoelectronico: email
			},
			idcandidato: idcandidato,
			correoelectronico: email
		}

	return (dispatch, getState) => {
		axios.post(('https://api.evaluationroom.com/examen/candidato/entrevista/apreciacion/obtener'), body)
			.then((response) => { dispatch({ type: CANDIDATOAPRECIACION_GET, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function addCandidatoApreciacion(token, correoelectronico, idcandidato, idcliente_idpuestolaboral, idcliente, idpuestolaboral, idreclutador, apreciacion) {
	var body = {
		headers: {
			Authorization: token,
			correoelectronico: correoelectronico
		},
		idcandidato: idcandidato, 
		idcliente_idpuestolaboral: idcliente_idpuestolaboral, 
		idcliente: idcliente,
		idpuestolaboral: idpuestolaboral, 
		idreclutador: idreclutador, 
		apreciacion: apreciacion
	}
	return (dispatch, getState) => {
		axios.post(('https://api.evaluationroom.com/examen/candidato/entrevista/apreciacion/guardar'), body)
			.then((response) => { dispatch({ type: CANDIDATOAPRECIACION_ADD, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}