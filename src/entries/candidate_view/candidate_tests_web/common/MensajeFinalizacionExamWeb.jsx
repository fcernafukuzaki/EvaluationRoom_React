import React, {Component, Fragment} from 'react';

import CargandoImagen from '../../../components/common/CargandoImagen'
import TableroMensaje from './TableroMensaje';
import {obtenerTextoFinalizadoPorParrafos} from './Mensajes';

const MensajeFinalizacionExamWeb = (props) => {
	const { mensaje, estiloTablero } = props;
	return (
		<TableroMensaje estilo={estiloTablero} >
			<Fragment>
			{
				typeof mensaje != "undefined" ? (
				<Fragment>
					{obtenerTextoFinalizadoPorParrafos(mensaje)}
					<i className="far fa-smile icono12em"></i>
				</Fragment>
				) : (
					<CargandoImagen />
				)
			}
			</Fragment>
		</TableroMensaje>
	);
}

export default MensajeFinalizacionExamWeb;