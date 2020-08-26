import axios from 'axios';
import { 
	SELECTIONPROCESS_GET,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function getSelectionProcess(idclient, idjobposition, process_status, token) {
	return (dispatch, getState) => {
		axios.get(('https://apirest.evaluationroom.com/v1/selectionprocess')
		//axios.get(('http://127.0.0.1:5000/v1/selectionprocess')
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