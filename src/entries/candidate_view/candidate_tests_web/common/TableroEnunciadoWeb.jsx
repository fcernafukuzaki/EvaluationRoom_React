import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

import CargandoImagen from '../../../components/common/CargandoImagen';
import TableroPreguntas from './TableroPreguntas';
import Alternativa from '../components/Alternativa';
import AlternativaPreguntaAbierta from '../components/AlternativaPreguntaAbierta'
import AlternativaImagen from '../components/AlternativaImagen';
import AlternativaImagenBoton from '../components/AlternativaImagenBoton';

export default class TableroEnunciadoWeb extends Component {
	constructor(props){
		super(props);
		
		this.state = {
            respuestaPreguntaAbiertaTexto: ''
        }

		this.handleClick = this.handleClick.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}
	
	handleClick(pregunta, indice){
		this.seleccionarAlternativa(pregunta, indice);
	}
	
	seleccionarAlternativa(pregunta, indice){
		this.props.alternativaSeleccionar(pregunta, indice, null);
	}

	handleOnChange(pregunta, indice, e){
		let respuestaPreguntaAbierta = e.target.value
		//console.log(respuestaPreguntaAbierta)
		this.setState({
            [e.target.name]: e.target.value
		});
		//console.log('handleOnChange', this.state, this.props.respuestaPreguntaAbierta)
		this.props.alternativaSeleccionar(pregunta, indice, respuestaPreguntaAbierta);
	}
	
	mostrarEnunciado(pregunta, enunciadoImg){
		var enunciadoPregunta = '';
		let textoAux = '';
		//if(this.isGATBParte3(pregunta)){
		if(this.props.esTestPsicologicoConImagen(pregunta)){
			textoAux = this.mostrarEnunciadoImg(enunciadoImg);
		} else {
			enunciadoPregunta = ('').concat(pregunta.idpregunta,') ',pregunta.enunciado);
			textoAux = enunciadoPregunta.split('\\n').map((parrafo, i) => <p key={i}>{parrafo}</p> );
		}
		return textoAux;
	}
	
	mostrarAlternativas(pregunta){
		var alternativasID = ["alternativa1", "alternativa2", "alternativa3", "alternativa4", "alternativa5"];
		var alternativas = '';
		//if(this.isGATBParte3(pregunta)){
		if(this.props.esTestPsicologicoConImagen(pregunta)){
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
			alternativas = pregunta.alternativa.map( (alternativa, i) => {
				// Si tiene glosa, entonces la pregunta es cerrada.
				// Si no tiene glosa, entonces la pregunta es abierta.
				if(alternativa.glosa.length > 0){
					return(<Alternativa key={alternativasID[i]} id={alternativasID[i]} label={alternativa.glosa}
						visible={true} 
						estaSeleccionada={this.props.listaAlternativasSeleccionadas[i]}
						onClick={this.handleClick.bind(this, pregunta, i)}
					/>)
				} else {
					const placeholder = 'Colocar aquí su respuesta.'
					return (<textarea key={alternativasID[i]}
						id={alternativasID[i]} 
						name={alternativasID[i]} 
						rows="10" cols="70" 
						maxLength="50000"
						value={this.props.respuestaPreguntaAbierta}
						className={classnames('botonAlternativaPreguntaAbierta', (true ? 'visible' : 'noVisible') )}
						placeholder={placeholder}
						onChange={this.handleOnChange.bind(this, pregunta, i)} />)
						//value={this.props.respuestaPreguntaAbierta} 
					/*return (<AlternativaPreguntaAbierta 
						key={alternativasID[i]}
						id={alternativasID[i]}
						visible={true}
						valor={this.props.respuestaPreguntaAbierta}
						onChange={this.handleOnChange.bind(this)}
					/>)*/
				}
			}
			);
		}
		return alternativas;
	}
	
	/*isGATBParte3(pregunta){
		console.log(pregunta)
		//return (pregunta.idTestPsicologico == 2 && pregunta.idParte == 3) ? true : false;
		return (pregunta.idtestpsicologico == 2 && pregunta.idparte == 3) ? true : false;
	}*/
	
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
