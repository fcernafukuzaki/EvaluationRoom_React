import {
	USUARIO_GUARDAR,
	USUARIOS_OBTENER,
	USUARIO_OBTENER_OAUTH, 
	USUARIO_OBTENER,
	PERFILES_OBTENER,
	PERFIL_OBTENER,
	PERFIL_GUARDAR,
	ERROR
	} from '../actions/actionTypes';

const initialState = {
	guardarUsuarioResponse: [],
	obtenerUsuariosResponse: [],
	obtenerUsuarioOAuthResponse: [],
	obtenerUsuarioResponse: [],
	obtenerPerfilesResponse: [],
	obtenerPerfilResponse: [],
	guardarPerfilResponse: [],
	errorResponse: []
}

export function actionUsuario(state = initialState, action){
	switch (action.type) {
		case USUARIO_GUARDAR:
			return Object.assign({}, state, {guardarUsuarioResponse: action.payload})
		case USUARIOS_OBTENER:
			return Object.assign({}, state, {obtenerUsuariosResponse: action.payload})
		case USUARIO_OBTENER_OAUTH:
			return Object.assign({}, state, {obtenerUsuarioOAuthResponse: action.payload})
		case USUARIO_OBTENER:
			return Object.assign({}, state, {obtenerUsuarioResponse: action.payload})
		case PERFILES_OBTENER:
			return Object.assign({}, state, {obtenerPerfilesResponse: action.payload})
		case PERFIL_OBTENER:
			return Object.assign({}, state, {obtenerPerfilResponse: action.payload})
		case PERFIL_GUARDAR:
			return Object.assign({}, state, {guardarPerfilResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}