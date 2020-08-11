import axios from 'axios';
import { 
	SELECTIONPROCESS_GET,
	ERROR,
	OBJ_ERROR_TIME_OUT
} from './actionTypes';

export function getSelectionProcess(idclient, idjobposition) {
	return (dispatch, getState) => {
		axios.get(('http://127.0.0.1:5000/v1/selectionprocess')
					.concat(idclient != null ? ('/' + idclient) : '')
					.concat(idjobposition != null ? ('/' + idjobposition) : ''))
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