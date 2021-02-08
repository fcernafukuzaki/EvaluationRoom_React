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

const rootReducer = combineReducers({
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
	reducerCandidatoTestPsicologico: actionCandidatoTestPsicologicoIniciarExamen
});

export default rootReducer;
