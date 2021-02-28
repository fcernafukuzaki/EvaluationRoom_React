import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import {encriptarAES, obtenerValorParametro} from '../../../common/components/encriptar_aes';
import {getNewDateTimeFormat, getDateFormat} from '../../../common/components/date_util'
import {getSelectionProcess} from '../../../../actions/actionSelectionProcess';
import {obtenerCliente, addCandidateToJobPosition, deleteCandidateToJobPosition} from '../../../../actions/actionCliente';
import {getCandidates, obtenerPuestoLaboralCandidato, generarInforme } from '../../../../actions/actionCandidato';
import MensajeError from '../../../components/common/MensajeError';
import CargandoImagen from '../../../components/common/CargandoImagen';
import TablePaginado from '../../../components/common/TablePaginado';

class CandidatesListJobPosition extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			errorMensaje: '',
			errors: {},
			idclient: obtenerValorParametro('id').split('_')[0],
			idjobposition: obtenerValorParametro('id').split('_')[1],
			nameForm: '',
			dateProcessBegin: getDateFormat(),
            dateProcessEnd: getDateFormat(),
            processActive: 'True',
			candidatosSeleccionados: [],
			candidatosNoSeleccionados: [],
			puestoLaboralCandidato: {},
			
            selectionProcess: {},
			candidato:{},
			candidatos: {},
			
			filtroCandidatoNombre: '',
			filtroCandidatoApellidoPaterno: '',
			filtroCandidatoApellidoMaterno: '',
			candidatosFiltro:[],
			
			rutaRegistrarCandidato: '/registrarCandidato',
			rutaListaCandidatosResultados: '/listaCandidatos/resultados'
		}
		
		this.onChange = this.onChange.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onUnCheck = this.onUnCheck.bind(this);
		this.descargarInforme = this.descargarInforme.bind(this);
	}
	
	componentWillMount() {
		this.props.getCandidates()
		if(obtenerValorParametro('id') != null){
			var ids = obtenerValorParametro('id');
			var id = ids.split('_');//idclient, idjobposition
			this.props.obtenerCliente(id[0]);
			this.props.getSelectionProcess(id[0], id[1], null, this.props.usuario.token);
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.selectionProcess !== this.props.selectionProcess) {
			this.setState({
                nameForm: this.props.selectionProcess.client.nombre + ' - ' + this.props.selectionProcess.jobposition.nombre,
				processActive: this.props.selectionProcess.process_active ? 'True' : 'False',
				selectionProcess: this.props.selectionProcess,
				isLoading: false
            });
            
        }
		if (prevProps.candidatos !== this.props.candidatos) {
			this.setState({
				//isLoading: Object.entries(this.props.candidatos).length > 0 ? false : true,
				candidatosNoSeleccionados: this.props.candidatos
			});
		}
		if (prevState.selectionProcess !== this.state.selectionProcess){
            if(typeof this.state.selectionProcess.selectionprocess_candidates !== 'undefined'){
                if(Object.entries(this.state.selectionProcess.selectionprocess_candidates).length > 0){
                    if(Object.entries(this.props.candidatos).length > 0){
                        let candidatoSeleccionado = [];
                        let candidatos = this.props.candidatos;
                        this.state.selectionProcess.selectionprocess_candidates.map( candidate_sp => {
                            var lista_candidatos_encontrados = candidatos.filter( (c, index) => 
                                c.idcandidato == candidate_sp.idcandidate
                            );
                            if (lista_candidatos_encontrados.length > 0){
                                candidatoSeleccionado.push(lista_candidatos_encontrados[0]);
                                var i = candidatos.indexOf(lista_candidatos_encontrados[0]);
                                candidatos.splice(i,1);
                            }
                        });
                        this.setState({ candidatosSeleccionados: candidatoSeleccionado, candidatosNoSeleccionados: candidatos });
                    }
                }
            }
        }
		if (prevProps.errorResponse !== this.props.errorResponse) {
			if(409 == this.props.errorResponse.status){
				let error = {};
				if(this.props.errorResponse.mensaje.indexOf('Correo') > -1){
					error = {correoElectronico: this.props.errorResponse.mensaje}
				} else if(this.props.errorResponse.mensaje.indexOf('Número de documento') > -1){
					error = {numeroDocumentoIdentidad: this.props.errorResponse.mensaje}
				}
				this.setState({
					errors : error,
					isLoading: false
				})
			} else {
				this.setState({
					isLoading: false,
					errorMensaje: this.props.errorResponse
				})
			}
		}
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	onCheck(e) {
		if(this.state.candidatosSeleccionados.length < 100){//Terna de candidatos
			var candidatosElegidos = this.state.candidatosSeleccionados;
			let candidatoElegido = this.props.candidatos.filter( c => c.idcandidato.toString() == e.target.value)[0];
			candidatosElegidos.push(candidatoElegido);
			this.setState({ candidatosSeleccionados: candidatosElegidos });
			
			this.setState({
				puestoLaboralCandidato: {
					idclient: this.state.idclient,
					idjobposition: this.state.idjobposition,
					idcandidate: parseInt(e.target.value),
                    //date_registered: '2020-10-02 22:56:00',
                    date_registered: getNewDateTimeFormat(),
					user_register: '',
					user_registered_byself: 'True'
				}
			}, () => {
                this.props.addCandidateToJobPosition(this.state.puestoLaboralCandidato);
				this.limpiar();
			});
			
			var i = -1;
			let candidatosNoSeleccionados = this.state.candidatosNoSeleccionados;
			let candidato = this.props.candidatos.filter( c => c.idcandidato == parseInt(e.target.value));
			if(candidato.length > 0){
				i = candidatosNoSeleccionados.indexOf(candidato[0]);
				candidatosNoSeleccionados.splice(i,1);
			}
			this.setState({ candidatosNoSeleccionados: candidatosNoSeleccionados});
		} else {
			alert('Sólo se puede seleccionar hasta 3 candidatos.');
		}
	}
	
	onUnCheck(e) {
		this.setState({
			puestoLaboralCandidato: {
				idclient: this.state.idclient,
				idjobposition: this.state.idjobposition,
				idcandidate: parseInt(e.target.value)
			}
		}, () => {
			this.props.deleteCandidateToJobPosition(this.state.puestoLaboralCandidato);
		});
		
		var i = -1;
		let candidatosNoSeleccionados = this.state.candidatosNoSeleccionados;
		let candidatosSeleccionados = this.state.candidatosSeleccionados;
		let candidato = this.state.candidatosSeleccionados.filter( c => c.idcandidato == parseInt(e.target.value));
		if(candidato.length > 0){
			i = candidatosSeleccionados.indexOf(candidato[0]);
			candidatosSeleccionados.splice(i,1);
			candidatosNoSeleccionados.push(candidato[0]);
		}
		this.setState({ candidatosSeleccionados: candidatosSeleccionados, candidatosNoSeleccionados: candidatosNoSeleccionados});
	}
	
	limpiar(){
		this.setState({
			idCandidato: '',
			correoElectronico: '',
			idDocumentoIdentidad: '',
			numeroDocumentoIdentidad: '',
			candidato: {}
		})
	}
	
	filtrarListaCandidatosNombre(e){
        let filtroCandidatoNombre = e.target.value.toLowerCase();
        this.setState({
            filtroCandidatoNombre: filtroCandidatoNombre.toLowerCase(),
            candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(filtroCandidatoNombre) > -1 && c.apellidopaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoPaterno) > -1 && c.apellidomaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoMaterno) > -1)
        })
    }
    
    filtrarListaCandidatosApePat(e){
        let filtroCandidatoApePat = e.target.value.toLowerCase();
        this.setState({
            filtroCandidatoApellidoPaterno: filtroCandidatoApePat.toLowerCase(),
            candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(this.state.filtroCandidatoNombre) > -1 && c.apellidopaterno.toLowerCase().indexOf(filtroCandidatoApePat) > -1 && c.apellidomaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoMaterno) > -1)
        })
    }
    
    filtrarListaCandidatosApeMat(e){
        let filtroCandidatoApeMat = e.target.value.toLowerCase();
        this.setState({
            filtroCandidatoApellidoMaterno: filtroCandidatoApeMat.toLowerCase(),
            candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(this.state.filtroCandidatoNombre) > -1 && c.apellidopaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoPaterno) > -1 && c.apellidomaterno.toLowerCase().indexOf(filtroCandidatoApeMat) > -1 )
        })
    }
	
	generarTablaBodyCandidatoSeleccionados(row){
		if(this.state.candidatosSeleccionados != null && row != null){
			var mensajeSinRespuestasTestPsicologico = '';
			var verResultados = '';
			var evaluationRoom = '';
			var descargarInforme = '';
			var hashIdCandidato = encriptarAES(row.idcandidato.toString());
			var hashCorreoElectronico = encriptarAES(row.correoelectronico.toString());
			var actualizarCandidato = (
				<Link to={{ pathname: this.state.rutaRegistrarCandidato, search: `?idc=${hashIdCandidato}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			if(row.cant_examenes_asignados > 0){
				if(row.tiene_resultado > 0){
					verResultados = (
						<Link to={{ pathname: this.state.rutaListaCandidatosResultados, search: `?id=${hashIdCandidato}`, state: { } }}>
							<button type="button" className="btn btn-info btn-sm" title="Ver resultados">
								<i className="fas fa-chart-pie"></i> Resultados
							</button>
						</Link>
					);
					
					descargarInforme = (<button type="button" className="btn btn-outline-success btn-sm" onClick={this.descargarInforme.bind(this,row)} title="Descargar informe"><i className="fas fa-file-word"></i> Descargar informe</button>)
				} else {
					verResultados = (
						<Link to={{ pathname: this.state.rutaListaCandidatosResultados, search: `?id=${hashIdCandidato}`, state: { } }}>
							<button type="button" className="btn btn-info btn-sm" title="Ver datos">
								<i className="fas fa-chart-pie"></i> Ver datos
							</button>
						</Link>
					);
					mensajeSinRespuestasTestPsicologico = (
						<button type="button" className="btn btn-outline-warning btn-sm" title="Aún no ha realizado los test psicologicos">
							<i className="fas fa-exclamation-circle"></i> Respuestas pendientes
						</button>
					);
				}
				evaluationRoom = (
					<Link to={{ pathname: '/pages/examen.html', search: `?id=${hashCorreoElectronico}`, state: { } }}>
						<button type="button" className="btn btn-dark btn-sm" title="Sala de evaluación">
							<i className="fas fa-door-closed"></i> Evaluación
						</button>
					</Link>
				);
			} else {
				verResultados = 'Asignar test psicológico';
			}
			return (<tr key={row.idcandidato}>
						<td>
						<div className="form-check" key={row.idcandidato}>
							<input className="form-check-input"
								type="checkbox" id={row.idcandidato}
								
								onChange={this.onUnCheck}
								name="candidatosSeleccionados"
								value={row.idcandidato}
							/>
						</div>
						</td>
						<td>{row.nombre}</td>
                        <td>{row.apellidopaterno}</td>
                        <td>{row.apellidomaterno}</td>
                        <td>{mensajeSinRespuestasTestPsicologico}
                            {descargarInforme}
                        </td>
                        <td>{actualizarCandidato}
                            {verResultados}
                            {evaluationRoom}
                        </td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	generarTablaBodyCandidato(row){
		if(this.props.candidatos != null && row != null){
			var mensajeSinRespuestasTestPsicologico = '';
			var verResultados = '';
			var hashIdCandidato = encriptarAES(row.idcandidato.toString());
			var actualizarCandidato = (
				<Link to={{ pathname: '/er/registrarCandidato', search: `?idc=${hashIdCandidato}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			if(row.cant_examenes_asignados > 0){
				if(row.tiene_resultado > 0){
					verResultados = (
						<Link to={{ pathname: this.state.rutaListaCandidatosResultados, search: `?id=${hashIdCandidato}`, state: { } }}>
							<button type="button" className="btn btn-info btn-sm" title="Ver resultados">
								<i className="fas fa-chart-pie"></i> Resultados
							</button>
						</Link>
					);
					
				} else {
					verResultados = (
						<Link to={{ pathname: this.state.rutaListaCandidatosResultados, search: `?id=${hashIdCandidato}`, state: { } }}>
							<button type="button" className="btn btn-info btn-sm" title="Ver datos">
								<i className="fas fa-chart-pie"></i> Ver datos
							</button>
						</Link>
					);
					mensajeSinRespuestasTestPsicologico = (
						<button type="button" className="btn btn-outline-warning btn-sm" title="Aún no ha realizado los test psicologicos">
							<i className="fas fa-exclamation-circle"></i> Respuestas pendientes
						</button>
					);
				}
			} else {
				verResultados = 'Asignar test psicológico';
			}
			return (<tr key={row.idcandidato}>
						<td>
						{this.state.candidatosSeleccionados.length < 100 ? // terna
							<div className="form-check" key={row.idcandidato}>
								<input className="form-check-input"
									type="checkbox" id={row.idcandidato}
									onChange={this.onCheck}
									name="candidatosSeleccionados"
									value={row.idcandidato}
								/>
							</div>
						:
							<div className="form-check" key={row.idcandidato}>
								<input className="form-check-input"
									type="checkbox" disabled
								/>
							</div>
						}
						</td>
						<td>{row.nombre}</td>
                        <td>{row.apellidopaterno}</td>
                        <td>{row.apellidomaterno}</td>
                        <td>{mensajeSinRespuestasTestPsicologico}</td>
                        <td>{actualizarCandidato}
                            {verResultados}
                        </td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	descargarInforme(row) {
		console.log(row);
		this.setState({
			informe: {
				idCandidato: row.idcandidato,
                nombreCompleto: row.nombre_completo
			}
		}, () => {
			this.props.generarInforme(this.state.informe);
		});
	}

	render() {
		const { candidatosFiltro, filtroCandidatoNombre, filtroCandidatoApellidoPaterno, filtroCandidatoApellidoMaterno,
			nameForm, candidatosSeleccionados, candidatosNoSeleccionados, errors, isLoading, errorMensaje } = this.state;
		
			var tableHead = [{
				key: 'idCandidato',
				nombre: 'N°'
			},{
				key: 'nombre',
				nombre: 'Nombre'
			},{
				key: 'apellidoPaterno',
				nombre: 'Apellido Paterno'
			},{
				key: 'apellidoMaterno',
				nombre: 'Apellido Materno'
			},{
				key: 'testTomado',
				nombre: '¿Test tomado?'
			},{
				key: 'accion',
				nombre: 'Acción'
		}]
		
		var camposBusqueda = [{
				key: 'idFiltroCandidatoNombre',
				label: "Filtrar por nombre del candidato",
				onChange: this.filtrarListaCandidatosNombre.bind(this),
				valor: filtroCandidatoNombre
			} , {
				key: 'idFiltroCandidatoApellidoPaterno',
				label: "Filtrar por apellido paterno del candidato",
				onChange: this.filtrarListaCandidatosApePat.bind(this),
				valor: filtroCandidatoApellidoPaterno
			} , {
				key: 'idFiltroCandidatoApellidoMaterno',
				label: "Filtrar por apellido materno del candidato",
				onChange: this.filtrarListaCandidatosApeMat.bind(this),
				valor: filtroCandidatoApellidoMaterno
		}];
		//console.log(this.props.candidatos);
		return (
			<div className="mt-3 mx-auto ancho1200">
				{isLoading && <CargandoImagen />}
				{!isLoading && 
				<Fragment>
					<div className="mb-3">
						<h4>
						Asignar puesto laboral: <strong>{nameForm}</strong>
						</h4>
					</div>
					<TablePaginado tituloTabla={"Lista de candidatos seleccionados"}
						mensajeSinRegistros={"Aún no se han seleccionado candidatos para este puesto laboral."}
						tableHead={tableHead}
						tablaEstilo={"width200"} 
						tableBody={this.generarTablaBodyCandidatoSeleccionados.bind(this)}
						registrosPorPagina={10} 
						registros={candidatosSeleccionados} 
						camposBusqueda={[]} />
					
					<TablePaginado tituloTabla={"Lista de candidatos"}
						mensajeSinRegistros={"Aún no se han registrado candidatos."}
						tableHead={tableHead}
						tablaEstilo={"width200"} 
						tableBody={this.generarTablaBodyCandidato.bind(this)}
						registrosPorPagina={15} 
						registros={filtroCandidatoNombre.length > 0 || filtroCandidatoApellidoPaterno.length > 0 || filtroCandidatoApellidoMaterno.length > 0 ? (candidatosFiltro.length > 0 ? candidatosFiltro : []) : candidatosNoSeleccionados/*this.props.candidatos*/} 
						camposBusqueda={camposBusqueda} />
				</Fragment>
				}
				{errorMensaje != '' && <MensajeError error={errorMensaje} />}
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		selectionProcess : state.reducerSelectionProcess.getSelectionProcessResponse,
        candidatos : state.reducerCandidato.getCandidatesResponse,
		cliente : state.reducerCliente.obtenerClienteResponse,
		candidatoPuestoLaboral : state.reducerCandidato.obtenerCandidatoPuestoLaboralResponse,
		//candidatoPuestoLaboralResponse : state.reducerCandidato.guardarCandidatoPuestoLaboralResponse,
		//candidatoPuestoLaboralEliminarResponse : state.reducerCandidato.eliminarCandidatoPuestoLaboralResponse,
		informePsicologicoResponse : state.reducerCandidato.generarInformeResponse,
		addCandidateToJobPosition: state.reducerCliente.addCandidateToJobPositionResponse,
        deleteCandidateToJobPosition: state.reducerCliente.deleteCandidateToJobPositionResponse,
	}
}

export default connect(mapStateToProps, {getSelectionProcess, getCandidates, obtenerCliente, obtenerPuestoLaboralCandidato, addCandidateToJobPosition, deleteCandidateToJobPosition, generarInforme })(CandidatesListJobPosition);