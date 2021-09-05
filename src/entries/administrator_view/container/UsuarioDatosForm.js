import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Prompt} from 'react-router';
import Formulario from '../../components/common/Formulario';
import {obtenerValorParametro} from '../../common/components/encriptar_aes';
import MensajeGuardarExitoso from '../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import validateInput from '../../components/validate/Usuario';
import {guardarUsuario, actualizarUsuario, obtenerUsuario, obtenerPerfiles} from '../../../actions/admin_view/actionGestionarPermisos';

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
			perfilesChecked: [], // Checkbox de los perfiles
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
		this.props.obtenerPerfiles(this.props.token, this.props.correoelectronico);
		if(obtenerValorParametro('id') != null){
			this.props.obtenerUsuario(obtenerValorParametro('id'), this.props.token, this.props.correoelectronico);
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.usuario !== this.props.usuario) {
			let perfilesChecked = []
			// Check a cada uno de los perfiles que tiene asignado el usuario.
			this.props.perfiles.map(p=>
				perfilesChecked.push({
					idPerfil:p.idperfil, 
					checked:this.props.usuario.perfiles.filter(up => up.idperfil == p.idperfil).length > 0 ? true : false
				}))
			this.setState({
				idUsuario: this.props.usuario.idusuario,
				nombreUsuario: this.props.usuario.nombre,
				correoElectronicoUsuario: this.props.usuario.correoelectronico,
				activoUsuario: this.props.usuario.activo,
				perfilesChecked: perfilesChecked,
				isLoading: false
			});
		}
		if (prevProps.perfiles !== this.props.perfiles) {
			let perfilesChecked = []
			this.props.perfiles.map(p=>perfilesChecked.push({idPerfil:p.idperfil, checked:false}))
			this.setState({
				perfilesChecked: perfilesChecked
			})
		}
		if (prevProps.guardarUsuarioResponse !== this.props.guardarUsuarioResponse) {
			this.limpiar();
			this.setState({ 
				isLoading: false,
				guardado: true
			})
		}
		if (prevProps.actualizarUsuarioResponse !== this.props.actualizarUsuarioResponse){
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
					errorMensaje: {mensaje: this.props.errorResponse.user_message}
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
		this.setState({[e.target.name]: e.target.value, prompt: !!(e.target.value.length)});
	}
	
	onChangeCheck(event) {
		this.setState({activoUsuario: (this.state.activoUsuario ? false : true)});
	}
	
	onChangeCheckPerfil(event) {
		const opcionSeleccionada = event.target;
		let perfilesChecked = this.state.perfilesChecked
		for(let i = 0; i < perfilesChecked.length; i += 1) {
			if(perfilesChecked[i].idPerfil == parseInt(opcionSeleccionada.value)){
				perfilesChecked[i].checked = !perfilesChecked[i].checked
				break
			}
		}
		this.setState({perfilesChecked: perfilesChecked})
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
		let perfilesChecked = this.state.perfilesChecked;
		let perfilesUsuario = [];
		if(this.state.idUsuario !== ''){
			perfilesChecked.map(p =>{
				if(p.checked){
					perfilesUsuario.push({
						idUsuario: this.state.idUsuario,
						idPerfil: p.idPerfil
					})
				}
			});
			perfilesChecked = perfilesUsuario;
		}
		this.setState({
			errors: {}, 
			isLoading: true,
			usuario:{
				idUsuario: this.state.idUsuario,
				nombre: this.state.nombreUsuario,
				correoElectronico: this.state.correoElectronicoUsuario,
				activo: this.state.activoUsuario,
				perfiles: perfilesChecked
			}
		}, () => {
			if(this.state.idUsuario === ''){
				this.props.guardarUsuario(this.state.usuario, this.props.token, this.props.correoelectronico);
			} else {
				this.props.actualizarUsuario(this.state.usuario, this.props.token, this.props.correoelectronico);
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
			perfilesChecked: [],
			prompt: false
		})
	}
	
	render() {
		const { idUsuario, nombreUsuario, correoElectronicoUsuario, activoUsuario, perfilesChecked, errors, isLoading , errorMensaje, guardado} = this.state;
		
		let rowsActivoUsuario = [{
			nombre: '',
			identificador: 'true',
			checked: activoUsuario
		}];
		let rowsPerfiles = [];
		this.props.perfiles.map((perfil, index) =>{
			rowsPerfiles.push({
				nombre: perfil.nombre,
				identificador: perfil.idperfil,
				checked: typeof perfilesChecked[index] != "undefined" ? perfilesChecked[index].checked : true
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
		guardarUsuarioResponse: state.reducerGestionarPermisos.guardarUsuarioResponse,
		actualizarUsuarioResponse: state.reducerGestionarPermisos.actualizarUsuarioResponse,
		perfiles: state.reducerGestionarPermisos.obtenerPerfilesResponse,
		usuario: state.reducerGestionarPermisos.obtenerUsuarioResponse,
		errorResponse: state.reducerGestionarPermisos.errorResponse
	}
}

export default connect(mapStateToProps, {guardarUsuario, actualizarUsuario, obtenerUsuario, obtenerPerfiles})(UsuarioDatosForm);