import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './login_user/container/login';
import Home from './Home';
import {barmenu_items} from './barmenu/items'
import NotFound from '../common/components/NotFound';
import MensajeError from '../components/common/MensajeError';
import CargandoImagen from '../components/common/CargandoImagen';
import DashBoard from './dashboard/container/DashBoard';
import ClientsList from './selection_process/container/ClientsList';
import ClientForm from './selection_process/container/ClientForm';
import PuestoLaboralForm from './selection_process/container/PuestoLaboralForm';
import CandidatoDatosForm from './candidate_form/container/candidate_form';
import CandidatesListInfo from '../recruiter_view/candidates_list/container/candidates_list_info';
import CandidatoResultadoForm from './candidate_info_result/container/candidate_info_result_tests';
import CandidatesListJobPosition from './candidates_list_assign_jobposition/container/CandidatesListAssingJobPosition';
import TestPsicologicos from './testpsicologico/TestPsicologicos';
import UsuarioDatosForm from '../administrator_view/container/UsuarioDatosForm';
import PerfilDatosForm from '../administrator_view/container/PerfilDatosForm';
import UsuariosForm from '../administrator_view/container/UsuariosForm';
import PerfilesForm from '../administrator_view/container/PerfilesForm';
import SelectionProcessFormContainer from './selectionprocess_form/container/selectionprocess_form_container'
import {obtenerUsuarioOAuth} from '../../actions/recruiter_view/actionLogin';

class EvaluationRoomApp extends Component {
	constructor(props){
		super(props);
		this.state = {
			usuario: null,
			usuario_nombre: null,
			token: null,
			flagUsuario: false,
			isLoading: false,
			errorUsuario: null,
			errorMensaje: null
		}
		
		this.datosUsuario = this.datosUsuario.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.obtenerUsuarioOAuthResponse !== this.props.obtenerUsuarioOAuthResponse) {
			const obtenerUsuarioOAuthResponse = this.props.obtenerUsuarioOAuthResponse
			if(typeof obtenerUsuarioOAuthResponse.code != "undefined"){
				if(obtenerUsuarioOAuthResponse.code == 200){
					const usuario = obtenerUsuarioOAuthResponse.body.usuario
					const datos = { correoelectronico: usuario.correoelectronico,
									nombre: this.state.usuario_nombre,
									idusuario: usuario.idusuario,
									perfiles: usuario.perfiles,
									token: this.state.token }
					this.setState({
						usuario: datos,
						flagUsuario: (datos.perfiles.length < 1) ? false : true,
						isLoading: datos != null ? false : true
					});
				}
			} else {
				const datos = {nombre: this.state.usuario_nombre}
				this.setState({
					usuario: datos,
					flagUsuario: false,
					errorUsuario: {mensaje: obtenerUsuarioOAuthResponse.error.message},
					isLoading: false
				});
			}
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			this.setState({
				errorMensaje: this.props.errorResponse
			})
		}
	}

	datosUsuario(response){
		const profile = response.profileObj
		this.setState({isLoading:true, usuario_nombre: typeof profile != "undefined" ? profile.name : "", token:response.accessToken});
		this.props.obtenerUsuarioOAuth(response.accessToken, typeof profile != "undefined" ? profile.email : "");
	}

	set_body(path, content){
		const {isLoading, usuario, flagUsuario, errorUsuario, errorMensaje} = this.state;
		const {clientId} = this.props;
		return <Route exact path={path} render={()=>(<Home 
				clientId={clientId}
				usuario={usuario} 
				isLoading={isLoading} 
				errorUsuario={errorUsuario}
				responseGoogle={this.datosUsuario.bind(this)}
				items={barmenu_items}
				>
					{content}
				</Home>)} />
	}
	
	render() {
		const {isLoading, usuario, flagUsuario, errorUsuario, errorMensaje} = this.state;
		const {clientId} = this.props;
		
		return (
			<Fragment>
				<Switch>
					{usuario == null ? (
						<Fragment>
							<Route exact path="/" render={()=>(<Login clientId={clientId} responseGoogle={this.datosUsuario.bind(this)}/>)} />
							{isLoading && <CargandoImagen />}
						</Fragment>
					) : (
					<Fragment>
						{errorMensaje != null && <MensajeError error={errorMensaje} />}
						{this.set_body("/", <Fragment><h4>Bienvenido {usuario.nombre} al sistema de evaluación psicológica.</h4>
							<DashBoard token={usuario.token} correoelectronico={usuario.correoelectronico} idusuario={usuario.idusuario} /></Fragment>)}
						{flagUsuario &&
							<Fragment>
								<Route exact path="/listarClientes" 
									   render={(path)=>(this.set_body(path.location.pathname, 
														<ClientsList token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/registrarCliente" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<ClientForm token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/registrarPuestoLaboral" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<PuestoLaboralForm token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/registrarCandidato" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<CandidatoDatosForm usuario={usuario} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/listaCandidatos" render={()=>(<CandidatesListInfo token={usuario.token} errorResponse={this.state.errorMensaje} />)} />
								<Route exact path="/listaCandidatos/resultados" render={()=>(<CandidatoResultadoForm errorResponse={this.state.errorMensaje} />)} />
								<Route exact path="/asignarCandidatos" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<CandidatesListJobPosition usuario={this.state.usuario} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/listaTestPsicologicos" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<TestPsicologicos token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/registrarUsuario" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<UsuarioDatosForm token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/registrarPerfil" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<PerfilDatosForm token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/listaUsuarios" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<UsuariosForm token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/listaPerfiles" 
									   render={(path)=>(this.set_body(path.location.pathname, 
									   					<PerfilesForm token={usuario.token} correoelectronico={usuario.correoelectronico} errorResponse={this.state.errorMensaje} />))} />
								<Route exact path="/selectionprocess" render={()=>(<SelectionProcessFormContainer usuario={usuario} errorResponse={this.state.errorMensaje} />)} />
							</Fragment>
						}
					</Fragment>)
					}
				</Switch>
			</Fragment>
		);
	}
}

function mapStateToProps(state){
	return{
		obtenerUsuarioOAuthResponse: state.reducerLogin.obtenerUsuarioOAuthResponse,
		errorResponse: state.reducerLogin.errorResponse
	}
}

export default connect(mapStateToProps, {obtenerUsuarioOAuth})(EvaluationRoomApp);