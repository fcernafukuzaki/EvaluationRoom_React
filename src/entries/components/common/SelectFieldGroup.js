import React from 'react';
import classnames from 'classnames';

import Label from './Label';
import SelectField from './SelectField';

export default function SelectFieldGroup(props) {
	const {label, labelClass, error} = props;
	return (
		<div className={classnames(labelClass)}>
			<Label label={label} labelClass={labelClass} />
			<SelectField
				key={name}
				{...props}
			/>
		</div>
	);
}