import React from 'react';
import classnames from 'classnames';

import Label from './Label';
import TextField from './TextField';

export default function TextFieldGroup(props){
	const {type, label, labelClass} = props;
	return (
		<div className={classnames( labelClass ) }>
			{ type == 'hidden' ? ''
			 : <Label label={label} labelClass={labelClass} />
			}
			<TextField 
				{...props}
				className="form-control form-control-sm"
			/>
		</div>
	);
}

TextFieldGroup.defaultProps = {
	type: 'text'
}