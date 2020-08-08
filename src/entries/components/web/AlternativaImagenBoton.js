import React from 'react';
import classnames from 'classnames';

const AlternativaImagenBoton = ({ id, label, estaSeleccionada, visible, onClick }) => {
	return(
		<button type="button" id={id}
			onClick={onClick}
			className={classnames('botonImagenAlternativa', (estaSeleccionada ? 'botonAlternativaSeleccionada' : 'botonAlternativaNoSeleccionada'), (visible ? 'visible' : 'noVisible') )}>
			{label}
		</button>
	);
}

export default AlternativaImagenBoton;