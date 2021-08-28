import { combineReducers } from 'redux';

import { actionUsuario } from './reducerUsuario';
import { actionSexo } from './reducerSexo';
import { actionEstadoCivil } from './reducerEstadoCivil';
import { actionDocumentoIdentidad } from './reducerDocumentoIdentidad';
import { actionTipoDireccion } from './reducerTipoDireccion';
import { actionPais } from './reducerPais';
import { actionDepartamento } from './reducerDepartamento';
import { actionProvincia } from './reducerProvincia';
import { actionDistrito } from './reducerDistrito';
import { actionCliente } from './reducerCliente';
import { actionCandidato } from './reducerCandidato';
import { actionTestPsicologico } from './reducerTestPsicologico';
import { actionReclutador } from './reducerReclutador';
import { actionSelectionProcess } from './reducerSelectionProcess';
import { actionCandidatoApreciacion } from './reducerCandidatoApreciacion';
import { actionCandidatoTestPsicologicoIniciarExamen } from './reducerCandidatoTestPsicologicoIniciarExamen'
import { actionSoporteTecnicoNotificacion } from './reducerSoporteTecnicoNotificacion'
import { actionCandidateResetTest } from './reducerCandidateResetTest'
import { actionLogin } from './recruiter_view/reducerLogin'
import { actionMenu } from './recruiter_view/reducerMenu'

const rootReducer = combineReducers({
	reducerLogin: actionLogin,
	reducerMenu: actionMenu,
	reducerUsuario: actionUsuario,
	reducerSexo: actionSexo,
	reducerEstadoCivil: actionEstadoCivil,
	reducerDocumentoIdentidad: actionDocumentoIdentidad,
	reducerTipoDireccion: actionTipoDireccion,
	reducerPais: actionPais,
	reducerDepartamento: actionDepartamento,
	reducerProvincia: actionProvincia,
	reducerDistrito: actionDistrito,
	reducerCliente: actionCliente,
	reducerCandidato: actionCandidato,
	reducerTestPsicologico: actionTestPsicologico,
	reducerReclutador: actionReclutador,
	reducerSelectionProcess: actionSelectionProcess,
	reducerCandidatoApreciacion: actionCandidatoApreciacion,
	reducerCandidatoTestPsicologico: actionCandidatoTestPsicologicoIniciarExamen,
	reducerSoporteTecnicoNotificacion: actionSoporteTecnicoNotificacion,
	reducerCandidateResetTest: actionCandidateResetTest
});

export default rootReducer;
