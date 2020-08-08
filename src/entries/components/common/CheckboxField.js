import React from 'react';
import classnames from 'classnames';

export default function CheckboxField(props) {
	const { nombre, checked, onChange, name, identificador } = props;
	return (
		<input className={classnames('form-check-input')}
			type="checkbox"
			id={nombre}
			checked={checked}
			onChange={onChange}
			name={name}
			value={identificador}
		/>
	);
}