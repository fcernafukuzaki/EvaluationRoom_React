import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';

import Formulario from '../../components/common/Formulario';
import {obtenerValorParametro} from '../../components/common-exam/Mensajes';
import MensajeGuardarExitoso from '../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';

import validateInput from '../components/client_form_validate';

import { addClient, updateClient, obtenerCliente } from '../../../actions/actionCliente';

class ClientForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: null,
			idclient: '',
			nameClient: '',
			nombreForm: '',
			errors: {},
			isLoading: true,
			cliente:{},
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
				idclient: this.props.cliente.idcliente,
				nameClient: this.props.cliente.nombre,
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
				cliente: this.state.idclient === '' ? 
                    {
                        nombre: this.state.nameClient
                    } : {
                        idclient: this.state.idclient,
                        nombre: this.state.nameClient
                    }
			}, () => {
				if(this.state.idclient === ''){
					this.props.addClient(this.state.cliente);
				} else {
					this.props.updateClient(this.state.cliente);
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
			idclient: '',
			nameClient: '',
			nombreForm: '',
			cliente: {},
			prompt: false
		})
	}
	
	render() {
		const { idclient, nameClient, nombreForm, errors, isLoading , errorMensaje, guardado} = this.state;
		
		var form = {
			titulo: (idclient == '' || idclient == 0 ? 'Registrar cliente' : ('Datos de cliente ').concat(nombreForm)),
			campos: [
				[{
					key: 'idclient',
					name: 'idclient',
					id: 'idclient',
					type: 'hidden',
					value: idclient,
					error: errors.idclient,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'nameClient',
					name: 'nameClient',
					id: 'nameClient',
					label: 'Nombre empresa : ',
					type: 'text-linea',
					value: nameClient,
					error: errors.nameClient,
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
		actualizarClienteResponse: state.reducerCliente.actualizarClienteResponse,
		cliente : state.reducerCliente.obtenerClienteResponse,
		errorResponse : state.reducerCliente.errorResponse
	}
}

export default connect(mapStateToProps, { addClient, updateClient, obtenerCliente })(ClientForm);