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
} from './actionTypes';

export function guardarUsuario(usuario) {
	return (dispatch, getState) => {
		axios.post('/usuario/', usuario)
			.then((response) => { dispatch({ type: USUARIO_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else if(error.response.status == '409'){
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerUsuarioOAuth() {
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
}

export function obtenerUsuarios() {
	return (dispatch, getState) => {
		axios.get('/usuario/usuarios')
			.then((response) => { dispatch({ type: USUARIOS_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerUsuario(idUsuario) {
	return (dispatch, getState) => {
		axios.get(('/usuario/id/').concat(idUsuario))
			.then((response) => { dispatch({ type: USUARIO_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerPerfiles() {
	return (dispatch, getState) => {
		axios.get('/usuario/perfiles')
			.then((response) => { dispatch({ type: PERFILES_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function obtenerPerfil(idPerfil) {
	return (dispatch, getState) => {
		axios.get(('/usuario/perfil/id/').concat(idPerfil))
			.then((response) => { dispatch({ type: PERFIL_OBTENER, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}

export function guardarPerfil(perfil) {
	return (dispatch, getState) => {
		axios.post('/usuario/perfil/', perfil)
			.then((response) => { dispatch({ type: PERFIL_GUARDAR, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else if(error.response.status == '409'){
					dispatch({ type: ERROR, payload: error.response.data })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}