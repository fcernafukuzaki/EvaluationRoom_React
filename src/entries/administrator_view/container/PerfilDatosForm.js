import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Prompt} from 'react-router';
import Formulario from '../../components/common/Formulario';
import {obtenerValorParametro} from '../../common/components/encriptar_aes';
import MensajeGuardarExitoso from '../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import validateInput from '../../components/validate/Perfil';
import {guardarPerfil, obtenerPerfil} from '../../../actions/admin_view/actionGestionarPermisos';

class PerfilDatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			idPerfil: '',
			nombrePerfil: '',
			nombrePerfilForm: '',
			errors: {},
			isLoading: true,
			perfil:{},
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
			this.props.obtenerPerfil(obtenerValorParametro('id'), this.props.token, this.props.correoelectronico);
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.obtenerPerfilResponse !== this.props.obtenerPerfilResponse) {
			this.setState({
				idPerfil: this.props.obtenerPerfilResponse.idPerfil,
				nombrePerfil: this.props.obtenerPerfilResponse.nombre,
				nombrePerfilForm: this.props.obtenerPerfilResponse.nombre,
				isLoading: false
			});
		}
		if (prevProps.guardarPerfilResponse !== this.props.guardarPerfilResponse) {
			this.limpiar();
			this.setState({
				isLoading: false,
				guardado: true
			})
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			this.setState({
				errorMensaje: {mensaje: this.props.errorResponse.user_message}
			})
		}
	}
	
	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if (!isValid) { this.setState({ errors : errors }) }
		return isValid;
	}
	
	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({
				errors: {},
				isLoading: true,
				perfil:{
					idPerfil: this.state.idPerfil,
					nombre: this.state.nombrePerfil
				}
			}, () => {
				if(this.state.idPerfil === ''){
					this.props.guardarPerfil(this.state.perfil, this.props.token, this.props.correoelectronico);
				} else {
					this.props.guardarPerfil(this.state.perfil, this.props.token, this.props.correoelectronico);
				}
			});
		}
	}
	
	onChange(e) {
		this.setState({[e.target.name]: e.target.value, prompt: !!(e.target.value.length)});
	}
	
	onClickCancelar(e) {
		if(!this.state.prompt){
			this.limpiar();
		} else {
			if(window.confirm("¿Estás seguro de NO querer registrar el perfil?")){
				this.limpiar();
			}
		}
	}
	
	limpiar(){
		this.setState({
			perfil: {},
			idPerfil: '',
			nombrePerfil: '',
			nombrePerfilForm: '',
			prompt: false
		})
	}
	
	render() {
		const { idPerfil, nombrePerfil, nombrePerfilForm, errors, isLoading , errorMensaje, guardado} = this.state;
		
		var form = {
			titulo: (idPerfil == '' ? 'Registrar perfil' : ('Datos de perfil ').concat(nombrePerfilForm)),
			campos: [
				[{
					key: 'idPerfil',
					name: 'idPerfil',
					id: 'idPerfil',
					type: 'hidden',
					value: idPerfil,
					error: errors.idPerfil,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'nombrePerfil',
					name: 'nombrePerfil',
					id: 'nombrePerfil',
					label: 'Nombre perfil : ',
					type: 'text-linea',
					value: nombrePerfil.toUpperCase(),
					error: errors.nombrePerfil,
					onChange: this.onChange,
					labelClass: 'col-md-4',
					fieldClass: 'col-md-5',
					//textClass: 'text-uppercase',
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
					message="¿Estás seguro de NO querer registrar el perfil?"
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
		guardarPerfilResponse: state.reducerGestionarPermisos.guardarPerfilResponse,
		obtenerPerfilResponse: state.reducerGestionarPermisos.obtenerPerfilResponse,
		errorResponse: state.reducerGestionarPermisos.errorResponse
	}
}

export default connect(mapStateToProps, { guardarPerfil, obtenerPerfil })(PerfilDatosForm);