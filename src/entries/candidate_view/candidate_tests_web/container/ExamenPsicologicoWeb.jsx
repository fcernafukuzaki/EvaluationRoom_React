import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import MensajeAlerta from '../components/MensajeAlerta';
import Tablero from '../components/Tablero';
import Boton from '../components/Boton';

import Header from '../common/Header';
import Footer from '../../../common/components/Footer'
import CargandoImagen from '../../../components/common/CargandoImagen'
import {obtenerValorParametro} from '../../../common/components/encriptar_aes'
import MensajeBienvenidaWeb from '../common/MensajeBienvenidaWeb';
import TableroEnunciadoWeb from '../common/TableroEnunciadoWeb';
import MensajeInstruccionesWeb from '../common/MensajeInstruccionesWeb';
import MensajeFinalizacionExamWeb from '../common/MensajeFinalizacionExamWeb';
import MensajeContador from '../common/MensajeContador';

import {obtenerInterpretacion} from '../../../../actions/actionCandidato';
import {notificarReclutador} from '../../../../actions/actionReclutador';
import {obtenerCandidatoTestPsicologicoIniciarExamen, guardarCandidatoTestPsicologicoRespuesta, guardarCandidatoTestPsicologicoLog} from '../../../../actions/actionCandidatoTestPsicologicoIniciarExamen'

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
			
			numeroTestPsicologicoActual: -1,
			numeroTestPsicologicoParteActual: -1,

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
			respuestaPreguntaAbierta: '',
			listaPreguntasPendientes: [],
			listaInstruccionesDePreguntasPendientes: [],
			flagMostrarMensajeBienvenida: undefined,
			mensajeFinalizacion: undefined,
			candidatoDatos: undefined,
			flagMostrarPantallaCarga: false
		}
		
		this.guardarCandidatoRespuesta = this.guardarCandidatoRespuesta.bind(this)
		this.mostrarInstrucciones = this.mostrarInstrucciones.bind(this)
		this.obtenerSiguientePregunta = this.obtenerSiguientePregunta.bind(this)
		this.alternativaSeleccionar = this.alternativaSeleccionar.bind(this)
		this.esTestPsicologicoConImagen = this.esTestPsicologicoConImagen.bind(this)
	}
	
	componentWillMount() {
		// Examen finalizado
		//this.props.obtenerCandidatoTestPsicologicoIniciarExamen('geancarlopineda25@gmail.com')
		// Examen nuevo
		//this.obtenerCandidatoTestPsicologicoIniciarExamen('carolinatorres.12@hotmail.com')
		// Un solo examen
		this.obtenerCandidatoTestPsicologicoIniciarExamen('ari@gmail.com')
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.candidatoTestPsicologicoIniciarExamenResponse !== this.props.candidatoTestPsicologicoIniciarExamenResponse) {
			let candidatoTestPsicologicoIniciarExamen = this.props.candidatoTestPsicologicoIniciarExamenResponse
			this.setState({
				flagMostrarPantallaCarga: false,
				candidatoDatos: typeof this.state.candidatoDatos === 'undefined' ? 
									candidatoTestPsicologicoIniciarExamen.candidato : {},
				testPsicologicosAsignados: typeof candidatoTestPsicologicoIniciarExamen.candidato !== 'undefined' ? 
											candidatoTestPsicologicoIniciarExamen.candidato.cantidad_pruebas_asignadas : 0,
				listaPreguntasPendientes: typeof candidatoTestPsicologicoIniciarExamen.preguntas_pendientes !== 'undefined' ? 
											candidatoTestPsicologicoIniciarExamen.preguntas_pendientes : [],
				listaInstruccionesDePreguntasPendientes: typeof candidatoTestPsicologicoIniciarExamen.testpsicologicos_instrucciones !== 'undefined' ? 
											candidatoTestPsicologicoIniciarExamen.testpsicologicos_instrucciones : [],
				flagMostrarMensajeBienvenida: true,
				mensajeFinalizacion: typeof candidatoTestPsicologicoIniciarExamen.mensaje !== 'undefined' && 
										candidatoTestPsicologicoIniciarExamen.reclutador_notificado !== 'undefined' 
										? this.obtenerMensajeFinalizacionYNotificarReclutador() : '',
				testPsicologicoActualObjeto: typeof candidatoTestPsicologicoIniciarExamen.preguntas_pendientes !== 'undefined' ? {
					idtestpsicologico: candidatoTestPsicologicoIniciarExamen.preguntas_pendientes[0].idtestpsicologico,
					idparte: candidatoTestPsicologicoIniciarExamen.preguntas_pendientes[0].idparte,
					idpregunta: candidatoTestPsicologicoIniciarExamen.preguntas_pendientes[0].idpregunta
				} : {},
				numeroTestPsicologicoActual: typeof candidatoTestPsicologicoIniciarExamen.testpsicologicos_asignados !== 'undefined' &&
					typeof candidatoTestPsicologicoIniciarExamen.preguntas_pendientes !== 'undefined' ? 
					candidatoTestPsicologicoIniciarExamen.testpsicologicos_asignados.filter((test, indice) => {
						if(test.idtestpsicologico == candidatoTestPsicologicoIniciarExamen.testpsicologicos_asignados[0].idtestpsicologico){
							return indice
						}
						return 0
					}) : 0,
				/*numeroTestPsicologicoParteActual: typeof candidatoTestPsicologicoIniciarExamen.testpsicologicos_asignados !== 'undefined' &&
					typeof candidatoTestPsicologicoIniciarExamen.preguntas_pendientes !== 'undefined' ? 
					candidatoTestPsicologicoIniciarExamen.testpsicologicos_asignados.filter((test, indice) => {
						if(test.idtestpsicologico == candidatoTestPsicologicoIniciarExamen.testpsicologicos_asignados[0].idtestpsicologico){
							return indice
						}
						return 0
					}) : 0*/
			});
		}
		if(prevProps.candidatoInterpretacionResponse !== this.props.candidatoInterpretacionResponse) {
			let testpsicologicos_asignados = this.props.candidatoTestPsicologicoIniciarExamenResponse.testpsicologicos_asignados
			let lista_testpsicologicos_asignados = []
			for(let i in testpsicologicos_asignados){
				lista_testpsicologicos_asignados.push(testpsicologicos_asignados[i].idtestpsicologico)
			}
			var objeto_lista_testpsicologicos_asignados = {lista_test_psicologicos: lista_testpsicologicos_asignados}
			this.obtenerCandidatoTestPsicologicoIniciarExamen(this.state.candidatoDatos.correoelectronico, objeto_lista_testpsicologicos_asignados)
		}
	}
	
	iniciarPruebas(e){
		this.mostrarBotonInicio();
		if(this.validarCandidatoPreguntasRespondidas()){
			this.setState({flagMostrarMensajeBienvenida: false})
			if(this.state.flagInstrucciones){
				this.mostrarBotonInicioInstrucciones();
			}
		}
	}
	
	iniciarExamen(){
		var flagInstrucciones = false
		this.mostrarBotonInicioInstrucciones()
		this.mostrarBotonSiguiente()
		this.setState({
			flagInstrucciones: flagInstrucciones
		})
		this.asignarMensajeContador(flagInstrucciones)
		this.registrarCandidatoTestPsicologicoLog('I')
	}
	
	continuarExamen(){
		var flagInstrucciones = false
		this.mostrarBotonInicioInstrucciones2(false)
		this.mostrarBotonSiguiente()
		this.setState({
			flagInstrucciones: flagInstrucciones,
			valorContador: 0,
			mensajeAlerta: {mensaje: '', estilo: ''}
		})
		this.asignarMensajeContador(flagInstrucciones)
		this.registrarCandidatoTestPsicologicoLog('I')
	}
	
	alternativaSeleccionar(pregunta, indiceAlternativa, respuestaPreguntaAbierta){
		console.log('[alternativaSeleccionar] indiceAlternativa:', indiceAlternativa, '. respuestaPreguntaAbierta:', respuestaPreguntaAbierta)
		var mensajeAlerta = {mensaje: '', estilo: ''};
		var marcarAlternativa = true;
		var alternativasID = ["alternativa1", "alternativa2", "alternativa3", "alternativa4"];
		if(this.state.mensajeContador.mensaje == "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE"){
			console.log('Pregunta con contador. Se acabó el tiempo. NO PUEDE SELECCIONAR MAS ALTERNATIVAS');
		} else {
			//console.log('Pregunta sin contador.');
			var cantMaxAlt = this.obtenerObjetoTestPsicologicoInstrucciones(this.obtenerIdTestPsicologico(), 
																			this.obtenerIdParte()).alternativamaxseleccion;
			
			var alternat = this.obtenerObjetoPregunta(this.obtenerIdTestPsicologico(),
														this.obtenerIdParte(),
														this.obtenerIdPregunta()).alternativa[indiceAlternativa]
			let respuesta = this.state.respuestas;
			let respuestaPreguntaAbiert = respuestaPreguntaAbierta
			
			// Si tiene glosa, entonces la pregunta es cerrada.
			// Si no tiene glosa, entonces la pregunta es abierta.
			if(respuestaPreguntaAbiert != null){
				if(respuestaPreguntaAbiert.length == 0){
					mensajeAlerta = {mensaje: ('Debe ingresar una respuesta'), estilo:"mensajeAlertaPeligro"};
				}
				
				this.setState({
					respuestaPreguntaAbierta: respuestaPreguntaAbiert
				});
				respuesta = [{ respuesta : respuestaPreguntaAbiert }]
			} else {
				if(this.state.respuestas.length >= cantMaxAlt){
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
					
					if(this.state.respuestas.length >= cantMaxAlt){
						mensajeAlerta = {mensaje: ('SÓLO PUEDE SELECCIONAR ').concat(cantMaxAlt,' ALTERNATIVA(S)'), estilo:"mensajeAlertaPeligro"};
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
			
			let objetoTestPsicologicoInstrucciones = this.obtenerObjetoTestPsicologicoInstrucciones(this.obtenerIdTestPsicologico(), this.obtenerIdParte())

			this.setState({
				idTestPsicologico: this.obtenerIdTestPsicologico(),
				idParte: this.obtenerIdParte(),
				idPregunta: this.obtenerIdPregunta(),
				respuestas: respuesta,
				mensajeAlerta: mensajeAlerta,
				mensajeContador: {
					mensaje: this.state.mensajeContador.mensaje,
					flag: this.obtenerIdTestPsicologico() + "-" + this.obtenerIdParte(),
					visible: (this.esTestPsicologicoConTiempo(objetoTestPsicologicoInstrucciones) && !this.state.flagInstrucciones) ? true : false, //GATB
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
	
	mostrarBotonInicioInstrucciones2(flag){
		this.setState({
			flagMostrarBotonInicioInstrucciones2: flag
		});
		console.log('mostrarBotonInicioInstrucciones2:', flag, this.state.flagMostrarBotonInicioInstrucciones2)
	}
	
	seAcaboElTiempo(mensajeContador){
		if(mensajeContador.mensaje == "Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE"){
			return true;
		} else {
			return false;
		}
	}

	obtenerMensajeFinalizacionYNotificarReclutador(){
		let candidatoTestPsicologicoIniciarExamen = this.props.candidatoTestPsicologicoIniciarExamenResponse
		console.log('obtenerMensajeFinalizacionYNotificarReclutador:', candidatoTestPsicologicoIniciarExamen)
		if(candidatoTestPsicologicoIniciarExamen.reclutador_notificado){
			this.notificarReclutador()
		}
		return candidatoTestPsicologicoIniciarExamen.mensaje
	}
	
	obtenerSiguientePregunta(){
		var cantMaxAlt = this.obtenerObjetoTestPsicologicoInstrucciones(this.obtenerIdTestPsicologico(), this.obtenerIdParte()).alternativamaxseleccion;
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
		var stateTestPsicologicoActualObjeto = this.state.testPsicologicoActualObjeto;
		
		if(this.seAcaboElTiempo(this.state.mensajeContador)){
			console.log('Se acabó el tiempo del test.')
			var listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(this.state.listaInstruccionesDePreguntasPendientes, this.obtenerIdTestPsicologico(), this.obtenerIdParte())
			console.log('obtenerSiguientePregunta: listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
			var nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.eliminarInstrucciones(this.state.listaInstruccionesDePreguntasPendientes, listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0])
			console.log('obtenerSiguientePregunta: nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
			
			let cantidadTestPsicologicoPartes = nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte.length
			if(this.tienePartesPendienteResponder(cantidadTestPsicologicoPartes)){
				//Siguiente Parte
				//AUMENTAR EN 1 idParte, idPregunta = 1
				// Se recupera primer elemento de la lista de preguntas de la siguiente parte del test psicológico.
				var listaPreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(this.state.listaPreguntasPendientes, 
					nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0].idtestpsicologico,
					nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0].idparte)
				console.log('obtenerSiguientePregunta: listaPreguntasPendientesPorTestPsicologicoYParte', listaPreguntasPendientesPorTestPsicologicoYParte)
				
				if(listaPreguntasPendientesPorTestPsicologicoYParte.length > 0){
					stateTestPsicologicoActualObjeto = this.obtenerObjetoPregunta(
						listaPreguntasPendientesPorTestPsicologicoYParte[0].idtestpsicologico,
						listaPreguntasPendientesPorTestPsicologicoYParte[0].idparte,
						listaPreguntasPendientesPorTestPsicologicoYParte[0].idpregunta)
					console.log('obtenerSiguientePregunta: stateTestPsicologicoActualObjeto', stateTestPsicologicoActualObjeto)
					stateValorContador = 0;
					respuestasSeleccionadas = [];
					stateFlagInstrucciones = true;
					this.limpiarAlternativas();
					this.mostrarBotonInicioInstrucciones2(true);
					this.mostrarBotonSiguiente();
					this.limpiarValorContador();
					this.registrarCandidatoTestPsicologicoLog('F')
					
					this.setState({
						respuestas : respuestasSeleccionadas,
						flagInstrucciones: stateFlagInstrucciones,
						testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
						mensajeContador: stateMensajeContador,
						valorContador: stateValorContador,
						mensajeAlerta: stateMensajeAlerta,
						listaInstruccionesDePreguntasPendientes: nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte,
					});
				} else {
					console.log('No posee más partes pendientes. No posee más test psicológicos pendientes.')
				}
			} else {
				//Siguiente Test
				console.log('No posee más partes pendientes. Validar si tiene test psicológicos pendientes.')
				var listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(this.state.listaInstruccionesDePreguntasPendientes, this.obtenerIdTestPsicologico(), this.obtenerIdParte())
				console.log('obtenerSiguientePregunta: listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
				var nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.eliminarInstrucciones(this.state.listaInstruccionesDePreguntasPendientes, listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0])
				console.log('obtenerSiguientePregunta: nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
				
				if(nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte.length > 0){
					//AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1
					//console.log('Siguiente Test|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1');
					console.log('Tiene test psicológicos pendientes por responder.')

					var listaPreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(this.state.listaPreguntasPendientes, 
						nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0].idtestpsicologico,
						nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0].idparte)
					console.log('obtenerSiguientePregunta: listaPreguntasPendientesPorTestPsicologicoYParte', listaPreguntasPendientesPorTestPsicologicoYParte)
					if(listaPreguntasPendientesPorTestPsicologicoYParte.length > 0){
						stateTestPsicologicoActualObjeto = this.obtenerObjetoPregunta(
							listaPreguntasPendientesPorTestPsicologicoYParte[0].idtestpsicologico,
							listaPreguntasPendientesPorTestPsicologicoYParte[0].idparte,
							listaPreguntasPendientesPorTestPsicologicoYParte[0].idpregunta)
						console.log('obtenerSiguientePregunta: stateTestPsicologicoActualObjeto', stateTestPsicologicoActualObjeto)

						stateValorContador = 0;
						respuestasSeleccionadas = [];
						stateFlagInstrucciones = true;
						this.limpiarAlternativas();
						this.mostrarBotonInicioInstrucciones2(true);
						this.mostrarBotonSiguiente();
						this.limpiarValorContador();
						this.registrarCandidatoTestPsicologicoLog('F')
						
						this.setState({
							respuestas : respuestasSeleccionadas,
							flagInstrucciones: stateFlagInstrucciones,
							testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
							mensajeContador: stateMensajeContador,
							valorContador: stateValorContador,
							mensajeAlerta: stateMensajeAlerta,
							listaInstruccionesDePreguntasPendientes: nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte,
						});
					} else {
						console.log('No posee más partes pendientes. No posee más test psicológicos pendientes.')
					}
				} else {
					//console.log("Acabó el examen!");
					console.log('No tiene test psicológicos pendientes por responder.')
					flagContinuarTest = false;
					
					stateValorContador = 0;
					
					this.obtenerCandidatoInterpretacion();
					
					this.setState({
						flagContinuarTest: flagContinuarTest,
						mensajeContador: stateMensajeContador,
						valorContador: stateValorContador,
						mensajeAlerta: stateMensajeAlerta,
						flagMostrarPantallaCarga: true
					});
					
					this.limpiarAlternativas();
					this.mostrarBotonInicioInstrucciones2(false);//
					this.mostrarBotonSiguiente();
					this.limpiarValorContador();
					this.registrarCandidatoTestPsicologicoLog('F')
				}
			}
		} else {
			//AUN NO SE ACABA EL TIEMPO
			console.log('Aún no se acaba el tiempo.')
			if(respuestasSeleccionadas.length < cantMaxAlt){
				this.setState({
					mensajeAlerta: {mensaje: ('DEBE SELECCIONAR ').concat(cantMaxAlt, ' ALTERNATIVA(S)'), estilo: "mensajeAlertaError"}
				});
			} else {
				//Siguiente Pregunta
				this.guardarCandidatoRespuesta();
				
				var objetoSiguientePreguntaSiguientePregunta = this.validarTieneSiguientePregunta(
					this.obtenerListaPreguntasPendientesPorTest(this.obtenerIdTestPsicologico()),
					this.state.listaPreguntasPendientes,
					this.obtenerIdTestPsicologico(),
					this.obtenerIdParte(),
					this.obtenerIdPregunta())
				
				if(objetoSiguientePreguntaSiguientePregunta.flag){
					console.log('El test SI tiene siguiente pregunta.', objetoSiguientePreguntaSiguientePregunta.objeto)

					respuestasSeleccionadas = [];
					stateMensajeAlerta = {mensaje: '', estilo: ''};

					stateTestPsicologicoActualObjeto = this.obtenerObjetoPregunta(
						objetoSiguientePreguntaSiguientePregunta.objeto.idtestpsicologico, 
						objetoSiguientePreguntaSiguientePregunta.objeto.idparte, 
						objetoSiguientePreguntaSiguientePregunta.objeto.idpregunta)
					
					this.limpiarAlternativas();

					this.setState({
						respuestas : respuestasSeleccionadas,
						testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
						mensajeAlerta: stateMensajeAlerta
					});
				} else if(!objetoSiguientePreguntaSiguientePregunta.flag && typeof objetoSiguientePreguntaSiguientePregunta.objeto !== 'undefined') {
					console.log('El test NO tiene siguiente pregunta. Se muestra valores del sigueinte test.', objetoSiguientePreguntaSiguientePregunta)
					this.limpiarAlternativas();
					this.mostrarBotonInicioInstrucciones2(true);
					this.mostrarBotonSiguiente();
					this.limpiarValorContador();
					this.registrarCandidatoTestPsicologicoLog('F')
				} else {
					console.log('El test NO tiene siguiente pregunta.', objetoSiguientePreguntaSiguientePregunta)
					this.limpiarAlternativas();
					this.mostrarBotonInicioInstrucciones2(false);
					this.mostrarBotonSiguiente();
					this.limpiarValorContador();

					this.setState({
						flagMostrarPantallaCarga: true
					})

					this.registrarCandidatoTestPsicologicoLog('F')
				}
				/*
				const cantidadPreguntasPendientes = this.obtenerListaPreguntasPendientesPorTest(this.obtenerIdTestPsicologico()).length

				respuestasSeleccionadas = [];
				stateMensajeAlerta = {mensaje: '', estilo: ''};
				
				const testPsicologicoActualIndexAux = stateNumeroPreguntaActualIndex + 1;
				//if(this.tieneSiguientePregunta(testPsicologicoActualIndexAux, objetoUltimoTestPsicologico[0].preguntas.length)){
				if(this.tieneSiguientePregunta(testPsicologicoActualIndexAux, cantidadPreguntasPendientes)){
					//AUMENTAR EN 1 LA PREGUNTA
					console.log('Siguiente Pregunta|tieneSiguientePregunta TRUE|AUMENTAR EN 1 LA PREGUNTA');
					
					stateNumeroPreguntaActualIndex = stateNumeroPreguntaActualIndex + 1;
					stateTestPsicologicoParteActual = this.obtenerIdParte();
					//stateTestPsicologicoActualIndex = testPsicologicoActualIndex;
					
					console.log('objetoUltimoTestPsicologico', objetoUltimoTestPsicologico)
					//stateTestPsicologicoActualObjeto = objetoUltimoTestPsicologico[0];
					stateTestPsicologicoActualObjeto = this.obtenerObjetoPregunta(this.obtenerIdTestPsicologico(), this.obtenerIdParte(), testPsicologicoActualIndexAux)
					
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
					console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE');
					
					const testPsicologicoActualIndexAux = stateTestPsicologicoActualIndex + 1;
					if(this.tienePendienteResponderTestAsignados(testPsicologicoActualIndexAux, cantTestPsicologicosAsignados) ){
						//AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1
						//console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1');
						
						stateNumeroPreguntaActualIndex = 0;
						stateTestPsicologicoParteActual = 1;
						stateTestPsicologicoActualIndex = stateTestPsicologicoActualIndex + 1;
						
						console.log('objetoUltimoTestPsicologico else', testPsicologicosAsignadosACandidato)
						//stateTestPsicologicoActualObjeto = testPsicologicosAsignadosACandidato[stateTestPsicologicoActualIndex];
						
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
							//testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
							testPsicologicoActualObjeto: this.obtenerTestPsicologico(),
							mensajeContador: stateMensajeContador,
							valorContador: stateValorContador,
							mensajeAlerta: stateMensajeAlerta
						});
						
					} else {
						console.log("Acabó el examen!");
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
				*/
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
	
	esTestPsicologicoConTiempo(testPsicologico){
		console.log(' esTestPsicologicoConTiempo', testPsicologico)
		return this.tieneTiempoAsignadoParteTest(testPsicologico.duracion)
	}

	esTestPsicologicoConImagen(testPsicologico){
		return (testPsicologico.idtestpsicologico == 2 && testPsicologico.idparte == 3) ? true : false;
	}

	asignarMensajeContador(flagInstrucciones){
		let objetoTestPsicologicoInstrucciones = this.obtenerObjetoTestPsicologicoInstrucciones(this.obtenerIdTestPsicologico(), this.obtenerIdParte())
		if(this.esTestPsicologicoConTiempo(objetoTestPsicologicoInstrucciones) && !flagInstrucciones){//GATB
			const idTestPsicologico = this.obtenerIdTestPsicologico()
			const idParte = this.obtenerIdParte()
			const contadorMensaje = idTestPsicologico + "-" + idParte
			const mensajeContador = this.state.mensajeContador
			if(mensajeContador.flag != contadorMensaje){
				this.asignarValorContador()
			} else {
				console.log('Ya se encuentra asignado el contador.')
			}
		}
	}
	
	inicializarContador(testPsicologico){//GATB
		/**
		 * Inicializa el valor del contador con la duración del test.
		 * Los valores desde base de datos vienen en unidad de medida "segundos".
		 */
		var contador = 0;
		let objetoTestPsicologicoInstrucciones = this.obtenerObjetoTestPsicologicoInstrucciones(testPsicologico.idtestpsicologico, testPsicologico.idparte)
		if(this.esTestPsicologicoConTiempo(objetoTestPsicologicoInstrucciones)){
			contador = this.obtenerObjetoTestPsicologicoInstrucciones(testPsicologico.idtestpsicologico, testPsicologico.idparte).duracion
		}
		//console.log('inicializarContador:contador:', contador);
		return contador;
	}
	
	asignarValorContador(){//GATB
		this.interval = setInterval(() => {
				var duracion = this.inicializarContador(this.obtenerTestPsicologico());
				if(this.state.valorContador <= duracion){
					this.setState({
						idParte: this.obtenerIdParte(),
						mensajeContador: {
							mensaje: (duracion - this.state.valorContador > 0) ? 
									this.obtenerMinutos(duracion - this.state.valorContador) + ":" + this.obtenerSegundos(duracion - this.state.valorContador) : 
									"Se acabó el tiempo. Debe pasar al siguiente test presionando el botón SIGUIENTE",
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

	tienePendienteResponderTestAsignados(){
		/**
		 * Si existen instrucciones de test, entonces hay preguntas pendientes
		 */
		if(this.obtenerListaTestPsicologicoInstrucciones().length > 0){
			console.log('= tienePendienteResponderTestAsignados', this.obtenerListaTestPsicologicoInstrucciones())
			return true
		}
		return false
	}

	tieneTiempoAsignadoParteTest(duracion){
		//Si duración de la parte del test es mayor a 0, entonces retorna TRUE.
		return duracion > 0 ? true : false;
	}

	//tienePartesPendienteResponder(idParteUltimoTestRespondido, cantidadPartesUltimoTestRespondido){
	tienePartesPendienteResponder(cantidadTestPsicologicoPartesPendientesResponder){
		//console.log('tienePartesPendienteResponder:', idParteUltimoTestRespondido, ':', cantidadPartesUltimoTestRespondido);
		console.log('tienePartesPendienteResponder:', cantidadTestPsicologicoPartesPendientesResponder);
		return cantidadTestPsicologicoPartesPendientesResponder > 0 ? true : false;
	}

	validarPartesPendienteResponder(objetoUltimoTestRespondido, testPsicologicosPartes){
		const objetoTestParte = testPsicologicosPartes.filter( parte => 
				parte.idtestpsicologico == objetoUltimoTestRespondido.idtestpsicologico &&
				parte.idparte == objetoUltimoTestRespondido.idparte
				)[0];
		console.log('= validarPartesPendienteResponder:', objetoTestParte);
		if(this.tienePartesPendienteResponder(testPsicologicosPartes.length)){
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
		/**
		 * Validar si el número de la pregunta es menor que la cantidad de preguntas de ese test.
		 */
		console.log('tieneSiguientePregunta:', idPregunta, cantidadPreguntas);
		return idPregunta > 0 && idPregunta <= cantidadPreguntas ? true : false;
	}

	eliminarPrimeraPregunta(listaPreguntasPendientes, objeto){
		/**
		 * Eliminar primera pregunta pendiente de la lista de preguntas_pendientes.
		 */
		const index = listaPreguntasPendientes.indexOf(objeto)
		if(index > -1){
			listaPreguntasPendientes = listaPreguntasPendientes.filter(pregunta_pendiente => { 
				return pregunta_pendiente != objeto; 
			});
			return listaPreguntasPendientes
		}
		return null
	}

	eliminarParte(listaPreguntasPendientes){
		if(listaPreguntasPendientes.length > 0){
			const objeto = listaPreguntasPendientes[0]
			listaPreguntasPendientes = listaPreguntasPendientes.filter(pregunta_pendiente => { 
				return pregunta_pendiente != objeto; 
			});
			return listaPreguntasPendientes
		}
		return null
	}

	eliminarInstrucciones(listaInstruccionesDePreguntasPendientes, objeto){
		/**
		 * Eliminar instrucción de la pregunta pendiente, en caso de ser necesario.
		 */
		const index = listaInstruccionesDePreguntasPendientes.indexOf(objeto)
		if(index > -1){
			listaInstruccionesDePreguntasPendientes = listaInstruccionesDePreguntasPendientes.filter(pregunta_pendiente => { 
				return pregunta_pendiente != objeto; 
			});
			return listaInstruccionesDePreguntasPendientes
		}
		return null
	}

	validarTieneSiguientePregunta(listaPreguntasPendientesInicial, listaPreguntasPendientes, idTestPsicologico, idParte, idPregunta){
		/**
		 * Valida si el test psicológico tiene alguna pregunta pendiente por responder.
		 */
		var listaPreguntasPendientesPorTestPsicologicoYParteYPregunta = this.filtrarListaPorIdTestIdParteIdPregunta(listaPreguntasPendientes, idTestPsicologico, idParte, idPregunta)
		console.log('validarTieneSiguientePregunta: listaPreguntasPendientesPorTestPsicologicoYParteYPregunta', listaPreguntasPendientesPorTestPsicologicoYParteYPregunta)
		if(listaPreguntasPendientesPorTestPsicologicoYParteYPregunta.length > 0){
			var nuevaListaPreguntasPendientesPorTestPsicologicoYParte = this.eliminarPrimeraPregunta(listaPreguntasPendientes, listaPreguntasPendientesPorTestPsicologicoYParteYPregunta[0])
			this.setState({
				listaPreguntasPendientes: nuevaListaPreguntasPendientesPorTestPsicologicoYParte
			});
			var listaPreguntasPendientesInicialPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(this.state.listaInstruccionesDePreguntasPendientes, idTestPsicologico, idParte)
			
			console.log('validarTieneSiguientePregunta: listaPreguntasPendientesInicialPorTestPsicologicoYParte', listaPreguntasPendientesInicialPorTestPsicologicoYParte)
			var objetoUltimoTestPsicologico = listaPreguntasPendientesInicialPorTestPsicologicoYParte.length > 0 ? listaPreguntasPendientesInicialPorTestPsicologicoYParte[0] : {}
			var listaPreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(nuevaListaPreguntasPendientesPorTestPsicologicoYParte, idTestPsicologico, idParte)
			if(this.tieneSiguientePregunta(listaPreguntasPendientesPorTestPsicologicoYParte.length, objetoUltimoTestPsicologico.cantidadpreguntas)){
				this.setState({
					listaPreguntasPendientes: nuevaListaPreguntasPendientesPorTestPsicologicoYParte,
					testPsicologicoActualObjeto: listaPreguntasPendientesPorTestPsicologicoYParte[0]
				});
				return {
					flag: true, 
					objeto: listaPreguntasPendientesPorTestPsicologicoYParte[0] // retornar primer elemento de la lista. Siguiente pregunta
				}
			}
			var listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(this.state.listaInstruccionesDePreguntasPendientes, idTestPsicologico, idParte)
			console.log('validarTieneSiguientePregunta: listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
			var nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.eliminarInstrucciones(this.state.listaInstruccionesDePreguntasPendientes, listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0])
			console.log('validarTieneSiguientePregunta: nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
			
			if(nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte.length > 0){
				var objetoSiguientePreguntaSiguienteParte = this.obtenerSiguientePreguntaSiguienteParte(
					nuevaListaPreguntasPendientesPorTestPsicologicoYParte,
					nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte,
					nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0].idtestpsicologico,
					nuevaListaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0].idparte,
					true)
				console.log('validarTieneSiguientePregunta: objetoSiguientePreguntaSiguienteParte', objetoSiguientePreguntaSiguienteParte)
				if(objetoSiguientePreguntaSiguienteParte.flag){
					return {
						flag: false, 
						objeto: objetoSiguientePreguntaSiguienteParte.objeto, // retorna valores de la siguiente pregunta de la siguiente parte
						instrucciones: objetoSiguientePreguntaSiguienteParte.instrucciones,
						flagInstrucciones: true
					}
				}
				// No tiene más test pendientes
				// Mostrar mensaje de finalización
				// Volver a consultar el servicio rest para recuperar el campo :
				// mensajeFinalizacion: typeof this.props.candidatoTestPsicologicoIniciarExamenResponse.mensaje
				return {
					flag: false
				}
			} else {
				/**
				 * No existen más preguntas pendientes.
				 * Mostrar mensaje de finalización.
				 */
				console.log('Ya no existen más preguntas pendientes.')
				this.obtenerCandidatoInterpretacion()

				return {
					flag: false
				}
			}
		}
		return {
			flag: false
		}
	}

	obtenerSiguientePreguntaSiguienteParte(listaPreguntasPendientes, listaInstruccionesDePreguntasPendientes, idTestPsicologico, idParte, flagMostrarInstrucciones){
		console.log('obtenerSiguientePreguntaSiguienteParte: ', idTestPsicologico, idParte)
		var listaPreguntasPendientesPorTestPsicologico = listaPreguntasPendientes.filter(
			test => (
				test.idtestpsicologico == idTestPsicologico))
		console.log('obtenerSiguientePreguntaSiguienteParte: listaPreguntasPendientesPorTestPsicologico', listaPreguntasPendientesPorTestPsicologico)
		if(listaPreguntasPendientesPorTestPsicologico.length > 0){
			var idTest_aux = listaPreguntasPendientesPorTestPsicologico[0].idtestpsicologico
			var idParte_aux = listaPreguntasPendientesPorTestPsicologico[0].idparte
			var instrucciones = this.filtrarListaPorIdTestIdParte(listaInstruccionesDePreguntasPendientes, idTestPsicologico, idParte)
			
			var stateFlagInstrucciones = false
			let nuevaListaInstruccionesDePreguntasPendientes = listaInstruccionesDePreguntasPendientes
			let nuevaListaPreguntasPendientes = listaPreguntasPendientes
			console.log('obtenerSiguientePreguntaSiguienteParte: nuevaListaPreguntasPendientes', nuevaListaPreguntasPendientes)
			if(flagMostrarInstrucciones != null){
				stateFlagInstrucciones = flagMostrarInstrucciones
			} else {
				const idTestYParte = idTestPsicologico + '.' + idParte
				const idTestYParteAux = idTest_aux + '.' + idParte_aux
				console.log('obtenerSiguientePreguntaSiguienteParte: idTestYParte:', idTestYParte, '. idTestYParteAux:', idTestYParteAux)
				if(idTestYParte != idTestYParteAux){
					stateFlagInstrucciones = true
				}
			}

			this.setState({
				testPsicologicoActualObjeto: nuevaListaPreguntasPendientes[0],
				listaPreguntasPendientes: nuevaListaPreguntasPendientes,
				listaInstruccionesDePreguntasPendientes: nuevaListaInstruccionesDePreguntasPendientes,
				flagInstrucciones: stateFlagInstrucciones
			});
			
			return {
				flag: true, 
				objeto: listaPreguntasPendientesPorTestPsicologico[0] ,// retornar siguientes valores
				instrucciones: instrucciones,
				flagInstrucciones: stateFlagInstrucciones
			}
		} else {
			if(listaPreguntasPendientes.length > 0){
				// Aun posee preguntas pendientes.
				// Retornar siguiente pregunta de la siguiente parte del siguiente test.
				console.log('obtenerSiguientePreguntaSiguienteParte: listaPreguntasPendientes', listaPreguntasPendientes)
				var listaPreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(listaPreguntasPendientes, idTestPsicologico, idParte)
				console.log('obtenerSiguientePreguntaSiguienteParte: listaPreguntasPendientesPorTestPsicologicoYParte', listaPreguntasPendientesPorTestPsicologicoYParte)
				var listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(listaInstruccionesDePreguntasPendientes, idTestPsicologico, idParte)
				console.log('obtenerSiguientePreguntaSiguienteParte: listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
				var stateFlagInstrucciones = true
				
				this.setState({
					testPsicologicoActualObjeto: listaPreguntasPendientes[0],
					flagInstrucciones: stateFlagInstrucciones,
					listaPreguntasPendientes: this.eliminarParte(listaPreguntasPendientesPorTestPsicologicoYParte),
					listaInstruccionesDePreguntasPendientes: this.eliminarInstrucciones(listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte, listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0])
				});

				return {
					flag: true,
					objeto: listaPreguntasPendientes[0],
					instrucciones: instrucciones,
					flagInstrucciones: stateFlagInstrucciones
				}
			}
			return {
				flag: false,
				objeto: null,
				instrucciones: null
			}
		}
	}

	validarTieneSiguienteParte(listaPreguntasPendientesInicial, listaPreguntasPendientes, listaInstruccionesDePreguntasPendientes, idTestPsicologico, idParte, idPregunta){
		var listaPreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParteIdPregunta(listaPreguntasPendientes, idTestPsicologico, idParte, idPregunta)
		console.log('validarTieneSiguienteParte: listaPreguntasPendientesPorTestPsicologicoYParte', listaPreguntasPendientesPorTestPsicologicoYParte)
		var listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(listaInstruccionesDePreguntasPendientes, idTestPsicologico, idParte)
		console.log('validarTieneSiguienteParte: listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
		if(listaPreguntasPendientesPorTestPsicologicoYParte.length > 0){
			return true
		}
		return false
	}

	validarTieneSiguienteTestPsicologico(listaPreguntasPendientes, listaInstruccionesDePreguntasPendientes, idTestPsicologico){
		var listaPreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTest(listaPreguntasPendientes, idTestPsicologico)
		console.log('validarTieneSiguienteTestPsicologico: listaPreguntasPendientesPorTestPsicologicoYParte', listaPreguntasPendientesPorTestPsicologicoYParte)
		var listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTest(listaInstruccionesDePreguntasPendientes, idTestPsicologico)
		console.log('validarTieneSiguienteTestPsicologico: listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
		if(listaPreguntasPendientesPorTestPsicologicoYParte.length > 0){
			this.setState({
				listaPreguntasPendientes: this.eliminarParte(listaPreguntasPendientesPorTestPsicologicoYParte),
				listaInstruccionesDePreguntasPendientes: this.eliminarInstrucciones(listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte)
			});
			return true
		}
		return false
	}

	validarCandidatoPreguntasRespondidas(){
		var flagContinuarTest = true;//VALOR POR DEFAULT
		var stateNumeroPreguntaActualIndex = -1;
		var stateTestPsicologicoParteActual = -1;
		var stateTestPsicologicoActualIndex = -1;
		var stateTestPsicologicoActualObjeto = {};
		
		const listaTestPsicologicosAsignadosACandidato = this.obtenerListaTestPsicologicoInstrucciones();
		console.log(' (validarCandidatoPreguntasRespondidas) Lista Test psicologicos asignados al candidato', listaTestPsicologicosAsignadosACandidato);
		if(this.tienePendienteResponderTestAsignados()){
			//console.log("Candidato ha vuelto a cargar la página de pruebas y ha respondido preguntas anteriormente.");
			const objetoSiguienteInstruccionTestPsicologico = listaTestPsicologicosAsignadosACandidato[0]
			var siguienteIdTestPsicologico = objetoSiguienteInstruccionTestPsicologico.idtestpsicologico
			//console.log(' (validarCandidatoPreguntasRespondidas) Última test respondida por candidato', objetoSiguienteInstruccionTestPsicologico)
			const objetoSiguientePreguntaTestPsicologico = this.iniciarPreguntaPendiente(siguienteIdTestPsicologico);
			console.log(' (validarCandidatoPreguntasRespondidas) Siguiente pregunta ha responder por candidato', objetoSiguientePreguntaTestPsicologico)
			var listaInstruccionesDePreguntasPendientesPorTestPsicologico = this.filtrarListaPorIdTest(this.state.listaInstruccionesDePreguntasPendientes, this.obtenerIdTestPsicologico())
			console.log(' (validarCandidatoPreguntasRespondidas) Lista de instrucciones de partes del test ', listaInstruccionesDePreguntasPendientesPorTestPsicologico);
			let listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte = this.filtrarListaPorIdTestIdParte(this.state.listaInstruccionesDePreguntasPendientes, this.obtenerIdTestPsicologico(), this.obtenerIdParte())
			console.log(' (validarCandidatoPreguntasRespondidas) listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte', listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte);
			let objetoUltimoTestPsicologicoInstrucciones = listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte.length > 0 ? listaInstruccionesDePreguntasPendientesPorTestPsicologicoYParte[0] : {}
			const resultado = this.validarPartesPendienteResponder(
					objetoUltimoTestPsicologicoInstrucciones,
					listaInstruccionesDePreguntasPendientesPorTestPsicologico
					);
			console.log("Resultado:", resultado);
			if(resultado == 0){//Siguiente Parte
				//AUMENTAR EN 1 idParte, idPregunta = 1
				//console.log('Siguiente Parte|AUMENTAR EN 1 idParte, idPregunta = 1');
				stateTestPsicologicoActualObjeto = this.obtenerObjetoPregunta(this.obtenerIdTestPsicologico(),
					this.obtenerIdParte(),
					this.obtenerIdPregunta());
			} else if(resultado == 1){//Siguiente Test
				//console.log('Siguiente Test');
				const testPsicologicoActualIndexAux = testPsicologicoActualIndex + 1;
				if(this.tienePendienteResponderTestAsignados() ){
					//AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1
					//console.log('Siguiente Test|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 idTestPsicologico, idParte = 1, idPregunta = 1');
					stateNumeroPreguntaActualIndex = 0;
					stateTestPsicologicoParteActual = 1;
					stateTestPsicologicoActualIndex = testPsicologicoActualIndexAux;
					stateTestPsicologicoActualObjeto = listaTestPsicologicosAsignadosACandidato[stateTestPsicologicoActualIndex];
				} else {
					//console.log("Acabó el examen!");
					flagContinuarTest = false;
				}
			} else if(resultado == 2){//Siguiente Pregunta
				//console.log('Siguiente Pregunta');
				if(this.tieneSiguientePregunta(objetoSiguientePreguntaTestPsicologico.idpregunta, objetoUltimoTestPsicologicoInstrucciones.cantidadpreguntas)){
					//AUMENTAR EN 1 LA PREGUNTA
					//console.log('Siguiente Pregunta|tieneSiguientePregunta TRUE|AUMENTAR EN 1 LA PREGUNTA');
					stateNumeroPreguntaActualIndex = objetoSiguientePreguntaTestPsicologico.idpregunta;
					stateTestPsicologicoParteActual = objetoSiguientePreguntaTestPsicologico.idparte;
					stateTestPsicologicoActualIndex = objetoSiguientePreguntaTestPsicologico.idpregunta;
					stateTestPsicologicoActualObjeto = objetoSiguientePreguntaTestPsicologico
				} else {
					//console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE');
					const testPsicologicoActualIndexAux = testPsicologicoActualIndex + 1;
					if(this.tienePendienteResponderTestAsignados() ){
						//AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1
						//console.log('Siguiente Pregunta|tieneSiguientePregunta FALSE|tienePendienteResponderTestAsignados TRUE|AUMENTAR EN 1 TEST PSICOLOGICO, idParte = 1, idPregunta = 1');
						stateNumeroPreguntaActualIndex = 0;
						stateTestPsicologicoParteActual = 1;
						stateTestPsicologicoActualIndex = testPsicologicoActualIndexAux;
						stateTestPsicologicoActualObjeto = listaTestPsicologicosAsignadosACandidato[stateTestPsicologicoActualIndex];
					} else {
						//console.log("Acabó el examen!");
						flagContinuarTest = false;
					}
				}
			}
			
			this.setState({
				//testPsicologicosAsignados: listaTestPsicologicosAsignadosACandidato.length,
				idCandidato: this.props.candidatoTestPsicologicoIniciarExamenResponse.candidato.idcandidato,
				candidatoResponse: this.props.candidatoTestPsicologicoIniciarExamenResponse,
				numeroPreguntaActualIndex: stateNumeroPreguntaActualIndex,
				testPsicologicoParteActual: stateTestPsicologicoParteActual,
				testPsicologicoActual: stateTestPsicologicoActualIndex,
				testPsicologicoActualObjeto: stateTestPsicologicoActualObjeto,
				flagContinuarTest: flagContinuarTest,
				//listaPreguntasPendientes: this.props.candidatoTestPsicologicoIniciarExamenResponse.preguntas_pendientes,
				listaInstruccionesDePreguntasPendientes: this.props.candidatoTestPsicologicoIniciarExamenResponse.testpsicologicos_instrucciones
			});
		} else {
			/**
			 * El candidato no posee preguntas pendientes, entonces mostrar mensaje de finalización
			 */
			this.setState({
				flagContinuarTest: false
			});
		}
		return true;
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
	
	obtenerObjetoDatosCandidato(){
		if (typeof this.props.candidatoTestPsicologicoIniciarExamenResponse.candidato !== 'undefined') {
			return this.props.candidatoTestPsicologicoIniciarExamenResponse.candidato
		}
		return {}
	}

	obtenerTestPsicologico(){
		return this.state.testPsicologicoActualObjeto
	}
	
	obtenerIdTestPsicologico(){
		return this.obtenerTestPsicologico().idtestpsicologico
	}
	
	obtenerIdParte(){
		return this.obtenerTestPsicologico().idparte
	}

	obtenerIdPregunta(){
		return this.obtenerTestPsicologico().idpregunta
	}

	obtenerObjetoTestPsicologicoMensajeBienvenida(){
		if (typeof this.props.candidatoTestPsicologicoIniciarExamenResponse.mensaje_bienvenida !== 'undefined') {
			return this.props.candidatoTestPsicologicoIniciarExamenResponse.mensaje_bienvenida
		}
		return undefined
	}

	obtenerObjetoTestPsicologicoMensajeFinalizacion(){
		if (typeof this.props.candidatoTestPsicologicoIniciarExamenResponse.mensaje !== 'undefined') {
			return this.props.candidatoTestPsicologicoIniciarExamenResponse.mensaje
		}
		return undefined
	}

	obtenerListaTestPsicologicoInstrucciones(){
		if (typeof this.state.listaInstruccionesDePreguntasPendientes !== 'undefined') {
			return this.state.listaInstruccionesDePreguntasPendientes
		}
		return []
	}

	obtenerObjetoTestPsicologicoInstrucciones(idTestpsicologico, idParte){
		//console.log('obtenerObjetoTestPsicologicoInstrucciones', idTestpsicologico, idParte)
		if (typeof this.state.listaInstruccionesDePreguntasPendientes !== 'undefined') {
			let obtenerObjetoTestPsicologicoInstrucciones = this.state.listaInstruccionesDePreguntasPendientes
						.filter(test => test.idtestpsicologico == idTestpsicologico && 
										test.idparte == idParte)[0]
			//console.log('obtenerObjetoTestPsicologicoInstrucciones', obtenerObjetoTestPsicologicoInstrucciones)
			return obtenerObjetoTestPsicologicoInstrucciones
		}
		return {alternativamaxseleccion: 0, duracion: 0, instrucciones: ''}
	}

	obtenerListaPreguntasPendientesPorTest(idTestpsicologico){
		if (typeof this.props.candidatoTestPsicologicoIniciarExamenResponse.preguntas_pendientes !== 'undefined') {
			console.log('obtenerListaPreguntasPendientesPorTest', this.props.candidatoTestPsicologicoIniciarExamenResponse.preguntas_pendientes)
			let resultado = this.props.candidatoTestPsicologicoIniciarExamenResponse.preguntas_pendientes
						.filter(test => test.idtestpsicologico == idTestpsicologico)
			return resultado
		}
		return []
	}

	obtenerListaPreguntasPendientes(idTestpsicologico){
		if (typeof this.state.listaPreguntasPendientes !== 'undefined') {
			return this.state.listaPreguntasPendientes
						.filter(test => test.idtestpsicologico == idTestpsicologico)
		}
		return []
	}

	obtenerObjetoPregunta(idTestpsicologico, idParte, idPregunta){
		console.log('= Cantidad de preguntas pendientes:', this.state.listaPreguntasPendientes.length)
		console.log('= Lista de preguntas pendientes:', this.state.listaPreguntasPendientes)
		console.log('= IdTest ', idTestpsicologico, idParte, idPregunta)
		return this.state.listaPreguntasPendientes
					.filter(test => test.idtestpsicologico == idTestpsicologico &&
									test.idparte == idParte &&
									test.idpregunta == idPregunta
						)[0]
	}

	iniciarPreguntaPendiente(idTestpsicologico){
		return this.obtenerListaPreguntasPendientes(idTestpsicologico)[0]
	}

	filtrarListaPorIdTestIdParteIdPregunta(lista, idTestPsicologico, idParte, idPregunta){
		/**
		 * Retorna lista filtrada
		 */
		return lista.filter(
			test => (
				test.idtestpsicologico == idTestPsicologico &&
				test.idparte == idParte &&
				test.idpregunta == idPregunta))
	}

	filtrarListaPorIdTestIdParte(lista, idTestPsicologico, idParte){
		/**
		 * Retorna lista filtrada
		 */
		if (typeof lista !== 'undefined') {
			return lista.filter(
				test => (
					test.idtestpsicologico == idTestPsicologico &&
					test.idparte == idParte))
			}
		return []
	}

	filtrarListaPorIdTest(lista, idTestPsicologico){
		/**
		 * Retorna lista filtrada
		 */
		if (typeof lista !== 'undefined') {
			return lista.filter(
				test => (
					test.idtestpsicologico == idTestPsicologico))
			}
		return []
	}
	
	guardarCandidatoRespuesta() {
		//console.log('Guardar respuesta del candidato.')
		this.setState({
			candidato:{
				idcandidato: this.state.idCandidato,
				idtestpsicologico: this.obtenerIdTestPsicologico(),
				idparte: this.obtenerIdParte(),
				idpregunta: this.obtenerIdPregunta(),
				respuesta : this.obtenerFormatoRespuesta(this.state.respuestas)
			}
		}, () => {
			if(this.state.candidato.respuesta.length > 0){
				this.props.guardarCandidatoTestPsicologicoRespuesta(this.state.candidatoDatos.correoelectronico, this.state.candidato)
				//console.log('Guardar respuesta del candidato.', this.state.candidato);
			} else {
				console.log('No ha seleccionado respuesta');
			}
			this.limpiar();
		});
	}

	registrarCandidatoTestPsicologicoLog(flag){
		var objetoGuardarCandidatoTestPsicologicoLog = {idcandidato: this.state.idCandidato,
			idtestpsicologico: this.obtenerIdTestPsicologico(),
			idparte: this.obtenerIdParte(),
			flag: flag
		}
		this.props.guardarCandidatoTestPsicologicoLog(this.state.candidatoDatos.correoelectronico, objetoGuardarCandidatoTestPsicologicoLog)
	}
	
	obtenerCandidatoInterpretacion() {
		this.props.obtenerInterpretacion(this.state.idCandidato);
	}
	
	notificarReclutador() {
		//Notificar por EMAIL y SMS
		console.log('notificarReclutador:', this.state.candidatoDatos)
		//this.props.notificarReclutador(this.state.candidatoDatos)
	}

	obtenerCandidatoTestPsicologicoIniciarExamen(email, listaIdTestPsicologicos) {
		this.props.obtenerCandidatoTestPsicologicoIniciarExamen(email, listaIdTestPsicologicos)
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
		//console.log('limpiarAlternativas', this.state)
		if(this.state.numeroPreguntaActualIndex <= this.obtenerObjetoTestPsicologicoInstrucciones(this.obtenerIdTestPsicologico(), this.obtenerIdParte()).cantidadpreguntas){
			//console.log('limpiarAlternativas')
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

			esTestPsicologicoConImagen={this.esTestPsicologicoConImagen}
		/>);
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

			esTestPsicologicoConImagen={this.esTestPsicologicoConImagen}
		/>);
	}
	
	mostrarInstrucciones(testPsicologico){
		return (<MensajeInstruccionesWeb 
					texto={testPsicologico.instrucciones} 
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
				mensajeBienvenida: (<MensajeBienvenidaWeb mensaje={this.obtenerObjetoTestPsicologicoMensajeBienvenida()} />),
				mensajeFinalizado: (<MensajeFinalizacionExamWeb mensaje={this.obtenerObjetoTestPsicologicoMensajeFinalizacion()} estiloTablero="mensajeFinalizacion" />),
				mensajeAlerta: (<MensajeAlerta mensaje={this.state.mensajeAlerta} />),
				mensajeContador: (<MensajeContador mensaje={this.state.mensajeContador} />)
			},
			botones: [
				{
					key: 'btnInicio',
					label: '< INICIAR PRUEBA > ',
					onClick: this.iniciarPruebas.bind(this),
					visible: (typeof this.obtenerObjetoTestPsicologicoMensajeBienvenida() !== 'undefined' && flagMostrarBotonInicio) ? 'true' : 'false'
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
		
		var header = <Header nombreCandidato={this.obtenerObjetoDatosCandidato().nombre_completo} 
							numeroTestPsicologicoActual={this.state.numeroTestPsicologicoActual} 
							numeroTestPsicologicoParteActual={this.state.numeroTestPsicologicoParteActual} 
							testPsicologicosAsignados={this.state.testPsicologicosAsignados} 
							numeroPreguntaActualIndex={this.state.numeroPreguntaActualIndex} 
							candidatoDatos={this.props.candidatoResponse} 
							getLogo={this.props.logoEmpresa} />;
		
		var footer = <Footer />;
		//console.log(this.state)
		return(
			<Fragment>
				{(true) ? (
					<Fragment>
					{header}
					{(this.state.flagMostrarPantallaCarga) ? (
						<CargandoImagen />
					) : (''
					)
					}
					<Tablero
						testPsicologicoActualObjeto={this.obtenerTestPsicologico()}
						listaInstruccionesDePreguntasPendientes={this.state.listaInstruccionesDePreguntasPendientes}
						mensaje={form.mensaje} 
						flagMostrarMensajeBienvenida={this.state.flagMostrarMensajeBienvenida}
						testPsicologicosAsignados={this.state.testPsicologicosAsignados}
						flagMostrarInstrucciones={this.state.flagInstrucciones}
						testPsicologicoInstrucciones={this.obtenerObjetoTestPsicologicoInstrucciones(
							this.obtenerIdTestPsicologico(), 
							this.obtenerIdParte())} 
						mostrarInstrucciones={this.mostrarInstrucciones}
						esTestPsicologicoConImagen={this.esTestPsicologicoConImagen}
						mostrarEnunciado={this.mostrarEnunciado}
						mostrarEnunciadoImg={this.mostrarEnunciadoImg}
						listaAlternativasSeleccionadas={this.state.listaAlternativasSeleccionadas}
						respuestaPreguntaAbierta={this.state.respuestaPreguntaAbierta}
						
						mensajeFinalizacion={this.state.mensajeFinalizacion}
						flagContinuarTest={this.state.flagContinuarTest}
						numeroPreguntaActualIndex={this.state.numeroPreguntaActualIndex}
						testPsicologicoParteActual={this.state.testPsicologicoParteActual}
						testPsicologicoActual={this.state.testPsicologicoActual} 
						alternativaSeleccionar={this.alternativaSeleccionar}
					>
						{botonesForm}
					</Tablero>
					{footer}
					</Fragment>
				) : (
					<CargandoImagen />
				)
				}
			</Fragment>
		);
	}
}

function mapStateToProps(state){
	return{
		candidatoTestPsicologicoIniciarExamenResponse: state.reducerCandidatoTestPsicologico.candidatoTestPsicologicoIniciarExamenResponse,
		candidatoRespuestaResponse: state.reducerCandidatoTestPsicologico.registrarCandidatoTestPsicologicoRespuestaResponse,
		candidatoTestPsicologicoLogResponse: state.reducerCandidatoTestPsicologico.registrarCandidatoTestPsicologicoLogResponse,
		candidatoInterpretacionResponse : state.reducerCandidato.obtenerInterpretacionResponse,
		testPsicologicosFinalizadoNotificarReclutadorResponse: state.reducerReclutador.notificarReclutadorResponse
	}
}

export default connect(mapStateToProps, { 
	obtenerCandidatoTestPsicologicoIniciarExamen, 
	guardarCandidatoTestPsicologicoRespuesta,
	guardarCandidatoTestPsicologicoLog,
	obtenerInterpretacion, 
	notificarReclutador 
})(ExamenPsicologicoWeb);