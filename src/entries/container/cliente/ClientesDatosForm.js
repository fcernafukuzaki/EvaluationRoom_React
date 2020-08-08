import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import Formulario from '../../components/common/Formulario';
import TablePaginado from '../../components/common/TablePaginado';
import BarraBusqueda from '../../components/common/BarraBusqueda';
import {obtenerValorParametro} from '../../components/common-exam/Mensajes';

import {encriptarAES} from '../../components/common-exam/Mensajes';

import { obtenerClientes, obtenerPuestosLaboralesPorCliente
} from '../../../actions/actionCliente';

class ClientesDatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroClientesNombre: '',
			filtroPuestosLaboralesNombre: '',
			clientesFiltro:[],
			puestosLaboralesFiltro:[],
			idCliente: 0,
			nombre: '',
			errors: {},
			isLoading: true,
			errorMensaje: '',
			clientes:{},
			puestosLaboralesResponse:{},
			rutaRegistrarCliente: '/registrarCliente',
			rutaRegistrarPuestoLaboral: '/registrarPuestoLaboral',
			rutaAsignarCandidatos: '/asignarCandidatos'
		}
		
		this.onChange = this.onChange.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerClientes();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.clientes !== this.props.clientes) {
			this.setState({
				isLoading: Object.entries(this.props.clientes).length > 0 ? false : true
			});
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			this.setState({
				isLoading: false,
				errorMensaje: this.props.errorResponse
			})
		}
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	filtrarListaClientes(e){
		let filtroClientesNombre = e.target.value.toLowerCase();
		this.setState({
			filtroClientesNombre: filtroClientesNombre.toLowerCase(),
			clientesFiltro: this.props.clientes.filter( c => c.nombre.toLowerCase().indexOf(filtroClientesNombre) > -1 ),
			filtroPuestosLaboralesNombre: '',
			puestosLaboralesFiltro: [],
			idCliente: 0
		})
	}
	
	filtrarListaPuestosLaborales(e){
		let filtroPuestosLaboralesNombre = e.target.value.toLowerCase();
		this.setState({
			filtroPuestosLaboralesNombre: filtroPuestosLaboralesNombre.toLowerCase(),
			puestosLaboralesFiltro: this.props.puestosLaboralesResponse.filter( p => p.nombre.toLowerCase().indexOf(filtroPuestosLaboralesNombre) > -1 )
		})
	}
	
	obtenerTablaTitulo(titulo){
		return ("Lista de puestos laborales del cliente: ").concat(titulo);
	}
	
	verPuestosLaborales(cliente){
		this.setState({
			idCliente : cliente.idCliente, 
			nombre : cliente.nombre,
			puestosLaboralesFiltro: this.props.puestosLaboralesResponse
		});
		this.props.obtenerPuestosLaboralesPorCliente(cliente.idCliente);
	}
	
	generarTablaBodyClientes(row){
		if(row != null){
			var asignarPuestosLaborales = '';
			var hashIdCliente = encriptarAES(row.idCliente.toString());
			var actualizarCliente = (
				<Link to={{ pathname: this.state.rutaRegistrarCliente, search: `?id=${hashIdCliente}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			if(row.puestosLaborales.length > 0){
				asignarPuestosLaborales = (
					<Link to={{ pathname: this.state.rutaRegistrarPuestoLaboral, search: `?id=${hashIdCliente}`, state: { idCliente: row.idCliente } }}>
						<button type="button" className="btn btn-dark btn-sm" title="Asignar más puestos laborales">
							<i className="far fa-folder-open"></i> Asignar más puestos laborales
						</button>
					</Link>
				);
			} else {
				asignarPuestosLaborales = (
					<Link to={{ pathname: this.state.rutaRegistrarPuestoLaboral, search: `?id=${hashIdCliente}`, state: { idCliente: row.idCliente } }}>
						<button type="button" className="btn btn-dark btn-sm" title="Asignar puestos laborales">
							<i className="far fa-folder-open"></i> Asignar puestos laborales
						</button>
					</Link>
				);
			}
			return (<tr key={row.idCliente} onClick={() => this.verPuestosLaborales(row)} >
						<td>{row.idCliente}</td>
						<td>{row.nombre}</td>
						<td>{actualizarCliente}
							{asignarPuestosLaborales}
						</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	generarTablaBodyPuestosLaborales(row, index){
		if(row != null){
			var hashIdCliente = encriptarAES(row.idCliente.toString());
			var hashIdPuestoLaboral = encriptarAES(row.idPuestoLaboral.toString());
			var actualizarPuestoLaboral = (
				<Link to={{ pathname: this.state.rutaRegistrarPuestoLaboral, search: `?id=${hashIdCliente}&idp=${hashIdPuestoLaboral}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			var asignarCandidatos = (
				<Link to={{ pathname: this.state.rutaAsignarCandidatos, search: `?id=${hashIdCliente}&idp=${hashIdPuestoLaboral}`, state: { } }}>
					<button type="button" className="btn btn-dark btn-sm" title="Asignar candidatos">
						<i className="far fa-folder-open"></i> Asignar candidatos
					</button>
				</Link>
			);
			var indice = index + 1;
			return (<tr key={row.idPuestoLaboral}>
						<td>{indice}</td>
						<td>{row.nombre}</td>
						<td>{actualizarPuestoLaboral}
							{asignarCandidatos}
						</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	render() {
		const { idCliente, nombre, clientesFiltro, filtroClientesNombre, puestosLaboralesFiltro, filtroPuestosLaboralesNombre, rutaRegistrarCliente, errors, isLoading, errorMensaje } = this.state;
		//console.log('ClientesDatosForm:state', this.state);
		//console.log('ClientesDatosForm:props', this.props);
		var tableHeadCliente = [{
				key: 'idCliente',
				nombre: 'N°'
			},{
				key: 'nombre',
				nombre: 'Nombre'
			},{
				key: 'accion',
				nombre: 'Acciones'
		}]
		
		var tableHeadPuestoLaboral = [{
				key: 'idPuestoLaboral',
				nombre: 'N°'
			},{
				key: 'nombre',
				nombre: 'Nombre'
			},{
				key: 'accion',
				nombre: 'Acciones'
		}]
		
		var camposBusqueda = [{
				key: 'idFiltroClientesNombre',
				label: "Filtrar por nombre de cliente",
				onChange: this.filtrarListaClientes.bind(this),
				valor: filtroClientesNombre
		}];
		
		var camposBusquedaPuestoLaboral = [{
				key: 'idFiltroPuestosLaboralesNombre',
				label: "Filtrar por nombre del puesto laboral",
				onChange: this.filtrarListaPuestosLaborales.bind(this),
				valor: filtroPuestosLaboralesNombre
		}];
		
		return (
			<div className="mt-3 mx-auto ancho1200">
				{isLoading && <CargandoImagen />}
				{!isLoading && 
				<Fragment>
					<div className="mb-3">
						<Link to={{ pathname: rutaRegistrarCliente, state: { } }}>
							<button type="button" className="btn btn-primary" >
								Nuevo cliente
							</button>
						</Link>
					</div>
					<TablePaginado tituloTabla={"Lista de clientes"}
						mensajeSinRegistros={"No se encontró clientes."}
						tableHead={tableHeadCliente}
						tablaEstilo={"width200"}
						tableBody={this.generarTablaBodyClientes.bind(this)}
						registrosPorPagina={10} 
						registros={filtroClientesNombre.length > 0 ? (clientesFiltro.length > 0 ? clientesFiltro : []) : this.props.clientes} 
						camposBusqueda={camposBusqueda} />
					{idCliente > 0 &&
					<Fragment>
						<TablePaginado tituloTabla={this.obtenerTablaTitulo(nombre)}
							mensajeSinRegistros={"No se encontró puestos laborales del cliente " + nombre} 
							tableHead={tableHeadPuestoLaboral}
							tablaEstilo={"width200"}
							tableBody={this.generarTablaBodyPuestosLaborales.bind(this)}
							nombreTitulo={nombre}
							registrosPorPagina={10}
							registros={filtroPuestosLaboralesNombre.length > 0 ? puestosLaboralesFiltro : idCliente > 0 ? this.props.puestosLaboralesResponse : filtroClientesNombre.length > 0 ? [] : []} 
							camposBusqueda={camposBusquedaPuestoLaboral} />
					</Fragment>
					}
				</Fragment>
				}
				{errorMensaje != '' && <MensajeError error={errorMensaje} />}
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		clientes : state.reducerCliente.obtenerClientesResponse,
		puestosLaboralesResponse : state.reducerCliente.obtenerClientePuestosLaboralesResponse
	}
}

export default connect(mapStateToProps, { obtenerClientes, obtenerPuestosLaboralesPorCliente })(ClientesDatosForm);