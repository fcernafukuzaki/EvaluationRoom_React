import axios from 'axios';
import {
	CANDIDATE_TEST_RESET,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';
import {EVALUATIONROOM_HOST} from './actionEnpoints';

export function resetCandidateTest(token, email, idCandidate, idPsychologicalTest) {
	var body = {
		headers: {
			Authorization: token,
			email: email
		},
		idcandidate: idCandidate, 
		idpsychologicaltest: idPsychologicalTest
	}
	return (dispatch, getState) => {
		axios.post((EVALUATIONROOM_HOST).concat('/v1/candidate/resettest'), body)
			.then((response) => { dispatch({ type: CANDIDATE_TEST_RESET, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}