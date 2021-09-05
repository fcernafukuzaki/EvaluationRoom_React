import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Prompt } from 'react-router';

import Formulario from '../../components/common/Formulario';
import {obtenerValorParametro} from '../../common/components/encriptar_aes';
import MensajeGuardarExitoso from '../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';

import validateInput from '../../components/validate/Usuario';

import { guardarUsuario, obtenerUsuario, obtenerPerfiles } from '../../../actions/actionUsuario';

class UsuarioDatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			idUsuario: '',
			nombreUsuario: '',
			correoElectronicoUsuario: '',
			activoUsuario: true,
			errors: {},
			isLoading: true,
			usuario:{},
			perfilesUsuario: [],
			prompt: false,
			errorMensaje: '',
			guardado: false
		}
		
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeCheck = this.onChangeCheck.bind(this);
		this.onChangeCheckPerfil = this.onChangeCheckPerfil.bind(this);
		this.onClickCancelar = this.onClickCancelar.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerPerfiles();
		if(obtenerValorParametro('id') != null){
			this.props.obtenerUsuario(obtenerValorParametro('id'));
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.usuario !== this.props.usuario) {
			this.setState({
				idUsuario: this.props.usuario.idUsuario,
				nombreUsuario: this.props.usuario.nombre,
				correoElectronicoUsuario: this.props.usuario.correoElectronico,
				activoUsuario: this.props.usuario.activo,
				perfilesUsuario: this.props.usuario.perfiles,
				isLoading: false
			});
		}
		if (prevProps.guardarUsuarioResponse !== this.props.guardarUsuarioResponse) {
			this.limpiar();
			this.setState({ 
				isLoading: false,
				guardado: true
			})
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			if(409 == this.props.errorResponse.status){
				this.setState({
					errors : {correoElectronicoUsuario: this.props.errorResponse.mensaje},
					isLoading: false
				})
			} else {
				this.setState({
					errorMensaje: this.props.errorResponse
				})
			}
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
			this.guardar();
		}
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value, prompt: !!(e.target.value.length) });
	}
	
	onChangeCheck(event) {
		if(this.state.activoUsuario){
			this.setState({ activoUsuario: false });
		} else {
			this.setState({ activoUsuario: true });
		}
	}
	
	onChangeCheckPerfil(event) {
		const opcionSeleccionada = event.target;
		const perfilesUsuario = this.state.perfilesUsuario;
		var found = false;
		for(let i = 0; i < perfilesUsuario.length; i += 1) {
			if(perfilesUsuario[i].idPerfil == opcionSeleccionada.value){
				perfilesUsuario.splice(i,1);
				found = true;
			}
		}
		
		if(!found){
			perfilesUsuario.push({idPerfil : parseInt(opcionSeleccionada.value)});
		}
				
		this.setState({ perfilesUsuario : perfilesUsuario });
	}
	
	onClickCancelar(e) {
		if(!this.state.prompt){
			this.limpiar();
		} else {
			if(window.confirm("¿Estás seguro de NO querer registrar el usuario?")){
				this.limpiar();
			}
		}
	}
	
	guardar(){
		let perfil = this.state.perfilesUsuario;
		console.log(this.state.perfilesUsuario);
		let perfilesUsuario = [];
		if(this.state.idUsuario !== ''){
			this.state.perfilesUsuario.map( p =>{
				perfilesUsuario.push({
					idUsuario: this.state.idUsuario,
					idPerfil: p.idPerfil
				})
			});
			perfil = perfilesUsuario;
		}
		this.setState({
			errors: {}, 
			isLoading: true,
			usuario:{
				idUsuario: this.state.idUsuario,
				nombre: this.state.nombreUsuario,
				correoElectronico: this.state.correoElectronicoUsuario,
				activo: this.state.activoUsuario,
				perfiles: perfil
			}
		}, () => {
			if(this.state.idUsuario === ''){
				this.props.guardarUsuario(this.state.usuario);
			} else {
				this.props.guardarUsuario(this.state.usuario);
			}
		});
	}
	
	limpiar(){
		this.setState({
			idUsuario: '',
			nombreUsuario: '',
			correoElectronicoUsuario: '',
			activoUsuario: true,
			usuario: {},
			perfilesUsuario: [],
			prompt: false
		})
	}
	
	render() {
		const { idUsuario, nombreUsuario, correoElectronicoUsuario, activoUsuario, perfilesUsuario, errors, isLoading , errorMensaje, guardado} = this.state;
		//console.log('UsuarioDatosForm:state', this.state);
		//console.log('UsuarioDatosForm:props', this.props);
		let rowsActivoUsuario = [{
			nombre: '',
			identificador: 'true',
			checked: activoUsuario
		}];
		let rowsPerfiles = [];
		this.props.perfiles.map( perfil =>{
			var checked = false;
			if(perfilesUsuario.length > 0){
				checked = perfilesUsuario.filter(p => p.idPerfil == perfil.idPerfil).length > 0 ? true : false;
			}
			rowsPerfiles.push({
				nombre: perfil.nombre,
				identificador: perfil.idPerfil,
				checked: checked
			})
		});
		
		var form = {
			titulo: (idUsuario == '' ? 'Registrar usuario' : ('Datos de usuario ').concat(nombreUsuario)),
			campos: [
				[{
					key: 'idUsuario',
					name: 'idUsuario',
					id: 'idUsuario',
					type: 'hidden',
					value: idUsuario,
					error: errors.idUsuario,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'nombreUsuario',
					name: 'nombreUsuario',
					id: 'nombreUsuario',
					label: 'Nombre de usuario : ',
					type: 'text-linea',
					value: nombreUsuario.replace(/\b\w/g, function(l){ return l.toUpperCase() }),
					error: errors.nombreUsuario,
					onChange: this.onChange,
					labelClass: 'col-md-3',
					fieldClass: 'col-md-5',
					//textClass: 'text-capitalize',
					required: 'true'
				}] , [{
					key: 'correoElectronicoUsuario',
					name: 'correoElectronicoUsuario',
					id: 'correoElectronicoUsuario',
					label: 'Correo electrónico : ',
					type: 'text-linea',
					value: correoElectronicoUsuario.toLowerCase(),
					error: errors.correoElectronicoUsuario,
					onChange: this.onChange,
					labelClass: 'col-md-3',
					fieldClass: 'col-md-5',
					//textClass: 'text-lowercase',
					required: 'true'
				}] , [{
					key: 'activoUsuario',
					name: 'activoUsuario',
					id: 'activoUsuario',
					label: 'Activo : ',
					type: 'check',
					value: rowsActivoUsuario,
					error: errors.activoUsuario,
					onChange: this.onChangeCheck,
					labelClass: 'col-md-3',
					fieldClass: 'col-md-5'
				}] , [{
					key: 'perfilesUsuario',
					name: 'perfilesUsuario',
					id: 'perfilesUsuario',
					label: 'Perfiles : ',
					type: 'check',
					value: rowsPerfiles,
					error: errors.perfilesUsuario,
					onChange: this.onChangeCheckPerfil,
					labelClass: 'col-md-3',
					fieldClass: 'col-md-5'
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
					message="¿Estás seguro de NO querer registrar el usuario?"
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
		guardarUsuarioResponse : state.reducerUsuario.guardarUsuarioResponse,
		perfiles : state.reducerUsuario.obtenerPerfilesResponse,
		usuario : state.reducerUsuario.obtenerUsuarioResponse,
		errorResponse : state.reducerUsuario.errorResponse
	}
}

export default connect(mapStateToProps, { guardarUsuario, obtenerUsuario, obtenerPerfiles })(UsuarioDatosForm);