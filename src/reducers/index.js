import { combineReducers } from 'redux';

import { actionUsuario } from './reducerUsuario';
import { actionCliente } from './reducerCliente';
import { actionCandidato } from './reducerCandidato';
import { actionReclutador } from './reducerReclutador';
import { actionSelectionProcess } from './reducerSelectionProcess';
import { actionCandidatoApreciacion } from './reducerCandidatoApreciacion';
import { actionCandidatoTestPsicologicoIniciarExamen } from './reducerCandidatoTestPsicologicoIniciarExamen'
import { actionSoporteTecnicoNotificacion } from './reducerSoporteTecnicoNotificacion'
import { actionCandidateResetTest } from './reducerCandidateResetTest'
import { actionLogin } from './recruiter_view/reducerLogin'
import { actionMenu } from './recruiter_view/reducerMenu'
import {actionCandidateForm} from './common_view/reducerCandidateForm'

const rootReducer = combineReducers({
	reducerLogin: actionLogin,
	reducerMenu: actionMenu,
	reducerCandidateForm: actionCandidateForm,
	reducerUsuario: actionUsuario,
	reducerCliente: actionCliente,
	reducerCandidato: actionCandidato,
	reducerReclutador: actionReclutador,
	reducerSelectionProcess: actionSelectionProcess,
	reducerCandidatoApreciacion: actionCandidatoApreciacion,
	reducerCandidatoTestPsicologico: actionCandidatoTestPsicologicoIniciarExamen,
	reducerSoporteTecnicoNotificacion: actionSoporteTecnicoNotificacion,
	reducerCandidateResetTest: actionCandidateResetTest
});

export default rootReducer;
