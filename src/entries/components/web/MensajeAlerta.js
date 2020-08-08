import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

const MensajeAlerta = (props) => {
	const { mensaje } = props;
	return(
			<Fragment>
			{
				mensaje.mensaje.length > 0 && (
				<Fragment>
					<div className={classnames(mensaje.estilo)} >
						{mensaje.mensaje}
					</div>
				</Fragment>
				)
			}
			</Fragment>
	);

}

export default MensajeAlerta;
