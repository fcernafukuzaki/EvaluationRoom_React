import { 
	PAIS_OBTENER, PAIS_NACIMIENTO_OBTENER,
	DEPARTAMENTO_OBTENER, DEPARTAMENTO_NACIMIENTO_OBTENER,
	PROVINCIA_OBTENER, PROVINCIA_NACIMIENTO_OBTENER,
	DISTRITO_OBTENER, DISTRITO_NACIMIENTO_OBTENER,
	SEXO_OBTENER,
	TIPO_DIRECCION_OBTENER,
	ESTADOCIVIL_OBTENER,
	DOCUMENTOIDENTIDAD_OBTENER,
	TESTPSICOLOGICOS_OBTENER,
	ERROR
} from '../../actions/actionTypes';

const initialState = {
	obtenerPaisesResponse: [],
	obtenerPaisesNacimientoResponse: [],
	obtenerDepartamentosResponse: [],
	obtenerDepartamentosNacimientoResponse: [],
	obtenerProvinciasResponse: [],
	obtenerProvinciasNacimientoResponse: [],
	obtenerDistritosResponse: [],
	obtenerDistritosNacimientoResponse: [],
	obtenerSexosResponse: [],
	obtenerTipoDireccionesResponse: [],
	obtenerEstadosCivilesResponse: [],
	obtenerDocumentosIdentidadResponse: [],
	obtenerTestPsicologicosResponse: [],
	errorResponse: []
}

export function actionCandidateForm(state = initialState, action){
    switch (action.type) {
        case PAIS_OBTENER:
			return Object.assign({}, state, {obtenerPaisesResponse: action.payload})
		case PAIS_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerPaisesNacimientoResponse: action.payload})
		case DEPARTAMENTO_OBTENER:
			return Object.assign({}, state, {obtenerDepartamentosResponse: action.payload})
		case DEPARTAMENTO_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerDepartamentosNacimientoResponse: action.payload})
		case PROVINCIA_OBTENER:
			return Object.assign({}, state, {obtenerProvinciasResponse: action.payload})
		case PROVINCIA_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerProvinciasNacimientoResponse: action.payload})
		case DISTRITO_OBTENER:
			return Object.assign({}, state, {obtenerDistritosResponse: action.payload})
		case DISTRITO_NACIMIENTO_OBTENER:
			return Object.assign({}, state, {obtenerDistritosNacimientoResponse: action.payload})
		case SEXO_OBTENER:
			return Object.assign({}, state, {obtenerSexosResponse: action.payload})
		case TIPO_DIRECCION_OBTENER:
			return Object.assign({}, state, {obtenerTipoDireccionesResponse: action.payload})
		case ESTADOCIVIL_OBTENER:
			return Object.assign({}, state, {obtenerEstadosCivilesResponse: action.payload})
		case DOCUMENTOIDENTIDAD_OBTENER:
			return Object.assign({}, state, {obtenerDocumentosIdentidadResponse: action.payload})
		case TESTPSICOLOGICOS_OBTENER:
			return Object.assign({}, state, {obtenerTestPsicologicosResponse: action.payload})
		case ERROR:
			return Object.assign({}, state, {errorResponse: action.payload})
		default:
			return state
    }
}