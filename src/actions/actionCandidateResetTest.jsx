import axios from 'axios';
import {
	CANDIDATE_TEST_RESET,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function resetCandidateTest(token, idCandidate, idPsychologicalTest) {
	var body = {
		headers: {
			Authorization: token
		},
		idcandidate: idCandidate, 
		idpsychologicaltest: idPsychologicalTest
	}
	return (dispatch, getState) => {
		axios.post(('https://evaluationroom.herokuapp.com/v1/candidate/resettest'), body)
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