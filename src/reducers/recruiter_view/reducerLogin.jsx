import { 
	USUARIO_OBTENER_OAUTH,
	ERROR
} from '../../actions/actionTypes';

const initialState = {
    obtenerUsuarioOAuthResponse: [],
    errorResponse: []
}

export function actionLogin(state = initialState, action){
    switch (action.type) {
        case USUARIO_OBTENER_OAUTH:
            return Object.assign({}, state, {obtenerUsuarioOAuthResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}