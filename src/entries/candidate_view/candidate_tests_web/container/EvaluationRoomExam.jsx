import React, { Component, Fragment } from 'react';

import ExamenPsicologicoWeb from './ExamenPsicologicoWeb';

export default class EvaluationRoomExam extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<Fragment>
				<ExamenPsicologicoWeb />
			</Fragment>
		);
	}
}