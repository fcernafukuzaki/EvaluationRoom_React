import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Prompt } from 'react-router';

import Formulario from '../../components/common/Formulario';
import {obtenerValorParametro} from '../../components/common-exam/Mensajes';
import MensajeGuardarExitoso from '../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';

import validateInput from '../../components/validate/PuestoLaboral';

import { guardarPuestosLaborales, obtenerPuestoLaboral
} from '../../../actions/actionCliente';

class PuestoLaboralDatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: null,
			idCliente: obtenerValorParametro('id'),
			idPuestoLaboral: '',
			nombre: '',
			nombreForm: '',
			errors: {},
			isLoading: true,
			cliente:{},
			//puestoLaboral:{},
			puestoLaboralResponse:{},
			prompt: false,
			errorMensaje: '',
			guardado: false
		}
		
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickCancelar = this.onClickCancelar.bind(this);
	}
	
	componentWillMount() {
		if(obtenerValorParametro('idp') != null){
			this.props.obtenerPuestoLaboral(obtenerValorParametro('id'), obtenerValorParametro('idp'));
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.puestoLaboral !== this.props.puestoLaboral) {
			this.setState({
				idPuestoLaboral: this.props.puestoLaboral.idPuestoLaboral,
				nombre: this.props.puestoLaboral.nombre,
				nombreForm: this.props.puestoLaboral.nombre,
				isLoading: false
			});
		}
		if (prevProps.guardarPuestosLaboralesResponse !== this.props.guardarPuestosLaboralesResponse) {
			this.limpiar();
			this.setState({ 
				isLoading: false,
				guardado: true
			})
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			this.setState({
				isLoading: false,
				errorMensaje: this.props.errorResponse
			})
		}
	}
	
	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if (!isValid) { this.setState({	errors : errors	}) }
		return isValid;
	}
	
	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({
				errors: {}, 
				isLoading: true,
				cliente:{
					idCliente: this.state.idCliente,
					puestosLaborales: [{
						idCliente: this.state.idCliente,
						idPuestoLaboral: this.state.idPuestoLaboral,
						nombre: this.state.nombre
					}]
				}
			}, () => {
				if(this.state.idPuestoLaboral === ''){
					this.props.guardarPuestosLaborales(this.state.cliente);
				} else {
					this.props.guardarPuestosLaborales(this.state.cliente);
				}
			});
		}
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value, prompt: !!(e.target.value.length) });
	}
	
	onClickCancelar(e) {
		if(!this.state.prompt){
			this.limpiar();
		} else {
			if(window.confirm("¿Estás seguro de NO querer registrar el puesto laboral?")){
				this.limpiar();
			}
		}
	}
	
	limpiar(){
		this.setState({
			cliente: {},
			idPuestoLaboral: '',
			nombre: '',
			nombreForm: '',
			prompt: false
		})
	}
	
	render() {
		const { idPuestoLaboral, nombre, nombreForm, errors, isLoading , errorMensaje, guardado} = this.state;
		//console.log('PuestoLaboralDatosForm', this.state);
		var form = {
			titulo: (idPuestoLaboral == '' || idPuestoLaboral == 0 ? 'Registrar puesto laboral' : ('Datos de puesto laboral ').concat(nombreForm)),
			campos: [
				[{
					key: 'idPuestoLaboral',
					name: 'idPuestoLaboral',
					id: 'idPuestoLaboral',
					type: 'hidden',
					value: idPuestoLaboral,
					error: errors.idPuestoLaboral,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'nombre',
					name: 'nombre',
					id: 'nombre',
					label: 'Nombre puesto laboral : ',
					type: 'text-linea',
					value: nombre,
					error: errors.nombre,
					onChange: this.onChange,
					labelClass: 'col-md-4',
					fieldClass: 'col-md-5',
					required: 'true'
				}]
			],
			botones: [
				{
					key: 'guardar',
					label: 'Guardar',
					divClass: 'col-md-4',
					botonClass: 'btn-primary btn-md',
					tipo: 'button-submit',
					isLoading: isLoading
				} , {
					key: 'cancelar',
					label: 'Cancelar',
					divClass: 'col-md-1',
					botonClass: 'btn-primary btn-md',
					tipo: 'button',
					onClick: this.onClickCancelar,
					isLoading: isLoading
				}],
				onSubmit: this.onSubmit.bind(this)
			}
		return (
			<div className="mt-3 mx-auto ancho800">
				<Prompt
					when={this.state.prompt}
					message="¿Estás seguro de NO querer registrar el puesto laboral?"
				/>
				{isLoading && <CargandoImagen />}
				{errorMensaje != '' && <MensajeError error={errorMensaje} />}
				<Formulario form={form} />
				<MensajeGuardarExitoso cargando={guardado} mensaje={"Se guardó exitosamente!"} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		guardarPuestosLaboralesResponse : state.reducerCliente.guardarPuestosLaboralesResponse,
		puestoLaboral : state.reducerCliente.obtenerPuestoLaboralResponse,
		errorResponse : state.reducerCliente.errorResponse
	}
}

export default connect(mapStateToProps, { guardarPuestosLaborales, obtenerPuestoLaboral })(PuestoLaboralDatosForm);