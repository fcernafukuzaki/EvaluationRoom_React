import React, {Fragment} from 'react';
import classnames from 'classnames';

import TextFieldGroupCampos from './TextFieldGroupCampos';
import ButtonGroup from './ButtonGroup';
import TablePaginado from './TablePaginado';

export default function Formulario(props) {
	const {form} = props;
	var camposForm = form.campos.map( (campo, index) =>{
		var html = '';
		var classRow = true;
		html = campo.map( c =>{
			var htmlCampo = TextFieldGroupCampos(c);
			classRow = c.type.includes('-linea') ? false : true;
			return (<Fragment key={c.key}>{htmlCampo}</Fragment>);
		});
		return (<div key={index} className={campo[0].type == 'hidden' ? '' :
				classnames('form-group',(classRow ? 'row' : '') )} >{html}</div>
			);
	});
	
	var botonesForm = form.botones.map( boton =>{
		return <ButtonGroup {...boton} key={boton.key} />;
	});

	var tablaSelect = '';
	if (typeof form.tablaSelect !== 'undefined'){
		tablaSelect = form.tablaSelect.map( tabla =>{
			return <TablePaginado {...tabla} key={tabla.key} />
		});
	}
	
	return (
		<Fragment>
			<form onSubmit={form.onSubmit} className="form">
				<div className="container-fluid">
					<div className="mt-4 mb-4">
						<h4>{form.titulo}</h4>
					</div>
					{camposForm}
					{tablaSelect}
					<div className="form-group row">
						<div className="col-sm-offset-2 col-sm-10">
							{botonesForm}
						</div>
					</div>
				</div>
			</form>
		</Fragment>
	);
}