import React from 'react';
import classnames from 'classnames';

const MensajeGuardarExitoso = ({ cargando, mensaje }) => {
	return(
		<div className={cargando ? "mensaje ocultarMensaje" : "mensaje"}>
			<div className={cargando ? "mensajeGuardar" : "mensajeGuardar ocultarMensajeGuardar"}>
				<div className="alert alert-success" role="alert">
					<h4 className="alert-heading">{mensaje}</h4>
				</div>
			</div>
		</div>
	);
}

export default MensajeGuardarExitoso;