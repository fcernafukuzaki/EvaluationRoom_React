import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Prompt } from 'react-router';

import {obtenerValorParametro} from '../../../common/components/encriptar_aes';
import Formulario from '../../../components/common/Formulario';
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import MensajeError from '../../../components/common/MensajeError';
import CargandoImagen from '../../../components/common/CargandoImagen';
import AlertBoxMessageForm from '../../../components/common/AlertBoxMessageForm';

import {validateInputRecruiterRegistration} from '../components/candidate_form_validate';

import { guardarCandidatoTestPsicologicoRecruiter } from '../../../../actions/actionCandidato';
import {obtenerPaises, obtenerPaisesNacimiento, obtenerDepartamentos, obtenerDepartamentosNacimiento, 
	obtenerProvincias, obtenerProvinciasNacimiento, obtenerDistritos, obtenerDistritosNacimiento,
	obtenerSexos, obtenerTipoDirecciones, obtenerEstadosCiviles, obtenerDocumentosIdentidad, 
	obtenerTestPsicologicos, obtenerCandidato} from '../../../../actions/common_view/actionCandidateForm'

class CandidatoDatosForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: null,
			idCandidato: '',
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			nombreForm: '',
			apellidoPaternoForm: '',
			apellidoMaternoForm: '',
			correoElectronico: '',
			idDocumentoIdentidad: 1,
			numeroDocumentoIdentidad: '',
			idEstadoCivil: 0,
			cantidadHijos: '0',
			numeroCelular: '',
			numeroTelefono: '',
			lugarNacimiento: '',
			fechaNacimiento: '',
			idSexo: 0,
			idTipoDireccion: '',
			idPaisDomicilio: 1,
			idDepartamentoDomicilio: 15,
			idProvinciaDomicilio: 1501,
			idDistritoDomicilio: 0,
			lugarDomicilio: '',
			idPaisNacimiento: 1,
			idDepartamentoNacimiento: 15,
			idProvinciaNacimiento: 1501,
			idDistritoNacimiento: 0,
			errors: {},
			isLoading: true,
			candidato:{},
			testPsicologicosListCheck: [],
			testPsicologicosChecked: [],
			prompt: false,
			errorMensaje: '',
			guardado: false,
			mensajeInformativo: {
				heading: 'Registro de candidato',
				body: [<p key="" className="mb-0">Por defecto la creación de un candidato tiene asignado los 3 test psicológicos: Baron, GATB y DISC. Sin embargo, <strong>el reclutador tiene la opción de asignar los test psicológicos que considere necesarios a un nuevo candidato <u>sólo ingresando su dirección de correo electrónico.</u></strong> Posteriomente el candidato deberá completar el formulario con sus datos personales.</p>],
				footer: [<p key="" className="mb-0">Sugerencias al reclutador al momento de registrar un candidato:</p>, <ul key="consideraciones" className="mb-0"><li key="1" >Deberá tener a la mano la dirección de correo electrónico del candidato.</li></ul>]
			}
		}
		
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeCheck = this.onChangeCheck.bind(this);
		this.onClickCancelar = this.onClickCancelar.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerSexos();
		this.props.obtenerEstadosCiviles();
		this.props.obtenerDocumentosIdentidad();
		this.props.obtenerTestPsicologicos(this.props.token);
		this.props.obtenerPaises();
		this.props.obtenerPaisesNacimiento();
		this.props.obtenerDepartamentos(1);
		this.props.obtenerProvincias(1,15);
		this.props.obtenerDistritos(1,15,1501);
		this.props.obtenerDepartamentosNacimiento(1);
		this.props.obtenerProvinciasNacimiento(1,15);
		this.props.obtenerDistritosNacimiento(1,15,1501);
		if(obtenerValorParametro('idc') != null){
			this.props.obtenerCandidato(obtenerValorParametro('idc'), this.props.usuario.token);
		} else {
			this.setState({
				isLoading: false
			});
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.candidatoResponse !== this.props.candidatoResponse) {
			var candidatoResponse = this.props.candidatoResponse;
			
			var fechaFormat = '';
			if(typeof candidatoResponse.fechanacimiento != "undefined"){
				fechaFormat = candidatoResponse.fechanacimiento.split('T')[0]
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
			let direcciones = candidatoResponse.addresses
			if(typeof direcciones != "undefined"){
				idPaisDomicilio = direcciones.filter( d => d.idtipodireccion == 1).length > 0 ? direcciones.filter( d => d.idtipodireccion == 1)[0].idpais : 1;
				idDepartamentoDomicilio = direcciones.filter( d => d.idtipodireccion == 1).length > 0 ? direcciones.filter( d => d.idtipodireccion == 1)[0].iddepartamento : 0;
				idProvinciaDomicilio = direcciones.filter( d => d.idtipodireccion == 1).length > 0 ? direcciones.filter( d => d.idtipodireccion == 1)[0].idprovincia : 0;
				idDistritoDomicilio = direcciones.filter( d => d.idtipodireccion == 1).length > 0 ? direcciones.filter( d => d.idtipodireccion == 1)[0].iddistrito : 0;
					
				lugarDomicilio = direcciones.filter( d => d.idtipodireccion == 1).length > 0 ? direcciones.filter( d => d.idtipodireccion == 1)[0].direccion : '';
					
				idPaisNacimiento = direcciones.filter( d => d.idtipodireccion == 2).length > 0 ? direcciones.filter( d => d.idtipodireccion == 2)[0].idpais : 1;
				idDepartamentoNacimiento = direcciones.filter( d => d.idtipodireccion == 2).length > 0 ? direcciones.filter( d => d.idtipodireccion == 2)[0].iddepartamento : 0;
				idProvinciaNacimiento = direcciones.filter( d => d.idtipodireccion == 2).length > 0 ? direcciones.filter( d => d.idtipodireccion == 2)[0].idprovincia : 0;
				idDistritoNacimiento = direcciones.filter( d => d.idtipodireccion == 2).length > 0 ? direcciones.filter( d => d.idtipodireccion == 2)[0].iddistrito : 0;
					
				this.props.obtenerDepartamentos(idPaisDomicilio);
				this.props.obtenerProvincias(idPaisDomicilio, idDepartamentoDomicilio);
				this.props.obtenerDistritos(idPaisDomicilio, idDepartamentoDomicilio, idProvinciaDomicilio);
				this.props.obtenerDepartamentosNacimiento(idPaisNacimiento);
				this.props.obtenerProvinciasNacimiento(idPaisNacimiento, idDepartamentoNacimiento);
				this.props.obtenerDistritosNacimiento(idPaisNacimiento, idDepartamentoNacimiento, idProvinciaNacimiento);
			}
			this.setState({
				idCandidato: candidatoResponse.idcandidato,
				nombre: candidatoResponse.nombre == null ? this.state.nombre : candidatoResponse.nombre,
				apellidoPaterno: candidatoResponse.apellidopaterno == null ? this.state.apellidopaterno : candidatoResponse.apellidopaterno,
				apellidoMaterno: candidatoResponse.apellidomaterno == null ? this.state.apellidomaterno : candidatoResponse.apellidomaterno,
				nombreForm: candidatoResponse.nombre == null ? this.state.nombre : candidatoResponse.nombre,
				apellidoPaternoForm: candidatoResponse.apellidopaterno == null ? this.state.apellidopaterno : candidatoResponse.apellidopaterno,
				apellidoMaternoForm: candidatoResponse.apellidomaterno == null ? this.state.apellidomaterno : candidatoResponse.apellidomaterno,
				correoElectronico: candidatoResponse.correoelectronico,
				idDocumentoIdentidad: candidatoResponse.iddocumentoidentidad,
				numeroDocumentoIdentidad: candidatoResponse.numerodocumentoidentidad == null ? this.state.numerodocumentoidentidad : candidatoResponse.numerodocumentoidentidad,
				idEstadoCivil: candidatoResponse.idestadocivil,
				cantidadHijos: candidatoResponse.cantidadhijos,
				numeroCelular: candidatoResponse.telephones.filter( t => t.idtelefono == 1).length > 0 ? candidatoResponse.telephones.filter( t => t.idtelefono == 1)[0].numero : '',
				numeroTelefono: candidatoResponse.telephones.filter( t => t.idtelefono == 2).length > 0 ? candidatoResponse.telephones.filter( t => t.idtelefono == 2)[0].numero : '',
				lugarDomicilio: lugarDomicilio,
				fechaNacimiento: fechaFormat,
				idSexo: candidatoResponse.idsexo,
				idPaisDomicilio: idPaisDomicilio,
				idDepartamentoDomicilio: idDepartamentoDomicilio,
				idProvinciaDomicilio: idProvinciaDomicilio,
				idDistritoDomicilio: idDistritoDomicilio,
				idPaisNacimiento: idPaisNacimiento,
				idDepartamentoNacimiento: idDepartamentoNacimiento,
				idProvinciaNacimiento: idProvinciaNacimiento,
				idDistritoNacimiento: idDistritoNacimiento,
				isLoading: false
			});
			let rowsTestPsicologicos = [];
			let rowsTestPsicologicosChecked = [];
			this.props.testPsicologicosResponse.map( test =>{
				var checked = false;//Valor Default, ningún test seleccionado.
				// Si candidato tiene asignado test psicológicos
				if(typeof candidatoResponse.psychologicaltests != "undefined"){
					checked = candidatoResponse.psychologicaltests.filter(
							t => t.idtestpsicologico == test.idtestpsicologico).length > 0 ? true : false;
				}
				if(checked){
					rowsTestPsicologicosChecked.push(
						{
							idTestPsicologico: test.idtestpsicologico
						}
					)
				}
				rowsTestPsicologicos.push(
					{
						nombre: test.nombre,
						identificador: test.idtestpsicologico,
						checked: checked
					}
				)
			});
			this.setState({
				testPsicologicosChecked : rowsTestPsicologicosChecked,
				testPsicologicosListCheck : rowsTestPsicologicos
			});
		}
		if (prevProps.testPsicologicosResponse !== this.props.testPsicologicosResponse) {
			let rowsTestPsicologicos = [];
			let rowsTestPsicologicosChecked = [];
			this.props.testPsicologicosResponse.map( test =>{
				var checked = true;//Valor Default al cargar formulario.
				// Si candidato tiene asignado test psicológicos
				if(this.state.idCandidato != '' && typeof this.props.candidatoResponse.psychologicaltests != "undefined"){
					checked = this.props.candidatoResponse.psychologicaltests.filter(t => t.idtestpsicologico == test.idtestpsicologico).length > 0 ? true : false;
				} else {
					checked = true;
				}
				if(checked){
					rowsTestPsicologicosChecked.push(
						{
							idTestPsicologico: test.idtestpsicologico
						}
					)
				}
				rowsTestPsicologicos.push(
					{
						nombre: test.nombre,
						identificador: test.idtestpsicologico,
						checked: checked
					}
				)
			});
			this.setState({
				testPsicologicosChecked : rowsTestPsicologicosChecked,
				testPsicologicosListCheck : rowsTestPsicologicos
			});
		}
		if (prevProps.guardarCandidatoTestPsicologicoRecruiterResponse !== this.props.guardarCandidatoTestPsicologicoRecruiterResponse) {
			this.limpiar();
			this.setState({ 
				isLoading: false,
				guardado: true
			})
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			//console.log('error', this.props.errorResponse);
			if(404 == this.props.errorResponse.code){
				this.setState({
					isLoading: false
				})
			} else if(409 == this.props.errorResponse.code){
				let error = {};
				if(this.props.errorResponse.message.indexOf('Correo') > -1){
					error = {correoElectronico: this.props.errorResponse.user_message}
				} else if(this.props.errorResponse.message.indexOf('Número de documento') > -1){
					error = {numeroDocumentoIdentidad: this.props.errorResponse.user_message}
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
		const { errors, isValid } = validateInputRecruiterRegistration(this.state);
		if (!isValid) { this.setState({	errors : errors	}) }
		return isValid;
	}
	
	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.guardar();
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
		var tests = this.state.testPsicologicosChecked;
		var testCandidato = [];
		if(this.state.idCandidato !== ''){
			this.state.testPsicologicosChecked.map( t => {
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
					idDocumentoIdentidad: parseInt(this.state.idDocumentoIdentidad)
				},
				numeroDocumentoIdentidad: this.state.numeroDocumentoIdentidad,
				estadoCivil: {
					idEstadoCivil: parseInt(this.state.idEstadoCivil)
				},
				sexo: {idSexo: parseInt(this.state.idSexo)},
				cantidadHijos: this.state.cantidadHijos,
				telefonos: telefonosCandidato,
				fechaNacimiento: this.state.fechaNacimiento,
				testPsicologicos: tests,
				direcciones: [{
					idTipoDireccion: 1,
					pais: {idPais: this.state.idPaisDomicilio},
					departamento: {idDepartamento: parseInt(this.state.idDepartamentoDomicilio)},
					provincia: {idProvincia: parseInt(this.state.idProvinciaDomicilio)},
					distrito: {idDistrito: parseInt(this.state.idDistritoDomicilio)},
					direccion: this.state.lugarDomicilio
				},{
					idTipoDireccion: 2,
					pais: {idPais: this.state.idPaisNacimiento},
					departamento: {idDepartamento: parseInt(this.state.idDepartamentoNacimiento)},
					provincia: {idProvincia: parseInt(this.state.idProvinciaNacimiento)},
					distrito: {idDistrito: parseInt(this.state.idDistritoNacimiento)},
					direccion: this.state.lugarNacimiento
				}]
			}
		}, () => {
			if(this.state.idCandidato === ''){
				this.props.guardarCandidatoTestPsicologicoRecruiter(this.state.candidato);
			} else {
				this.props.guardarCandidatoTestPsicologicoRecruiter(this.state.candidato);
				//this.props.guardarCandidato(this.state.candidato);
			}
		});
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value, prompt: !!(e.target.value.length) });
		
		if(e.target.name === 'idPaisDomicilio'){
			this.props.obtenerPaises(e.target.value);
			this.props.obtenerProvincias(e.target.value, 0);
			this.props.obtenerDistritos(e.target.value, 0, 0);
			this.setState({idDepartamentoDomicilio: 0, idProvinciaDomicilio: 0});
		}
		if(e.target.name === 'idPaisNacimiento'){
			this.props.obtenerPaisesNacimiento(e.target.value);
			this.props.obtenerProvinciasNacimiento(e.target.value, 0);
			this.props.obtenerDistritosNacimiento(e.target.value, 0, 0);
			this.setState({idDepartamentoNacimiento: 0, idProvinciaNacimiento: 0});
		}
		if(e.target.name === 'idDepartamentoDomicilio'){
			this.props.obtenerProvincias(1, e.target.value);
			this.props.obtenerDistritos(1, e.target.value, 0);
			this.setState({idProvinciaDomicilio: 0});
		}
		if(e.target.name === 'idProvinciaDomicilio'){
			this.props.obtenerDistritos(1, this.state.idDepartamentoDomicilio, e.target.value);
		}
		if(e.target.name === 'idDepartamentoNacimiento'){
			this.props.obtenerProvinciasNacimiento(1, e.target.value);
			this.props.obtenerDistritosNacimiento(1, e.target.value, 0);
			this.setState({idProvinciaNacimiento: 0});
		}
		if(e.target.name === 'idProvinciaNacimiento'){
			this.props.obtenerDistritosNacimiento(1, this.state.idDepartamentoNacimiento, e.target.value);
		}
	}
	
	onChangeCheck(event) {
		const opcionSeleccionada = event.target;
		const testPsicologicosChecked = this.state.testPsicologicosChecked;
		const testPsicologicosListCheck = this.state.testPsicologicosListCheck;
		var found = false;
		let rowsTestPsicologicos = [];
		let rowsTestPsicologicosChecked = [];
		
		testPsicologicosListCheck.map( listCheck => {
			var checked = listCheck.checked;
			if(listCheck.identificador == parseInt(opcionSeleccionada.value)){
				checked = !listCheck.checked
			}
			rowsTestPsicologicos.push(
				{
					nombre: listCheck.nombre,
					identificador: listCheck.identificador,
					checked: checked
				}
			)
			if(checked){
				rowsTestPsicologicosChecked.push(
					{idTestPsicologico : listCheck.identificador}
				);
			}
		});
		this.setState({
			testPsicologicosChecked : rowsTestPsicologicosChecked,
			testPsicologicosListCheck : rowsTestPsicologicos
		});
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
			nombreForm: '',
			apellidoPaternoForm: '',
			apellidoMaternoForm: '',
			correoElectronico: '',
			idDocumentoIdentidad: 1,
			numeroDocumentoIdentidad: '',
			idEstadoCivil: 0,
			cantidadHijos: '0',
			numeroCelular: '',
			numeroTelefono: '',
			lugarDomicilio: '',
			lugarNacimiento: '',
			fechaNacimiento: '',
			idSexo: 0,
			idTipoDireccion: '',
			idPaisDomicilio: 1,
			idDepartamentoDomicilio: 15,
			idProvinciaDomicilio: 1501,
			idDistritoDomicilio: 0,
			idPaisNacimiento: 1,
			idDepartamentoNacimiento: 15,
			idProvinciaNacimiento: 1501,
			idDistritoNacimiento: 0,
			candidato: {},
			//testPsicologicosChecked: [],
			prompt: false
		})
	}
	
	render() {
		const { idCandidato, nombre, apellidoPaterno, apellidoMaterno, nombreForm, apellidoPaternoForm, apellidoMaternoForm, correoElectronico,
		idDocumentoIdentidad, numeroDocumentoIdentidad, idEstadoCivil, cantidadHijos,
		numeroCelular, numeroTelefono, telefonos, lugarDomicilio, fechaNacimiento, idSexo,
		testPsicologicosChecked, testPsicologicosListCheck, 
		idPaisDomicilio, idDepartamentoDomicilio, idProvinciaDomicilio, idDistritoDomicilio,
		idPaisNacimiento, idDepartamentoNacimiento, idProvinciaNacimiento, idDistritoNacimiento,
		errors, isLoading , errorMensaje, guardado} = this.state;
		
		let rowsDocumentoIdentidad = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.documentosIdentidadResponse != "undefined"){
			this.props.documentosIdentidadResponse.map( elemento =>{
				rowsDocumentoIdentidad.push(
					{
						label: elemento.nombre,
						value: elemento.iddocumentoidentidad
					}
				)
			});
		}
		
		let rowsEstadoCivil = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.estadosCivilesResponse != "undefined"){
			this.props.estadosCivilesResponse.map( elemento =>{
				rowsEstadoCivil.push(
					{
						label: elemento.nombre,
						value: elemento.idestadocivil
					}
				)
			});
		}
		
		let rowsSexo = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.sexosResponse != "undefined"){
			this.props.sexosResponse.map( elemento =>{
				rowsSexo.push(
					{
						label: elemento.nombre,
						value: elemento.idsexo
					}
				)
			});
		}
		
		let rowsTipoDireccion = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.tipoDireccionesResponse != "undefined"){
			this.props.tipoDireccionesResponse.map( elemento =>{
				rowsTipoDireccion.push(
					{
						label: elemento.nombre,
						value: elemento.idtipodireccion
					}
				)
			});
		}
		
		let rowsPais = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.paisesResponse != "undefined"){
			this.props.paisesResponse.map( elemento =>{
				rowsPais.push(
					{
						label: elemento.nombre,
						value: elemento.idpais
					}
				)
			});
		}
		
		let rowsPaisNacimiento = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.paisesNacimientoResponse != "undefined"){
			this.props.paisesNacimientoResponse.map( elemento =>{
				rowsPaisNacimiento.push(
					{
						label: elemento.nombre,
						value: elemento.idpais
					}
				)
			});
		}
		
		let rowsDepartamento = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.departamentosResponse != "undefined"){
			this.props.departamentosResponse.map( elemento =>{
				rowsDepartamento.push(
					{
						label: elemento.nombre,
						value: elemento.iddepartamento
					}
				)
			});
		}
		
		let rowsDepartamentoNacimiento = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.departamentosNacimientoResponse != "undefined"){
			this.props.departamentosNacimientoResponse.map( elemento =>{
				rowsDepartamentoNacimiento.push(
					{
						label: elemento.nombre,
						value: elemento.iddepartamento
					}
				)
			});
		}
		
		let rowsProvincia = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.provinciasResponse != "undefined"){
			this.props.provinciasResponse.map( elemento =>{
				rowsProvincia.push(
					{
						label: elemento.nombre,
						value: elemento.idprovincia
					}
				)
			});
		}
		
		let rowsProvinciaNacimiento = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.provinciasNacimientoResponse != "undefined"){
			this.props.provinciasNacimientoResponse.map( elemento =>{
				rowsProvinciaNacimiento.push(
					{
						label: elemento.nombre,
						value: elemento.idprovincia
					}
				)
			});
		}
		
		let rowsDistrito = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.distritosResponse != "undefined"){
			this.props.distritosResponse.map( elemento =>{
				rowsDistrito.push(
					{
						label: elemento.nombre,
						value: elemento.iddistrito
					}
				)
			});
		}
		
		let rowsDistritoNacimiento = [{ label: "Seleccione..." , value: 0 }]
		if(typeof this.props.distritosNacimientoResponse != "undefined"){
			this.props.distritosNacimientoResponse.map( elemento =>{
				rowsDistritoNacimiento.push(
					{
						label: elemento.nombre,
						value: elemento.iddistrito
					}
				)
			});
		}
		
		var form = {
			titulo: (idCandidato == '' ? 'Registrar candidato' : ('Datos de candidato ').concat(nombreForm, ' ', apellidoPaternoForm, ' ',apellidoMaternoForm)),
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
					value: correoElectronico.toLowerCase().trim(),
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
				}] , [{
					key: 'testPsicologicos',
					name: 'testPsicologicos',
					id: 'testPsicologicos',
					label: 'Test psicologicos : ',
					type: 'check',
					value: testPsicologicosListCheck,
					error: errors.testPsicologico,
					onChange: this.onChangeCheck,
					labelClass: 'col-md-2',
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
			<div className="mt-3 mx-auto ancho1200">
				<Prompt
					when={this.state.prompt}
					message="¿Estás seguro de NO querer registrar el candidato?"
				/>
				{isLoading && <CargandoImagen />}
				{errorMensaje != '' && <MensajeError error={errorMensaje} />}
				<AlertBoxMessageForm 
						alertMessageHeading={this.state.mensajeInformativo.heading} 
						alertMessageBody={this.state.mensajeInformativo.body} 
						alertMessageFooter={this.state.mensajeInformativo.footer} 
				/>
				<Formulario form={form} />
				<MensajeGuardarExitoso cargando={guardado} mensaje={"Se guardó exitosamente!"} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		tipoDireccionesResponse : state.reducerCandidateForm.obtenerTipoDireccionesResponse,
		paisesResponse : state.reducerCandidateForm.obtenerPaisesResponse,
		paisesNacimientoResponse : state.reducerCandidateForm.obtenerPaisesNacimientoResponse,
		departamentosResponse : state.reducerCandidateForm.obtenerDepartamentosResponse,
		departamentosNacimientoResponse : state.reducerCandidateForm.obtenerDepartamentosNacimientoResponse,
		provinciasResponse : state.reducerCandidateForm.obtenerProvinciasResponse,
		provinciasNacimientoResponse : state.reducerCandidateForm.obtenerProvinciasNacimientoResponse,
		distritosResponse : state.reducerCandidateForm.obtenerDistritosResponse,
		distritosNacimientoResponse : state.reducerCandidateForm.obtenerDistritosNacimientoResponse,
		sexosResponse : state.reducerCandidateForm.obtenerSexosResponse,
		estadosCivilesResponse : state.reducerCandidateForm.obtenerEstadosCivilesResponse,
		documentosIdentidadResponse : state.reducerCandidateForm.obtenerDocumentosIdentidadResponse,
		testPsicologicosResponse : state.reducerCandidateForm.obtenerTestPsicologicosResponse,
		candidatoResponse : state.reducerCandidato.obtenerCandidatoResponse,
		guardarCandidatoTestPsicologicoRecruiterResponse : state.reducerCandidato.guardarCandidatoTestPsicologicoRecruiterResponse,
		errorResponse : state.reducerCandidato.errorResponse
	}
}

export default connect(mapStateToProps, { guardarCandidatoTestPsicologicoRecruiter, obtenerCandidato, obtenerTestPsicologicos, obtenerEstadosCiviles, obtenerDocumentosIdentidad, obtenerSexos, obtenerTipoDirecciones, obtenerPaises, obtenerPaisesNacimiento, obtenerDepartamentos, obtenerDepartamentosNacimiento, obtenerProvincias, obtenerProvinciasNacimiento, obtenerDistritos, obtenerDistritosNacimiento })(CandidatoDatosForm);
