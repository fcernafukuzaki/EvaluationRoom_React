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

import { obtenerUsuarios, obtenerPerfiles } from '../../../actions/actionUsuario';

class UsuariosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroUsuariosNombre: '',
			usuariosFiltro:[],
			idUsuario: 0,
			nombre: '',
			errors: {},
			isLoading: true,
			errorMensaje: '',
			rutaRegistrarUsuario: '/registrarUsuario',
			registrarPerfil: '/registrarPerfil'
		}
		
		this.onChange = this.onChange.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerUsuarios();
		this.props.obtenerPerfiles();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.obtenerUsuariosResponse !== this.props.obtenerUsuariosResponse) {
			this.setState({
				isLoading: Object.entries(this.props.obtenerUsuariosResponse).length > 0 ? false : true
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
	
	filtrarListaUsuarios(e){
		let filtroUsuariosNombre = e.target.value.toLowerCase();
		this.setState({
			filtroUsuariosNombre: filtroUsuariosNombre.toLowerCase(),
			usuariosFiltro: this.props.obtenerUsuariosResponse.filter( c => c.nombre.toLowerCase().indexOf(filtroUsuariosNombre) > -1 ),
			idUsuario: 0
		})
	}
	
	obtenerTablaTitulo(titulo){
		return ("Lista de perfiles del usuario: ").concat(titulo);
	}
	
	verPerfiles(usuario){
		this.setState({
			idUsuario : usuario.idUsuario, 
			nombre : usuario.nombre
		});
	}
	
	generarTablaBodyUsuarios(row){
		if(row != null){
			var hashIdUsuario = encriptarAES(row.idUsuario.toString());
			var actualizarUsuario = (
				<Link to={{ pathname: this.state.rutaRegistrarUsuario, search: `?id=${hashIdUsuario}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			return (<tr key={row.idUsuario} onClick={() => this.verPerfiles(row)} >
						<td>{row.idUsuario}</td>
						<td>{row.nombre}</td>
						<td>{actualizarUsuario}</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	generarTablaBodyPerfiles(row){
		if(row != null){
			return (<tr key={row.idPerfil}>
						<td>{row.idPerfil}</td>
						<td>{this.props.obtenerPerfilesResponse.filter(p => p.idPerfil == row.idPerfil)[0].nombre}</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	render() {
		const { idUsuario, nombre, usuariosFiltro, filtroUsuariosNombre, errors, isLoading, errorMensaje } = this.state;
		//console.log('UsuariosForm:state', this.state);
		//console.log('UsuariosForm:props', this.props);
		var tableHeadUsuario = [{
				key: 'idUsuario',
				nombre: 'N°'
			},{
				key: 'nombre',
				nombre: 'Nombre'
			},{
				key: 'accion',
				nombre: 'Acciones'
		}]
		
		var tableHeadPerfiles = [{
				key: 'idPerfil',
				nombre: 'N°'
			},{
				key: 'nombre',
				nombre: 'Nombre'
		}]
		
		var camposBusqueda = [{
				key: 'idFiltroUsuariosNombre',
				label: "Filtrar por nombre de usuario",
				onChange: this.filtrarListaUsuarios.bind(this),
				valor: filtroUsuariosNombre
		}];
		
		return (
			<div className="mt-3 mx-auto ancho1200">
				{isLoading && <CargandoImagen />}
				{!isLoading && 
				<Fragment>
					<div className="mb-3 ml-0 row">
						<div className="mr-2">
						<Link to={{ pathname: this.state.rutaRegistrarUsuario, state: { } }}>
							<button type="button" className="btn btn-primary" >
								<i className="fas fa-user-plus"></i> Nuevo usuario
							</button>
						</Link>
						</div>
						<div className="mr-2">
						<Link to={{ pathname: this.state.registrarPerfil, state: { } }}>
							<button type="button" className="btn btn-primary" >
								<i className="fas fa-id-badge"></i> Nuevo perfil
							</button>
						</Link>
						</div>
					</div>
					<TablePaginado tituloTabla={"Lista de usuarios"}
						mensajeSinRegistros={"No se encontró usuarios."}
						tableHead={tableHeadUsuario}
						tablaEstilo={"tablaUsuario"}
						tableBody={this.generarTablaBodyUsuarios.bind(this)}
						registrosPorPagina={10} 
						registros={filtroUsuariosNombre.length > 0 ? (usuariosFiltro.length > 0 ? usuariosFiltro : []) : this.props.obtenerUsuariosResponse} 
						camposBusqueda={camposBusqueda} />
					
					{idUsuario > 0 &&
					<Fragment>
						<TablePaginado tituloTabla={this.obtenerTablaTitulo(nombre)}
							mensajeSinRegistros={"No se encontró perfiles asignados al usuario " + nombre} 
							tableHead={tableHeadPerfiles}
							tablaEstilo={"tablaPerfil"}
							tableBody={this.generarTablaBodyPerfiles.bind(this)}
							nombreTitulo={nombre}
							registrosPorPagina={5}
							registros={this.props.obtenerUsuariosResponse.filter(u => u.idUsuario == idUsuario)[0].perfiles} />
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
		obtenerUsuariosResponse : state.reducerUsuario.obtenerUsuariosResponse,
		obtenerPerfilesResponse : state.reducerUsuario.obtenerPerfilesResponse
	}
}

export default connect(mapStateToProps, { obtenerUsuarios, obtenerPerfiles })(UsuariosForm);