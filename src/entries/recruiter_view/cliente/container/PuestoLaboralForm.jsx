import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';

import Formulario from '../../../components/common/Formulario';
import {obtenerValorParametro} from '../../../common/components/encriptar_aes';
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../../components/common/MensajeError';
import CargandoImagen from '../../../components/common/CargandoImagen';
import {getDateFormat} from '../../../common/components/date_util'
import validateInput from '../components/jobposition_form_validate';

import {guardarPuestosLaborales, actualizarPuestosLaborales, getJobPosition} from '../../../../actions/actionCliente';

class PuestoLaboralForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: null,
			idclient: obtenerValorParametro('id'),
			idjobposition: '',
			nameJobPosition: '',
			dateProcessBegin: getDateFormat(),
            dateProcessEnd: getDateFormat(),
			processActive: 'True',
            nameForm: '',
			errors: {},
			isLoading: true,
			jobposition:{},
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
			this.props.getJobPosition(obtenerValorParametro('id'), obtenerValorParametro('idp'));
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.puestoLaboral !== this.props.puestoLaboral) {
			this.setState({
				idjobposition: this.props.puestoLaboral.idpuestolaboral,
				nameJobPosition: this.props.puestoLaboral.nombre,
				nameForm: this.props.puestoLaboral.nombre,
				isLoading: false
			});
		}
		if ((prevProps.guardarPuestosLaboralesResponse !== this.props.guardarPuestosLaboralesResponse) || (prevProps.actualizarPuestosLaboralesResponse !== this.props.actualizarPuestosLaboralesResponse)) {
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
				jobposition: this.state.idjobposition === '' ? 
					{
						idclient: this.state.idclient,
                        nombre: this.state.nameJobPosition,
                        date_process_begin: this.state.dateProcessBegin,
                        date_process_end: this.state.dateProcessEnd,
                        user_register: '',
						process_active: this.state.processActive
					} : {
						idclient: this.state.idclient,
                        idjobposition: this.state.idjobposition,
                        nombre: this.state.nameJobPosition,
                        date_process_begin: this.state.dateProcessBegin,
                        date_process_end: this.state.dateProcessEnd,
                        user_register: '',
                        process_active: this.state.processActive
					}
			}, () => {
				if(this.state.idjobposition === ''){
					this.props.guardarPuestosLaborales(this.state.jobposition);
				} else {
					this.props.actualizarPuestosLaborales(this.state.jobposition);
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
			jobposition: {},
			idjobposition: '',
			nameJobPosition: '',
			dateProcessBegin: getDateFormat(),
            dateProcessEnd: getDateFormat(),
			processActive: 'True',
            nameForm: '',
			prompt: false
		})
	}
	
	render() {
		const { idjobposition, nameJobPosition, nameForm, errors, isLoading , errorMensaje, guardado} = this.state;
		
		var form = {
			titulo: (idjobposition == '' || idjobposition == 0 ? 'Registrar puesto laboral' : ('Datos de puesto laboral ').concat(nameForm)),
			campos: [
				[{
					key: 'idjobposition',
					name: 'idjobposition',
					id: 'idjobposition',
					type: 'hidden',
					value: idjobposition,
					error: errors.idjobposition,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'nameJobPosition',
					name: 'nameJobPosition',
					id: 'nameJobPosition',
					label: 'Nombre puesto laboral : ',
					type: 'text-linea',
					value: nameJobPosition,
					error: errors.nameJobPosition,
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
		actualizarPuestosLaboralesResponse: state.reducerCliente.actualizarPuestosLaboralesResponse,
		puestoLaboral : state.reducerCliente.getJobPositionResponse,
		errorResponse : state.reducerCliente.errorResponse
	}
}

export default connect(mapStateToProps, { guardarPuestosLaborales, actualizarPuestosLaborales, getJobPosition })(PuestoLaboralForm);