import React, {Component, Fragment} from 'react';

import CargandoImagen from '../common/CargandoImagen';
import TableroMensaje from './TableroMensaje';
import {obtenerTextoBienvenidaPorParrafos} from './Mensajes';

const MensajeBienvenidaWeb = (props) => {
	const { nombreCandidato, estiloTablero } = props;
	return (
		<TableroMensaje estilo={estiloTablero} >
			<Fragment>
			{
				typeof nombreCandidato != "undefined" ? (
				<Fragment>
					{obtenerTextoBienvenidaPorParrafos(nombreCandidato)}
				</Fragment>
				) : (
					<Fragment>
						<CargandoImagen />
					</Fragment>
				)
			}
			</Fragment>
		</TableroMensaje>
	);
}

export default MensajeBienvenidaWeb;