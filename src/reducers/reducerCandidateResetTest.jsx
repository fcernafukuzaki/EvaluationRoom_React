import { 
	CANDIDATE_TEST_RESET,
	ERROR
} from '../actions/actionTypes';

const initialState = {
    resetCandidateTestResponse: [],
    errorResponse: []
}

export function actionCandidateResetTest(state = initialState, action){
    switch (action.type) {
        case CANDIDATE_TEST_RESET:
            return Object.assign({}, state, {resetCandidateTestResponse: action.payload})
        case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}