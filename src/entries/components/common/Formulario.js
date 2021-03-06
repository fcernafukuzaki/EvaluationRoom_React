import React, {Fragment} from 'react';
import classnames from 'classnames';

import TextFieldGroupCampos from './TextFieldGroupCampos';
import ButtonGroup from './ButtonGroup';
import TablePaginado from './TablePaginado';
import {obtenerTextoBienvenidaPorParrafos} from '../../candidate_view/candidate_tests_web/common/Mensajes';

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
					<div className={classnames('mt-4 mb-4', (
							typeof form.tituloConfiguracion !== 'undefined' ? 
							(typeof form.tituloConfiguracion.tituloCentrado !== 'undefined' ? 
								(form.tituloConfiguracion.tituloCentrado ? 'texto_centrado' : '')
								: ''
							) : ''
						))}>
						{typeof form.tituloConfiguracion !== 'undefined' ? 
						<h5>{obtenerTextoBienvenidaPorParrafos(form.titulo)}</h5> :
						<h4>{obtenerTextoBienvenidaPorParrafos(form.titulo)}</h4>
						}
					</div>
					{camposForm}
					{tablaSelect}
					<div className={classnames('form-group row', (
							typeof form.botonesConfiguracion !== 'undefined' ? 
							(typeof form.botonesConfiguracion.botonesCentrado !== 'undefined' ? 
								(form.botonesConfiguracion.botonesCentrado ? 'texto_centrado' : '')
								: ''
							) : ''
						))}>
						<div className="col-sm-offset-2 col-sm-12">
							{botonesForm}
						</div>
					</div>
				</div>
			</form>
		</Fragment>
	);
}