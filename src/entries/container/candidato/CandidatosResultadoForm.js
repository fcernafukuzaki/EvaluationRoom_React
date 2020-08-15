import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {encriptarAES} from '../../common/components/encriptar_aes';

import { obtenerCandidatos, generarInforme } from '../../../actions/actionCandidato';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import TablePaginado from '../../components/common/TablePaginado';
import BarraBusqueda from '../../components/common/BarraBusqueda';

class CandidatosResultadoForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroCandidatoNombre: '',
			filtroCandidatoApellidoPaterno: '',
			filtroCandidatoApellidoMaterno: '',
			candidatosFiltro:[],
			errors: {},
			isLoading: true,
			candidato:{},
			resultadoCandidato:{},
			resultadoCandidatoPrueba:{},
			candidatos: {},
			informe: {},
			errorMensaje: '',
			rutaRegistrarCandidato: '/registrarCandidato',
			rutaListaCandidatosResultados: '/listaCandidatos/resultados',
			rutaListarClientes: '/listarClientes'
		}
		
		this.onChange = this.onChange.bind(this);
		this.descargarInforme = this.descargarInforme.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerCandidatos();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.candidatos !== this.props.candidatos) {
			this.setState({
				isLoading: Object.entries(this.props.candidatos).length > 0 ? false : true
			});
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
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
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
	
	generarTablaBodyCandidato(row){
		//console.log('generarTablaBodyCandidato',this.props.candidatos);
		//console.log('generarTablaBodyCandidato',row);
		if(this.props.candidatos != null && row != null){
			var asignarPuestoLaboral = '';
			var mensajeSinRespuestasTestPsicologico = '';
			var descargarInforme = '';
			var verResultados = '';
			var evaluationRoom = '';
			var hashIdCandidato = encriptarAES(row.idCandidato.toString());
			var actualizarCandidato = (
				<Link to={{ pathname: this.state.rutaRegistrarCandidato, search: `?idc=${hashIdCandidato}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			if(row.cantidadPuestoLaborales == 0){
				asignarPuestoLaboral = (
					<Link to={{ pathname: this.state.rutaListarClientes, search: `?id=${hashIdCandidato}`, state: { } }}>
						<button type="button" className="btn btn-outline-danger btn-sm" title="Aún no se ha asignado puesto laboral">
							<i className="fas fa-exclamation-circle"></i> Asignar puesto laboral
						</button>
					</Link>
				);
			}
			if(row.cantidadTestPsicologicos > 0){
				if(row.tieneResultado > 0){
					verResultados = (
						<Link to={{ pathname: this.state.rutaListaCandidatosResultados, search: `?id=${hashIdCandidato}`, state: { } }}>
							<button type="button" className="btn btn-info btn-sm" title="Ver resultados">
								<i className="fas fa-chart-pie"></i> Resultados
							</button>
						</Link>
					);
					if(row.cantidadPuestoLaborales > 0){
						descargarInforme = (<button type="button" className="btn btn-outline-success btn-sm" onClick={this.descargarInforme.bind(this,row)} title="Descargar informe"><i className="fas fa-file-word"></i> Descargar informe</button>)
					}
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
						<td>{row.idCandidato}</td>
						<td>{row.nombre}</td>
						<td>{row.apellidoPaterno}</td>
						<td>{row.apellidoMaterno}</td>
						<td>{asignarPuestoLaboral}
							{mensajeSinRespuestasTestPsicologico}
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
	
	render() {
		const { candidatosFiltro, filtroCandidatoNombre, filtroCandidatoApellidoPaterno, filtroCandidatoApellidoMaterno, errors, isLoading, errorMensaje } = this.state;
		//console.log("CandidatosResultadoForm:props:" , this.props);
		//console.log("CandidatosResultadoForm:state:" , this.state);
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
				{!isLoading && errorMensaje == '' &&
				<Fragment>
					<TablePaginado tituloTabla={"Lista de candidatos"}
						mensajeSinRegistros={"Aún no se han registrado candidatos."}
						tableHead={tableHead}
						tablaEstilo={"width200"} 
						tableBody={this.generarTablaBodyCandidato.bind(this)}
						registrosPorPagina={20} 
						registros={filtroCandidatoNombre.length > 0 || filtroCandidatoApellidoPaterno.length > 0 || filtroCandidatoApellidoMaterno.length > 0 ? (candidatosFiltro.length > 0 ? candidatosFiltro : []) : this.props.candidatos} 
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
		informePsicologicoResponse : state.reducerCandidato.generarInformeResponse
	}
}

export default connect(mapStateToProps, { obtenerCandidatos, generarInforme })(CandidatosResultadoForm);