import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

const TableroMensaje = (props) => {
	return(
		<div id="tableroMensaje" className={classnames('tablero', props.estilo)} >
			{props.children}
		</div>
	);
}

export default TableroMensaje;