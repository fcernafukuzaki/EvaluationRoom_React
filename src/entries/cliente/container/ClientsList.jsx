import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import TablePaginado from '../../components/common/TablePaginado';

import {ClientButtonAdd, ClientButtonUpdate, ClientButtonAssignJobPosition, ClientButtonAssignMoreJobPosition}  from '../components/client_button'
import {JobPositionButtonUpdate, JobPositionButtonAssignCandidates} from '../components/jobposition_button'
import {encriptarAES} from '../../components/common-exam/Mensajes';

import {obtenerClientes, getJobPosition} from '../../../actions/actionCliente';

class ClientsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroClientesNombre: '',
			filtroPuestosLaboralesNombre: '',
			clientesFiltro:[],
			puestosLaboralesFiltro:[],
			idclient: 0,
			nameClient: '',
			errors: {},
			isLoading: true,
			errorMensaje: '',
			clientes:{},
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
        if(prevProps.getJobPositionResponse !== this.props.getJobPosition){
            console.log(this.props.getJobPositionResponse)
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
			idclient: 0
		})
	}
	
	filtrarListaPuestosLaborales(e){
		let filtroPuestosLaboralesNombre = e.target.value.toLowerCase();
		this.setState({
			filtroPuestosLaboralesNombre: filtroPuestosLaboralesNombre.toLowerCase(),
			puestosLaboralesFiltro: this.props.getJobPositionResponse.filter( p => p.nombre.toLowerCase().indexOf(filtroPuestosLaboralesNombre) > -1 )
		})
	}
	
	obtenerTablaTitulo(titulo){
		return ("Lista de puestos laborales del cliente: ").concat(titulo);
	}
	
	verPuestosLaborales(cliente){
		this.setState({
			idclient : cliente.idcliente, 
			nameClient : cliente.nombre,
			puestosLaboralesFiltro: this.props.getJobPositionResponse
		});
        this.props.getJobPosition(cliente.idcliente)
	}
	
	generarTablaBodyClientes(row){
		if(row != null){
			var asignarPuestosLaborales = '';
			var hashIdCliente = encriptarAES(row.idcliente.toString());
			var actualizarCliente = (
				<ClientButtonUpdate 
					pathname={this.state.rutaRegistrarCliente}
					hashId={`?idc=${hashIdCliente}`}
				/>
			);
			if(row.cant_puestos_laborales > 0){
				//
				asignarPuestosLaborales = (
					<ClientButtonAssignMoreJobPosition 
						pathname={this.state.rutaRegistrarPuestoLaboral}
						hashId={`?id=${hashIdCliente}`}
						state={{idclient: row.idcliente}}
					/>
				);
			} else {
				asignarPuestosLaborales = (
					<ClientButtonAssignJobPosition 
						pathname={this.state.rutaRegistrarPuestoLaboral}
						hashId={`?id=${hashIdCliente}`}
						state={{idclient: row.idcliente}}
					/>
				);
			}
			return (<tr key={row.idcliente} onClick={() => this.verPuestosLaborales(row)} >
						<td>{row.idcliente}</td>
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
		console.log(row)
		if(row != null){
			var hashIdCliente = encriptarAES(row.idcliente.toString());
			var hashIdPuestoLaboral = encriptarAES(row.idpuestolaboral.toString());
			var actualizarPuestoLaboral = (
				<JobPositionButtonUpdate
					pathname={this.state.rutaRegistrarPuestoLaboral}
					hashId={`?id=${hashIdCliente}&idp=${hashIdPuestoLaboral}`}
				/>
			);
			var asignarCandidatos = (
				<JobPositionButtonAssignCandidates
					pathname={this.state.rutaAsignarCandidatos}
					hashId={`?id=${hashIdCliente}&idp=${hashIdPuestoLaboral}`}
				/>
			);
			var indice = index + 1;
			return (<tr key={row.idpuestolaboral}>
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
		const { idclient, nameClient, clientesFiltro, filtroClientesNombre, puestosLaboralesFiltro, filtroPuestosLaboralesNombre, rutaRegistrarCliente, errors, isLoading, errorMensaje } = this.state;
		var tableHeadCliente = [{
				key: 'idclient',
				nombre: 'N°'
			},{
				key: 'nameClient',
				nombre: 'nameClient'
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
						<ClientButtonAdd 
							pathname={rutaRegistrarCliente}
						/>
					</div>
					<TablePaginado tituloTabla={"Lista de clientes"}
						mensajeSinRegistros={"No se encontró clientes."}
						tableHead={tableHeadCliente}
						tablaEstilo={"width200"}
						tableBody={this.generarTablaBodyClientes.bind(this)}
						registrosPorPagina={10} 
						registros={filtroClientesNombre.length > 0 ? (clientesFiltro.length > 0 ? clientesFiltro : []) : this.props.clientes} 
						camposBusqueda={camposBusqueda} />
					{idclient > 0 &&
					<Fragment>
						<TablePaginado tituloTabla={this.obtenerTablaTitulo(nameClient)}
							mensajeSinRegistros={"No se encontró puestos laborales del cliente " + nameClient} 
							tableHead={tableHeadPuestoLaboral}
							tablaEstilo={"width200"}
							tableBody={this.generarTablaBodyPuestosLaborales.bind(this)}
							nombreTitulo={nameClient}
							registrosPorPagina={10}
							registros={filtroPuestosLaboralesNombre.length > 0 ? puestosLaboralesFiltro : idclient > 0 ? this.props.getJobPositionResponse : filtroClientesNombre.length > 0 ? [] : []} 
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
        getJobPositionResponse: state.reducerCliente.getJobPositionResponse,
	}
}

export default connect(mapStateToProps, {obtenerClientes, getJobPosition})(ClientsList);