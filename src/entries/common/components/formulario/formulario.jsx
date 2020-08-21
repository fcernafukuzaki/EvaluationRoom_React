import React, {Fragment} from 'react';
import classnames from 'classnames';

import TextFieldGroupCampos from '../../../components/common/TextFieldGroupCampos';
import ButtonGroup from '../../../components/common/ButtonGroup';
import TablePaginado from '../../../components/common/TablePaginado';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Formulario(props) {
	const {form} = props;

	var camposForm = form.campos.map( (campo, index) =>{
		var html = '';
		var classRow = true;
		html = campo.map( c =>{
			classRow = c.type.includes('-linea') ? false : true;
			if(c.type.includes('-autocomplete')){
				return (<FormControl key={c.key} className={c.fieldClass}>
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
						renderInput={(params) => <TextField {...params} 
							InputLabelProps={{
								shrink: true,
							}} 
							label={c.label} 
							size="small" />}
					/>
					<FormHelperText>{c.error}</FormHelperText>
					</FormControl>);
            } else if(c.type == 'text-linea'){
                return (
					<FormControl key={c.key} className={c.fieldClass} error={c.required}>
						<TextField 
                            id="filled-basic"
                            label={c.label}
                            type={c.type}
							defaultValue={c.value}
							style={{ width: 450 }}
                            InputLabelProps={{
                                shrink: true,
							}}
							onChange={(event) => {
								c.onChange(event, c.id);
							}}
						/>
						<FormHelperText>{c.error}</FormHelperText>
					</FormControl>)
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
			} else if(c.type == 'select'){
				let rows = []
				c.value.map(e => {
					rows.push(<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)
				})
				return (
					<FormControl key={c.key} className={c.fieldClass}>
						<InputLabel id="demo-simple-select-helper-label">{c.label}</InputLabel>
						<Select
							labelId="demo-simple-select-helper-label"
							id="demo-simple-select-helper"
							value={c.valueSelected}
							onChange={(event) => {
								c.onChange(event, c.id);
							}}
							>
							{rows}
						</Select>
						<FormHelperText>{c.error}</FormHelperText>
					</FormControl>)
            } else {
				var htmlCampo = TextFieldGroupCampos(c);
				return (<Fragment key={c.key}>{htmlCampo}</Fragment>);
			}
		});
		return (<div key={index} className={campo[0].type == 'hidden' ? '' :
				//classnames('form-group',(classRow ? 'row' : '') )} >{html}</div>
				classnames('form-group')} >{html}</div>
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
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							{botonesForm}
						</div>
					</div>
					{camposForm}
					{tablaSelect}
				</div>
			</form>
		</Fragment>
	);
}