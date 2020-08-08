import {
	CLIENTE_GUARDAR,
	CLIENTE_OBTENER,
	CLIENTES_OBTENER,
	PUESTOS_LABORALES_GUARDAR,
	CLIENTE_PUESTOS_LABORALES_OBTENER,
	PUESTO_LABORAL_OBTENER,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	guardarClienteResponse: [],
	obtenerClienteResponse: [],
	obtenerClientesResponse: [],
	guardarPuestosLaboralesResponse: [],
	obtenerClientePuestosLaboralesResponse: [],
	obtenerPuestoLaboralResponse: [],
	errorResponse: []
}

export function actionCliente(state = initialState, action){
	switch (action.type) {
		case CLIENTE_GUARDAR:
			return Object.assign({}, state, {guardarClienteResponse: action.payload})
		case CLIENTE_OBTENER:
			return Object.assign({}, state, {obtenerClienteResponse: action.payload})
		case CLIENTES_OBTENER:
			return Object.assign({}, state, {obtenerClientesResponse: action.payload})
		case PUESTOS_LABORALES_GUARDAR:
			return Object.assign({}, state, {guardarPuestosLaboralesResponse: action.payload})
		case CLIENTE_PUESTOS_LABORALES_OBTENER:
			return Object.assign({}, state, {obtenerClientePuestosLaboralesResponse: action.payload})
		case PUESTO_LABORAL_OBTENER:
			return Object.assign({}, state, {obtenerPuestoLaboralResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}