import React from 'react';
import classnames from 'classnames';

const Alternativa = ({ id, label, estaSeleccionada, visible, onClick }) => {
	return(
		<button type="button" id={id}
			onClick={onClick}
			className={classnames('botonAlternativa', (estaSeleccionada ? 'botonAlternativaSeleccionada' : 'botonAlternativaNoSeleccionada'), (visible ? 'visible' : 'noVisible') )}>
			{label}
		</button>
	);
}

export default Alternativa;