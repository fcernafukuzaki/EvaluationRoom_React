import { 
	SOPORTE_TECNICO_NOTIFICACION_MENSAJES_ERROR_GET,
	SOPORTE_TECNICO_NOTIFICACION_ADD,
	ERROR
} from '../actions/actionTypes';

const initialState = {
    getSoporteTecnicoNotificacionMensajesErrorResponse: [],
    addSoporteTecnicoNotificacionResponse: [],
	errorResponse: []
}

export function actionSoporteTecnicoNotificacion(state = initialState, action){
    switch (action.type) {
        case SOPORTE_TECNICO_NOTIFICACION_MENSAJES_ERROR_GET:
            return Object.assign({}, state, {getSoporteTecnicoNotificacionMensajesErrorResponse: action.payload})
        case SOPORTE_TECNICO_NOTIFICACION_ADD:
            return Object.assign({}, state, {addSoporteTecnicoNotificacionResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}