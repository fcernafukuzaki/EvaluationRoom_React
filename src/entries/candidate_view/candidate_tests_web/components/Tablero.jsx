import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

class Tablero extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	
	obtenerTestPsicologico(){
		//console.log('  [Tablero] obtenerTestPsicologico.', this.props.testPsicologicoActual);
		//console.log('  [Tablero] obtenerTestPsicologico.', this.props.testPsicologicoActualObjeto);
		/*if(typeof this.props.testPsicologicoActualObjeto.preguntas != "undefined"){
			return this.props.testPsicologicoActualObjeto;
		} else {
			return this.props.candidato.testPsicologicos[this.props.testPsicologicoActual];
		}*/
		return this.props.testPsicologicoActualObjeto
	}
	
	/*obtenerIdTestPsicologico(){
		return this.obtenerTestPsicologico().idTestPsicologico;
	}*/
	
	/*obtenerIdParte(){
		return this.obtenerTestPsicologico().preguntas[this.props.numeroPreguntaActualIndex].idParte;
	}*/
	
	mostrarTablero(){
		var enunciado = '';
		var alternativas = '';
		var imagen = '';
		var haTerminado = Object.entries(this.props.mensajeFinalizacion).length > 0 ? true : false;
		/*
		 * Validar si objeto candidato retorna valor.
		 */
		console.log('listaInstruccionesDePreguntasPendientes', this.props.listaInstruccionesDePreguntasPendientes)
		console.log('mensajeFinalizacion', this.props.mensajeFinalizacion)
		//if(Object.entries(this.props.listaInstruccionesDePreguntasPendientes).length > 0){
		if(this.props.listaInstruccionesDePreguntasPendientes.length == 0){
			//console.log('Se acabaron las pruebas.');
			return this.props.mensaje.mensajeFinalizado;
		} else if(this.props.listaInstruccionesDePreguntasPendientes.length > 0){
			if(this.props.flagMostrarMensajeBienvenida){
				return this.props.mensaje.mensajeBienvenida;
			}
			//haTerminado = !this.props.flagContinuarTest;
			const cantidadTestAsignados = this.props.testPsicologicosAsignados;
			/*console.log('   [Tablero] [cantidadTestAsignados]:' + cantidadTestAsignados);
			console.log('   [Tablero] this.props.flagMostrarInstrucciones:' + this.props.flagMostrarInstrucciones);
			console.log('   [Tablero] this.props.numeroPreguntaActualIndex:' + this.props.numeroPreguntaActualIndex);
			console.log('   [Tablero] this.props.testPsicologicoParteActual:' + this.props.testPsicologicoParteActual);
			console.log('   [Tablero] this.props.testPsicologicoActual]:' + this.props.testPsicologicoActual);
			console.log('   [Tablero] Cantidad preguntas test:' , this.obtenerTestPsicologico());
			console.log('   [Tablero] Objeto test psicologico actual:' , this.props.testPsicologicoActualObjeto);
			*/
			/*
			 * Si Candidato ha terminado las pruebas, entonces mostrar mensaje de finalización
			 */
			/*if(haTerminado){
				//console.log('Se acabaron las pruebas.');
				enunciado = this.props.mensaje.mensajeFinalizado;
			} else {*/
				if(cantidadTestAsignados > 0){
					
					if(this.props.flagMostrarInstrucciones){
						const objetoParteTestPsicologico = this.props.testPsicologicoInstrucciones;
						console.log('   [Tablero] Objeto con preguntas de Test psicologico:', objetoParteTestPsicologico)
						/*console.log('   [Tablero] Objeto con preguntas de Test psicologico:', objetoParteTestPsicologico,
								this.obtenerIdTestPsicologico(), this.obtenerIdParte());*/
						/*console.log('   [Tablero] Mostrar instrucciones del test:', this.props.testPsicologicoActualObjeto,
								this.props.testPsicologicoActualObjeto.idTestPsicologico, this.props.testPsicologicoParteActual);*/
						enunciado = this.props.mostrarInstrucciones(objetoParteTestPsicologico);
					} else {
						/*console.log('   [Tablero] Mostrar preguntas');
						console.log('   [Tablero] Mostrar enunciado de la pregunta:', 
								this.props.numeroPreguntaActualIndex,
								this.props.testPsicologicoParteActual, 
								this.props.testPsicologicoActual);*/
						/*var preguntas = this.obtenerTestPsicologico().preguntas;
						if(preguntas[this.props.numeroPreguntaActualIndex].idTestPsicologico == 2 && preguntas[this.props.numeroPreguntaActualIndex].idParte == 3){//GATB
							var enunciadoSplit = preguntas[this.props.numeroPreguntaActualIndex].enunciado.split(",");
							let pregunta = preguntas[this.props.numeroPreguntaActualIndex];
							enunciado = this.props.mostrarEnunciadoImg(pregunta
									, this.props.listaAlternativasSeleccionadas
									, this.props.mensaje.mensajeAlerta
									, this.props.mensaje.mensajeContador
									, enunciadoSplit[0]
									, enunciadoSplit[1]);
						} else {
							let pregunta = preguntas[this.props.numeroPreguntaActualIndex];
							enunciado = this.props.mostrarEnunciado(pregunta
									, this.props.listaAlternativasSeleccionadas
									, this.props.respuestaPreguntaAbierta
									, this.props.mensaje.mensajeAlerta
									, this.props.mensaje.mensajeContador);
						}*/
						var pregunta = this.obtenerTestPsicologico();
						//if(pregunta.idtestpsicologico == 2 && pregunta.idparte == 3){//GATB
						if(this.props.esTestPsicologicoConImagen(pregunta)){
							var enunciadoSplit = pregunta.enunciado.split(",");
							//let pregunta = preguntas[this.props.numeroPreguntaActualIndex];
							enunciado = this.props.mostrarEnunciadoImg(pregunta
									, this.props.listaAlternativasSeleccionadas
									, this.props.mensaje.mensajeAlerta
									, this.props.mensaje.mensajeContador
									, enunciadoSplit[0]
									, enunciadoSplit[1]);
						} else {
							//let pregunta = pregunta;
							enunciado = this.props.mostrarEnunciado(pregunta
									, this.props.listaAlternativasSeleccionadas
									, this.props.respuestaPreguntaAbierta
									, this.props.mensaje.mensajeAlerta
									, this.props.mensaje.mensajeContador);
						}
					}
				}
			//}
		} else {
			enunciado = this.props.mensaje.mensajeBienvenida;
		}
		return enunciado;
	}
	
	render() {
		var enunciado = this.mostrarTablero();
		return(
			<div className={classnames('tableroCuerpo')}>
				{enunciado}
				{this.props.children}
			</div>
		);
	}
}

export default Tablero;