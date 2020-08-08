import React from 'react';
import classnames from 'classnames';

import Label from './Label';
import TextField from './TextField';

export default function TextFieldGroup(props){
	const {type, label, labelClass, fieldClass} = props;
	return (
		<div className={
		type == 'hidden' ? '' :
		classnames('row')}
		>
			<div className={classnames(labelClass)}>
			{ type == 'hidden' ? ''
			 : <Label label={label} labelClass={labelClass} />
			}
			</div>
			<div className={classnames(fieldClass)}>
			<TextField 
				{...props}
				className="form-control form-control-sm"
			/>
			</div>
		</div>
	);
}

TextFieldGroup.defaultProps = {
	type: 'text'
}