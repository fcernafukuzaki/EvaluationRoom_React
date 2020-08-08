import React from 'react';

const MensajeError = ({error}) => {
	return(
		<div className="overlay">
			<div className="mensajeErrorCentro">
				{error.status == 'ERROR_TIME_OUT' || error.status == 'ERROR_OTROS' ?
					(<i className="fas fa-exclamation-circle iconoRojo icono6em" ></i>) : 
					(<i className="fas fa-exclamation-triangle iconoAmarillo icono6em" ></i>)
				}
				<div className="text-white mt-3">
					<h5>{error.mensaje}</h5>
				</div>
			</div>
		</div>
	);
}

export default MensajeError;