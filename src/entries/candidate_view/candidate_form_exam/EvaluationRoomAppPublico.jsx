import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Footer from '../../common/components/Footer';
import NotFound from '../../common/components/NotFound';
import CandidatoForm from './container/candidato_selfregistration_form';

export default class EvaluationRoomAppPublico extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: false,
			errorMensaje: ''
		}
		
		this.datosUsuario = this.datosUsuario.bind(this);
		this.errorUsuario = this.errorUsuario.bind(this);
	}
	
	datosUsuario(datos){
		
	}
	errorUsuario(datos){
		
	}
	
	render() {
		const items = [];
		return (
			<Fragment>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between" role="navigation">
					<a className="navbar-brand" href="#">
						Evaluation Room
					</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							
						</ul>
						<ul className="navbar-nav">
							
						</ul>
					</div>
				</nav>
				<Switch>
					<Route exact path="/evaluacion/" render={()=>(<CandidatoForm errorResponse={this.state.errorMensaje} />)} />
						
					<Redirect from="/evaluacion" to="evaluacion/" />
					<Redirect from="/evaluation" to="evaluacion/" />
					
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</Fragment>
		);
	}
}
