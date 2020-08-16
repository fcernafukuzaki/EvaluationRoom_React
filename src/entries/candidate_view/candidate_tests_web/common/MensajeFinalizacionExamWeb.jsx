import React, {Component, Fragment} from 'react';

import CargandoImagen from '../../../components/common/CargandoImagen'
import TableroMensaje from './TableroMensaje';
import {obtenerTextoFinalizadoPorParrafos} from './Mensajes';

const MensajeFinalizacionExamWeb = (props) => {
	const { nombreCandidato, estiloTablero } = props;
	return (
		<TableroMensaje estilo={estiloTablero} >
			<Fragment>
			{
				typeof nombreCandidato != "undefined" ? (
				<Fragment>
					{obtenerTextoFinalizadoPorParrafos(nombreCandidato)}
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