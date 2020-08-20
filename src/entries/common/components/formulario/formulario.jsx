import React, {Fragment} from 'react';
import classnames from 'classnames';

import TextFieldGroupCampos from '../../../components/common/TextFieldGroupCampos';
import ButtonGroup from '../../../components/common/ButtonGroup';
import TablePaginado from '../../../components/common/TablePaginado';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Formulario(props) {
	const {form} = props;
	var camposForm = form.campos.map( (campo, index) =>{
		var html = '';
		var classRow = true;
		html = campo.map( c =>{
			classRow = c.type.includes('-linea') ? false : true;
			console.log(c.label, classRow)
			if(c.type.includes('-autocomplete')){
				return (<Fragment key={c.key}>
					<Autocomplete
						value={c.value}
						onChange={(event, newValue) => {
							c.onChange(newValue);
						}}
						inputValue={c.inputValue}
						onInputChange={(event, newInputValue) => {
							c.onInputChange(newInputValue);
						}}
						id="controllable-states-demo"
						options={c.options}
						style={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label={c.label} size="small" />}
					/>
					</Fragment>);
            } else if(c.type == 'text-linea'){
                return (<TextField key={c.key}
                            id="filled-basic"
                            label={c.label}
                            type={c.type}
                            defaultValue={c.value}
                            className={c.fieldClass}
                            InputLabelProps={{
                                shrink: true,
							}}
							onChange={(event) => {
								c.onChange(event, c.id);
							}}
						/>)
			} else if(c.type == 'date'){
				return (<TextField key={c.key}
							id="date"
							label={c.label}
							type={c.type}
							defaultValue={c.value}
							className={c.fieldClass}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(event) => {
								c.onChange(event, c.id);
							}}
						/>)
            } else {
				var htmlCampo = TextFieldGroupCampos(c);
				return (<Fragment key={c.key}>{htmlCampo}</Fragment>);
			}
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
			<form onSubmit={form.onSubmit} className="form" autoComplete="off">
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