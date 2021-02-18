import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

class Tablero extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	
	obtenerTestPsicologico(){
		return this.props.testPsicologicoActualObjeto
	}
	
	mostrarTablero(){
		var enunciado = '';
		/*
		 * Validar si objeto candidato retorna valor.
		 */
		//console.log('listaInstruccionesDePreguntasPendientes', this.props.listaInstruccionesDePreguntasPendientes)
		if(this.props.listaInstruccionesDePreguntasPendientes.length == 0){
			//console.log('Se acabaron las pruebas.');
			return this.props.mensaje.mensajeFinalizado;
		} else if(this.props.listaInstruccionesDePreguntasPendientes.length > 0){
			if(this.props.flagMostrarMensajeBienvenida){
				return this.props.mensaje.mensajeBienvenida;
			}
			const cantidadTestAsignados = this.props.testPsicologicosAsignados;
			/*
			 * Si Candidato ha terminado las pruebas, entonces mostrar mensaje de finalización
			 */
			if(cantidadTestAsignados > 0){
				if(this.props.flagMostrarInstrucciones){
					const objetoParteTestPsicologico = this.props.testPsicologicoInstrucciones;
					console.log('   [Tablero] Objeto con preguntas de Test psicologico:', objetoParteTestPsicologico)
					enunciado = this.props.mostrarInstrucciones(objetoParteTestPsicologico);
				} else {
					var pregunta = this.obtenerTestPsicologico();
					if(this.props.esTestPsicologicoConImagen(pregunta)){
						var enunciadoSplit = pregunta.enunciado.split(",");
						enunciado = this.props.mostrarEnunciadoImg(pregunta
								, this.props.listaAlternativasSeleccionadas
								, this.props.mensaje.mensajeAlerta
								, this.props.mensaje.mensajeContador
								, enunciadoSplit[0]
								, enunciadoSplit[1]);
					} else {
						enunciado = this.props.mostrarEnunciado(pregunta
								, this.props.listaAlternativasSeleccionadas
								, this.props.respuestaPreguntaAbierta
								, this.props.mensaje.mensajeAlerta
								, this.props.mensaje.mensajeContador);
					}
				}
			}
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