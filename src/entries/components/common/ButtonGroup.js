import React from 'react';
import classnames from 'classnames';

export default function ButtonGroup(props){
	var htmlField = '';
	if(props.tipo === 'button-submit') {
		htmlField = (
			<div className="btn-group mr-2" role="group">
				<button type="submit" className={classnames('btn', props.botonClass )} onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
			</div>
		)
	} else if (props.tipo === 'link') {
		htmlField = (
			<div className="btn-group mr-2" role="group">
				<a className={classnames('btn', props.botonClass )} onClick={props.onClick} disabled={props.disabled}>{props.label}</a>
			</div>
		)
	} else if(props.tipo === 'button') {
		htmlField = (
			<div className="btn-group mr-2" role="group">
				<button className={classnames('btn', props.botonClass )} onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
			</div>
		)
	}
	
	return htmlField;
}