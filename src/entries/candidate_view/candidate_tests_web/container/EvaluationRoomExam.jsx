import React, { Component, Fragment } from 'react';

import ExamenPsicologicoWeb from './ExamenPsicologicoWeb';

export default class EvaluationRoomExam extends Component {
	constructor(props){
		super(props);
	}

	obtenerLogoEmpresa(){
		return 'https://s3.amazonaws.com/www.evaluationroom.com/logo_humanum_group.jpg'
	}
	
	render() {
		return (
			<Fragment>
				<ExamenPsicologicoWeb logoEmpresa={this.obtenerLogoEmpresa()} />
			</Fragment>
		);
	}
}