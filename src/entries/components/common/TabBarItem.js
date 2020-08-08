import React from 'react';
import classnames from 'classnames';

export default function TabBarItem(props){
	const {id, keyTab, tipo, activo, link, label} = props;
	var htmlField = '';
	if(tipo === 'tab') {
		htmlField = (
			<a className={classnames('nav-item nav-link ', activo )} id={id}
				data-toggle="tab" href={link} role={tipo}
				aria-controls={keyTab} aria-selected="true">
				{label}
			</a>
		)
	}
	
	return htmlField;
}