import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Prompt } from 'react-router';

import Formulario from '../../components/common/Formulario';
import {obtenerValorParametro} from '../../components/common-exam/Mensajes';
import MensajeGuardarExitoso from '../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';

import validateInput from '../../components/validate/Cliente';

import { guardarCliente, actualizarCliente, obtenerCliente } from '../../../actions/actionCliente';

class ClienteDatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: null,
			idCliente: '',
			nombre: '',
			nombreForm: '',
			errors: {},
			isLoading: true,
			cliente:{},
			clienteResponse:{},
			prompt: false,
			errorMensaje: '',
			guardado: false
		}
		
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickCancelar = this.onClickCancelar.bind(this);
	}
	
	componentWillMount() {
		if(obtenerValorParametro('id') != null){
			this.props.obtenerCliente(obtenerValorParametro('id'));
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.cliente !== this.props.cliente) {
			this.setState({
				idCliente: this.props.cliente.idCliente,
				nombre: this.props.cliente.nombre,
				nombreForm: this.props.cliente.nombre,
				isLoading: false
			});
		}
		if ((prevProps.guardarClienteResponse !== this.props.guardarClienteResponse) || (prevProps.actualizarClienteResponse !== this.props.actualizarClienteResponse)) {
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
					//idCliente: this.state.idCliente,
					idclient: this.state.idCliente,
					nombre: this.state.nombre
				}
			}, () => {
				if(this.state.idCliente === ''){
					this.props.guardarCliente(this.state.cliente);
				} else {
					this.props.actualizarCliente(this.state.cliente);
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
			if(window.confirm("¿Estás seguro de NO querer registrar el cliente?")){
				this.limpiar();
			}
		}
	}
	
	limpiar(){
		this.setState({
			idCliente: '',
			nombre: '',
			nombreForm: '',
			cliente: {},
			prompt: false
		})
	}
	
	render() {
		const { idCliente, nombre, nombreForm, errors, isLoading , errorMensaje, guardado} = this.state;
		//console.log('ClienteDatosForm:state', this.state);
		//console.log('ClienteDatosForm:props', this.props);
		var form = {
			titulo: (idCliente == '' || idCliente == 0 ? 'Registrar cliente' : ('Datos de cliente ').concat(nombreForm)),
			campos: [
				[{
					key: 'idCliente',
					name: 'idCliente',
					id: 'idCliente',
					type: 'hidden',
					value: idCliente,
					error: errors.idCliente,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'nombre',
					name: 'nombre',
					id: 'nombre',
					label: 'Nombre empresa : ',
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
					divClass: 'col-md-1',
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
					message="¿Estás seguro de NO querer registrar el cliente?"
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
		guardarClienteResponse : state.reducerCliente.guardarClienteResponse,
		actualizarCliente: state.reducerCliente.actualizarClienteResponse,
		cliente : state.reducerCliente.obtenerClienteResponse,
		errorResponse : state.reducerCliente.errorResponse
	}
}

export default connect(mapStateToProps, { guardarCliente, actualizarCliente, obtenerCliente })(ClienteDatosForm);