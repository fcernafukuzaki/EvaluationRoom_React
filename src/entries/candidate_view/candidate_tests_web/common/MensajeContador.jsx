import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

const MensajeContador = (props) => {
	const { mensaje } = props;
	return(
			<Fragment>
			{
				mensaje.visible && mensaje.mensaje.length > 0 && (
				<Fragment>
					<div className={classnames(mensaje.estilo)} >
						{mensaje.tipoMensaje == null && (<i className="far fa-clock mr-1"></i>)}{mensaje.mensaje}
					</div>
				</Fragment>
				)
			}
			</Fragment>
	);

}

export default MensajeContador;
