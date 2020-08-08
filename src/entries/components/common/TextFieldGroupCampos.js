import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import TextFieldGroup from './TextFieldGroup';
import TextFieldLineaGroup from './TextFieldLineaGroup';
import SelectFieldGroup from './SelectFieldGroup';
import CheckboxField from './CheckboxField';
import Label from './Label';

export default function TextFieldGroupCampos(props){
	var htmlField = '';
	if(props.type === 'text-linea' || props.type === 'date-linea' || props.type === 'hidden') {
		htmlField = (
			<TextFieldLineaGroup
				key={props.key}
				{...props}
			/>
		)
	} else if(props.type === 'text' || props.type === 'date' || props.type === 'hidden' || props.type === 'number') {
		htmlField = (
			<TextFieldGroup
				key={props.key}
				{...props}
			/>
		)
	} else if(props.type === 'select') {
		htmlField = (
			<SelectFieldGroup
				key={props.label}
				{...props}
			/>
		)
	} else if(props.type === 'check') {
		let rows = []
		props.value.map( elemento =>{
			rows.push(
				<div className="form-check" key={elemento.identificador}>
					<CheckboxField
						onChange={props.onChange}
						name={props.name}
						{...elemento}
					/>
					<label className={classnames('form-check-label')} >
					{elemento.nombre}
					</label>
				</div>
			)
		})
		htmlField = (
			<Fragment>
				<div className={props.labelClass} key={props.key} >
					<Label label={props.label} labelClass={props.labelClass} />
				</div>
				<div className={props.fieldClass}>
					{rows}
				</div>
			</Fragment>
		);
	}
	
	return htmlField;
}