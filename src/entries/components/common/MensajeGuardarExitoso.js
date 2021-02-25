import React from 'react';
import classnames from 'classnames';

const MensajeGuardarExitoso = ({ cargando, mensaje, classNameOcultarMensaje }) => {
	return(
		<div className={cargando ? (typeof classNameOcultarMensaje !== 'undefined' ? "mensaje" : "mensaje ocultarMensaje") : "mensaje"}>
			<div className={cargando ? "mensajeGuardar" : "mensajeGuardar ocultarMensajeGuardar"}>
				<div className="alert alert-success" role="alert">
					<h4 className="alert-heading">{mensaje}</h4>
				</div>
			</div>
		</div>
	);
}

export default MensajeGuardarExitoso;