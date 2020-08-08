import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Pregunta from './Pregunta';
import Boton from './Boton';
import MensajeAlerta from './MensajeAlerta';
import MensajeContador from './MensajeContador';
import {obtenerTextoBienvenida, obtenerTextoFinalizado, obtenerValorParametro} from '../common-exam/Mensajes';

import {obtenerTestPsicologicosPartes} from '../../../actions/actionTestPsicologico';
import {obtenerCandidatoTestPsicologicosPreguntas, obtenerCandidatoRespuestas, guardarCandidatoRespuesta, obtenerInterpretacion} from '../../../actions/actionCandidato';

class Escena extends Component {
	constructor(props){
		super(props);
		this.state = {
			idCandidato: '',
			idTestPsicologico: '',
			idParte: '',
			idPregunta: '',
			respuestas : [],
			candidato:{},
			candidatoResponse: {},
			numeroPreguntaActual: -1,
			testPsicologicoActual: -1,
			testPsicologicoParteActual: 0,
			flagAlternativa1: false,
			flagAlternativa2: false,
			flagAlternativa3: false,
			flagAlternativa4: false,
			flagAlternativa5: false,
			cantidadAlterPregActual: 0,
			mensajeAlerta: {mensaje: '', color: ''},
			mensajeContador: {mensaje: '' , flag: '', visible: 'false'},
			flagInstrucciones: true,
			valorContador: 0,
			flagContinuarTest: false
		}
		
		this.guardarCandidatoRespuesta = this.guardarCandidatoRespuesta.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerCandidatoTestPsicologicosPreguntas(obtenerValorParametro('id'));
		this.props.obtenerCandidatoRespuestas(obtenerValorParametro('id'));
		this.props.obtenerTestPsicologicosPartes();
	}
	
	componentDidMount() {
		document.querySelector('#btnInicio').addEventListener('click', function (evt) {
			this.iniciarPruebas();
		}.bind(this));
		document.querySelector('#btnInicioInstrucciones').addEventListener('click', function (evt) {
			this.iniciarExamen();
		}.bind(this));
		document.querySelector('#btnInicioInstrucciones2').addEventListener('click', function (evt) {
			this.continuarExamen();
		}.bind(this));
		document.querySelector('#btnSiguiente').addEventListener('click', function (evt) {
			this.obtenerSiguientePregunta();
		}.bind(this));
	}
	
	iniciarPruebas(){
		this.mostrarBotonInicio(1);
		if(this.validarCandidatoPreguntasRespondidas()){
			if(this.state.flagInstrucciones){
				this.mostrarBotonInicioInstrucciones(0);
			}
		}
	}
	
	iniciarExamen(){
		//console.log('iniciarExamen', this.state);
		this.mostrarBotonInicioInstrucciones(1);
		this.mostrarBotonSiguiente(0);
		this.setState({
			numeroPreguntaActual: (this.state.flagContinuarTest) ? this.state.numeroPreguntaActual : this.state.numeroPreguntaActual + 1,//OK
			flagInstrucciones: false,
			flagContinuarTest: false
		});
		//console.log('iniciarExamen1', this.state);
		this.mostrarAlternativas(this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual], 0);
		//console.log('testPsicologicoActual', this.state.testPsicologicoActual);
		this.asignarMensajeContador();
	}
	
	continuarExamen(){
		//console.log('continuarExamen', this.state);
		this.mostrarBotonInicioInstrucciones2(1);
		this.mostrarBotonSiguiente(0);
		this.setState({
			flagInstrucciones: false,
			valorContador: 0,
			mensajeAlerta: {mensaje: '', color: ''}
		});
		//console.log('continuarExamen1', this.state);
		this.mostrarAlternativas(this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual], 0);
		//console.log('testPsicologicoActual', this.state.testPsicologicoActual);
		this.asignarMensajeContador();
	}
	
	validarCandidatoPreguntasRespondidas(){
		if(this.props.candidatoRespuestasResponse.length > 0){
			/*this.setState({
				candidatoResponse: this.props.candidatoResponse,
				testPsicologicoActual: 4,
				numeroPreguntaActual: 0
			});
			return false;*/
			var ultimaPregunta = this.props.candidatoRespuestasResponse[this.props.candidatoRespuestasResponse.length - 1];
			const preguntasUltimoTest = this.props.candidatoRespuestasResponse.filter(pregunta => pregunta.idTestPsicologico == (ultimaPregunta.idTestPsicologico));
			//console.log('validarCandidatoPreguntasRespondidas', ultimaPregunta);
			//console.log('validarCandidatoPreguntasRespondidas', preguntasUltimoTest);
			if(preguntasUltimoTest.length >= this.props.candidatoResponse.testPsicologicos[ultimaPregunta.idTestPsicologico - 1].preguntas.length){
				//console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO');
				this.setState({
					idCandidato: this.props.candidatoResponse.idCandidato,
					candidatoResponse: this.props.candidatoResponse,
					numeroPreguntaActual: this.state.numeroPreguntaActual ,//+ 1,//0
					testPsicologicoParteActual: ultimaPregunta.idParte,
					testPsicologicoActual: ultimaPregunta.idTestPsicologico
				});
				//console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO', this.state);
				if(this.state.testPsicologicoActual >= this.props.candidatoResponse.testPsicologicos.length){
					console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO. YA NO HAY MAS TEST.');
					return false;
				}
			} else if(ultimaPregunta.idTestPsicologico == 2){//GATB
				//console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO GATB');
				let testPsicologicos = this.props.candidatoResponse.testPsicologicos.filter( t => t.idTestPsicologico == ultimaPregunta.idTestPsicologico);
				//console.log('testPsicologicos',testPsicologicos);
				var i = 0;
				var cantPreguntasTestPsicologico = 0;
				for(i = 1; i <= ultimaPregunta.idParte; i++){
					cantPreguntasTestPsicologico += testPsicologicos[0].preguntas.filter( test => test.idParte == i).length;
				}
				const partesTest = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == ultimaPregunta.idTestPsicologico);
				//console.log('cantPreguntasTestPsicologico:',cantPreguntasTestPsicologico, partesTest);
				//console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO', this.state);
				var numeroPreguntaActualC = (ultimaPregunta.idParte >= partesTest.length ? 0 :
						((this.state.numeroPreguntaActual >= cantPreguntasTestPsicologico) ? 0 : cantPreguntasTestPsicologico));
				//console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO', numeroPreguntaActualC);
				//console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO', ultimaPregunta.idParte >= partesTest.length ? 0 : ultimaPregunta.idParte + 1);
				
				this.setState({
					idCandidato: this.props.candidatoResponse.idCandidato,
					candidatoResponse: this.props.candidatoResponse,
					numeroPreguntaActual: numeroPreguntaActualC,
					testPsicologicoParteActual: ultimaPregunta.idParte >= partesTest.length ? 0 : ultimaPregunta.idParte + 1,
					testPsicologicoActual: (ultimaPregunta.idParte >= partesTest.length ? this.state.testPsicologicoActual + 3 : 
						((numeroPreguntaActualC >= cantPreguntasTestPsicologico) ? this.state.testPsicologicoActual + 2 : this.state.testPsicologicoActual + 1)),
					flagContinuarTest: true
				});
				//console.log('REANUDAR SIGUIENTE TEST PSICOLOGICO', this.state);
			} else {
				//console.log('REANUDAR TEST PSICOLOGICO');
				this.setState({
					idCandidato: this.props.candidatoResponse.idCandidato,
					candidatoResponse: this.props.candidatoResponse,
					numeroPreguntaActual: preguntasUltimoTest.length - 1,
					testPsicologicoParteActual: ultimaPregunta.idParte - 1,
					testPsicologicoActual: ultimaPregunta.idTestPsicologico - 1
				});
			}
		} else {
			this.setState({
				idCandidato: this.props.candidatoResponse.idCandidato,
				candidatoResponse: this.props.candidatoResponse,
				testPsicologicoParteActual: this.state.testPsicologicoParteActual + 1,
				testPsicologicoActual: this.state.testPsicologicoActual + 1
			});
		}
		return true;
	}
	
	obtenerSiguientePregunta(){
		//console.log("obtenerSiguientePregunta", this.state);
		const testPsicologicoAnterior = this.obtenerTestPsicologico();
		const idParteAnterior = this.obtenerIdParte();
		var cantMaxAlt = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == this.obtenerIdTestPsicologico() && test.idParte == this.obtenerIdParte());
		if(this.state.respuestas.length > 0 && this.state.respuestas.length >= cantMaxAlt[0].alternativaMaxSeleccion){
			//console.log("obtenerSiguientePregunta.limpiarAlternativas", this.state);
			this.limpiarAlternativas();
			if(this.props.candidatoResponse.testPsicologicos.length > 0){
				if(this.state.testPsicologicoActual == this.props.candidatoResponse.testPsicologicos.length){
					this.mostrarBotonSiguiente(1);
				} else {
					this.guardarCandidatoRespuesta();
					this.setState({
						respuestas : [],
						numeroPreguntaActual : (this.state.numeroPreguntaActual + 1 >= this.obtenerTestPsicologico().preguntas.length) ? 0 : this.state.numeroPreguntaActual + 1,
						mensajeAlerta: {mensaje: '', color: ''},
						testPsicologicoActual: (this.state.numeroPreguntaActual + 1 >= this.obtenerTestPsicologico().preguntas.length) ? this.state.testPsicologicoActual + 1 : this.state.testPsicologicoActual
					});
					//console.log("obtenerSiguientePregunta.this.state", this.state);
					//console.log("obtenerSiguientePregunta.this.state.", testPsicologicoAnterior.idTestPsicologico, idParteAnterior);
					//console.log("obtenerSiguientePregunta.this.state.", this.obtenerTestPsicologico().idTestPsicologico, this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual].idParte);
					if(this.state.testPsicologicoActual < this.props.candidatoResponse.testPsicologicos.length){
						if(testPsicologicoAnterior.idTestPsicologico == this.obtenerTestPsicologico().idTestPsicologico &&
							idParteAnterior != this.obtenerIdParte()){
							this.setState({
								flagInstrucciones: true
							});
							//console.log("obtenerSiguientePregunta.this.state0", this.state);
						} else 
						if(testPsicologicoAnterior.idTestPsicologico != this.obtenerTestPsicologico().idTestPsicologico){
							this.setState({
								testPsicologicoParteActual: this.state.testPsicologicoParteActual + 1,
								flagInstrucciones: true
							});
							//console.log("obtenerSiguientePregunta.this.state1", this.state);
						} else {
							//console.log("obtenerSiguientePregunta.this.state2", this.state);
							this.mostrarAlternativas(this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual], 0);
						}
						//console.log('testPsicologicoActual', this.state.testPsicologicoActual);
						//console.log("obtenerSiguientePregunta.asigna contador", testPsicologicoAnterior.idTestPsicologico);
						//console.log("obtenerSiguientePregunta.asigna contador", this.obtenerTestPsicologico().idTestPsicologico);
						if(this.state.flagInstrucciones){
							console.log("obtenerSiguientePregunta.muestra instrucciones");
							this.mostrarBotonInicioInstrucciones2(0);
							this.mostrarBotonSiguiente(1);
							this.limpiarValorContador();
						}
					} else {
						if(this.state.testPsicologicoActual == this.props.candidatoResponse.testPsicologicos.length){
							this.obtenerCandidatoInterpretacion();
						}
					}
				}
			}
		} else {
			if(this.state.mensajeContador.mensaje == "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE"){
				//PASAR AL SIGUIENTE TEST
				if(this.obtenerIdTestPsicologico() == 2){
					var i = 0;
					var cantPreguntasTestPsicologico = 0;
					for(i = 1; i <= this.obtenerIdParte(); i++){
						cantPreguntasTestPsicologico += this.obtenerTestPsicologico().preguntas.filter( test => test.idParte == i).length;
					}
					//console.log('obtenerSiguientePregunta.muestra instrucciones::::;;;;;', cantPreguntasTestPsicologico);
					const partesTest = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == this.obtenerIdTestPsicologico())
					//console.log('obtenerSiguientePregunta.muestra instrucciones::::;;;;;', partesTest);
					this.setState({
						respuestas : [],
						testPsicologicoParteActual: this.obtenerIdParte() >= partesTest.length ? 0 : this.state.testPsicologicoParteActual + 1,
						testPsicologicoActual: (this.obtenerIdParte() >= partesTest.length ? this.state.testPsicologicoActual + 1 : 
							((this.state.numeroPreguntaActual >= cantPreguntasTestPsicologico) ? this.state.testPsicologicoActual + 1 : this.state.testPsicologicoActual)),
						numeroPreguntaActual: (this.obtenerIdParte() >= partesTest.length ? 0 :
							((this.state.numeroPreguntaActual >= cantPreguntasTestPsicologico) ? 0 : cantPreguntasTestPsicologico )),
						flagInstrucciones: true,
						mensajeContador: {
							mensaje: '',
							flag: this.state.mensajeContador.flag,
							visible: 'false'
						},
						valorContador: 0,
						mensajeAlerta: {mensaje: '', color: ''}
					});
					//console.log("obtenerSiguientePregunta.muestra instrucciones::::;;;;;", this.state);
					//console.log("obtenerSiguientePregunta.muestra instrucciones::::;;;;;", this.state.mensajeContador);
					this.mostrarBotonInicioInstrucciones2(0);
					this.mostrarBotonSiguiente(1);
				} else {
					console.log("obtenerSiguientePregunta.muestra instrucciones***********************");
				}
			} else {
				this.setState({
					mensajeAlerta: {mensaje: ('DEBE SELECCIONAR ').concat(cantMaxAlt[0].alternativaMaxSeleccion, ' ALTERNATIVA(S)'), color: "color: #E60026"}
				});
			}
		}
	}
	
	mostrarBotonSiguiente(flag){
		document.querySelector('#btnSiguiente').setAttribute('visible', (flag == 1) ? false : true);
	}
	
	mostrarAlternativas(pregunta, flag){
		//console.log('mostrarAlternativas', pregunta);
		var cantidadAlternativas = pregunta.alternativa.length;
		if(flag == 0){
			if(!(cantidadAlternativas == this.state.cantidadAlterPregActual && pregunta.idParte == this.state.idParte)){
				//var identificadorPrefijo = ('alternativa').concat(pregunta.idTestPsicologico, '-', pregunta.idParte, '-', pregunta.idPregunta, '-');
				var identificadorPrefijo = 'alternativa';
				if(cantidadAlternativas == 2){
					document.querySelector(('#').concat(identificadorPrefijo,'1')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'1'), 0);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'2')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'2'), 1);
					}.bind(this));
					this.setState({
						flagAlternativa1: true,
						flagAlternativa2: true,
						flagAlternativa3: false,
						flagAlternativa4: false,
						flagAlternativa5: false,
						cantidadAlterPregActual: pregunta.alternativa.length
					});
				} else if(cantidadAlternativas == 4){
					document.querySelector(('#').concat(identificadorPrefijo,'1')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'1'), 0);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'2')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'2'), 1);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'3')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'3'), 2);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'4')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'4'), 3);
					}.bind(this));
					this.setState({
						flagAlternativa1: true,
						flagAlternativa2: true,
						flagAlternativa3: true,
						flagAlternativa4: true,
						flagAlternativa5: false,
						cantidadAlterPregActual: pregunta.alternativa.length
					});
				} else if(cantidadAlternativas == 5){
					document.querySelector(('#').concat(identificadorPrefijo,'1')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'1'), 0);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'2')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'2'), 1);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'3')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'3'), 2);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'4')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'4'), 3);
					}.bind(this));
					document.querySelector(('#').concat(identificadorPrefijo,'5')).addEventListener('click', function (evt) {
						this.seleccionarAlternativa(('#').concat(identificadorPrefijo,'5'), 4);
					}.bind(this));
					this.setState({
						flagAlternativa1: true,
						flagAlternativa2: true,
						flagAlternativa3: true,
						flagAlternativa4: true,
						flagAlternativa5: true,
						cantidadAlterPregActual: pregunta.alternativa.length
					});
				}
			}
		} else {
			document.querySelector(('#').concat(identificadorPrefijo,'1')).setAttribute('visible', false);
			document.querySelector(('#').concat(identificadorPrefijo,'2')).setAttribute('visible', false);
			document.querySelector(('#').concat(identificadorPrefijo,'3')).setAttribute('visible', false);
			document.querySelector(('#').concat(identificadorPrefijo,'4')).setAttribute('visible', false);
			document.querySelector(('#').concat(identificadorPrefijo,'5')).setAttribute('visible', false);
		}
	}
	
	obtenerTestPsicologico(){
		return this.props.candidatoResponse.testPsicologicos[this.state.testPsicologicoActual];
	}
	
	obtenerIdTestPsicologico(){
		return this.obtenerTestPsicologico().idTestPsicologico;
	}
	
	obtenerIdParte(){
		return this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual].idParte;
	}
	
	asignarMensajeContador(){//Validar si test psicologico es GATB
		//console.log('asignarMensajeContador:::::::::::::::::', this.state);
		//console.log('asignarMensajeContador:::::::::::::::::', this.state.mensajeContador);
		if(this.obtenerIdTestPsicologico() == 2 && !this.state.flagInstrucciones){//GATB
			const idParte = this.obtenerIdParte();
			const idTestPsicologico = this.obtenerIdTestPsicologico();
			const contadorMensaje = idTestPsicologico + "-" + idParte;
			const mensajeContador = this.state.mensajeContador;
			console.log('asignarMensajeContador', mensajeContador, contadorMensaje);
			if(mensajeContador.flag != contadorMensaje){
				this.asignarValorContador();
			} else {
				console.log('Ya se encuentra asignado el contador.');
			}
		}
	}
	
	asignarContador(idTestPsicologico, idParte){//GATB
		var contador = 0;
		if(idTestPsicologico == 2){
			var cantMaxAlt = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == idTestPsicologico && test.idParte == idParte);
			//console.log('asignarContador', cantMaxAlt[0].duracion);
			contador = cantMaxAlt[0].duracion * 60;
			/*if(idParte == 1){
				//contador = 2;
				contador = 6 * 60;
			} else if(idParte == 2){
				//contador = 4;
				contador = 6 * 60;
			} else if(idParte == 3){
				//contador = 3;
				contador = 6 * 60;
			} else if(idParte == 4){
				//contador = 3;
				contador = 6 * 60;
			} else if(idParte == 5){
				//contador = 5;
				contador = 7 * 60;
			}*/
		}
		return contador;
	}
	
	asignarValorContador(){
		this.interval = setInterval(() => {
				var duracion = this.asignarContador(this.obtenerIdTestPsicologico(), this.obtenerIdParte());
				if(this.state.valorContador <= duracion){
					this.setState({
						idParte: this.obtenerIdParte(),
						mensajeContador: {
							mensaje: (duracion - this.state.valorContador > 0) ? this.obtenerMinutos(duracion - this.state.valorContador) + ":" + this.obtenerSegundos(duracion - this.state.valorContador) : "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE",
							flag: this.obtenerIdTestPsicologico() +"-"+ this.obtenerIdParte(),
							visible: this.state.flagInstrucciones ? 'false' : 'true'
						},
						valorContador: this.state.valorContador + 1
					});
					//console.log('asignarValorContador::::::::::::::::::::::::::::::::::::::::', this.state);
					//console.log('asignarValorContador::::::::::::::::::::::::::::::::::::::::', this.state.mensajeContador);
				} else {
					clearInterval(this.interval);
				}
			}
		, 1000);
	}
	
	obtenerMinutos(valor){ return Math.floor(valor / 60) }
	obtenerSegundos(valor){ return ('0' + valor % 60).slice(-2) }
	
	limpiarValorContador(){
		clearInterval(this.interval);
	}
	
	mostrarBotonInicio(flag){
		document.querySelector('#btnInicio').setAttribute('visible', (flag == 1) ? false : true );
	}
	
	mostrarBotonInicioInstrucciones(flag){
		document.querySelector('#btnInicioInstrucciones').setAttribute('visible', (flag == 1) ? false : true);
	}
	
	mostrarBotonInicioInstrucciones2(flag){
		document.querySelector('#btnInicioInstrucciones2').setAttribute('visible', (flag == 1) ? false : true);
	}
	
	seleccionarAlternativa(idAlternativa, indiceAlternativa){
		if(this.state.mensajeContador.mensaje == "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE"){
			console.log('seleccionarAlternativa: Se acabó el tiempo. NO PUEDE SELECCIONAR MAS ALTERNATIVAS');
		} else {
			var cantMaxAlt = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == this.obtenerIdTestPsicologico() && test.idParte == this.obtenerIdParte());
			if(this.state.respuestas.length >= cantMaxAlt[0].alternativaMaxSeleccion){
				var i = -1;
				var alternat = this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual].alternativa[indiceAlternativa];
				//console.log('alternat',alternat);
				var flag = this.state.respuestas.map( resp =>{
					//console.log('resp.respuesta',resp.respuesta);
					if(resp.respuesta == alternat.alternativa){
						this.alternativaSeleccionada(idAlternativa);
						let respuesta = this.state.respuestas;
						i = respuesta.indexOf(resp);
						console.log('Es igual:', resp.respuesta, alternat.alternativa, i);
						if(this.state.idTestPsicologico == 3){//DISC
							const valorAlternativa = document.querySelector(idAlternativa).getAttribute('value');
							//console.log('Se retira 4 ultimos caracteres de la alternativa seleccionada ', valorAlternativa);
							document.querySelector(idAlternativa).setAttribute('value', valorAlternativa.substring(valorAlternativa.length -4, 0) );
							respuesta.splice(i, 1);
							//console.log('Las alternativas seleccionadas son ', respuesta);
						} else {
							respuesta.splice(i, 1);
						}
						this.setState({
							respuestas: respuesta,
							mensajeAlerta: {mensaje: '', color: ''}
						});
						//console.log('Es igual:', this.state.respuestas);
					}
				});
				if(this.state.respuestas.length >= cantMaxAlt[0].alternativaMaxSeleccion){
					this.setState({
						mensajeAlerta: {mensaje: ('SÓLO PUEDE SELECCIONAR ').concat(cantMaxAlt[0].alternativaMaxSeleccion,' ALTERNATIVA(S)'), color:"color: #FBBA00"}
					});
				}
			} else {
				let respuesta = this.state.respuestas;
				//console.log('alternat',indiceAlternativa);
				var alternat = this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual].alternativa[indiceAlternativa];
				if(respuesta.length == 0){
					//console.log('alternat',idAlternativa, this.state);
					if(this.obtenerIdTestPsicologico() == 3){//DISC
						const valorAlternativa = document.querySelector(idAlternativa).getAttribute('value');
						document.querySelector(idAlternativa).setAttribute('value', valorAlternativa.concat(" (+)"));
						//console.log('Se asigna (+) a la alternativa ',document.querySelector(idAlternativa).getAttribute('value'));
					}
					respuesta.push({ respuesta : alternat.alternativa });
				} else {
					if(respuesta[0].respuesta == alternat.alternativa){
						if(this.obtenerIdTestPsicologico() == 3){//DISC
							//console.log('seleccionarAlternativa valor igual substring');
							const valorAlternativa = document.querySelector(idAlternativa).getAttribute('value');
							document.querySelector(idAlternativa).setAttribute('value', valorAlternativa.substring(valorAlternativa.length -4, 0) );
						}
						respuesta.splice(0, 1);
					} else {
						if(this.obtenerIdTestPsicologico() == 3){//DISC
							/* Lógica para saber si es (+) ó (-) */
							var i = 0;
							const identificadorPrefijo = 'alternativa';
							for(i = 1; i <= 4; i++){
								var valorAlternativa = document.querySelector(("#").concat(identificadorPrefijo, i)).getAttribute('value');
								if(valorAlternativa.substring(valorAlternativa.length -4, valorAlternativa.length) == " (+)"){
									//console.log('La alternativa ', valorAlternativa, ' contiene (+)');
									const valorAlterSelec = document.querySelector(idAlternativa).getAttribute('value');
									document.querySelector(idAlternativa).setAttribute('value', valorAlterSelec.concat(" (-)"));
									//console.log('Se asigna (-) a la alternativa ', valorAlterSelec);
									respuesta.push({ respuesta : alternat.alternativa });
									i = 5;
								} else if(valorAlternativa.substring(valorAlternativa.length -4, valorAlternativa.length) == " (-)"){
									//console.log('La alternativa ', valorAlternativa, ' contiene (-)');
									//console.log('respuesta', alternat.alternativa);
									const valorAlterSelec = document.querySelector(idAlternativa).getAttribute('value');
									document.querySelector(idAlternativa).setAttribute('value', valorAlterSelec.concat(" (+)"));
									//console.log('Se asigna (+) a la alternativa ', valorAlterSelec);
									respuesta.splice(0, 0, { respuesta : alternat.alternativa });
									i = 5;
								}
								//console.log('Las alternativas seleccionadas son ', respuesta);
							}
						} else {
							respuesta.push({ respuesta : alternat.alternativa });
						}
					}
				}
				this.setState({
					idTestPsicologico: this.obtenerIdTestPsicologico(),
					idParte: this.obtenerIdParte(),
					idPregunta: this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActual].idPregunta,
					respuestas: respuesta,
					mensajeAlerta: {mensaje: '', color: ''},
					mensajeContador: {
						mensaje: this.state.mensajeContador.mensaje,
						flag: this.obtenerIdTestPsicologico() + "-" + this.obtenerIdParte(),
						visible: (this.obtenerIdTestPsicologico() == 2 && !this.state.flagInstrucciones) ? 'true' : 'false'
					}
				});
				this.alternativaSeleccionada(idAlternativa);
			}
		}
	}
	
	alternativaSeleccionada(idAlternativa){
		if(this.state.idTestPsicologico == 2 && this.state.idParte == 3){//GATB
			this.alternativaSeleccionadaGATBParte3(idAlternativa);
		} else {
			if(document.querySelector(idAlternativa).getAttribute('material').color === "#333"){
				document.querySelector(idAlternativa).setAttribute('material', "color: #18afa8");
				document.querySelector(idAlternativa).setAttribute('text', "height:1.01;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false");
			} else {
				document.querySelector(idAlternativa).setAttribute('material', "color: #333");
				document.querySelector(idAlternativa).setAttribute('text', "height:1.01;color:#fff;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false");
			}
		}
	}
	
	alternativaSeleccionadaGATBParte3(idAlternativa){
		if(document.querySelector(idAlternativa).getAttribute('material').color === "#333"){
			document.querySelector(idAlternativa).setAttribute('material', "color: #18afa8;opacity: 0.10");
			document.querySelector(idAlternativa).setAttribute('text', "height:1.01;align:center;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false");
		} else {
			document.querySelector(idAlternativa).setAttribute('material', "color: #333;opacity: 0.70");
			document.querySelector(idAlternativa).setAttribute('text', "height:1.01;align:center;color:#fff;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false");
		}
	}
	
	guardarCandidatoRespuesta() {
		//console.log('guardarCandidatoRespuesta', this.state);
		this.setState({
			candidato:{
				idCandidato: this.state.idCandidato,
				idTestPsicologico: this.state.idTestPsicologico,
				idParte: this.state.idParte,
				idPregunta: this.state.idPregunta,
				respuesta : this.obtenerFormatoRespuesta(this.state.respuestas)
			}
		}, () => {
			//if(this.state.respuestas.length > 0){
			if(this.state.candidato.respuesta.length > 0){
				this.props.guardarCandidatoRespuesta(this.state.candidato);
			} else {
				//No ha seleccionado respuesta
			}
			this.limpiar();
		});
	}
	
	obtenerCandidatoInterpretacion() {
		//console.log('obtenerCandidatoInterpretacion', this.state);
		this.props.obtenerInterpretacion(this.state.idCandidato);
	}
	
	obtenerFormatoRespuesta(respuestas) {
		if(this.state.idTestPsicologico == 2 && this.state.idParte == 4){//GATB
			return this.obtenerFormatoRespuestaGATBParte4(respuestas);
		} else {
			return respuestas;
		}
	}
	
	obtenerFormatoRespuestaGATBParte4(respuestas) {
		var alternativas = respuestas.map( respuesta => {
			return respuesta.respuesta.toLowerCase()
		});
		alternativas.sort();
		var respuestaFormato = ('').concat(alternativas[0], '-', alternativas[1]);
		let respuesta = [];
		respuesta.push({ respuesta : respuestaFormato });
		return respuesta;
	}
	
	limpiarAlternativas(){
		//console.log('limpiar', this.state);
		if(this.state.numeroPreguntaActual <= this.obtenerTestPsicologico().preguntas.length){
			//var identificadorPrefijo = ('alternativa').concat(this.state.idTestPsicologico, '-', this.state.idParte, '-', this.state.idPregunta, '-');
			var identificadorPrefijo = 'alternativa';
			if(this.state.idTestPsicologico == 2 && this.state.idParte == 3){//GATB
				this.limpiarAlternativasGATBParte3();
			} else {
				if(this.state.flagAlternativa1){
					document.querySelector(('#').concat(identificadorPrefijo,'1')).setAttribute('material', "color: #18afa8");
					document.querySelector(('#').concat(identificadorPrefijo,'1')).setAttribute('text', "height:1.01;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false");
				}
				if(this.state.flagAlternativa2){
					document.querySelector(('#').concat(identificadorPrefijo,'2')).setAttribute('material', "color: #18afa8");
					document.querySelector(('#').concat(identificadorPrefijo,'2')).setAttribute('text', "height:1.01;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false");
				}
				if(this.state.flagAlternativa3){
					document.querySelector(('#').concat(identificadorPrefijo,'3')).setAttribute('material', "color: #18afa8");
					document.querySelector(('#').concat(identificadorPrefijo,'3')).setAttribute('text', "height:1.01;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false");
				}
				if(this.state.flagAlternativa4){
					document.querySelector(('#').concat(identificadorPrefijo,'4')).setAttribute('material', "color: #18afa8");
					document.querySelector(('#').concat(identificadorPrefijo,'4')).setAttribute('text', "height:1.01;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false");
				}
				if(this.state.flagAlternativa5){
					document.querySelector(('#').concat(identificadorPrefijo,'5')).setAttribute('material', "color: #18afa8");
					document.querySelector(('#').concat(identificadorPrefijo,'5')).setAttribute('text', "height:1.01;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false");
				}
			}
		}
	}
	
	limpiarAlternativasGATBParte3(){
		if(this.state.numeroPreguntaActual < this.obtenerTestPsicologico().preguntas.length){
			var identificadorPrefijo = 'alternativa';
			if(this.state.flagAlternativa1){
				document.querySelector(('#').concat(identificadorPrefijo,'1')).setAttribute('material', "color: #18afa8;opacity: 0.10");
				document.querySelector(('#').concat(identificadorPrefijo,'1')).setAttribute('text', "height:1.01;align:center;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false");
			}
			if(this.state.flagAlternativa2){
				document.querySelector(('#').concat(identificadorPrefijo,'2')).setAttribute('material', "color: #18afa8;opacity: 0.10");
				document.querySelector(('#').concat(identificadorPrefijo,'2')).setAttribute('text', "height:1.01;align:center;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false");
			}
			if(this.state.flagAlternativa3){
				document.querySelector(('#').concat(identificadorPrefijo,'3')).setAttribute('material', "color: #18afa8;opacity: 0.10");
				document.querySelector(('#').concat(identificadorPrefijo,'3')).setAttribute('text', "height:1.01;align:center;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false");
			}
			if(this.state.flagAlternativa4){
				document.querySelector(('#').concat(identificadorPrefijo,'4')).setAttribute('material', "color: #18afa8;opacity: 0.10");
				document.querySelector(('#').concat(identificadorPrefijo,'4')).setAttribute('text', "height:1.01;align:center;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false");
			}
		}
	}
	
	limpiar(){
		this.setState({
			idTestPsicologico: '',
			idPregunta: '',
			respuestas : [],
			candidato:{},
			mensajeAlerta: {mensaje: '', color: ''}
		});
	}
	
	validarHorarioDiurno(){
		var fecha = new Date(); 
		if(fecha.getHours() >= 6 && fecha.getHours() <= 18){
			return true;
		} else {
			return false;
		}
	}
	
	render() {
		const {idCandidato, idTestPsicologico, idParte, idPregunta, respuesta} = this.state;
		/*
		<a-entity cursor
					position="0 0 -0.4"
					geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.025"
					material="color: black; shader: flat">
				</a-entity>
				*/
		var camara = (
			<a-entity id="jugador" camera kinematic-body look-controls universal-controls
				position="0.6 1.4 0.15" >
				<MensajeContador key={'mensajeContador'} id={'mensajeContador'} label={this.state.mensajeContador.mensaje} position={'0 0.20 -0.27'} color={"color: #E60026"} visible={this.state.mensajeContador.visible} />
				<MensajeAlerta key={'mensajeAlerta'} id={'mensajeAlerta'} label={this.state.mensajeAlerta.mensaje} position={'0 -0.20 -0.27'} color={this.state.mensajeAlerta.color} />
			</a-entity>
		);
		//console.log('render', this.state);
		var form = {
			mensaje: {
				mensajeBienvenida: obtenerTextoBienvenida(this.props.candidatoResponse.nombre),
				mensajeFinalizado: obtenerTextoFinalizado(this.props.candidatoResponse.nombre)
			},
			botones: [
				{
					key: 'btnInicio',
					label: '< INICIAR PRUEBA > ',
					position: '0 -0.175 0',
					geometria: 'primitive: box; width: 0.3; height: 0.1; depth: 0.001',
					visible: (typeof this.props.candidatoResponse.nombre != "undefined") ? 'true' : 'false'
				} , {
					key: 'btnInicioInstrucciones',
					label: '< INICIAR PRUEBA > ',
					position: '0 -0.15 0',
					geometria: 'primitive: box; width: 0.3; height: 0.1; depth: 0.001',
					visible: 'false'
				} , {
					key: 'btnInicioInstrucciones2',
					label: '< INICIAR PRUEBA > ',
					position: '0 -0.15 0',
					geometria: 'primitive: box; width: 0.3; height: 0.1; depth: 0.001',
					visible: 'false'
				} , {
					key: 'btnSiguiente',
					label: 'SIGUIENTE > ',
					position: '0.515 0 0',
					geometria: 'primitive: box; width: 0.19; height: 0.55; depth: 0.001',
					visible: 'false'
				}
			]
		};
		
		var botonesForm = form.botones.map( boton =>{
			return (<Boton key={boton.key} id={boton.key} label={boton.label} position={boton.position} geometria={boton.geometria} visible={boton.visible} />);
		});
		
		var sexo = '';
		if(this.props.candidatoResponse.sexo != null){
			if(this.props.candidatoResponse.sexo.idSexo == 1){
				sexo = 'F'; 
			} else if(this.props.candidatoResponse.sexo.idSexo == 2){
				sexo = 'M'; 
			}
		}
		
		var assets = (
			<a-assets>
				<img id="oficina-pared" src="assets/roomgltf/textures/Pared.png" ></img>
				{
					this.validarHorarioDiurno() ? (
					<img id="calle" src="assets/PanoramaDiurno.jpg" ></img>
					) : (
						<img id="calle" src="assets/Panorama.jpg" ></img>
					)
				}
			</a-assets>
		);
		
		return(
			<a-scene cursor="rayOrigin: mouse">
				{assets}
				{camara}
				<a-sky src="#calle" color="#ECECEC"></a-sky>
				
				<a-grid position="0 0 0" visible="false" static-body></a-grid>
				
				{
					(sexo === 'F') ? 
					(
						<a-entity id="presentadorMujerOriental" gltf-model="url(assets/personaje/mujer/scene.gltf)"
							animation-mixer="clip: Take 001;"
							position="0.080 0 -0.28"
							rotation="0 45 0"
							scale="0.023 0.023 0.023">
							<a-entity light="intensity:1.50" data-aframe-default-light="" 
								aframe-injected="" position="-0.11 2.61 -0.99"></a-entity>
						</a-entity>
					) : (
						(sexo === 'M') ? 
						(
							<a-entity id="presentadorHombreNegocios" gltf-model="url(assets/personaje/hombre/scene.gltf)"
								animation-mixer="clip: Take 001;"
								position="0.085 0 -0.28"
								rotation="0 -25 0"
								scale="0.009 0.009 0.009">
								
							</a-entity>
						) : (<Fragment></Fragment>)
					)
				}
				{
					this.validarHorarioDiurno() ? 
					(
					<Fragment>
						<a-box position="-2.130 1.5 -5.220" rotation="0 -20 0" width="12" height="3" color="#fbe3d7" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="4.540 1.5 3.280" rotation="0 70 0" width="8" height="3" color="#fbe3d7" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="-6.960 1.45 -1.490" rotation="0 70 0" width="10" height="7" color="#000" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="0.7 3.5 4.590" rotation="0 -20 0" width="24" height="7" color="#1d1810" depth="0.1" visible="false" static-body ></a-box>
						
						<a-box position="8.950 1.5 -1.230" rotation="0 70 0" width="8" height="3" color="#fbe3d7" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="-0.71 3.5 -8.350" rotation="0 -20 0" width="24" height="7" color="#1d1810" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="8.34 3.5 0.070" rotation="0 -20 0" width="5" height="7" color="#1d1810" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="4.12 1.41 -4.650" rotation="0 70 0" width="3" height="7" color="#1d1810" depth="0.1" visible="false" static-body ></a-box>
						
						<a-entity id="habitacionAmplia" gltf-model="url(assets/roomdiurno/scene.gltf)"
							position="0.870 1.910 -1.230"
							rotation="0 -20 0"
							scale="0.025 0.025 0.025">
							
							<a-entity light="intensity:1.50" data-aframe-default-light="" 
								aframe-injected="" position="-0.11 2.61 -0.99"></a-entity>
						</a-entity>
					</Fragment>
					) : (
					<Fragment>
						<a-box position="0 1.5 -4.5" rotation="0 0 0" width="9" height="3" color="#fbe3d7" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="4.5 1.5 -0.650" rotation="0 90 0" width="8" height="3" color="#fbe3d7" depth="0.1" visible="false" static-body ></a-box>
						<a-box position="-2.99 1.45 -0.7" rotation="0 90 0" width="8" height="7" color="#000" depth="0.1" visible="false" static-body ></a-box>
						<a-box src="#oficina-pared" position="0.7 3.5 2.7" rotation="0 0 0" width="8" height="7" color="#1d1810" depth="0.1" static-body ></a-box>
						
						<a-entity id="habitacion" gltf-model="url(assets/roomgltf/scene.gltf)"
							position="0.870 0.48 -1.230"
							scale="0.27 0.27 0.27">
							<a-entity light="intensity:1.50" data-aframe-default-light="" 
								aframe-injected="" position="-0.11 2.61 -0.99"></a-entity>
						</a-entity>
					</Fragment>
					)
				}
				
				<a-entity id="testpsicologicos" position="0.6 1.1 -0.25" >
					<a-plane position="0 0.3 -0.19" rotation="0 0 0" width="0.84" height="0.57" 
						color="white">
						
						<Pregunta mensaje={form.mensaje} candidato={this.state.candidatoResponse}
							mostrarInstrucciones={this.state.flagInstrucciones}
							testPsicologico={this.props.testPsicologicosPartesResponse} 
							testPsicologicoActual={this.state.testPsicologicoActual} numeroPreguntaActual={this.state.numeroPreguntaActual}
							testPsicologicoParteActual={this.state.testPsicologicoParteActual} />
						
						{botonesForm}
					</a-plane>
				</a-entity>
			</a-scene>
		);
	}
}

function mapStateToProps(state){
	return{
		testPsicologicosPartesResponse : state.reducerTestPsicologico.obtenerTestPsicologicosPartesResponse,
		candidatoResponse : state.reducerCandidato.obtenerCandidatoTestPsicologicosPreguntasResponse,
		candidatoRespuestasResponse : state.reducerCandidato.obtenerCandidatoRespuestasResponse,
		candidatoRespuestaResponse : state.reducerCandidato.guardarCandidatoRespuestaResponse,
		candidatoInterpretacionResponse : state.reducerCandidato.obtenerInterpretacionResponse
	}
}

export default connect(mapStateToProps, { obtenerTestPsicologicosPartes, obtenerCandidatoTestPsicologicosPreguntas, obtenerCandidatoRespuestas, guardarCandidatoRespuesta, obtenerInterpretacion })(Escena);