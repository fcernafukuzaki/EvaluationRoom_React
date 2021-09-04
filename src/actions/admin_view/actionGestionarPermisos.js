import axios from 'axios';
import {
	USUARIO_GUARDAR,
	USUARIOS_OBTENER,
	USUARIO_OBTENER_OAUTH, 
	USUARIO_OBTENER,
	PERFILES_OBTENER,
	PERFIL_OBTENER,
	PERFIL_GUARDAR,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from '../actionTypes';
import {EVALUATIONROOM_ADMINACCESSGEST_HOST} from '../actionEnpoints';

export function obtenerUsuarios(token, correoElectronico) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_ADMINACCESSGEST_HOST).concat('/usuarios/'),
					{headers: {Authorization:token, correoElectronico:correoElectronico}})
			.then((response) => { dispatch({ type: USUARIOS_OBTENER, payload: response.data.body.usuarios }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarUsuario(usuario, token, correoElectronico) {
	/**
	 * Guarda datos de un nuevo usario.
	 * Return: Identificador del usuario.
	 */
	return (dispatch, getState) => {
		axios.post((EVALUATIONROOM_ADMINACCESSGEST_HOST).concat('/usuarios/'), usuario,
					{headers: {Authorization:token, correoElectronico:correoElectronico}})
			.then((response) => { dispatch({ type: USUARIO_GUARDAR, payload: response.data.body.usuario }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerUsuario(idUsuario, token, correoElectronico) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_ADMINACCESSGEST_HOST).concat('/usuarios/', idUsuario),
					{headers: {Authorization:token, correoElectronico:correoElectronico}})
			.then((response) => { dispatch({ type: USUARIO_OBTENER, payload: response.data.body.usuario }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function actualizarUsuario(usuario, token, correoElectronico) {
	/**
	 * Actualiza datos de un usario.
	 * Return: Identificador del usuario.
	 */
	return (dispatch, getState) => {
		axios.put((EVALUATIONROOM_ADMINACCESSGEST_HOST).concat('/usuarios/',usuario.idUsuario), usuario,
					{headers: {Authorization:token, correoElectronico:correoElectronico}})
			.then((response) => { dispatch({ type: USUARIO_GUARDAR, payload: response.data.body.usuario }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

/*export function obtenerUsuarioOAuth() {
	return (dispatch, getState) => {
		axios.get('/usuario/')
			.then((response) => { dispatch({ type: USUARIO_OBTENER_OAUTH, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}*/

export function obtenerPerfiles(token, correoElectronico) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_ADMINACCESSGEST_HOST).concat('/perfiles/'),
					{headers: {Authorization:token, correoElectronico:correoElectronico}})
			.then((response) => { dispatch({ type: PERFILES_OBTENER, payload: response.data.body.perfiles }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerPerfil(idPerfil, token, correoElectronico) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_ADMINACCESSGEST_HOST).concat('/perfiles/', idPerfil),
					{headers: {Authorization:token, correoElectronico:correoElectronico}})
			.then((response) => { dispatch({ type: PERFIL_OBTENER, payload: response.data.body.perfil }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarPerfil(perfil, token, correoElectronico) {
	return (dispatch, getState) => {
		axios.post((EVALUATIONROOM_ADMINACCESSGEST_HOST).concat('/perfiles/', perfil.idPerfil), perfil,
					{headers: {Authorization:token, correoElectronico:correoElectronico}})
			.then((response) => { dispatch({ type: PERFIL_GUARDAR, payload: response.data.body.perfil }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}