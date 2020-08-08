import React, {Fragment} from 'react';
import classnames from 'classnames';

export default function SelectField(props) {
	const {value, valueSelected, name, error, type, onChange, fieldClass, size, multiple} = props;
	let options = []
	value.map( campo =>{
		options.push(
			<option key={campo.value} value={campo.value}>{campo.label}</option>
		)
	})
	var flag = valueSelected == 0 ? (error) : '';
	return (
		<Fragment>
			<select name={name} className={classnames("form-control form-control-sm", { 'is-invalid': flag })} onChange={onChange} size={size} multiple={multiple} value={valueSelected}>
				{options}
			</select>
			{error && <div className="invalid-feedback">{error}</div>}
		</Fragment>
	);
}