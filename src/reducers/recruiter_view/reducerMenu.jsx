import { 
	TESTPSICOLOGICOS_INFO_OBTENER,
	ERROR
} from '../../actions/actionTypes';

const initialState = {
    obtenerTestPsicologicosInfoResponse: [],
    errorResponse: []
}

export function actionMenu(state = initialState, action){
    switch (action.type) {
        case TESTPSICOLOGICOS_INFO_OBTENER:
            return Object.assign({}, state, {obtenerTestPsicologicosInfoResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}