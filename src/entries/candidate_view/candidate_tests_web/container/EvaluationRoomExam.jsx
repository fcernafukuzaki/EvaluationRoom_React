import React, { Component, Fragment } from 'react';

import ExamenPsicologicoWeb from './ExamenPsicologicoWeb';
import Logo from '../../../../assets/img/logo.jpg'

export default class EvaluationRoomExam extends Component {
	constructor(props){
		super(props);
	}

	obtenerLogoEmpresa(){
		const logo = new Image();
		logo.src = Logo;
		return logo.src;
	}
	
	render() {
		return (
			<Fragment>
				<ExamenPsicologicoWeb logoEmpresa={this.obtenerLogoEmpresa()} />
			</Fragment>
		);
	}
}