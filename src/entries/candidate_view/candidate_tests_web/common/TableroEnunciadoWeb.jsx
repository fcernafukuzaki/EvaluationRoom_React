import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

import CargandoImagen from '../../components/common/CargandoImagen';
import TableroPreguntas from './TableroPreguntas';
import Alternativa from '../web/Alternativa';
import AlternativaImagen from '../components/AlternativaImagen';
import AlternativaImagenBoton from '../web/AlternativaImagenBoton';

export default class TableroEnunciadoWeb extends Component {
	constructor(props){
		super(props);
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(pregunta, indice){
		this.seleccionarAlternativa(pregunta, indice);
	}
	
	seleccionarAlternativa(pregunta, indice){
		this.props.alternativaSeleccionar(pregunta, indice);
	}
	
	mostrarEnunciado(pregunta, enunciadoImg){
		var enunciadoPregunta = '';
		let textoAux = '';
		if(this.isGATBParte3(pregunta)){
			textoAux = this.mostrarEnunciadoImg(enunciadoImg);
		} else {
			enunciadoPregunta = ('').concat(pregunta.idPregunta,') ',pregunta.enunciado);
			textoAux = enunciadoPregunta.split('\\n').map((parrafo, i) => <p key={i}>{parrafo}</p> );
		}
		return textoAux;
	}
	
	mostrarAlternativas(pregunta){
		var alternativasID = ["alternativa1", "alternativa2", "alternativa3", "alternativa4", "alternativa5"];
		var alternativas = '';
		if(this.isGATBParte3(pregunta)){
			let alternativaBotones = pregunta.alternativa.map( (alternativa, i) =>
				<AlternativaImagenBoton key={alternativasID[i]} id={alternativasID[i]} label={alternativa.alternativa}
					visible={true} 
					estaSeleccionada={this.props.listaAlternativasSeleccionadas[i]}
					onClick={this.handleClick.bind(this, pregunta, i)}
				/>
			);
			
			alternativas = 
				<Fragment>
					<AlternativaImagen key={alternativasID[0]} id={alternativasID[0]} label={''}
						visible={true} 
						imagen={this.props.alternativasImg} />
					<div className={classnames('botonesImagenAlternativa')} >
						{alternativaBotones}
					</div>
				</Fragment>
			return alternativas;
		} else {
			alternativas = pregunta.alternativa.map( (alternativa, i) => 
				<Alternativa key={alternativasID[i]} id={alternativasID[i]} label={alternativa.glosa}
					visible={true} 
					estaSeleccionada={this.props.listaAlternativasSeleccionadas[i]}
					onClick={this.handleClick.bind(this, pregunta, i)}
				/>
			);
		}
		return alternativas;
	}
	
	isGATBParte3(pregunta){
		return (pregunta.idTestPsicologico == 2 && pregunta.idParte == 3) ? true : false;
	}
	
	mostrarEnunciadoImg(texto){
		//console.log('mostrarEnunciadoImg', texto);
		var textoValor = '';
		if(!(texto === '')){
			textoValor = textoValor.concat("../", texto);
		}
		//console.log('mostrarEnunciadoImg', textoValor);
		var enunciado = (
			<div className="imagenEnunciado">
				<img src={textoValor} height="90%" width="90%" />
			</div>
		);
		return enunciado;
	}
	
	render() {
		const { pregunta, estiloTablero, listaAlternativasSeleccionadas, mensajeAlerta, mensajeContador, enunciadoImg, alternativasImg } = this.props;
		//console.log('   TableroEnunciadoWeb:this.props:', this.props.listaAlternativasSeleccionadas);
		let textoAux = this.mostrarEnunciado(pregunta, enunciadoImg);
		var listaAlternativas = this.mostrarAlternativas(pregunta);
		
		var enunciado = (
			<Fragment>
			{
				typeof pregunta != "undefined" ? (
					<Fragment>{textoAux}</Fragment>
				) : (
					<CargandoImagen />
				)
			}
			</Fragment>
		);
		return(
			<TableroPreguntas enunciado={enunciado} 
				alternativas={listaAlternativas} 
				mensajeAlerta={mensajeAlerta} 
				mensajeContador={mensajeContador} 
				estiloTablero={estiloTablero} />
		);
	}
}
