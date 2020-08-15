import React, {Component, Fragment} from 'react';

import TableroMensaje from './TableroMensaje';

import CargandoImagen from '../../components/common/CargandoImagen';

const MensajeInstruccionesWeb = (props) => {
	const { texto, estiloTablero } = props;
	let textoAux = texto.split('\\n').map((parrafo, i) => <p key={i}>{parrafo}</p> );
	
	return (
		<TableroMensaje estilo={estiloTablero} >
			<Fragment>
			{
				typeof texto != "undefined" ? (
					<Fragment>{textoAux}</Fragment>
				) : (
					<CargandoImagen />
				)
			}
			</Fragment>
		</TableroMensaje>
	);
}

export default MensajeInstruccionesWeb;