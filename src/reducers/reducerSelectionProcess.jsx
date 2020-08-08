import { 
	SELECTIONPROCESS_GET,
	ERROR
} from '../actions/actionTypes';

const initialState = {
    getSelectionProcessResponse: [],
	errorResponse: []
}

export function actionSelectionProcess(state = initialState, action){
    switch (action.type) {
        case SELECTIONPROCESS_GET:
            return Object.assign({}, state, {getSelectionProcessResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}