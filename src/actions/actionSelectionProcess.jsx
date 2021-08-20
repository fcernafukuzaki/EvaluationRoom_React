import axios from 'axios';
import { 
	SELECTIONPROCESS_GET,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';
import {EVALUATIONROOM_HOST} from './actionEnpoints';

export function getSelectionProcess(idclient, idjobposition, process_status, token) {
	return (dispatch, getState) => {
		axios.get((EVALUATIONROOM_HOST).concat('/v1/selectionprocess')
					.concat(process_status != null ? ('/' + process_status) : '')
					.concat(idclient != null && idjobposition != null ? ('/' + idclient).concat('/' + idjobposition) : '')
					,{headers: { Authorization: token }}
					)
			.then((response) => { dispatch({ type: SELECTIONPROCESS_GET, payload: response.data }) })
			.catch((error) => {
				if(error.toString().indexOf('Network Error') > -1){
					dispatch({ type: ERROR, payload: OBJ_ERROR_TIME_OUT })
				} else {
					dispatch({ type: ERROR, payload: error.response.data })
				}
			})
	}
}