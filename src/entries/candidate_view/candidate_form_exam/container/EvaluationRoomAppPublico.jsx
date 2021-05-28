import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LogoEmpresa from '../../../../assets/img/logo_humanum_recortado.jpg'
import Footer from '../../../common/components/Footer';
import NotFound from '../../../common/components/NotFound';
import CandidatoForm from './candidato_selfregistration_form';
import CandidatoSCLForm from './candidato_selfregistration_scl_form';
import UXCandidatoForm from './candidato_selfregistration_ux_candidato_form';

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

	obtenerLogoEmpresa(){
		/*const logo = new Image();
		logo.src = 'evaluacion/' + LogoEmpresa;
		return logo.src;*/
		return 'https://s3.amazonaws.com/www.evaluationroom.com/logo_humanum_group.jpg'
	}
	
	datosUsuario(datos){
		
	}
	errorUsuario(datos){
		
	}
	
	render() {
		return (
			<Fragment>
				<Switch>
					<Route exact path="/evaluacion/" render={()=>(<CandidatoForm logoEmpresa={this.obtenerLogoEmpresa()} errorResponse={this.state.errorMensaje} />)} />
					<Route exact path="/evaluacion_nueva/" render={()=>(<CandidatoSCLForm logoEmpresa={this.obtenerLogoEmpresa()} errorResponse={this.state.errorMensaje} />)} />
					<Route exact path="/ux_candidato/" render={()=>(<UXCandidatoForm logoEmpresa={this.obtenerLogoEmpresa()} errorResponse={this.state.errorMensaje} />)} />
					<Redirect from="/evaluacion_nueva" to="evaluacion_nueva/" />
					<Redirect from="/ux_candidato" to="ux_candidato/" />
					<Redirect from="/uxcandidato" to="ux_candidato/" />
					<Redirect from="/evaluacion" to="evaluacion/" />
					<Redirect from="/evaluation" to="evaluacion/" />
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</Fragment>
		);
	}
}
