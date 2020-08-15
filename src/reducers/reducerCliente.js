import {
	CLIENTE_GUARDAR,
	CLIENTE_ACTUALIZAR,
	CLIENTE_OBTENER,
	CLIENTES_OBTENER,
	PUESTOS_LABORALES_GUARDAR,
	PUESTOS_LABORALES_ACTUALIZAR,
	JOBPOSITIONS_GET,
	JOBPOSITION_CANDIDATES_GET,
	JOBPOSITION_CANDIDATE_ADD,
	JOBPOSITION_CANDIDATE_DELETE,
	ERROR
	} from '../actions/actionTypes';

const initialState = { 
	guardarClienteResponse: [],
	actualizarClienteResponse: [],
	obtenerClienteResponse: [],
	obtenerClientesResponse: [],
	guardarPuestosLaboralesResponse: [],
	actualizarPuestosLaboralesResponse: [],
	getJobPositionResponse: [],
	getCandidatesFromJobPositionResponse: [],
	addCandidateToJobPositionResponse: [],
	deleteCandidateToJobPositionResponse: [],
	errorResponse: []
}

export function actionCliente(state = initialState, action){
	switch (action.type) {
		case CLIENTE_GUARDAR:
			return Object.assign({}, state, {guardarClienteResponse: action.payload})
		case CLIENTE_ACTUALIZAR:
			return Object.assign({}, state, {actualizarClienteResponse: action.payload})
		case CLIENTE_OBTENER:
			return Object.assign({}, state, {obtenerClienteResponse: action.payload})
		case CLIENTES_OBTENER:
			return Object.assign({}, state, {obtenerClientesResponse: action.payload})
		case PUESTOS_LABORALES_GUARDAR:
			return Object.assign({}, state, {guardarPuestosLaboralesResponse: action.payload})
		case PUESTOS_LABORALES_ACTUALIZAR:
			return Object.assign({}, state, {actualizarPuestosLaboralesResponse: action.payload})
		case JOBPOSITIONS_GET:
			return Object.assign({}, state, {getJobPositionResponse: action.payload})
		case JOBPOSITION_CANDIDATES_GET:
			return Object.assign({}, state, {getCandidatesFromJobPositionResponse: action.payload})
		case JOBPOSITION_CANDIDATE_ADD:
			return Object.assign({}, state, {addCandidateToJobPositionResponse: action.payload})
		case JOBPOSITION_CANDIDATE_DELETE:
			return Object.assign({}, state, {deleteCandidateToJobPositionResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}