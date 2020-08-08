import React, {Fragment} from 'react';
import classnames from 'classnames';

export default function TabBarPaneItem(props){
	const {tipoPanel, activoPanel, keyTab} = props;
	var htmlField = '';
	if(tipoPanel === 'tabpanel') {
		htmlField = (
			<div className={("tab-pane fade ").concat(activoPanel)} 
				id={keyTab} role={tipoPanel}
				aria-labelledby={keyTab}>
				{props.children}
			</div>
		)
	}
	
	return (
		<Fragment>
			{htmlField}
		</Fragment>
	);
}