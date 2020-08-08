import React, {Fragment} from 'react';
import classnames from 'classnames';

const TextField = ({ id, name, value, error, type, onChange, fieldClass, textClass, required, maxlength }) => {
	var flag = required == 'true' ? (error) : '';
	return (
		<Fragment>
			<input
				id={id}
				name={name}
				value={value}
				type={type}
				onChange={onChange}
				maxLength={maxlength > 0 ? maxlength : 255}
				className={classnames('form-control form-control-sm', textClass, type == 'hidden' ? '' : ({ 'is-invalid': flag }))}
			/>
			<div className="invalid-feedback">{error}</div>
		</Fragment>
	);
}

TextField.defaultProps = {
	type: 'text'
}

export default TextField;