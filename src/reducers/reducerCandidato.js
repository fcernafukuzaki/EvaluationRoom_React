import {
	CANDIDATES_GET,
	CANDIDATO_GUARDAR,
	CANDIDATO_OBTENER,
	CANDIDATOS_OBTENER,
	CANDIDATO_REGISTRADO_VALIDAR,
	CANDIDATO_TESTPSICOLOGICO_RECLUTADOR_GUARDAR,
	CANDIDATO_TESTPSICOLOGICO_GUARDAR,
	CANDIDATO_TESTPSICOLOGICOS_PREGUNTAS_OBTENER,
	CANDIDATO_TESTPSICOLOGICOS_FINALIZADO_VALIDAR,
	CANDIDATO_TESTPSICOLOGICOS_RESPUESTAS_OBTENER,
	CANDIDATO_TESTPSICOLOGICOS_RESULTADO_GRAFICO_OBTENER,
	CANDIDATO_TESTPSICOLOGICOS_OBTENER,
	CANDIDATO_RESPUESTAS_OBTENER,
	CANDIDATO_TESTPSICOLOGICOSDETALLE_OBTENER,
	CANDIDATO_GUARDAR_RESPUESTA,
	INTERPRETACION_OBTENER,
	INFORME_GENERAR,
	CANDIDATO_PUESTO_LABORAL_GUARDAR,
	CANDIDATO_PUESTO_LABORAL_ELIMINAR,
	CANDIDATO_PUESTO_LABORAL_OBTENER,
	ERROR
	} from '../actions/actionTypes';
import fileSaver from 'file-saver';

const initialState = { 
	getCandidatesResponse: [],
	guardarCandidatoResponse: [],
	obtenerCandidatoResponse: [],
	obtenerCandidatosResponse: [],
	validarCandidatoRegistradoResponse: [],
	guardarCandidatoTestPsicologicoRecruiterResponse: [],
	guardarCandidatoTestPsicologicoResponse: [],
	obtenerCandidatoTestPsicologicosPreguntasResponse: [],
	validarTestPsicologicosFinalizadoResponse: [],
	obtenerCandidatoTestPsicologicosRespuestasResponse: [],
	obtenerCandidatoTestPsicologicosResultadoDataResponse: [],
	obtenerCandidatoTestPsicologicosResponse: [],
	obtenerCandidatoRespuestasResponse: [],
	obtenerCandidatoTestPsicologicosDetalleResponse: [],
	guardarCandidatoRespuestaResponse: [],
	obtenerInterpretacionResponse: [],
	generarInformeResponse: [],
	guardarCandidatoPuestoLaboralResponse: [],
	eliminarCandidatoPuestoLaboralResponse: [],
	obtenerCandidatoPuestoLaboralResponse: [],
	errorResponse: []
}

export function actionCandidato(state = initialState, action){
	switch (action.type) {
		case CANDIDATES_GET:
			return Object.assign({}, state, {getCandidatesResponse: action.payload})
		case CANDIDATO_GUARDAR:
			return Object.assign({}, state, {guardarCandidatoResponse: action.payload})
		case CANDIDATO_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoResponse: action.payload})
		case CANDIDATOS_OBTENER:
			return Object.assign({}, state, {obtenerCandidatosResponse: action.payload})
		case CANDIDATO_REGISTRADO_VALIDAR:
			return Object.assign({}, state, {validarCandidatoRegistradoResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICO_RECLUTADOR_GUARDAR:
			return Object.assign({}, state, {guardarCandidatoTestPsicologicoRecruiterResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICO_GUARDAR:
			return Object.assign({}, state, {guardarCandidatoTestPsicologicoResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICOS_PREGUNTAS_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoTestPsicologicosPreguntasResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICOS_FINALIZADO_VALIDAR:
			return Object.assign({}, state, {validarTestPsicologicosFinalizadoResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICOS_RESPUESTAS_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoTestPsicologicosRespuestasResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICOS_RESULTADO_GRAFICO_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoTestPsicologicosResultadoDataResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICOS_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoTestPsicologicosResponse: action.payload})
		case CANDIDATO_RESPUESTAS_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoRespuestasResponse: action.payload})
		case CANDIDATO_TESTPSICOLOGICOSDETALLE_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoTestPsicologicosDetalleResponse: action.payload})
		case CANDIDATO_GUARDAR_RESPUESTA:
			return Object.assign({}, state, {guardarCandidatoRespuestaResponse: action.payload})
		case INTERPRETACION_OBTENER:
			return Object.assign({}, state, {obtenerInterpretacionResponse: action.payload})
		case INFORME_GENERAR:
			fileSaver.saveAs(action.payload, "Informe.docx");
			return state;
		case CANDIDATO_PUESTO_LABORAL_GUARDAR:
			return Object.assign({}, state, {guardarCandidatoPuestoLaboralResponse: action.payload})
		case CANDIDATO_PUESTO_LABORAL_ELIMINAR:
			return Object.assign({}, state, {eliminarCandidatoPuestoLaboralResponse: action.payload})
		case CANDIDATO_PUESTO_LABORAL_OBTENER:
			return Object.assign({}, state, {obtenerCandidatoPuestoLaboralResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state 
	}
}