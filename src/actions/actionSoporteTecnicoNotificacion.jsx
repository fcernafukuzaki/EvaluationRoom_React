import axios from 'axios';
import { 
	SOPORTE_TECNICO_NOTIFICACION_MENSAJES_ERROR_GET,
	SOPORTE_TECNICO_NOTIFICACION_ADD,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';
import {EVALUATIONROOM_SUPPORTNOTIFICATION_HOST} from './actionEnpoints';

export function getSoporteTecnicoNotificacionMensajesError(token) {
	var body = {
			headers: {
				'Authorization': token
			}
		}
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_SUPPORTNOTIFICATION_HOST).concat('/v1/candidato_soportetecnico_notificar'), body)
			.then((response) => { dispatch({ type: SOPORTE_TECNICO_NOTIFICACION_MENSAJES_ERROR_GET, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function addSoporteTecnicoNotificacion(token, correoelectronico, observacion, detalle) {
	var body = {headers: { Authorization: token },
		correo_electronico: correoelectronico, 
		observacion: observacion, 
		detalle: detalle.length > 0 ? {mensaje: detalle} : null
	}
	var header ={headers: { Authorization: token }}
	return (dispatch, getState) => {
		axios.post((EVALUATIONROOM_SUPPORTNOTIFICATION_HOST).concat('/v1/candidato_soportetecnico_notificar'), body, header)
			.then((response) => { dispatch({ type: SOPORTE_TECNICO_NOTIFICACION_ADD, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}