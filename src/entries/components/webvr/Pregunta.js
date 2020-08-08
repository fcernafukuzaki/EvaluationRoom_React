import React, {Component, Fragment} from 'react';

import Alternativa from './Alternativa';
import AlternativaImg from './AlternativaImg';
import AlternativaImagen from './AlternativaImagen';

function obtenerAlternativas(alternativas) {
	var htmlField = '';
	if(alternativas.length == 2){
		var alternativasID = ["alternativa1", "alternativa2"];
		var alternativasPosicion = ["0 0.05 0", "0 -0.14 0"];
		var i = -1;
		var alternativasForm = alternativas.map( alternativa =>{
			i += 1;
			return (<Alternativa key={alternativasID[i]} id={alternativasID[i]} label={alternativa.glosa} position={alternativasPosicion[i]} />);
		});
	} else if(alternativas.length == 4){
		var alternativasID = ["alternativa1", "alternativa2", "alternativa3", "alternativa4"];
		var alternativasPosicion = ["0 0.09 0", "0 -0.01 0", "0 -0.11 0", "0 -0.21 0"];
		var i = -1;
		var alternativasForm = alternativas.map( alternativa =>{
			i += 1;
			return (<Alternativa key={alternativasID[i]} id={alternativasID[i]} label={alternativa.glosa} position={alternativasPosicion[i]} />);
		});
	} else if(alternativas.length == 5){
		var alternativasID = ["alternativa1", "alternativa2", "alternativa3", "alternativa4", "alternativa5"];
		var alternativasPosicion = ["0 0.09 0", "0 0.01 0", "0 -0.07 0", "0 -0.15 0", "0 -0.23 0"];
		var i = -1;
		var alternativasForm = alternativas.map( alternativa =>{
			i += 1;
			return (<Alternativa key={alternativasID[i]} id={alternativasID[i]} label={alternativa.glosa} position={alternativasPosicion[i]} />);
		});
	}
	htmlField = alternativasForm;
	return htmlField;
}

function obtenerAlternativasImg(alternativas) {
	var htmlField = '';
	var alternativasID = ["alternativa1", "alternativa2", "alternativa3", "alternativa4"];
	//var alternativasPosicion = ["-0.21 -0.055 0.01", "-0.07 -0.055 0.01", "0.07 -0.055 0.01", "0.21 -0.055 0.01"];
	var alternativasPosicion = ["-0.21 -0.08 0.01", "-0.07 -0.08 0.01", "0.07 -0.08 0.01", "0.21 -0.08 0.01"];
	//var alternativasPosicionTexto = ["-0.21 -0.13 0.01", "-0.07 -0.13 0.01", "0.07 -0.13 0.01", "0.21 -0.13 0.01"];
	var alternativasPosicionTexto = ["0 -0.09 0", "0 -0.09 0", "0 -0.09 0", "0 -0.09 0"];
	var i = -1;
	var alternativasForm = alternativas.map( alternativa =>{
		//console.log('obtenerAlternativasImg', alternativa.alternativa);
		i += 1;
		return (<AlternativaImg key={alternativasID[i]} id={alternativasID[i]} label={alternativa.alternativa} posicion={alternativasPosicion[i]} posicionTexto={alternativasPosicionTexto[i]} />);
	});
	htmlField = alternativasForm;
	return htmlField;
}

function obtenerAlternativasImagen(imagen) {
	var material = ("color: #fff; src:/").concat(imagen);
	var alternativasPosicion = ["0 -0.08 0"];
	var htmlField = (
		<AlternativaImagen key={"imagen1"} id={"imagen1"} label={""} imagen={imagen} position={alternativasPosicion} />
		);
	return htmlField;
}

function mostrarEnunciado(texto) {
	var textoValor = '';
	if(!(texto === '')){
		textoValor = texto;
	}
	var enunciado = (
		<a-text id="enunciado"  
			width="0.80" height="0.38" color="#000001" 
			baseline="top" negate="false"
			position="0 0.26 0" 
			rotation="0 0 0" 
			value={textoValor}
			
			font="/assets/fonts/custom-msdf.json" 
			text="height:0.38;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:top;negate:false;wrapCount:61">
		</a-text>
	);
	return enunciado;
}

function mostrarEnunciadoImg(texto) {
	//console.log('mostrarEnunciadoImg', texto);
	var textoValor = '';
	if(!(texto === '')){
		textoValor = textoValor.concat("src:/", texto);
	}
	//console.log('mostrarEnunciadoImg', textoValor);
	var enunciado = (
		<a-text id="enunciado"  
			color="white" wrapcount="30" 
			baseline="top" negate="false"
			position="0 0.15 0"
			rotation="0 0 0" 
			geometry="primitive: box; width: 0.27; height: 0.15; depth: 0.001"
			material={textoValor}
			font="/assets/fonts/custom-msdf.json" 
			text="height:0.38;anchor:center;align:top;negate:false">
		</a-text>
	);
	return enunciado;
}

export default class Pregunta extends Component {
	constructor(props){
		super(props);
	}
	
	obtenerTestPsicologico(){
		return this.props.candidato.testPsicologicos[this.props.testPsicologicoActual];
	}
	
	obtenerIdTestPsicologico(){
		return this.obtenerTestPsicologico().idTestPsicologico;
	}
	
	obtenerIdParte(){
		return this.obtenerTestPsicologico().preguntas[this.props.numeroPreguntaActual].idParte;
	}
	
	mostrarInstrucciones(idTestPsicologico, idParte){
		let instrucciones = this.props.testPsicologico.filter(test => test.idTestPsicologico == idTestPsicologico && test.idParte ==  idParte);
		//console.log('Pregunta:mostrarInstrucciones', instrucciones[0]);
		return instrucciones[0].instrucciones;
	}
	
	render() {
		var enunciado = '';
		var alternativas = '';
		var imagen = '';
		//console.log('Pregunta', this.props);
		if(Object.entries(this.props.candidato).length > 0){
			if((this.props.candidato.testPsicologicos.length > 0 && this.props.numeroPreguntaActual >= 0 && this.props.testPsicologicoActual < this.props.candidato.testPsicologicos.length)
				|| (this.props.candidato.testPsicologicos.length > 0 && this.props.testPsicologicoParteActual > 0 && this.props.testPsicologicoActual < this.props.candidato.testPsicologicos.length)
			) {
				if(this.props.testPsicologicoActual == this.props.candidato.testPsicologicos.length){
					console.log('Pregunta. NO HAY MAS TEST PSICOLOGICOS.');
					enunciado = mostrarEnunciado(this.props.mensaje.mensajeFinalizado);
				} else if(this.props.numeroPreguntaActual >= 0 && this.props.numeroPreguntaActual < this.obtenerTestPsicologico().preguntas.length){
					//console.log('Pregunta.numeroPreguntaActual', this.props.numeroPreguntaActual);
					//console.log('Pregunta.MOSTRAR INSTRUCCIONES 1', this.props.mostrarInstrucciones);
					if(this.props.mostrarInstrucciones){
						enunciado = mostrarEnunciado(this.mostrarInstrucciones(this.obtenerIdTestPsicologico(), this.obtenerIdParte()));
					} else {
						var preguntas = this.obtenerTestPsicologico().preguntas;
						if(preguntas[this.props.numeroPreguntaActual].idTestPsicologico == 2 && preguntas[this.props.numeroPreguntaActual].idParte == 3){//GATB
							var enunciadoSplit = preguntas[this.props.numeroPreguntaActual].enunciado.split(",");
							enunciado = mostrarEnunciadoImg(enunciadoSplit[0]);
							alternativas = obtenerAlternativasImg(preguntas[this.props.numeroPreguntaActual].alternativa);
							imagen = obtenerAlternativasImagen(enunciadoSplit[1]);
						} else {
							enunciado = mostrarEnunciado(('').concat(preguntas[this.props.numeroPreguntaActual].idPregunta,') ',preguntas[this.props.numeroPreguntaActual].enunciado));
							alternativas = obtenerAlternativas(preguntas[this.props.numeroPreguntaActual].alternativa);
						}
					}
					//console.log('Pregunta.MOSTRAR INSTRUCCIONES 1', enunciado);
				} else if(this.props.numeroPreguntaActual >= this.obtenerTestPsicologico().preguntas.length 
					|| (this.props.testPsicologicoParteActual > 0 && this.props.numeroPreguntaActual == -1)
				){
					//enunciado = mostrarEnunciado(this.obtenerTestPsicologico().instrucciones);
					//console.log('Pregunta.MOSTRAR INSTRUCCIONES', this.props.mostrarInstrucciones);
					if(this.props.mostrarInstrucciones){
						enunciado = mostrarEnunciado(this.mostrarInstrucciones(this.obtenerIdTestPsicologico(), this.props.testPsicologicoParteActual));
					}
				}
			} else {
				console.log('Pregunta.ELSE NO HAY MAS TEST PSICOLOGICOS.');
				enunciado = mostrarEnunciado(this.props.mensaje.mensajeFinalizado);
			}
		} else {
			enunciado = mostrarEnunciado(this.props.mensaje.mensajeBienvenida);
		}
	
		return(
			<Fragment>
				{enunciado}
				{alternativas}
				{imagen}
			</Fragment>
		);
	}
}