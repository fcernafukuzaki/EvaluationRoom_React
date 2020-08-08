import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {encriptarAES, obtenerValorParametro} from '../../components/common-exam/Mensajes';

import { obtenerCliente } from '../../../actions/actionCliente';
import { obtenerCandidatos, guardarPuestoLaboralCandidato, eliminarPuestoLaboralCandidato, obtenerPuestoLaboralCandidato, generarInforme } from '../../../actions/actionCandidato';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import TablePaginado from '../../components/common/TablePaginado';
import BarraBusqueda from '../../components/common/BarraBusqueda';

class CandidatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroCandidatoNombre: '',
			filtroCandidatoApellidoPaterno: '',
			filtroCandidatoApellidoMaterno: '',
			candidatosFiltro:[],
			idCliente: obtenerValorParametro('id'),
			idPuestoLaboral: obtenerValorParametro('idp'),
			candidatosSeleccionados: [],
			candidatosNoSeleccionados: [],
			puestoLaboralCandidato: {},
			errors: {},
			isLoading: true,
			candidato:{},
			candidatos: {},
			errorMensaje: '',
			rutaRegistrarCandidato: '/registrarCandidato',
			rutaListaCandidatosResultados: '/listaCandidatos/resultados'
		}
		
		this.onChange = this.onChange.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onUnCheck = this.onUnCheck.bind(this);
		this.descargarInforme = this.descargarInforme.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerCandidatos();
		if(obtenerValorParametro('idp') != null){
			this.props.obtenerCliente(obtenerValorParametro('id'));
			this.props.obtenerPuestoLaboralCandidato(obtenerValorParametro('id'), obtenerValorParametro('idp'));
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.candidatos !== this.props.candidatos) {
			this.setState({
				isLoading: Object.entries(this.props.candidatos).length > 0 ? false : true,
				candidatosNoSeleccionados: this.props.candidatos
			});
			if(Object.entries(this.props.candidatoPuestoLaboral).length > 0){
				if(Object.entries(this.props.candidatos).length > 0){
					let candidatoSeleccionado = [];
					let candidatos = this.props.candidatos;
					for(let i = 0; i < candidatos.length; i += 1){
						this.props.candidatoPuestoLaboral.map( c => {
							if(candidatos[i].idCandidato == c.idCandidato){
								candidatoSeleccionado.push(candidatos[i]);
								//this.props.candidatos.splice(i,1);
								candidatos.splice(i,1);
							}
						});
					}
					this.setState({ candidatosSeleccionados: candidatoSeleccionado, candidatosNoSeleccionados: candidatos });
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
			let candidatoElegido = this.props.candidatos.filter( c => c.idCandidato.toString() == e.target.value)[0];
			candidatosElegidos.push(candidatoElegido);
			this.setState({ candidatosSeleccionados: candidatosElegidos });
			
			this.setState({
				puestoLaboralCandidato: {
					idCliente: this.state.idCliente,
					idPuestoLaboral: this.state.idPuestoLaboral,
					idCandidato: parseInt(e.target.value)
				}
			}, () => {
				this.props.guardarPuestoLaboralCandidato(this.state.puestoLaboralCandidato);
				this.limpiar();
			});
			
			var i = -1;
			let candidatosNoSeleccionados = this.state.candidatosNoSeleccionados;
			let candidato = this.props.candidatos.filter( c => c.idCandidato == parseInt(e.target.value));
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
				idCliente: this.state.idCliente,
				idPuestoLaboral: this.state.idPuestoLaboral,
				idCandidato: parseInt(e.target.value)
			}
		}, () => {
			this.props.eliminarPuestoLaboralCandidato(this.state.puestoLaboralCandidato);
		});
		
		var i = -1;
		let candidatosNoSeleccionados = this.state.candidatosNoSeleccionados;
		let candidatosSeleccionados = this.state.candidatosSeleccionados;
		let candidato = this.state.candidatosSeleccionados.filter( c => c.idCandidato == parseInt(e.target.value));
		if(candidato.length > 0){
			i = candidatosSeleccionados.indexOf(candidato[0]);
			candidatosSeleccionados.splice(i,1);
			candidatosNoSeleccionados.push(candidato[0]);
		}
		this.setState({ candidatosSeleccionados: candidatosSeleccionados, candidatosNoSeleccionados: candidatosNoSeleccionados});
	}
	
	descargarInforme(row) {
		console.log(row);
		this.setState({
			informe: {
				idCandidato: row.idCandidato
			}
		}, () => {
			this.props.generarInforme(this.state.informe);
		});
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
			candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(filtroCandidatoNombre) > -1 && c.apellidoPaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoPaterno) > -1 && c.apellidoMaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoMaterno) > -1)
		})
	}
	
	filtrarListaCandidatosApePat(e){
		let filtroCandidatoApePat = e.target.value.toLowerCase();
		this.setState({
			filtroCandidatoApellidoPaterno: filtroCandidatoApePat.toLowerCase(),
			candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(this.state.filtroCandidatoNombre) > -1 && c.apellidoPaterno.toLowerCase().indexOf(filtroCandidatoApePat) > -1 && c.apellidoMaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoMaterno) > -1)
		})
	}
	
	filtrarListaCandidatosApeMat(e){
		let filtroCandidatoApeMat = e.target.value.toLowerCase();
		this.setState({
			filtroCandidatoApellidoMaterno: filtroCandidatoApeMat.toLowerCase(),
			candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(this.state.filtroCandidatoNombre) > -1 && c.apellidoPaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoPaterno) > -1 && c.apellidoMaterno.toLowerCase().indexOf(filtroCandidatoApeMat) > -1 )
		})
	}
	
	generarTablaBodyCandidatoSeleccionados(row){
		if(this.state.candidatosSeleccionados != null && row != null){
			var mensajeSinRespuestasTestPsicologico = '';
			var verResultados = '';
			var evaluationRoom = '';
			var descargarInforme = '';
			var hashIdCandidato = encriptarAES(row.idCandidato.toString());
			var actualizarCandidato = (
				<Link to={{ pathname: this.state.rutaRegistrarCandidato, search: `?idc=${hashIdCandidato}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			if(row.cantidadTestPsicologicos > 0){
				if(row.tieneResultado > 0){
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
					<Link to={{ pathname: '/pages/examen.html', search: `?id=${hashIdCandidato}`, state: { } }}>
						<button type="button" className="btn btn-dark btn-sm" title="Sala de evaluación">
							<i className="fas fa-door-closed"></i> Evaluación
						</button>
					</Link>
				);
			} else {
				verResultados = 'Asignar test psicológico';
			}
			return (<tr key={row.idCandidato}>
						<td>
						<div className="form-check" key={row.idCandidato}>
							<input className="form-check-input"
								type="checkbox" id={row.idCandidato}
								
								onChange={this.onUnCheck}
								name="candidatosSeleccionados"
								value={row.idCandidato}
							/>
						</div>
						</td>
						<td>{row.nombre}</td>
						<td>{row.apellidoPaterno}</td>
						<td>{row.apellidoMaterno}</td>
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
			var hashIdCandidato = encriptarAES(row.idCandidato.toString());
			var actualizarCandidato = (
				<Link to={{ pathname: '/er/registrarCandidato', search: `?idc=${hashIdCandidato}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			if(row.cantidadTestPsicologicos > 0){
				if(row.tieneResultado > 0){
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
			return (<tr key={row.idCandidato}>
						<td>
						{this.state.candidatosSeleccionados.length < 100 ? // terna
							<div className="form-check" key={row.idCandidato}>
								<input className="form-check-input"
									type="checkbox" id={row.idCandidato}
									onChange={this.onCheck}
									name="candidatosSeleccionados"
									value={row.idCandidato}
								/>
							</div>
						:
							<div className="form-check" key={row.idCandidato}>
								<input className="form-check-input"
									type="checkbox" disabled
								/>
							</div>
						}
						</td>
						<td>{row.nombre}</td>
						<td>{row.apellidoPaterno}</td>
						<td>{row.apellidoMaterno}</td>
						<td>{mensajeSinRespuestasTestPsicologico}</td>
						<td>{actualizarCandidato}
							{verResultados}
						</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	render() {
		const { candidatosFiltro, filtroCandidatoNombre, filtroCandidatoApellidoPaterno, filtroCandidatoApellidoMaterno,
			idPuestoLaboral, candidatosSeleccionados, candidatosNoSeleccionados, errors, isLoading, errorMensaje } = this.state;
		console.log("CandidatosResultadoForm:props:" , this.props);
		console.log("CandidatosResultadoForm:state:" , this.state);
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
						Asignar puesto laboral: <strong>{this.props.cliente.nombre} - {this.props.cliente.puestosLaborales.filter( p => p.idPuestoLaboral == idPuestoLaboral)[0].nombre}</strong>
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
		candidatos : state.reducerCandidato.obtenerCandidatosResponse,
		cliente : state.reducerCliente.obtenerClienteResponse,
		candidatoPuestoLaboral : state.reducerCandidato.obtenerCandidatoPuestoLaboralResponse,
		candidatoPuestoLaboralResponse : state.reducerCandidato.guardarCandidatoPuestoLaboralResponse,
		candidatoPuestoLaboralEliminarResponse : state.reducerCandidato.eliminarCandidatoPuestoLaboralResponse,
		informePsicologicoResponse : state.reducerCandidato.generarInformeResponse
	}
}

export default connect(mapStateToProps, { obtenerCandidatos, obtenerCliente, guardarPuestoLaboralCandidato, eliminarPuestoLaboralCandidato, obtenerPuestoLaboralCandidato, generarInforme })(CandidatosForm);