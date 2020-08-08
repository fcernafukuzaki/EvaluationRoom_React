import React from 'react';
import classnames from 'classnames';

const AlternativaImagen = ({ id, label, imagen, visible }) => {
	var material = ("../").concat(imagen);
	return(
		<div className={classnames('imagenAlternativa', (visible ? 'visible' : 'noVisible') )} >
			{label}
			<img src={material} />
		</div>
	);
}

export default AlternativaImagen;