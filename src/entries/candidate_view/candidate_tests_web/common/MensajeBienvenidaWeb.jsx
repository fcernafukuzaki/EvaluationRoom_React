import React, {Component, Fragment} from 'react';

import CargandoImagen from '../../../components/common/CargandoImagen';
import TableroMensaje from './TableroMensaje';
import {obtenerTextoBienvenidaPorParrafos} from './Mensajes';

const MensajeBienvenidaWeb = (props) => {
	const { mensaje, estiloTablero } = props;
	return (
		<TableroMensaje estilo={estiloTablero} >
			<Fragment>
			{
				typeof mensaje !== "undefined" ? (
				<Fragment>
					{obtenerTextoBienvenidaPorParrafos(mensaje)}
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