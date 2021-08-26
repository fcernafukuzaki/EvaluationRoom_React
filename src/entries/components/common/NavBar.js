import React, {Component} from 'react';
import {GoogleLogout} from 'react-google-login';
import NavBarItem from './NavBarItem';

export default class NavBar extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		const {clientId, usuario, items, responseGoogle} = this.props;
		let itemUsuario = [];
		if(usuario.idusuario > 0 && Object.entries(usuario.perfiles).length > 0){
			let perfiles = usuario.perfiles.map(p => p.idperfil);
			
			items.map( item =>{
				if(item.tipo === 'nav-item' ) {
					var flagPerfil = item.perfil.filter(p => (perfiles.indexOf(p) > -1));
					if(flagPerfil.length > 0){
						itemUsuario.push(item);
					}
				} else if( item.tipo === 'nav-item dropdown' ) {
					let itemAux = item;
					var i = -1;
					var indiceSubItem = [];
					item.item.map(eSubItem => {
						i = i + 1;
						var flagPerfil = eSubItem.perfil.filter(p => (perfiles.indexOf(p) > -1));
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
		
		var navItem = itemUsuario.map( elemento => <NavBarItem {...elemento} key={elemento.key} /> );
		
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
						{usuario.idusuario > 0 && Object.entries(usuario.perfiles).length > 0 && navItem}
					</ul>
					<ul className="navbar-nav">
						{Object.entries(usuario).length == 0 &&
						<li className="nav-item active">
							<a className="nav-link" href="/" id="btnLogin">
							<i className="fas fa-sign-in-alt"></i> Iniciar sesión
							</a>
						</li>
						}
						<li className="nav-item active">
							<GoogleLogout
								clientId={clientId}
								render={renderProps => (
									<div className="btn-group btn-group-lg">
										<a className="nav-link" href="/" id="btnLogOut">
											<i className="fas fa-sign-out-alt" onClick={renderProps.onClick} disabled={renderProps.disabled}></i> Cerrar sesión
										</a>
									</div>
								)}
								onLogoutSuccess={responseGoogle}
							>
							</GoogleLogout>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}