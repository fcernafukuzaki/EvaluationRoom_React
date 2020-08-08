import React from 'react';
import classnames from 'classnames';

const Label = ({ label, labelClass }) => {
	return (
		<label className={classnames("col-form-label-sm")} >{label}</label>
	);
}

export default Label;