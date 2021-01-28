import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import MensajeAlerta from '../components/MensajeAlerta';
import Tablero from '../components/Tablero';
import Boton from '../components/Boton';

import Header from '../common/Header';
import Footer from '../../../common/components/Footer'
import {obtenerValorParametro} from '../../../common/components/encriptar_aes'
import MensajeBienvenidaWeb from '../common/MensajeBienvenidaWeb';
import TableroEnunciadoWeb from '../common/TableroEnunciadoWeb';
import MensajeInstruccionesWeb from '../common/MensajeInstruccionesWeb';
import MensajeFinalizacionExamWeb from '../common/MensajeFinalizacionExamWeb';
import MensajeContador from '../common/MensajeContador';

import {obtenerTestPsicologicosPartes} from '../../../../actions/actionTestPsicologico';
import {obtenerCandidatoTestPsicologicosPreguntas, obtenerCandidatoRespuestas, guardarCandidatoRespuesta, obtenerInterpretacion, validarTestPsicologicosFinalizado} from '../../../../actions/actionCandidato';
import {notificarReclutador} from '../../../../actions/actionReclutador';

class ExamenPsicologicoWeb extends Component {
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
			numeroPreguntaActualIndex: -1,
			testPsicologicoActual: -1,
			testPsicologicoActualObjeto: {},
			testPsicologicoParteActual: 0,
			cantidadAlterPregActual: 0,
			mensajeAlerta: {mensaje: '', estilo: ''},
			mensajeContador: {mensaje: '' , flag: '', visible: false, estilo: ''},
			flagInstrucciones: true,
			valorContador: 0,/* Cantidad de segundos a mostrar */
			flagContinuarTest: false,
			
			testPsicologicosAsignados: -1,/* Cantidad de test asignados al candidato */
			
			flagMostrarBotonInicio: true,
			flagMostrarBotonInicioInstrucciones: false,
			flagMostrarBotonInicioInstrucciones2: false,
			flagMostrarBotonSiguiente: false,
			
			listaAlternativasSeleccionadas: [false, false, false, false, false],
			respuestaPreguntaAbierta: ''
		}
		
		this.guardarCandidatoRespuesta = this.guardarCandidatoRespuesta.bind(this);
		this.mostrarInstrucciones = this.mostrarInstrucciones.bind(this);
		this.obtenerSiguientePregunta = this.obtenerSiguientePregunta.bind(this);
		this.alternativaSeleccionar = this.alternativaSeleccionar.bind(this);
	}
	
	componentWillMount() {
		this.props.validarTestPsicologicosFinalizado(obtenerValorParametro('id'));
		this.props.obtenerCandidatoTestPsicologicosPreguntas(obtenerValorParametro('id'));
		this.props.obtenerCandidatoRespuestas(obtenerValorParametro('id'));
		this.props.obtenerTestPsicologicosPartes();
	}
	
	iniciarPruebas(e){
		this.mostrarBotonInicio();
		if(this.validarCandidatoPreguntasRespondidas()){
			//console.log("[iniciarPruebas] flagMostrarBotonInicioInstrucciones:" + this.state.flagMostrarBotonInicioInstrucciones);
			//console.log("[iniciarPruebas] flagInstrucciones:" + this.state.flagInstrucciones);
			if(this.state.flagInstrucciones && !this.props.candidatoTestPsicologicosFinalizadoResponse){
				this.mostrarBotonInicioInstrucciones();
			}
		}
	}
	
	iniciarExamen(){
		var flagInstrucciones = false;
		this.mostrarBotonInicioInstrucciones();
		this.mostrarBotonSiguiente();
		this.setState({
			flagInstrucciones: flagInstrucciones/*,
			flagContinuarTest: true*/
		});
		this.asignarMensajeContador(flagInstrucciones);
	}
	
	continuarExamen(){
		var flagInstrucciones = false;
		//console.log('continuarExamen:flag I:',this.state.flagInstrucciones);
		this.mostrarBotonInicioInstrucciones2();
		this.mostrarBotonSiguiente();
		this.setState({
			flagInstrucciones: flagInstrucciones,
			valorContador: 0,
			mensajeAlerta: {mensaje: '', estilo: ''}
		});
		//console.log('continuarExamen:flag F:',this.state.flagInstrucciones);
		this.asignarMensajeContador(flagInstrucciones);
	}
	
	alternativaSeleccionar(pregunta, indiceAlternativa, respuestaPreguntaAbierta){
		var mensajeAlerta = {mensaje: '', estilo: ''};
		var marcarAlternativa = true;
		var alternativasID = ["alternativa1", "alternativa2", "alternativa3", "alternativa4"];
		if(this.state.mensajeContador.mensaje == "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE"){
			console.log('Pregunta con contador. Se acabó el tiempo. NO PUEDE SELECCIONAR MAS ALTERNATIVAS');
		} else {
			//console.log('Pregunta sin contador.');
			var cantMaxAlt = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == this.obtenerIdTestPsicologico() && test.idParte == this.obtenerIdParte() );
			var alternat = this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActualIndex].alternativa[indiceAlternativa];
			console.log('alternat.', alternat);
			var alternativaGlosa = alternat.glosa;
			let respuesta = this.state.respuestas;
			//let respuestaPreguntaAbiert = this.state.respuestaPreguntaAbierta;
			let respuestaPreguntaAbiert = respuestaPreguntaAbierta
			//console.log('Pregunta sin contador. cantMaxAlt:', cantMaxAlt[0].alternativaMaxSeleccion);
			
			// Si tiene glosa, entonces la pregunta es cerrada.
			// Si no tiene glosa, entonces la pregunta es abierta.
			//if(alternativaGlosa.length > 0){
			if(respuestaPreguntaAbiert != null){
				if(respuestaPreguntaAbiert.length == 0){
					mensajeAlerta = {mensaje: ('Debe ingresar una respuesta'), estilo:"mensajeAlertaPeligro"};
				}
				//document.querySelector(("#").concat(alternativasID[indiceAlternativa])).textContent = alternat.glosa;
				
				this.setState({
					respuestaPreguntaAbierta: respuestaPreguntaAbiert
				});
				//console.log('respuestaPreguntaAbierta', respuestaPreguntaAbiert)
				respuesta = [{ respuesta : respuestaPreguntaAbiert }]
				//console.log('respuesta', respuesta)
			} else {
				if(this.state.respuestas.length >= cantMaxAlt[0].alternativaMaxSeleccion){
					//console.log(' Cantidad de alternativas seleccionadas es IGUAL o MAYOR a máximo de alternativas posibles de seleccionar.');
					var i = -1;
					var isSameAnswerSelected = this.state.respuestas.map( resp =>{
						if(resp.respuesta == alternat.alternativa){
							marcarAlternativa = true;
							i = respuesta.indexOf(resp);
							if(this.state.idTestPsicologico == 3){//DISC
								document.querySelector(("#").concat(alternativasID[indiceAlternativa])).textContent = alternat.glosa;
							}
							respuesta.splice(i, 1);
						}
					});
					
					if(this.state.respuestas.length >= cantMaxAlt[0].alternativaMaxSeleccion){
						mensajeAlerta = {mensaje: ('SÓLO PUEDE SELECCIONAR ').concat(cantMaxAlt[0].alternativaMaxSeleccion,' ALTERNATIVA(S)'), estilo:"mensajeAlertaPeligro"};
						marcarAlternativa = false;
					}
				} else {
					//console.log(' Cantidad de alternativas seleccionadas es MENOR al máximo de alternativas posibles de seleccionar.');
					if(respuesta.length == 0){
						if(this.obtenerIdTestPsicologico() == 3){//DISC
							document.querySelector(("#").concat(alternativasID[indiceAlternativa])).textContent = alternat.glosa + " (+)";
						}
						respuesta.push({ respuesta : alternat.alternativa });
					} else {
						if(respuesta[0].respuesta == alternat.alternativa){
							document.querySelector(("#").concat(alternativasID[indiceAlternativa])).textContent = alternat.glosa;/*.substring(valorAlternativa.length -4, 0);*/
							respuesta.splice(0, 1);
						} else {
							if(this.obtenerIdTestPsicologico() == 3){//DISC
								/* Lógica para saber si es (+) ó (-) */
								for(i = 0; i < 4; i++){
									var valorAlternativa = document.querySelector(("#").concat(alternativasID[i])).textContent;
									if(valorAlternativa.substring(valorAlternativa.length -4, valorAlternativa.length) == " (+)"){
										document.querySelector(("#").concat(alternativasID[indiceAlternativa])).textContent = alternat.glosa + " (-)";
										respuesta.push({ respuesta : alternat.alternativa });
										i = 5;
									} else if(valorAlternativa.substring(valorAlternativa.length -4, valorAlternativa.length) == " (-)") {
										document.querySelector(("#").concat(alternativasID[indiceAlternativa])).textContent = alternat.glosa + " (+)";
										respuesta.splice(0, 0, { respuesta : alternat.alternativa });
										i = 5;
									}
								}
							} else {
								respuesta.push({ respuesta : alternat.alternativa });
							}
						}
					}
				}

				if(marcarAlternativa){
					this.marcarAlternativa(indiceAlternativa);
				}
			}
			
			this.setState({
				idTestPsicologico: this.obtenerIdTestPsicologico(),
				idParte: this.obtenerIdParte(),
				idPregunta: this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActualIndex].idPregunta,
				respuestas: respuesta,
				mensajeAlerta: mensajeAlerta,
				mensajeContador: {
					mensaje: this.state.mensajeContador.mensaje,
					flag: this.obtenerIdTestPsicologico() + "-" + this.obtenerIdParte(),
					visible: ((this.obtenerIdTestPsicologico() == 2 || this.obtenerIdTestPsicologico() == 4) && !this.state.flagInstrucciones) ? true : false, //GATB
					estilo: 'mensajeContador'
				}
			});
			//console.log(" respuesta::", this.state.respuestas);
		}
	}

	mostrarBotonInicio(){
		this.setState({
			flagMostrarBotonInicio: !this.state.flagMostrarBotonInicio
		});
	}
	
	mostrarBotonInicioInstrucciones(){
		this.setState({
			flagMostrarBotonInicioInstrucciones: !this.state.flagMostrarBotonInicioInstrucciones
		});
	}
	
	mostrarBotonInicioInstrucciones2(){
		this.setState({
			flagMostrarBotonInicioInstrucciones2: !this.state.flagMostrarBotonInicioInstrucciones2
		});
	}
	
	seAcaboElTiempo(mensajeContador){
		if(mensajeContador.mensaje == "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE"){
			return true;
		} else {
			return false;
		}
	}
	
	obtenerSiguientePregunta(){
		const testPsicologicoAnterior = this.obtenerTestPsicologico();
		const idParteAnterior = this.obtenerIdParte();
		var cantMaxAlt = this.props.testPsicologicosPartesResponse.filter(test => 
				test.idTestPsicologico == this.obtenerIdTestPsicologico() && 
				test.idParte == this.obtenerIdParte());
		
		const testPsicologicoPartes = this.props.testPsicologicosPartesResponse.filter(pregunta => (
				pregunta.idTestPsicologico == this.obtenerIdTestPsicologico() ) );
		const cantidadTestPsicologicoPartes = testPsicologicoPartes.length;
		
		var flagContinuarTest = true;//VALOR POR DEFAULT
		var stateFlagInstrucciones = true;//VALOR POR DEFAULT
		var respuestasSeleccionadas = this.state.respuestas;
		var stateMensajeContador = {
				mensaje: '',
				flag: this.state.mensajeContador.flag,
				visible: false,
				estilo: 'mensajeContador'
			};
		var stateValorContador = 0;
		var stateMensajeAlerta = {mensaje: '', estilo: ''};
		
		var stateNumeroPreguntaActualIndex = this.state.numeroPreguntaActualIndex;
		var stateTestPsicologicoParteActual = this.state.testPsicologicoParteActual;
		var stateTestPsicologicoActualIndex = this.state.testPsicologicoActual;
		var stateTestPsicologicoActualObjeto = this.state.testPsicologicoActualObjeto;
		
		const cantTestPsicologicosAsignados = this.state.testPsicologicosAsignados;
		
		const testPsicologicosAsignadosACandidato = this.props.candidatoResponse.testPsicologicos;
		const objetoUltimoTestPsicologico = testPsicologicosAsignadosACandidato.filter(pregunta => (
				pregunta.idTestPsicologico == this.obtenerIdTestPsicologico()) );
		
		/*const objetoPreguntaUltimoTestPsicologico = objetoUltimoTestPsicologico[0].preguntas.filter(pregunta => (
				pregunta.idTestPsicologico == this.obtenerIdTestPsicologico() && 
				pregunta.idParte == this.obtenerIdParte() && 
				pregunta.idPregunta == ultimaPregunta.idPregunta ) );*/
		//const objetoPreguntaUltimoTestPsicologicoIndex = objetoUltimoTestPsicologico[0].preguntas.indexOf(objetoPreguntaUltimoTestPsicologico[0]);
		const objetoPreguntaUltimoTestPsicologicoIndex = this.state.numeroPreguntaActualIndex;
		
		if( this.seAcaboElTiempo(this.state.mensajeContador) ){
			if( this.tienePartesPendienteResponder(this.obtenerIdParte(), cantidadTestPsicologicoPartes) ){
				//Siguiente Parte
				//AUMENTAR EN 1 idParte, idPregunta = 1
				
				//BackEnd retorna una lista de todas las preguntas, sin filtrar por partes.
				var i = 0;
				var cantPreguntasTestPsicologico = 0;
				for(i = 1; i <= this.obtenerIdParte(); i++){
					cantPreguntasTestPsicologico += objetoUltimoTestPsicologico[0].preguntas.filter( test => 
							test.idParte == i
						).length;
				}
				
				//stateNumeroPreguntaActualIndex = 0;
				stateNumeroPreguntaActualIndex = cantPreguntasTestPsicologico;
				stateTestPsicologicoParteActual = this.obtenerIdParte() + 1;
				//stateTestPsicologicoActualIndex = testPsicologicoActualIndex;
				
				stateTestPsicologicoActualObjeto = objetoUltimoTestPsicologico[0];
				
				stateValorContador = 0;
				
				respuestasSeleccionadas = [];
				
				stateFlagInstrucciones = true;
				this.limpiarAlternativas();
				this.mostrarBotonInicioInstrucciones2();
				this.mostrarBotonSiguiente();
				this.limpiarValorContador();
				
				this.setState({
					respuestas : respuestasSeleccionadas,
					testPsicologicoParteActual: stateTestPsicologicoParteActual,
					testPsicologicoActual: stateTestPsicologicoActualIndex,
					numeroPreguntaActualIndex: stateNumeroPreguntaActualIndex,
					flagInstrucciones: stateFlagInstrucciones,
					testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
					mensajeContador: stateMensajeContador,
					valorContador: stateValorContador,
					mensajeAlerta: stateMensajeAlerta
				});
				
			} else {
				//Siguiente Test
				
				const testPsicologicoActualIndexAux = stateTestPsicologicoActualIndex + 1;
				if(this.tienePendienteResponderTestAsignados(testPsicologicoActualIndexAux, cantTestPsicologicosAsignados) ){
					//AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1
					//console.log('Siguiente Test|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1');
					
					stateNumeroPreguntaActualIndex = 0;
					stateTestPsicologicoParteActual = 1;
					stateTestPsicologicoActualIndex = stateTestPsicologicoActualIndex + 1;
					
					stateTestPsicologicoActualObjeto = testPsicologicosAsignadosACandidato[stateTestPsicologicoActualIndex];
					
					stateValorContador = 0;
					
					respuestasSeleccionadas = [];
					stateFlagInstrucciones = true;
					this.limpiarAlternativas();
					this.mostrarBotonInicioInstrucciones2();
					this.mostrarBotonSiguiente();
					this.limpiarValorContador();
					
					this.setState({
						respuestas : respuestasSeleccionadas,
						testPsicologicoParteActual: stateTestPsicologicoParteActual,
						testPsicologicoActual: stateTestPsicologicoActualIndex,
						numeroPreguntaActualIndex: stateNumeroPreguntaActualIndex,
						flagInstrucciones: stateFlagInstrucciones,
						testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
						mensajeContador: stateMensajeContador,
						valorContador: stateValorContador,
						mensajeAlerta: stateMensajeAlerta
					});
					
				} else {
					//console.log("Acabó el examen!");
					flagContinuarTest = false;
					
					stateValorContador = 0;
					
					this.obtenerCandidatoInterpretacion();
					this.notificarReclutador();
					
					this.setState({
						flagContinuarTest: flagContinuarTest,
						mensajeContador: stateMensajeContador,
						valorContador: stateValorContador,
						mensajeAlerta: stateMensajeAlerta
					});
					
					this.limpiarAlternativas();
					this.mostrarBotonSiguiente();
					this.limpiarValorContador();
				}
				
			}
		} else {
			//AUN NO SE ACABA EL TIEMPO
			
			if( respuestasSeleccionadas.length < cantMaxAlt[0].alternativaMaxSeleccion ){
				this.setState({
					mensajeAlerta: {mensaje: ('DEBE SELECCIONAR ').concat(cantMaxAlt[0].alternativaMaxSeleccion, ' ALTERNATIVA(S)'), estilo: "mensajeAlertaError"}
				});
			} else {
				//Siguiente Pregunta
				this.guardarCandidatoRespuesta();
				respuestasSeleccionadas = [];
				stateMensajeAlerta = {mensaje: '', estilo: ''};
				
				const testPsicologicoActualIndexAux = stateNumeroPreguntaActualIndex + 1;
				if(this.tieneSiguientePregunta(testPsicologicoActualIndexAux, objetoUltimoTestPsicologico[0].preguntas.length)){
					//AUMENTAR EN 1 LA PREGUNTA
					//console.log('Siguiente Pregunta|tieneSiguientePregunta TRUE|AUMENTAR EN 1 LA PREGUNTA');
					
					stateNumeroPreguntaActualIndex = stateNumeroPreguntaActualIndex + 1;
					stateTestPsicologicoParteActual = this.obtenerIdParte();
					//stateTestPsicologicoActualIndex = testPsicologicoActualIndex;
					
					stateTestPsicologicoActualObjeto = objetoUltimoTestPsicologico[0];
					
					stateFlagInstrucciones = false;
					this.limpiarAlternativas();
					//this.mostrarBotonInicioInstrucciones2();
					//this.mostrarBotonSiguiente();
					//this.limpiarValorContador();
					
					this.setState({
						respuestas : respuestasSeleccionadas,
						testPsicologicoParteActual: stateTestPsicologicoParteActual,
						testPsicologicoActual: stateTestPsicologicoActualIndex,
						numeroPreguntaActualIndex: stateNumeroPreguntaActualIndex,
						flagInstrucciones: stateFlagInstrucciones,
						testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
						//mensajeContador: stateMensajeContador,
						//valorContador: stateValorContador,
						mensajeAlerta: stateMensajeAlerta
					});
					
				} else {
					//console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE');
					
					const testPsicologicoActualIndexAux = stateTestPsicologicoActualIndex + 1;
					if(this.tienePendienteResponderTestAsignados(testPsicologicoActualIndexAux, cantTestPsicologicosAsignados) ){
						//AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1
						//console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1');
						
						stateNumeroPreguntaActualIndex = 0;
						stateTestPsicologicoParteActual = 1;
						stateTestPsicologicoActualIndex = stateTestPsicologicoActualIndex + 1;
						
						stateTestPsicologicoActualObjeto = testPsicologicosAsignadosACandidato[stateTestPsicologicoActualIndex];
						
						stateValorContador = 0;
						
						stateFlagInstrucciones = true;
						this.limpiarAlternativas();
						this.mostrarBotonInicioInstrucciones2();
						this.mostrarBotonSiguiente();
						this.limpiarValorContador();
						
						this.setState({
							respuestas : respuestasSeleccionadas,
							testPsicologicoParteActual: stateTestPsicologicoParteActual,
							testPsicologicoActual: stateTestPsicologicoActualIndex,
							numeroPreguntaActualIndex: stateNumeroPreguntaActualIndex,
							flagInstrucciones: stateFlagInstrucciones,
							testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
							mensajeContador: stateMensajeContador,
							valorContador: stateValorContador,
							mensajeAlerta: stateMensajeAlerta
						});
						
					} else {
						//console.log("Acabó el examen!");
						flagContinuarTest = false;
						
						this.obtenerCandidatoInterpretacion();
						this.notificarReclutador();
						
						stateValorContador = 0;
						
						this.limpiarAlternativas();
						this.mostrarBotonSiguiente();
						this.limpiarValorContador();
						
						this.setState({
							//respuestas : respuestasSeleccionadas,
							//testPsicologicoParteActual: stateTestPsicologicoParteActual,
							//testPsicologicoActual: stateTestPsicologicoActualIndex,
							//numeroPreguntaActualIndex: stateNumeroPreguntaActualIndex,
							//flagInstrucciones: stateFlagInstrucciones,
							//testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
							flagContinuarTest: flagContinuarTest,
							mensajeContador: stateMensajeContador,
							valorContador: stateValorContador,
							mensajeAlerta: stateMensajeAlerta
						});
					}
				}
				
			}
			
		}
		
	}
	
	mostrarBotonSiguiente(){
		this.setState({
			flagMostrarBotonSiguiente: !this.state.flagMostrarBotonSiguiente
		});
	}
	/* Inicio GATB */
	/*
	 * Validar si test psicologico es GATB
	 */
	obtenerMinutos(valor){ return Math.floor(valor / 60) }
	obtenerSegundos(valor){ return ('0' + valor % 60).slice(-2) }
	
	limpiarValorContador(){
		clearInterval(this.interval);
	}
	
	asignarMensajeContador(flagInstrucciones){
		//console.log('asignarMensajeContador:IdTest:', this.obtenerIdTestPsicologico());
		//console.log('asignarMensajeContador:flag:', this.state.flagInstrucciones);
		//console.log('asignarMensajeContador:flag:', flagInstrucciones);
		if((this.obtenerIdTestPsicologico() == 2 || this.obtenerIdTestPsicologico() == 4) && !/*this.state.*/flagInstrucciones){//GATB
			const idTestPsicologico = this.obtenerIdTestPsicologico();
			const idParte = this.obtenerIdParte();
			const contadorMensaje = idTestPsicologico + "-" + idParte;
			const mensajeContador = this.state.mensajeContador;
			//console.log('asignarMensajeContador', mensajeContador, contadorMensaje);
			if(mensajeContador.flag != contadorMensaje){
				this.asignarValorContador();
			} else {
				console.log('Ya se encuentra asignado el contador.');
			}
		}
	}
	
	asignarContador(idTestPsicologico, idParte){//GATB
		var contador = 0;
		if(idTestPsicologico == 2 || idTestPsicologico == 4){
			var cantMaxAlt = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == idTestPsicologico && test.idParte == idParte);
			// Los valores desde base de datos vienen en unidad de medida "segundos".
			contador = cantMaxAlt[0].duracion;
		}
		//console.log('asignarContador:contador:', contador);
		return contador;
	}
	
	asignarValorContador(){//GATB
		this.interval = setInterval(() => {
				var duracion = this.asignarContador(this.obtenerIdTestPsicologico(), this.obtenerIdParte());
				if(this.state.valorContador <= duracion){
					this.setState({
						idParte: this.obtenerIdParte(),
						mensajeContador: {
							mensaje: (duracion - this.state.valorContador > 0) ? this.obtenerMinutos(duracion - this.state.valorContador) + ":" + this.obtenerSegundos(duracion - this.state.valorContador) : "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE",
							flag: this.obtenerIdTestPsicologico() +"-"+ this.obtenerIdParte(),
							visible: this.state.flagInstrucciones ? false : true,
							estilo: 'mensajeContador'
						},
						valorContador: this.state.valorContador + 1
					});
				} else {
					clearInterval(this.interval);
				}
			}
		, 1000);
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
	/* Fin GATB */
	tienePendienteResponderTestAsignados(indexUltimoTestAsignado, cantidadTestAsignados){
		//console.log('tienePendienteResponderTestAsignados:', indexUltimoTestAsignado, ':', cantidadTestAsignados);
		return indexUltimoTestAsignado < cantidadTestAsignados ? true : false;
	}
	tieneTiempoAsignadoParteTest(duracion){
		//Si duración de la parte del test es mayor a 0, entonces retorna TRUE.
		//console.log('tieneTiempoAsignadoParteTest:', duracion);
		return duracion > 0 ? true : false;
	}
	tienePartesPendienteResponder(idParteUltimoTestRespondido, cantidadPartesUltimoTestRespondido){
		//console.log('tienePartesPendienteResponder:', idParteUltimoTestRespondido, ':', cantidadPartesUltimoTestRespondido);
		return idParteUltimoTestRespondido < cantidadPartesUltimoTestRespondido ? true : false;
	}
	validarPartesPendienteResponder(objetoUltimoTestRespondido, testPsicologicosPartes){
		const objetoTestParte = testPsicologicosPartes.filter( parte => 
				parte.idTestPsicologico == objetoUltimoTestRespondido.idTestPsicologico &&
				parte.idParte == objetoUltimoTestRespondido.idParte
				)[0];
		//console.log('objetoTestParte', objetoTestParte);
		if( this.tienePartesPendienteResponder(objetoUltimoTestRespondido.idParte, testPsicologicosPartes.length) ){
			if(this.tieneTiempoAsignadoParteTest(objetoTestParte.duracion)){
				//console.log('Siguiente Parte');
				return 0;//Siguiente Parte
			} else {
				//console.log('Siguiente Pregunta');
				return 2;//Siguiente Pregunta
			}
		} else {
			if(this.tieneTiempoAsignadoParteTest(objetoTestParte.duracion)){
				//console.log('Siguiente Test');
				return 1;//Siguiente Test
			} else {
				//console.log('Siguiente Pregunta');
				return 2;//Siguiente Pregunta
			}
		}
	}
	tieneSiguientePregunta(idPregunta, cantidadPreguntas){
		//console.log('tieneSiguientePregunta:' ,idPregunta, cantidadPreguntas);
		return idPregunta < cantidadPreguntas ? true : false;
	}
	validarCandidatoPreguntasRespondidas(){
		var flagContinuarTest = true;//VALOR POR DEFAULT
		var stateNumeroPreguntaActualIndex = -1;
		var stateTestPsicologicoParteActual = -1;
		var stateTestPsicologicoActualIndex = -1;
		var stateTestPsicologicoActualObjeto = {};
		
		const testPsicologicosAsignadosACandidato = this.props.candidatoResponse.testPsicologicos;
		//console.log(' (validarCandidatoPreguntasRespondidas) Lista Test psicologicos asignados al candidato', testPsicologicosAsignadosACandidato);
		if(this.props.candidatoRespuestasResponse.length > 0){
			//console.log("Candidato ha vuelto a cargar la página de pruebas y ha respondido preguntas anteriormente.");
			
			var ultimaPregunta = this.props.candidatoRespuestasResponse[this.props.candidatoRespuestasResponse.length - 1];
			/*console.log(' (validarCandidatoPreguntasRespondidas) Última pregunta respondida por candidato', 
					ultimaPregunta.idTestPsicologico, 
					ultimaPregunta.idParte, 
					ultimaPregunta.idPregunta);*/
			const objetoUltimoTestPsicologico = testPsicologicosAsignadosACandidato.filter(pregunta => (
					pregunta.idTestPsicologico == ultimaPregunta.idTestPsicologico) );
			//console.log(' (validarCandidatoPreguntasRespondidas) Lista Objeto Preguntas del último test', objetoUltimoTestPsicologico);
			const objetoPreguntaUltimoTestPsicologico = objetoUltimoTestPsicologico[0].preguntas.filter(pregunta => (
					pregunta.idTestPsicologico == ultimaPregunta.idTestPsicologico && 
					pregunta.idParte == ultimaPregunta.idParte && 
					pregunta.idPregunta == ultimaPregunta.idPregunta ) );
			
			//console.log(' (validarCandidatoPreguntasRespondidas) objetoPreguntaUltimoTestPsicologico', objetoPreguntaUltimoTestPsicologico[0]);
			const objetoPreguntaUltimoTestPsicologicoIndex = objetoUltimoTestPsicologico[0].preguntas.indexOf(objetoPreguntaUltimoTestPsicologico[0]);
			//console.log(' (validarCandidatoPreguntasRespondidas) objetoPreguntaUltimoTestPsicologicoIndex', objetoPreguntaUltimoTestPsicologicoIndex);
			
			const testPsicologicoActualIndex = testPsicologicosAsignadosACandidato.indexOf(objetoUltimoTestPsicologico[0]);
			/*console.log(' (validarCandidatoPreguntasRespondidas) Indice ultimo test asignado al candidato', 
					testPsicologicoActualIndex);			
			console.log(' (validarCandidatoPreguntasRespondidas) ultimaPregunta.idTestPsicologico', ultimaPregunta.idTestPsicologico);*/
			const cantTestPsicologicosAsignados = testPsicologicosAsignadosACandidato.length;
			/*console.log(' (validarCandidatoPreguntasRespondidas) Cantidad Test asignados al candidato', 
					cantTestPsicologicosAsignados);*/
			
			const testPsicologicoPartes = this.props.testPsicologicosPartesResponse.filter(pregunta => (
					pregunta.idTestPsicologico == ultimaPregunta.idTestPsicologico ) );
			/*console.log(' (validarCandidatoPreguntasRespondidas) Lista Objeto Test Partes ', 
					testPsicologicoPartes);*/
			const cantidadTestPsicologicoPartes = testPsicologicoPartes.length;
			/*console.log(' (validarCandidatoPreguntasRespondidas) Cantidad Partes del test ', 
					cantidadTestPsicologicoPartes);*/
			
			if(this.tienePendienteResponderTestAsignados(testPsicologicoActualIndex, cantTestPsicologicosAsignados)){
				const resultado = this.validarPartesPendienteResponder(
						ultimaPregunta,
						testPsicologicoPartes);
				//console.log("Resultado:", resultado);
				if(resultado == 0){//Siguiente Parte
					//AUMENTAR EN 1 idParte, idPregunta = 1
					//console.log('Siguiente Parte|AUMENTAR EN 1 idParte, idPregunta = 1');
					
					//BackEnd retorna una lista de todas las preguntas, sin filtrar por partes.
					var i = 0;
					var cantPreguntasTestPsicologico = 0;
					for(i = 1; i <= ultimaPregunta.idParte; i++){
						cantPreguntasTestPsicologico += objetoUltimoTestPsicologico[0].preguntas.filter( test => 
								test.idParte == i
							).length;
					}
					
					//stateNumeroPreguntaActualIndex = 0;
					stateNumeroPreguntaActualIndex = cantPreguntasTestPsicologico;
					stateTestPsicologicoParteActual = ultimaPregunta.idParte + 1;
					stateTestPsicologicoActualIndex = testPsicologicoActualIndex;
					
					stateTestPsicologicoActualObjeto = objetoUltimoTestPsicologico[0];
					
				} else 
				if(resultado == 1){//Siguiente Test
					//console.log('Siguiente Test');
					
					const testPsicologicoActualIndexAux = testPsicologicoActualIndex + 1;
					if(this.tienePendienteResponderTestAsignados(testPsicologicoActualIndexAux, cantTestPsicologicosAsignados) ){
						//AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1
						//console.log('Siguiente Test|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1');
						
						stateNumeroPreguntaActualIndex = 0;
						stateTestPsicologicoParteActual = 1;
						stateTestPsicologicoActualIndex = testPsicologicoActualIndexAux;
						
						stateTestPsicologicoActualObjeto = testPsicologicosAsignadosACandidato[stateTestPsicologicoActualIndex];
						
					} else {
						//console.log("Acabó el examen!");
						flagContinuarTest = false;
					}
				} else 
				if(resultado == 2){//Siguiente Pregunta
					//console.log('Siguiente Pregunta');
					
					if(this.tieneSiguientePregunta(ultimaPregunta.idPregunta, objetoUltimoTestPsicologico[0].preguntas.length)){
						//AUMENTAR EN 1 LA PREGUNTA
						//console.log('Siguiente Pregunta|tieneSiguientePregunta TRUE|AUMENTAR EN 1 LA PREGUNTA');
						
						stateNumeroPreguntaActualIndex = objetoPreguntaUltimoTestPsicologicoIndex + 1;
						stateTestPsicologicoParteActual = ultimaPregunta.idParte;
						stateTestPsicologicoActualIndex = testPsicologicoActualIndex;
						
						stateTestPsicologicoActualObjeto = objetoUltimoTestPsicologico[0];
						
					} else {
						//console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE');
						
						const testPsicologicoActualIndexAux = testPsicologicoActualIndex + 1;
						if(this.tienePendienteResponderTestAsignados(testPsicologicoActualIndexAux, cantTestPsicologicosAsignados) ){
							//AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1
							//console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1');
							
							stateNumeroPreguntaActualIndex = 0;
							stateTestPsicologicoParteActual = 1;
							stateTestPsicologicoActualIndex = testPsicologicoActualIndexAux;
							
							stateTestPsicologicoActualObjeto = testPsicologicosAsignadosACandidato[stateTestPsicologicoActualIndex];
							
						} else {
							//console.log("Acabó el examen!");
							flagContinuarTest = false;
						}
					}
				}
			} else {
				//console.log("Acabó el examen!");
				flagContinuarTest = false;
			}
			
			this.setState({
				testPsicologicosAsignados: testPsicologicosAsignadosACandidato.length,
				idCandidato: this.props.candidatoResponse.idCandidato,
				candidatoResponse: this.props.candidatoResponse,
				numeroPreguntaActualIndex: stateNumeroPreguntaActualIndex,
				testPsicologicoParteActual: stateTestPsicologicoParteActual,
				testPsicologicoActual: stateTestPsicologicoActualIndex,
				testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
				flagContinuarTest: flagContinuarTest
			});
			
		} else {
			// Candidato no ha respondido preguntas previamente. Se inicializa los valores.
			//console.log('Candidato no ha respondido preguntas previamente. Se inicializa los valores.');
			this.setState({
				testPsicologicosAsignados: testPsicologicosAsignadosACandidato.length,
				idCandidato: this.props.candidatoResponse.idCandidato,
				candidatoResponse: this.props.candidatoResponse,
				numeroPreguntaActualIndex: this.state.numeroPreguntaActualIndex + 1,
				testPsicologicoParteActual: this.state.testPsicologicoParteActual + 1,
				testPsicologicoActual: this.state.testPsicologicoActual + 1,
				testPsicologicoActualObjeto: testPsicologicosAsignadosACandidato[this.state.testPsicologicoActual + 1],
				flagContinuarTest: true
			});
		}
		return true;
	}
	
	seleccionarAlternativa(idAlternativa, indiceAlternativa){
		//console.log('seleccionarAlternativa.idAlternativa', idAlternativa, indiceAlternativa);
		if(this.state.mensajeContador.mensaje == "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE"){
			//console.log('seleccionarAlternativa: NO PUEDE SELECCIONAR MAS ALTERNATIVAS');
		} else {
			var cantMaxAlt = this.props.testPsicologicosPartesResponse.filter(test => test.idTestPsicologico == this.obtenerIdTestPsicologico()/*(this.state.testPsicologicoActual + 1)*/ && test.idParte == this.obtenerIdParte());
			if(this.state.respuestas.length >= cantMaxAlt[0].alternativaMaxSeleccion){
				var i = -1;
				var alternat = this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActualIndex].alternativa[indiceAlternativa];
				//console.log('alternat',alternat);
				var flag = this.state.respuestas.map( resp =>{
					//console.log('resp.respuesta',resp.respuesta);
					if(resp.respuesta == alternat.alternativa){
						
						let respuesta = this.state.respuestas;
						i = respuesta.indexOf(resp);
						//console.log('Es igual:', resp.respuesta, alternat.alternativa, i);
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
							mensajeAlerta: {mensaje: '', estilo: ''}
						});
						//console.log('Es igual:', this.state.respuestas);
					}
				});
				if(this.state.respuestas.length >= cantMaxAlt[0].alternativaMaxSeleccion){
					this.setState({
						mensajeAlerta: {mensaje: ('SÓLO PUEDE SELECCIONAR ').concat(cantMaxAlt[0].alternativaMaxSeleccion,' ALTERNATIVA(S)'), estilo:"mensajeAlertaPeligro"}
					});
				}
			} else {
				let respuesta = this.state.respuestas;
				//console.log('alternat',indiceAlternativa);
				var alternat = this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActualIndex].alternativa[indiceAlternativa];
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
							const valorAlternativa = document.querySelector(idAlternativa).getAttribute('value');
							document.querySelector(idAlternativa).setAttribute('value', valorAlternativa.substring(valorAlternativa.length -4, 0) );
						}
						respuesta.splice(0, 1);
					} else {
						if(this.obtenerIdTestPsicologico() == 3){//DISC
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
					idPregunta: this.obtenerTestPsicologico().preguntas[this.state.numeroPreguntaActualIndex].idPregunta,
					respuestas: respuesta,
					mensajeAlerta: {mensaje: '', estilo: ''},
					mensajeContador: {
						mensaje: this.state.mensajeContador.mensaje,
						flag: this.obtenerIdTestPsicologico() + "-" + this.obtenerIdParte(),
						visible: (this.obtenerIdTestPsicologico() == 2 && !this.state.flagInstrucciones) ? true : false,
						estilo: 'mensajeContador'
					}
				});
				
			}
		}
	}
	
	marcarAlternativa(indiceAlternativa){
		//console.log('marcarAlternativa I', this.state.listaAlternativasSeleccionadas, indiceAlternativa);
		var lista = this.state.listaAlternativasSeleccionadas;
		this.state.listaAlternativasSeleccionadas.map( (alternativaSeleccionada, i) => {
			if(indiceAlternativa == i){
				lista[i] = !lista[i];
				this.setState({
					listaAlternativasSeleccionadas: lista
				});
			}
		});
		//console.log('marcarAlternativa F', this.state.listaAlternativasSeleccionadas);
	}
	
	obtenerTestPsicologico(){
		return this.props.candidatoResponse.testPsicologicos[this.state.testPsicologicoActual];
	}
	
	obtenerIdTestPsicologico(){
		return this.obtenerTestPsicologico().idTestPsicologico;
	}
	
	obtenerIdParte(){
		var obtenerTestPsicologico = this.obtenerTestPsicologico();
		//console.log("[] obtenerIdParte obtenerTestPsicologico", obtenerTestPsicologico);
		//console.log("[] obtenerIdParte this.state.numeroPreguntaActualIndex", this.state.numeroPreguntaActualIndex);
		return obtenerTestPsicologico.preguntas[this.state.numeroPreguntaActualIndex].idParte;
	}
	
	guardarCandidatoRespuesta() {
		this.setState({
			candidato:{
				idCandidato: this.state.idCandidato,
				idTestPsicologico: this.state.idTestPsicologico,
				idParte: this.state.idParte,
				idPregunta: this.state.idPregunta,
				respuesta : this.obtenerFormatoRespuesta(this.state.respuestas)
			}
		}, () => {
			if(this.state.candidato.respuesta.length > 0){
				this.props.guardarCandidatoRespuesta(this.state.candidato);
			} else {
				console.log('No ha seleccionado respuesta');
			}
			this.limpiar();
		});
	}
	
	obtenerCandidatoInterpretacion() {
		this.props.obtenerInterpretacion(this.state.idCandidato);
	}
	
	notificarReclutador(){
		//Notificar por EMAIL y SMS
		this.props.notificarReclutador(this.props.candidatoResponse);
	}
	
	obtenerFormatoRespuesta(respuestas) {
		if(this.state.idTestPsicologico == 2 && this.state.idParte == 4){//GATB
			return this.obtenerFormatoRespuestaGATBParte4(respuestas);
		} else {
			return respuestas;
		}
	}
	
	limpiar(){
		this.setState({
			idTestPsicologico: '',
			idPregunta: '',
			respuestas : [],
			candidato:{},
			mensajeAlerta: {mensaje: '', estilo: ''}
		});
	}
	
	limpiarAlternativas(){
		if(this.state.numeroPreguntaActualIndex <= this.obtenerTestPsicologico().preguntas.length){
			this.setState({
				listaAlternativasSeleccionadas: [false, false, false, false, false],
				respuestaPreguntaAbierta: ''
			});
		}
	}
	/*
	 * Inicio Mensajes
	 */
	mostrarEnunciado(pregunta, listaAlternativasSeleccionadas, respuestaPreguntaAbierta, mensajeAlerta, mensajeContador){
		return (<TableroEnunciadoWeb 
			pregunta={pregunta}
			listaAlternativasSeleccionadas={listaAlternativasSeleccionadas}
			respuestaPreguntaAbierta={respuestaPreguntaAbierta}
			alternativaRespuestaPreguntaAbierta={this.alternativaRespuestaPreguntaAbierta}
			estiloTablero={''}
			alternativaSeleccionar={this.alternativaSeleccionar}
			mensajeAlerta={mensajeAlerta}
			mensajeContador={mensajeContador}
		/>);
		//respuestaPreguntaAbierta={respuestaPreguntaAbierta}
	}
	
	mostrarEnunciadoImg(pregunta, listaAlternativasSeleccionadas, mensajeAlerta, mensajeContador, enunciadoImg, alternativasImg){
		return (<TableroEnunciadoWeb 
			pregunta={pregunta}
			listaAlternativasSeleccionadas={listaAlternativasSeleccionadas}
			estiloTablero={''}
			alternativaSeleccionar={this.alternativaSeleccionar}
			mensajeAlerta={mensajeAlerta}
			mensajeContador={mensajeContador}
			
			enunciadoImg={enunciadoImg}
			alternativasImg={alternativasImg}
		/>);
	}
	
	mostrarInstrucciones(testPsicologico){
		let instrucciones = testPsicologico.instrucciones;
		return (<MensajeInstruccionesWeb 
					texto={instrucciones} 
					estiloTablero={''} />);
	}
	
	/*
	 * Fin Mensajes
	 */
	
	render() {
		const {idCandidato, idTestPsicologico, idParte, idPregunta, respuesta
			, flagMostrarBotonInicio, flagMostrarBotonInicioInstrucciones, flagMostrarBotonInicioInstrucciones2, flagMostrarBotonSiguiente } = this.state;
		
		var form = {
			mensaje: {
				mensajeBienvenida: (<MensajeBienvenidaWeb nombreCandidato={this.props.candidatoResponse.nombre} />),
				mensajeFinalizado: (<MensajeFinalizacionExamWeb nombreCandidato={this.props.candidatoResponse.nombre} estiloTablero="mensajeFinalizacion" />),
				mensajeAlerta: (<MensajeAlerta mensaje={this.state.mensajeAlerta} />),
				mensajeContador: (<MensajeContador mensaje={this.state.mensajeContador} />)
			},
			botones: [
				{
					key: 'btnInicio',
					label: '< INICIAR PRUEBA > ',
					onClick: this.iniciarPruebas.bind(this),
					visible: ((typeof this.props.candidatoResponse.nombre != "undefined") && flagMostrarBotonInicio) ? 'true' : 'false'
				} , {
					key: 'btnInicioInstrucciones',
					label: '< INICIAR PRUEBA > ',
					onClick: this.iniciarExamen.bind(this),
					visible: (flagMostrarBotonInicioInstrucciones) ? 'true' : 'false'
				} , {
					key: 'btnInicioInstrucciones2',
					label: '< INICIAR PRUEBA > ',
					onClick: this.continuarExamen.bind(this),
					visible: (flagMostrarBotonInicioInstrucciones2) ? 'true' : 'false'
				} , {
					key: 'btnSiguiente',
					label: 'SIGUIENTE > ',
					onClick: this.obtenerSiguientePregunta,
					visible: (flagMostrarBotonSiguiente) ? 'true' : 'false'
				}
			]
		};
		
		var botonesForm = form.botones.map( boton =>{
			return (<Boton key={boton.key} id={boton.key} label={boton.label} onClick={boton.onClick} visible={boton.visible} />);
		});
		
		var header = <Header nombreCandidato={this.props.candidatoResponse.nombreCompleto} testPsicologicoActual={this.state.testPsicologicoActual} testPsicologicosAsignados={this.state.testPsicologicosAsignados} numeroPreguntaActualIndex={this.state.numeroPreguntaActualIndex} candidatoDatos={this.props.candidatoResponse} />;
		
		var footer = <Footer />;
		
		return(
			<Fragment>
				{header}
				<Tablero mensaje={form.mensaje} 
					candidato={this.state.candidatoResponse}
					flagMostrarInstrucciones={this.state.flagInstrucciones}
					testPsicologico={this.props.testPsicologicosPartesResponse} 
					
					flagContinuarTest={this.state.flagContinuarTest}
					testPsicologicosAsignados={this.state.testPsicologicosAsignados}
					numeroPreguntaActualIndex={this.state.numeroPreguntaActualIndex}
					testPsicologicoParteActual={this.state.testPsicologicoParteActual}
					testPsicologicoActual={this.state.testPsicologicoActual} 
					
					testPsicologicoActualObjeto={this.state.testPsicologicoActualObjeto}
					
					alternativaSeleccionar={this.alternativaSeleccionar}
					listaAlternativasSeleccionadas={this.state.listaAlternativasSeleccionadas}
					respuestaPreguntaAbierta={this.state.respuestaPreguntaAbierta}
					
					mostrarEnunciado={this.mostrarEnunciado}
					mostrarEnunciadoImg={this.mostrarEnunciadoImg}
					mostrarInstrucciones={this.mostrarInstrucciones}
				>
					{botonesForm}
				</Tablero>
				{footer}
			</Fragment>
		);
	}
}

function mapStateToProps(state){
	return{
		testPsicologicosPartesResponse : state.reducerTestPsicologico.obtenerTestPsicologicosPartesResponse,
		candidatoResponse : state.reducerCandidato.obtenerCandidatoTestPsicologicosPreguntasResponse,
		candidatoRespuestasResponse : state.reducerCandidato.obtenerCandidatoRespuestasResponse,
		candidatoRespuestaResponse : state.reducerCandidato.guardarCandidatoRespuestaResponse,
		candidatoInterpretacionResponse : state.reducerCandidato.obtenerInterpretacionResponse,
		candidatoTestPsicologicosFinalizadoResponse: state.reducerCandidato.validarTestPsicologicosFinalizadoResponse,
		testPsicologicosFinalizadoNotificarReclutadorResponse: state.reducerReclutador.notificarReclutadorResponse
	}
}

export default connect(mapStateToProps, { obtenerTestPsicologicosPartes, obtenerCandidatoTestPsicologicosPreguntas, obtenerCandidatoRespuestas, guardarCandidatoRespuesta, obtenerInterpretacion, validarTestPsicologicosFinalizado, notificarReclutador })(ExamenPsicologicoWeb);