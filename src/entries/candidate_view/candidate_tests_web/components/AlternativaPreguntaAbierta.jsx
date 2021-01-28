import React from 'react';
import classnames from 'classnames';

const AlternativaPreguntaAbierta = ({ id, visible, valor, onChange }) => {
	const placeholder = 'Colocar aquí su respuesta.'
    return(
		<textarea id={id} 
			rows="10" cols="70" 
			maxLength="500"
			value={valor} 
			className={classnames('botonAlternativaPreguntaAbierta', (visible ? 'visible' : 'noVisible') )}
			placeholder={placeholder}
			onChange={onChange} />
	);
}

export default AlternativaPreguntaAbierta;