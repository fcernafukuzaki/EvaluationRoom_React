import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Prompt } from 'react-router';

import Formulario from '../../../components/common/Formulario';
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../../components/common/MensajeError';
import CargandoImagen from '../../../components/common/CargandoImagen';
import {encriptarAES} from '../../../common/components/encriptar_aes';

import {validateInput, validateInputCandidatoRegistrado} from '../../../components/validate/Candidato';

import { obtenerTipoDirecciones } from '../../../../actions/actionTipoDireccion';
import { obtenerPaises, obtenerPaisesNacimiento } from '../../../../actions/actionPais';
import { obtenerDepartamentos, obtenerDepartamentosNacimiento } from '../../../../actions/actionDepartamento';
import { obtenerProvincias, obtenerProvinciasNacimiento } from '../../../../actions/actionProvincia';
import { obtenerDistritos, obtenerDistritosNacimiento } from '../../../../actions/actionDistrito';
import { obtenerSexos } from '../../../../actions/actionSexo';
import { obtenerEstadosCiviles } from '../../../../actions/actionEstadoCivil';
import { obtenerDocumentosIdentidad } from '../../../../actions/actionDocumentoIdentidad';
import { guardarCandidatoTestPsicologico, validarCandidatoRegistrado
} from '../../../../actions/actionCandidato';

class CandidatoDatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: null,
			idCandidato: '',
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			correoElectronico: '',
			idDocumentoIdentidad: '1',
			numeroDocumentoIdentidad: '',
			idEstadoCivil: '0',
			cantidadHijos: '0',
			numeroCelular: '',
			numeroTelefono: '',
			lugarDomicilio: '',
			lugarNacimiento: '',
			fechaNacimiento: '',
			idSexo: '0',
			idTipoDireccion: '',
			idPaisDomicilio: '1',
			idDepartamentoDomicilio: '15',
			idProvinciaDomicilio: '1501',
			idDistritoDomicilio: '',
			idPaisNacimiento: '1',
			idDepartamentoNacimiento: '15',
			idProvinciaNacimiento: '1501',
			idDistritoNacimiento: '',
			errors: {},
			isLoading: true,
			candidato:{},
			testPsicologicos: [{idTestPsicologico : 1},{idTestPsicologico : 2},{idTestPsicologico : 3}],
			prompt: false,
			errorMensaje: '',
			guardado: false,
			esCandidatoRegistrado: null
		}
		
		this.validarCandidatoRegistrado = this.validarCandidatoRegistrado.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickCancelar = this.onClickCancelar.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerSexos();
		this.props.obtenerEstadosCiviles();
		this.props.obtenerDocumentosIdentidad();
		this.props.obtenerTipoDirecciones();
		this.props.obtenerPaises();
		this.props.obtenerPaisesNacimiento();
		this.props.obtenerDepartamentos(1);
		this.props.obtenerProvincias(1,15);
		this.props.obtenerDistritos(1,15,1501);
		this.props.obtenerDepartamentosNacimiento(1);
		this.props.obtenerProvinciasNacimiento(1,15);
		this.props.obtenerDistritosNacimiento(1,15,1501);
		this.setState({
			isLoading: false
		});
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.validarCandidatoRegistradoResponse !== this.props.validarCandidatoRegistradoResponse) {
			if(this.props.validarCandidatoRegistradoResponse.correoElectronico !== '' && 
					this.props.validarCandidatoRegistradoResponse.selfRegistration){
				var hashIdCandidato = encriptarAES(this.props.validarCandidatoRegistradoResponse.idCandidato.toString());
				window.location.href = ('/pages/examen.html?id=').concat(hashIdCandidato);
			} else {
				var candidatoResponse = this.props.validarCandidatoRegistradoResponse;
				
				var fechaFormat = '';
				if(typeof candidatoResponse.fechaNacimiento != "undefined"){
					var fecha = new Date(candidatoResponse.fechaNacimiento);
					fechaFormat = fecha.getFullYear() + "-" + (fecha.getMonth() < 9 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "-" + (fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate());
				}
				
				var idPaisDomicilio = this.state.idPaisDomicilio;
				var idDepartamentoDomicilio = this.state.idDepartamentoDomicilio;
				var idProvinciaDomicilio = this.state.idProvinciaDomicilio;
				var idDistritoDomicilio = this.state.idDistritoDomicilio;
				var lugarDomicilio = this.state.lugarDomicilio;
				
				var idPaisNacimiento = this.state.idPaisNacimiento;
				var idDepartamentoNacimiento = this.state.idDepartamentoNacimiento;
				var idProvinciaNacimiento = this.state.idProvinciaNacimiento;
				var idDistritoNacimiento = this.state.idDistritoNacimiento;
				if(typeof candidatoResponse.direcciones != "undefined"){
					idPaisDomicilio = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1)[0].pais.idPais : '1';
					idDepartamentoDomicilio = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1)[0].departamento.idDepartamento : '0';
					idProvinciaDomicilio = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1)[0].provincia.idProvincia : '0';
					idDistritoDomicilio = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1)[0].distrito.idDistrito : '0';
					
					lugarDomicilio = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 1)[0].direccion : '';
					
					idPaisNacimiento = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2)[0].pais.idPais : '1';
					idDepartamentoNacimiento = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2)[0].departamento.idDepartamento : '0';
					idProvinciaNacimiento = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2)[0].provincia.idProvincia : '0';
					idDistritoNacimiento = candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? candidatoResponse.direcciones.filter( d => d.idTipoDireccion == 2)[0].distrito.idDistrito : '0';
					
					this.props.obtenerDepartamentos(idPaisDomicilio);
					this.props.obtenerProvincias(idPaisDomicilio, idDepartamentoDomicilio);
					this.props.obtenerDistritos(idPaisDomicilio, idDepartamentoDomicilio, idProvinciaDomicilio);
					this.props.obtenerDepartamentosNacimiento(idPaisNacimiento);
					this.props.obtenerProvinciasNacimiento(idPaisNacimiento, idDepartamentoNacimiento);
					this.props.obtenerDistritosNacimiento(idPaisNacimiento, idDepartamentoNacimiento, idProvinciaNacimiento);
				}
				// Objeto candidatoValidarInput
				var candidatoValidarInput = {
					idCandidato: candidatoResponse.idCandidato,
					nombre: candidatoResponse.nombre == null ? this.state.nombre : candidatoResponse.nombre,
					apellidoPaterno: candidatoResponse.apellidoPaterno == null ? this.state.apellidoPaterno : candidatoResponse.apellidoPaterno,
					apellidoMaterno: candidatoResponse.apellidoMaterno == null ? this.state.apellidoMaterno : candidatoResponse.apellidoMaterno,
					correoElectronico: candidatoResponse.correoElectronico,
					idDocumentoIdentidad: candidatoResponse.documentoIdentidad.idDocumentoIdentidad,
					numeroDocumentoIdentidad: candidatoResponse.numeroDocumentoIdentidad == null ? this.state.numeroDocumentoIdentidad : candidatoResponse.numeroDocumentoIdentidad,
					idEstadoCivil: candidatoResponse.estadoCivil.idEstadoCivil,
					cantidadHijos: candidatoResponse.cantidadHijos,
					numeroCelular: candidatoResponse.telefonos.filter( t => t.idTelefono == 1).length > 0 ? candidatoResponse.telefonos.filter( t => t.idTelefono == 1)[0].numero : '',
					numeroTelefono: candidatoResponse.telefonos.filter( t => t.idTelefono == 2).length > 0 ? candidatoResponse.telefonos.filter( t => t.idTelefono == 2)[0].numero : '',
					lugarDomicilio: lugarDomicilio,
					fechaNacimiento: fechaFormat,
					idSexo: candidatoResponse.sexo.idSexo,
					idPaisDomicilio: idPaisDomicilio,
					idDepartamentoDomicilio: idDepartamentoDomicilio,
					idProvinciaDomicilio: idProvinciaDomicilio,
					idDistritoDomicilio: idDistritoDomicilio,
					idPaisNacimiento: idPaisNacimiento,
					idDepartamentoNacimiento: idDepartamentoNacimiento,
					idProvinciaNacimiento: idProvinciaNacimiento,
					idDistritoNacimiento: idDistritoNacimiento,
					testPsicologicos: candidatoResponse.testPsicologicos
				}
				
				this.setState({ 
					isLoading: false,
					esCandidatoRegistrado: false,
					idCandidato: candidatoResponse.idCandidato,
					nombre: candidatoResponse.nombre == null ? this.state.nombre : candidatoResponse.nombre,
					apellidoPaterno: candidatoResponse.apellidoPaterno == null ? this.state.apellidoPaterno : candidatoResponse.apellidoPaterno,
					apellidoMaterno: candidatoResponse.apellidoMaterno == null ? this.state.apellidoMaterno : candidatoResponse.apellidoMaterno,
					correoElectronico: candidatoResponse.correoElectronico,
					idDocumentoIdentidad: candidatoResponse.documentoIdentidad.idDocumentoIdentidad,
					numeroDocumentoIdentidad: candidatoResponse.numeroDocumentoIdentidad == null ? this.state.numeroDocumentoIdentidad : candidatoResponse.numeroDocumentoIdentidad,
					idEstadoCivil: candidatoResponse.estadoCivil.idEstadoCivil,
					cantidadHijos: candidatoResponse.cantidadHijos,
					numeroCelular: candidatoResponse.telefonos.filter( t => t.idTelefono == 1).length > 0 ? candidatoResponse.telefonos.filter( t => t.idTelefono == 1)[0].numero : '',
					numeroTelefono: candidatoResponse.telefonos.filter( t => t.idTelefono == 2).length > 0 ? candidatoResponse.telefonos.filter( t => t.idTelefono == 2)[0].numero : '',
					lugarDomicilio: lugarDomicilio,
					fechaNacimiento: fechaFormat,
					idSexo: candidatoResponse.sexo.idSexo,
					idPaisDomicilio: idPaisDomicilio,
					idDepartamentoDomicilio: idDepartamentoDomicilio,
					idProvinciaDomicilio: idProvinciaDomicilio,
					idDistritoDomicilio: idDistritoDomicilio,
					idPaisNacimiento: idPaisNacimiento,
					idDepartamentoNacimiento: idDepartamentoNacimiento,
					idProvinciaNacimiento: idProvinciaNacimiento,
					idDistritoNacimiento: idDistritoNacimiento,
					testPsicologicos: candidatoResponse.testPsicologicos
				})
				
				//const { errors, isValid } = validateInput(this.state);
				const { errors, isValid } = validateInput(candidatoValidarInput);
				
				if( isValid ){
					var hashIdCandidato = encriptarAES(this.props.validarCandidatoRegistradoResponse.idCandidato.toString());
					window.location.href = ('/pages/examen.html?id=').concat(hashIdCandidato);
				} else {
					this.setState({ 
						isLoading: false,
						esCandidatoRegistrado: false
					})
				}
			}
		}
		if (prevProps.guardarCandidatoTestPsicologicoResponse !== this.props.guardarCandidatoTestPsicologicoResponse) {
			if(this.props.guardarCandidatoTestPsicologicoResponse.idCandidato !== ''){
				var hashIdCandidato = encriptarAES(this.props.guardarCandidatoTestPsicologicoResponse.idCandidato.toString());
				window.location.href = ('/pages/examen.html?id=').concat(hashIdCandidato);
			} else {
				this.setState({
					errorMensaje: {status: 'ERROR_OTROS', mensaje: 'Ocurrió un error al registrar sus datos.'}
				})
			}
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			//console.log('error', this.props.errorResponse);
			if(404 == this.props.errorResponse.status){
				this.setState({
					isLoading: false,
					esCandidatoRegistrado: false
				})
			} else if(409 == this.props.errorResponse.status){
				let error = {};
				if(this.props.errorResponse.mensaje.indexOf('Correo') > -1){
					error = {correoElectronico: this.props.errorResponse.mensaje}
				} else if(this.props.errorResponse.mensaje.indexOf('Número de documento') > -1){
					error = {numeroDocumentoIdentidad: this.props.errorResponse.mensaje}
				}
				this.setState({
					errors : error,
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
	
	esValidoCandidatoRegistrado() {
		const { errors, isValid } = validateInputCandidatoRegistrado(this.state);
		if (!isValid) { this.setState({	errors : errors	}) }
		return isValid;
	}
	
	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.guardar();
		}
	}
	
	validarCandidatoRegistrado(e){
		e.preventDefault();
		if (this.esValidoCandidatoRegistrado()) {
			let candidato = {correoElectronico: this.state.correoElectronico}
			this.props.validarCandidatoRegistrado(candidato);
		}
	}
	
	guardar(){
		let telefonosCandidato = [];
		if(this.state.numeroCelular){
			var numeroCelular = {
				idCandidato: this.state.idCandidato,
				idTelefono: 1,
				numero: this.state.numeroCelular
			};
			telefonosCandidato.push(numeroCelular);
		}
		if(this.state.numeroTelefono){
			var numeroTelefono = {
				idCandidato: this.state.idCandidato,
				idTelefono: 2,
				numero: this.state.numeroTelefono
			};
			telefonosCandidato.push(numeroTelefono);
		}
		var tests = this.state.testPsicologicos;
		var testCandidato = [];
		if(this.state.idCandidato !== ''){
			this.state.testPsicologicos.map( t => {
				testCandidato.push({
					idCandidato: this.state.idCandidato,
					idTestPsicologico: t.idTestPsicologico
				})
			});
			tests = testCandidato;
		}
		this.setState({
			errors: {}, 
			isLoading: true,
			candidato:{
				idCandidato: this.state.idCandidato,
				nombre: this.state.nombre,
				apellidoPaterno: this.state.apellidoPaterno,
				apellidoMaterno: this.state.apellidoMaterno,
				correoElectronico: this.state.correoElectronico,
				documentoIdentidad: {
					idDocumentoIdentidad: this.state.idDocumentoIdentidad
				},
				numeroDocumentoIdentidad: this.state.numeroDocumentoIdentidad,
				estadoCivil: {
					idEstadoCivil: this.state.idEstadoCivil
				},
				sexo: {idSexo: this.state.idSexo},
				cantidadHijos: this.state.cantidadHijos,
				telefonos: telefonosCandidato,
				fechaNacimiento: this.state.fechaNacimiento,
				testPsicologicos: tests,
				direcciones: [{
					idTipoDireccion: 1,
					pais: {idPais: this.state.idPaisDomicilio},
					departamento: {idDepartamento: this.state.idDepartamentoDomicilio},
					provincia: {idProvincia: this.state.idProvinciaDomicilio},
					distrito: {idDistrito: this.state.idDistritoDomicilio},
					direccion: this.state.lugarDomicilio
				},{
					idTipoDireccion: 2,
					pais: {idPais: this.state.idPaisNacimiento},
					departamento: {idDepartamento: this.state.idDepartamentoNacimiento},
					provincia: {idProvincia: this.state.idProvinciaNacimiento},
					distrito: {idDistrito: this.state.idDistritoNacimiento},
					direccion: this.state.lugarNacimiento
				}]
			}
		}, () => {
			if(this.state.idCandidato === ''){
				this.props.guardarCandidatoTestPsicologico(this.state.candidato);
			} else {
				this.props.guardarCandidatoTestPsicologico(this.state.candidato);
			}
		});
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value, prompt: !!(e.target.value.length) });
		
		if(e.target.name === 'idPaisDomicilio'){
			this.props.obtenerPaises(e.target.value);
			this.props.obtenerDepartamentos(e.target.value);
			this.props.obtenerProvincias(e.target.value, 0);
			this.props.obtenerDistritos(e.target.value, 0, 0);
			this.setState({idDepartamentoDomicilio: '0', idProvinciaDomicilio: '0'});
		}
		if(e.target.name === 'idPaisNacimiento'){
			this.props.obtenerPaisesNacimiento(e.target.value);
			this.props.obtenerDepartamentosNacimiento(e.target.value);
			this.props.obtenerProvinciasNacimiento(e.target.value, 0);
			this.props.obtenerDistritosNacimiento(e.target.value, 0, 0);
			this.setState({idDepartamentoNacimiento: '0', idProvinciaNacimiento: '0'});
		}
		if(e.target.name === 'idDepartamentoDomicilio'){
			this.props.obtenerProvincias(1, e.target.value);
			this.props.obtenerDistritos(1, e.target.value, 0);
			this.setState({idProvinciaDomicilio: '0'});
		}
		if(e.target.name === 'idProvinciaDomicilio'){
			this.props.obtenerDistritos(1, this.state.idDepartamentoDomicilio, e.target.value);
		}
		if(e.target.name === 'idDepartamentoNacimiento'){
			this.props.obtenerProvinciasNacimiento(1, e.target.value);
			this.props.obtenerDistritosNacimiento(1, e.target.value, 0);
			this.setState({idProvinciaNacimiento: '0'});
		}
		if(e.target.name === 'idProvinciaNacimiento'){
			this.props.obtenerDistritosNacimiento(1, this.state.idDepartamentoNacimiento, e.target.value);
		}
	}
	
	onClickCancelar(e) {
		if(!this.state.prompt){
			this.limpiar();
		} else {
			if(window.confirm("¿Estás seguro de NO querer registrar el candidato?")){
				this.limpiar();
			}
		}
	}
	
	limpiar(){
		this.setState({
			idCandidato: '',
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			correoElectronico: '',
			idDocumentoIdentidad: '1',
			numeroDocumentoIdentidad: '',
			idEstadoCivil: '0',
			cantidadHijos: '0',
			numeroCelular: '',
			numeroTelefono: '',
			lugarDomicilio: '',
			lugarNacimiento: '',
			fechaNacimiento: '',
			idSexo: '0',
			idTipoDireccion: '',
			idPaisDomicilio: '1',
			idDepartamentoDomicilio: '15',
			idProvinciaDomicilio: '1501',
			idDistritoDomicilio: '',
			idPaisNacimiento: '1',
			idDepartamentoNacimiento: '15',
			idProvinciaNacimiento: '1501',
			idDistritoNacimiento: '',
			candidato: {},
			prompt: false
		})
	}
	
	render() {
		const { idCandidato, nombre, apellidoPaterno, apellidoMaterno, correoElectronico,
		idDocumentoIdentidad, numeroDocumentoIdentidad, idEstadoCivil, cantidadHijos,
		numeroCelular, numeroTelefono, telefonos, lugarDomicilio, fechaNacimiento, idSexo,
		idPaisDomicilio, idDepartamentoDomicilio, idProvinciaDomicilio, idDistritoDomicilio,
		idPaisNacimiento, idDepartamentoNacimiento, idProvinciaNacimiento, idDistritoNacimiento,
		errors, isLoading , errorMensaje, guardado, esCandidatoRegistrado} = this.state;
		
		let rowsDocumentoIdentidad = [{ label: "Seleccione..." , value: 0 }]
		this.props.documentosIdentidadResponse.map( elemento =>{
			rowsDocumentoIdentidad.push(
				{
					label: elemento.nombre,
					value: elemento.idDocumentoIdentidad
				}
			)
		});
		
		let rowsEstadoCivil = [{ label: "Seleccione..." , value: 0 }]
		this.props.estadosCivilesResponse.map( elemento =>{
			rowsEstadoCivil.push(
				{
					label: elemento.nombre,
					value: elemento.idEstadoCivil
				}
			)
		});
		
		let rowsSexo = [{ label: "Seleccione..." , value: 0 }]
		this.props.sexosResponse.map( elemento =>{
			rowsSexo.push(
				{
					label: elemento.nombre,
					value: elemento.idSexo
				}
			)
		});
		
		let rowsTipoDireccion = [{ label: "Seleccione..." , value: 0 }]
		this.props.tipoDireccionesResponse.map( elemento =>{
			rowsTipoDireccion.push(
				{
					label: elemento.nombre,
					value: elemento.idTipoDireccion
				}
			)
		});
		
		let rowsPais = [{ label: "Seleccione..." , value: 0 }]
		this.props.paisesResponse.map( elemento =>{
			rowsPais.push(
				{
					label: elemento.nombre,
					value: elemento.idPais
				}
			)
		});
		
		let rowsPaisNacimiento = [{ label: "Seleccione..." , value: 0 }]
		this.props.paisesNacimientoResponse.map( elemento =>{
			rowsPaisNacimiento.push(
				{
					label: elemento.nombre,
					value: elemento.idPais
				}
			)
		});
		
		let rowsDepartamento = [{ label: "Seleccione..." , value: 0 }]
		this.props.departamentosResponse.map( elemento =>{
			rowsDepartamento.push(
				{
					label: elemento.nombre,
					value: elemento.idDepartamento
				}
			)
		});
		
		let rowsDepartamentoNacimiento = [{ label: "Seleccione..." , value: 0 }]
		this.props.departamentosNacimientoResponse.map( elemento =>{
			rowsDepartamentoNacimiento.push(
				{
					label: elemento.nombre,
					value: elemento.idDepartamento
				}
			)
		});
		
		let rowsProvincia = [{ label: "Seleccione..." , value: 0 }]
		this.props.provinciasResponse.map( elemento =>{
			rowsProvincia.push(
				{
					label: elemento.nombre,
					value: elemento.idProvincia
				}
			)
		});
		
		let rowsProvinciaNacimiento = [{ label: "Seleccione..." , value: 0 }]
		this.props.provinciasNacimientoResponse.map( elemento =>{
			rowsProvinciaNacimiento.push(
				{
					label: elemento.nombre,
					value: elemento.idProvincia
				}
			)
		});
		
		let rowsDistrito = [{ label: "Seleccione..." , value: 0 }]
		this.props.distritosResponse.map( elemento =>{
			rowsDistrito.push(
				{
					label: elemento.nombre,
					value: elemento.idDistrito
				}
			)
		});
		
		let rowsDistritoNacimiento = [{ label: "Seleccione..." , value: 0 }]
		this.props.distritosNacimientoResponse.map( elemento =>{
			rowsDistritoNacimiento.push(
				{
					label: elemento.nombre,
					value: elemento.idDistrito
				}
			)
		});
		
		var formValidarCandidatoRegistrado = {
			titulo: 'Debe ingresar su correo electrónico para realizar el test psicológico',
			campos: [
				[{
					key: 'idCandidato',
					name: 'idCandidato',
					id: 'idCandidato',
					type: 'hidden',
					value: idCandidato,
					error: errors.idCandidato,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'correoElectronico',
					name: 'correoElectronico',
					id: 'correoElectronico',
					label: 'Correo electrónico : ',
					type: 'text-linea',
					value: correoElectronico.toLowerCase(),
					error: errors.correoElectronico,
					onChange: this.onChange,
					labelClass: 'col-md-3',
					fieldClass: 'col-md-5',
					//textClass: 'text-lowercase',
					required: 'true'
				}]
			] ,
			botones: [{
					key: 'guardar',
					label: 'Realizar test psicológico',
					divClass: 'col-md-1',
					botonClass: 'btn-primary btn-md',
					tipo: 'button-submit',
					isLoading: isLoading
				}],
				onSubmit: this.validarCandidatoRegistrado.bind(this)
			}
		
		var form = {
			titulo: 'Complete el formulario para realizar el test psicológico',
			campos: [
				[{
					key: 'idCandidato',
					name: 'idCandidato',
					id: 'idCandidato',
					type: 'hidden',
					value: idCandidato,
					error: errors.idCandidato,
					onChange: this.onChange,
					required: 'false'
				}] , [{
					key: 'nombre',
					name: 'nombre',
					id: 'nombre',
					label: 'Nombre : ',
					type: 'text',
					value: nombre.replace(/(^|\s)\S/g, l => l.toUpperCase()),
					error: errors.nombre,
					onChange: this.onChange,
					labelClass: 'col-md-4',
					fieldClass: 'col-md-3',
					//textClass: 'text-capitalize',
					required: 'true'
				} , {
					key: 'apellidoPaterno',
					name: 'apellidoPaterno',
					id: 'apellidoPaterno',
					label: 'Apellido paterno : ',
					type: 'text',
					value: apellidoPaterno.replace(/(^|\s)\S/g, l => l.toUpperCase()),
					error: errors.apellidoPaterno,
					onChange: this.onChange,
					labelClass: 'col-md-4',
					fieldClass: 'col-md-3',
					//textClass: 'text-capitalize',
					required: 'true'
				} , {
					key: 'apellidoMaterno',
					name: 'apellidoMaterno',
					id: 'apellidoMaterno',
					label: 'Apellido materno : ',
					type: 'text',
					value: apellidoMaterno.replace(/(^|\s)\S/g, l => l.toUpperCase()),
					error: errors.apellidoMaterno,
					onChange: this.onChange,
					labelClass: 'col-md-4',
					fieldClass: 'col-md-3',
					//textClass: 'text-capitalize',
					required: 'true'
				}] , [{
					key: 'correoElectronico',
					name: 'correoElectronico',
					id: 'correoElectronico',
					label: 'Correo electrónico : ',
					type: 'text',
					value: correoElectronico.toLowerCase(),
					error: errors.correoElectronico,
					onChange: this.onChange,
					labelClass: 'col-md-3',
					fieldClass: 'col-md-5',
					//textClass: 'text-lowercase',
					required: 'true'
				} , {
					key: 'numeroCelular',
					name: 'numeroCelular',
					id: 'numeroCelular',
					label: 'Número de celular : ',
					type: 'text',
					value: numeroCelular,
					error: errors.numeroCelular,
					onChange: this.onChange,
					labelClass: 'col',
					fieldClass: 'col-md-2',
					required: 'true',
					maxlength: 9
				} , {
					key: 'numeroTelefono',
					name: 'numeroTelefono',
					id: 'numeroTelefono',
					label: 'Número de teléfono : ',
					type: 'text',
					value: numeroTelefono,
					error: errors.numeroTelefono,
					onChange: this.onChange,
					labelClass: 'col',
					fieldClass: 'col-md-2',
					required: 'true',
					maxlength: 7
				}] , [{
					key: 'idSexo',
					name: 'idSexo',
					id: 'idSexo',
					label: 'Sexo : ',
					type: 'select',
					value: rowsSexo,
					valueSelected: idSexo,
					error: errors.idSexo,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-3',
					required: 'true'
				} , {
					key: 'idDocumentoIdentidad',
					name: 'idDocumentoIdentidad',
					id: 'idDocumentoIdentidad',
					label: 'Documento de identidad : ',
					type: 'select',
					value: rowsDocumentoIdentidad,
					valueSelected: idDocumentoIdentidad,
					error: errors.idDocumentoIdentidad,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'numeroDocumentoIdentidad',
					name: 'numeroDocumentoIdentidad',
					id: 'numeroDocumentoIdentidad',
					label: 'Número de documento : ',
					type: 'text',
					value: numeroDocumentoIdentidad,
					error: errors.numeroDocumentoIdentidad,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true',
					maxlength: 8
				} , {
					key: 'fechaNacimiento',
					name: 'fechaNacimiento',
					id: 'fechaNacimiento',
					label: 'Fecha de nacimiento : ',
					type: 'date',
					value: fechaNacimiento,
					error: errors.fechaNacimiento,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-3',
					required: 'true'
				} , {
					key: 'idEstadoCivil',
					name: 'idEstadoCivil',
					id: 'idEstadoCivil',
					label: 'Estado civil : ',
					type: 'select',
					value: rowsEstadoCivil,
					valueSelected: idEstadoCivil,
					error: errors.idEstadoCivil,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'cantidadHijos',
					name: 'cantidadHijos',
					id: 'cantidadHijos',
					label: 'Cantidad de hijos : ',
					type: 'text',
					value: cantidadHijos,
					error: errors.cantidadHijos,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-1',
					required: 'true',
					maxlength: 2
				}] , [{
					key: 'idPaisDomicilio',
					name: 'idPaisDomicilio',
					id: 'idPaisDomicilio',
					label: 'Datos de domicilio : ',
					type: 'select',
					value: rowsPais,
					valueSelected: idPaisDomicilio,
					error: errors.idPaisDomicilio,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'idDepartamentoDomicilio',
					name: 'idDepartamentoDomicilio',
					id: 'idDepartamentoDomicilio',
					label: 'Departamento : ',
					type: 'select',
					value: rowsDepartamento,
					valueSelected: idDepartamentoDomicilio,
					error: errors.idDepartamentoDomicilio,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'idProvinciaDomicilio',
					name: 'idProvinciaDomicilio',
					id: 'idProvinciaDomicilio',
					label: 'Provincia : ',
					type: 'select',
					value: rowsProvincia,
					valueSelected: idProvinciaDomicilio,
					error: errors.idProvinciaDomicilio,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'idDistritoDomicilio',
					name: 'idDistritoDomicilio',
					id: 'idDistritoDomicilio',
					label: 'Distrito : ',
					type: 'select',
					value: rowsDistrito,
					valueSelected: idDistritoDomicilio,
					error: errors.idDistritoDomicilio,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'lugarDomicilio',
					name: 'lugarDomicilio',
					id: 'lugarDomicilio',
					label: 'Domicilio : ',
					type: 'text',
					value: lugarDomicilio.replace(/(^|\s)\S/g, l => l.toUpperCase()),
					error: errors.lugarDomicilio,
					onChange: this.onChange,
					labelClass: 'col-md-4',
					fieldClass: 'col-md-3',
					//textClass: 'text-capitalize',
					required: 'true'
				}] , [{
					key: 'idPaisNacimiento',
					name: 'idPaisNacimiento',
					id: 'idPaisNacimiento',
					label: 'Datos de nacimiento : ',
					type: 'select',
					value: rowsPaisNacimiento,
					valueSelected: idPaisNacimiento,
					error: errors.idPaisNacimiento,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'idDepartamentoNacimiento',
					name: 'idDepartamentoNacimiento',
					id: 'idDepartamentoNacimiento',
					label: 'Departamento : ',
					type: 'select',
					value: rowsDepartamentoNacimiento,
					valueSelected: idDepartamentoNacimiento,
					error: errors.idDepartamentoNacimiento,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'idProvinciaNacimiento',
					name: 'idProvinciaNacimiento',
					id: 'idProvinciaNacimiento',
					label: 'Provincia : ',
					type: 'select',
					value: rowsProvinciaNacimiento,
					valueSelected: idProvinciaNacimiento,
					error: errors.idProvinciaNacimiento,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				} , {
					key: 'idDistritoNacimiento',
					name: 'idDistritoNacimiento',
					id: 'idDistritoNacimiento',
					label: 'Distrito : ',
					type: 'select',
					value: rowsDistritoNacimiento,
					valueSelected: idDistritoNacimiento,
					error: errors.idDistritoNacimiento,
					onChange: this.onChange,
					labelClass: 'col-md-2',
					fieldClass: 'col-md-2',
					required: 'true'
				}]
			],
			botones: [
				{
					key: 'guardar',
					label: 'Realizar test psicológico',
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
			<div className="mt-3 mx-auto ancho1200">
				<Prompt
					when={this.state.prompt}
					message="¿Estás seguro de NO querer registrar el candidato?"
				/>
				{isLoading && <CargandoImagen />}
				{errorMensaje != '' && <MensajeError error={errorMensaje} />}
				{esCandidatoRegistrado == null && <Formulario form={formValidarCandidatoRegistrado} />}
				{esCandidatoRegistrado != null && !(esCandidatoRegistrado) && <Formulario form={form} />}
				<MensajeGuardarExitoso cargando={guardado} mensaje={"Se guardó exitosamente!"} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		tipoDireccionesResponse : state.reducerTipoDireccion.obtenerTipoDireccionesResponse,
		paisesResponse : state.reducerPais.obtenerPaisesResponse,
		paisesNacimientoResponse : state.reducerPais.obtenerPaisesNacimientoResponse,
		departamentosResponse : state.reducerDepartamento.obtenerDepartamentosResponse,
		departamentosNacimientoResponse : state.reducerDepartamento.obtenerDepartamentosNacimientoResponse,
		provinciasResponse : state.reducerProvincia.obtenerProvinciasResponse,
		provinciasNacimientoResponse : state.reducerProvincia.obtenerProvinciasNacimientoResponse,
		distritosResponse : state.reducerDistrito.obtenerDistritosResponse,
		distritosNacimientoResponse : state.reducerDistrito.obtenerDistritosNacimientoResponse,
		sexosResponse : state.reducerSexo.obtenerSexosResponse,
		estadosCivilesResponse : state.reducerEstadoCivil.obtenerEstadosCivilesResponse,
		documentosIdentidadResponse : state.reducerDocumentoIdentidad.obtenerDocumentosIdentidadResponse,
		guardarCandidatoTestPsicologicoResponse : state.reducerCandidato.guardarCandidatoTestPsicologicoResponse,
		validarCandidatoRegistradoResponse : state.reducerCandidato.validarCandidatoRegistradoResponse,
		errorResponse : state.reducerCandidato.errorResponse
	}
}

export default connect(mapStateToProps, { guardarCandidatoTestPsicologico, validarCandidatoRegistrado, obtenerEstadosCiviles, obtenerDocumentosIdentidad, obtenerSexos, obtenerTipoDirecciones, obtenerPaises, obtenerPaisesNacimiento, obtenerDepartamentos, obtenerDepartamentosNacimiento, obtenerProvincias, obtenerProvinciasNacimiento, obtenerDistritos, obtenerDistritosNacimiento })(CandidatoDatosForm);