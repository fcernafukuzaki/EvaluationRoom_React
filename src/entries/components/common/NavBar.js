import React, {Component} from 'react';
import { connect } from 'react-redux';

import NavBarItem from './NavBarItem';
import { obtenerUsuarioOAuth } from '../../../actions/actionUsuario';

class NavBar extends Component {
	constructor(props){
		super(props);
		// TESTING
		var usuario_datos = {activo: true,
			correoElectronico: "fcernaf@gmail.com",
			idUsuario: 1,
			nombre: "Francisco Cerna Fukuzaki",
			perfiles: [{idUsuario: 1, idPerfil: 1}]};
		this.props.datosUsuario(usuario_datos);
	}
	
	componentWillMount() {
		//this.props.obtenerUsuarioOAuth();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.obtenerUsuarioOAuthResponse !== this.props.obtenerUsuarioOAuthResponse) {
			this.props.datosUsuario(this.props.obtenerUsuarioOAuthResponse);
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			this.props.errorUsuario(this.props.errorResponse);
		}
	}
	
	render() {
		let itemUsuario = [];
		if(this.props.obtenerUsuarioOAuthResponse.idUsuario > 0 &&
			Object.entries(this.props.obtenerUsuarioOAuthResponse.perfiles).length > 0 ){
			let perfiles = this.props.obtenerUsuarioOAuthResponse.perfiles.map( p => {
				return p.idPerfil;
			});
			this.props.items.map( item =>{
				if(item.tipo === 'nav-item' ) {
					var flagPerfil = item.perfil.filter( p => 
						(perfiles.indexOf(p) > -1)
					);
					if(flagPerfil.length > 0){
						itemUsuario.push(item);
					}
				} else if( item.tipo === 'nav-item dropdown' ) {
					let itemAux = item;
					var i = -1;
					var indiceSubItem = [];
					item.item.map( eSubItem => {
						i = i + 1;
						var flagPerfil = eSubItem.perfil.filter( p => 
							(perfiles.indexOf(p) > -1)
						);
						if(flagPerfil.length == 0){
							itemAux.item.splice(i,1);
						} else if(flagPerfil.length > 0){
							indiceSubItem.push(i);
						}
					});
					if(indiceSubItem.length > 0){
						itemUsuario.push(itemAux);
					}
				}
			});
		}
		var navItem = itemUsuario.map( elemento =>{
			return <NavBarItem {...elemento} key={elemento.key} />;
		});
		
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between" role="navigation">
				<a className="navbar-brand" href="#">
					Evaluation Room
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						{
						this.props.obtenerUsuarioOAuthResponse.idUsuario > 0 &&
						Object.entries(this.props.obtenerUsuarioOAuthResponse.perfiles).length > 0 &&
						navItem}
					</ul>
					<ul className="navbar-nav">
						{Object.entries(this.props.obtenerUsuarioOAuthResponse).length == 0 && this.props.errorResponse != '' &&
						<li className="nav-item active">
							<a className="nav-link" href="/login" id="btnLogin">
							<i className="fas fa-sign-in-alt"></i> Iniciar sesión
							</a>
						</li>
						}
						{Object.entries(this.props.obtenerUsuarioOAuthResponse).length > 0 &&
						this.props.obtenerUsuarioOAuthResponse.idUsuario > 0 &&
						<li className="nav-item active">
							<a className="nav-link" href="/logout" id="btnLogOut" >
							<i className="fas fa-sign-out-alt"></i> Cerrar sesión
							</a>
						</li>
						}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state){
	return{
		obtenerUsuarioOAuthResponse : state.reducerUsuario.obtenerUsuarioOAuthResponse,
		errorResponse : state.reducerUsuario.errorResponse
	}
}

export default connect(mapStateToProps, { obtenerUsuarioOAuth })(NavBar);