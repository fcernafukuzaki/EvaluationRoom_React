import axios from 'axios';
import { 
	SOPORTE_TECNICO_NOTIFICACION_MENSAJES_ERROR_GET,
	SOPORTE_TECNICO_NOTIFICACION_ADD,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function getSoporteTecnicoNotificacionMensajesError(token) {
	var body = {
			headers: {
				'Authorization': token
			}
		}
	return (dispatch, getState) => {
		axios.post((''), body)
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
	var body = {
		headers: {
			Authorization: token
		},
		correoelectronico: correoelectronico, 
		observacion: observacion, 
		detalle: detalle
	}
	return (dispatch, getState) => {
		axios.post((''), body)
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