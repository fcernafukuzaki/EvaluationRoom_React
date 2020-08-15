import React from 'react';
import classnames from 'classnames';

const Boton = ({ id, label, visible, onClick }) => {
	return(
		<button type="button" id={id}
			onClick={onClick}
			className={classnames('botonOpcionPrueba', visible === 'true' ? 'visible' : 'noVisible' )} >
			{label}
		</button>
	);
}

export default Boton;