import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import TablePaginado from '../../components/common/TablePaginado';

import {encriptarAES} from '../../common/components/encriptar_aes'

import { obtenerPerfiles } from '../../../actions/actionUsuario';

class PerfilesForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroPerfilesNombre: '',
			perfilesFiltro:[],
			errors: {},
			isLoading: true,
			errorMensaje: '',
			rutaRegistrarPerfil: '/registrarPerfil'
		}
		
		this.onChange = this.onChange.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerPerfiles();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.obtenerPerfilesResponse !== this.props.obtenerPerfilesResponse) {
			this.setState({
				isLoading: Object.entries(this.props.obtenerPerfilesResponse).length > 0 ? false : true
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
	
	filtrarListaPerfiles(e){
		let filtroPerfilesNombre = e.target.value.toLowerCase();
		this.setState({
			filtroPerfilesNombre: filtroPerfilesNombre.toLowerCase(),
			perfilesFiltro: this.props.obtenerPerfilesResponse.filter( c => c.nombre.toLowerCase().indexOf(filtroPerfilesNombre) > -1 )
		})
	}
	
	generarTablaBodyPerfiles(row){
		if(row != null){
			var hashidPerfil = encriptarAES(row.idPerfil.toString());
			var actualizarPerfil = (
				<Link to={{ pathname: this.state.rutaRegistrarPerfil, search: `?id=${hashidPerfil}`, state: { } }}>
					<button type="button" className="btn btn-outline-secondary btn-sm" title="Actualizar datos">
						<i className="far fa-edit"></i> Actualizar
					</button>
				</Link>
			);
			return (<tr key={row.idPerfil} >
						<td>{row.idPerfil}</td>
						<td>{row.nombre}</td>
						<td>{actualizarPerfil}</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	render() {
		const { perfilesFiltro, filtroPerfilesNombre, errors, isLoading, errorMensaje } = this.state;
		//console.log('PerfilesForm:state', this.state);
		//console.log('PerfilesForm:props', this.props);
		var tableHeadPerfiles = [{
				key: 'idPerfil',
				nombre: 'N°'
			},{
				key: 'nombre',
				nombre: 'Nombre'
			},{
				key: 'accion',
				nombre: 'Acciones'
		}]
		
		var camposBusqueda = [{
				key: 'idFiltroPerfilesNombre',
				label: "Filtrar por nombre de perfil",
				onChange: this.filtrarListaPerfiles.bind(this),
				valor: filtroPerfilesNombre
		}];
		
		return (
			<div className="mt-3 mx-auto ancho1200">
				{isLoading && <CargandoImagen />}
				{!isLoading && 
				<Fragment>
					<div className="mb-3">
						<Link to={{ pathname: this.state.rutaRegistrarPerfil, state: { } }}>
							<button type="button" className="btn btn-primary" >
								<i className="fas fa-id-badge"></i> Nuevo perfil
							</button>
						</Link>
					</div>
					<TablePaginado tituloTabla={"Lista de perfiles"}
						mensajeSinRegistros={"No se encontró perfiles."}
						tableHead={tableHeadPerfiles}
						tablaEstilo={"tablaPerfil"}
						tableBody={this.generarTablaBodyPerfiles.bind(this)}
						registrosPorPagina={10} 
						registros={filtroPerfilesNombre.length > 0 ? (perfilesFiltro.length > 0 ? perfilesFiltro : []) : this.props.obtenerPerfilesResponse} 
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
		obtenerPerfilesResponse : state.reducerUsuario.obtenerPerfilesResponse
	}
}

export default connect(mapStateToProps, { obtenerPerfiles })(PerfilesForm);