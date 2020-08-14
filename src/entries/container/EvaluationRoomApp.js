import React, { Component, Fragment } from 'react';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import NavBar from '../components/common/NavBar';
import Footer from '../components/Footer';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import ClientsList from '../cliente/container/ClientsList';
import ClienteDatosForm from '../cliente/container/ClienteDatosForm';
import PuestoLaboralDatosForm from '../cliente/container/PuestoLaboralDatosForm';
import CandidatoDatosForm from '../container/candidato/CandidatoDatosForm';
import CandidatosResultadoForm from '../container/candidato/CandidatosResultadoForm';
import CandidatoResultadoForm from '../container/candidato/CandidatoResultadoForm';
import CandidatosForm from '../container/candidato/CandidatosForm';
import TestPsicologicos from '../container/testpsicologico/TestPsicologicos';
import UsuarioDatosForm from '../administracion/container/UsuarioDatosForm';
import PerfilDatosForm from '../administracion/container/PerfilDatosForm';
import UsuariosForm from '../administracion/container/UsuariosForm';
import PerfilesForm from '../administracion/container/PerfilesForm';
import SelectionProcessFormContainer from '../selectionprocess_form/container/selectionprocess_form_container'
import MensajeError from '../components/common/MensajeError';

export default class EvaluationRoomApp extends Component {
	constructor(props){
		super(props);
		this.state = {
			usuario: null,
			flagUsuario: null,
			isLoading: true,
			errorMensaje: ''
		}
		
		this.datosUsuario = this.datosUsuario.bind(this);
		this.errorUsuario = this.errorUsuario.bind(this);
	}
	
	datosUsuario(datos){
		this.setState({
			usuario: datos,
			flagUsuario: (!datos.activo || datos.perfiles.length < 1) ? 'No autorizado' : null,
			isLoading: datos != null ? false : true
		});
	}
	
	errorUsuario(datos){
		console.log('errorUsuario', datos);
		this.setState({
			flagUsuario: (datos.status == 401 || datos.status == 403 || datos.status == 404) ? 'No autorizado' : null,
			errorMensaje: datos,
			isLoading: false
		});
	}
	
	render() {
		const { usuario, flagUsuario, errorMensaje } = this.state;
		const items = [{
				key: 'item1',
				label: 'Inicio',
				divClass: 'nav-link',
				botonClass: 'btn-primary btn-sm',
				tipo: 'nav-item',
				exact: true,
				link: '/home',
				perfil: [1,2,3]
			} , {
				key: 'itemClientes',
				label: 'Clientes',
				divClass: 'nav-link',
				botonClass: 'btn-primary btn-sm',
				tipo: 'nav-item dropdown',
				item: [{
					key: 'itemClientessubitem1',
					label: 'Lista de clientes',
					divClass: 'nav-link',
					botonClass: 'btn-primary btn-sm',
					tipo: 'dropdown-item',
					exact: false,
					link: '/listarClientes',
					perfil: [1,2,3]
				} , {
					key: 'itemClientessubitem2',
					label: 'Registrar cliente',
					divClass: 'nav-link',
					botonClass: 'btn-primary btn-sm',
					tipo: 'dropdown-item',
					exact: false,
					link: '/registrarCliente',
					perfil: [1,2,3]
				}]
			} , {
				key: 'item2',
				label: 'Candidato',
				divClass: 'nav-link',
				botonClass: 'btn-primary btn-sm',
				tipo: 'nav-item dropdown',
				item: [{
					key: 'item2subitem2',
					label: 'Lista de candidatos',
					divClass: 'col-sm-2',
					botonClass: 'btn-primary btn-sm',
					tipo: 'nav-item',
					exact: false,
					link: '/listaCandidatos',
					perfil: [1,2,3]
				} , {
					key: 'item2subitem1',
					label: 'Registrar candidato',
					divClass: 'nav-link',
					botonClass: 'btn-primary btn-sm',
					tipo: 'dropdown-item',
					exact: false,
					link: '/registrarCandidato',
					perfil: [1,2,3]
				}]
			} , {
				key: 'item3',
				label: 'Lista de test',
				divClass: 'nav-link',
				botonClass: 'btn-primary btn-sm',
				tipo: 'nav-item',
				exact: false,
				link: '/listaTestPsicologicos',
				perfil: [1,2,3]
			} , {
				key: 'item0',
				label: 'Accesos de aplicación',
				divClass: 'nav-link',
				botonClass: 'btn-primary btn-sm',
				tipo: 'nav-item dropdown',
				item: [{
					key: 'item0subitem3',
					label: 'Lista de usuarios',
					divClass: 'nav-link',
					botonClass: 'btn-primary btn-sm',
					tipo: 'dropdown-item',
					exact: false,
					link: '/listaUsuarios',
					perfil: [1,2]
				} , {
					key: 'item0subitem4',
					label: 'Lista de perfiles',
					divClass: 'nav-link',
					botonClass: 'btn-primary btn-sm',
					tipo: 'dropdown-item',
					exact: false,
					link: '/listaPerfiles',
					perfil: [1]
				} , {
					key: 'item0subitem1',
					label: 'Registrar usuario',
					divClass: 'nav-link',
					botonClass: 'btn-primary btn-sm',
					tipo: 'dropdown-item',
					exact: false,
					link: '/registrarUsuario',
					perfil: [1,2]
				} , {
					key: 'item0subitem2',
					label: 'Registrar perfil',
					divClass: 'nav-link',
					botonClass: 'btn-primary btn-sm',
					tipo: 'dropdown-item',
					exact: false,
					link: '/registrarPerfil',
					perfil: [1]
				}]
			}]
		
		return (
			<Fragment>
				<NavBar usuario={this.state.usuario} datosUsuario={this.datosUsuario.bind(this)} errorUsuario={this.errorUsuario.bind(this)} items={items} />
				<Switch>
					<Route exact path="/" render={()=>(
							<Fragment>
								<Home usuario={this.state.usuario} isLoading={this.state.isLoading} />
							</Fragment>
						)} />
					<Route exact path="/home" render={()=>(<Home usuario={this.state.usuario} isLoading={this.state.isLoading} />)} />
					{flagUsuario !== 'No autorizado' &&
					<Fragment>
						<Route exact path="/listarClientes" render={()=>(<ClientsList errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/registrarCliente" render={()=>(<ClienteDatosForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/registrarPuestoLaboral" render={()=>(<PuestoLaboralDatosForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/registrarCandidato" render={()=>(<CandidatoDatosForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/listaCandidatos" render={()=>(<CandidatosResultadoForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/listaCandidatos/resultados" render={()=>(<CandidatoResultadoForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/asignarCandidatos" render={()=>(<CandidatosForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/listaTestPsicologicos" render={()=>(<TestPsicologicos errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/registrarUsuario" render={()=>(<UsuarioDatosForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/registrarPerfil" render={()=>(<PerfilDatosForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/listaUsuarios" render={()=>(<UsuariosForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/listaPerfiles" render={()=>(<PerfilesForm errorResponse={this.state.errorMensaje} />)} />
						<Route exact path="/selectionprocess" render={()=>(<SelectionProcessFormContainer errorResponse={this.state.errorMensaje} />)} />
					</Fragment>
					}
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</Fragment>
		);
	}
}