import { 
	CANDIDATOAPRECIACION_GET,
	CANDIDATOAPRECIACION_ADD,
	ERROR
} from '../actions/actionTypes';

const initialState = {
    getCandidatoApreciacionResponse: [],
    addCandidatoApreciacionResponse: [],
	errorResponse: []
}

export function actionCandidatoApreciacion(state = initialState, action){
    switch (action.type) {
        case CANDIDATOAPRECIACION_GET:
            return Object.assign({}, state, {getCandidatoApreciacionResponse: action.payload})
        case CANDIDATOAPRECIACION_ADD:
            return Object.assign({}, state, {addCandidatoApreciacionResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}