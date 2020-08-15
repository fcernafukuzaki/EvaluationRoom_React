import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import TablePaginado from '../../components/common/TablePaginado';
import BarraBusqueda from '../../components/common/BarraBusqueda';

import {obtenerTestPsicologicos, obtenerTestPsicologicosPartes, obtenerTestPsicologicoPreguntas} from '../../../actions/actionTestPsicologico';

class TestPsicologicos extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroTestPsicologicoEnunciado: '',
			testPsicologicosPreguntasFiltro:[],
			testPsicologicosPartesFiltro:[],
			idTestPsicologico: 0,
			idParte: 0,
			nombre: '',
			errors: {},
			isLoading: true,
			errorMensaje: ''
		}
		
		this.onChange = this.onChange.bind(this);
	}
	
	componentWillMount() {
		this.props.obtenerTestPsicologicos();
		this.props.obtenerTestPsicologicosPartes();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.obtenerTestPsicologicosResponse !== this.props.obtenerTestPsicologicosResponse) {
			this.setState({
				isLoading: Object.entries(this.props.obtenerTestPsicologicosResponse).length > 0 ? false : true
			});
		}
		if (prevProps.obtenerTestPsicologicoPreguntasResponse !== this.props.obtenerTestPsicologicoPreguntasResponse) {
			this.setState({
				isLoading: this.state.isLoading ? false : true
			});
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			this.setState({
				isLoading: false,
				errorMensaje: this.props.errorResponse
			})
		}
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	filtrarListaPreguntas(e){
		let filtroTestPsicologicoEnunciado = e.target.value;
		this.setState({
			filtroTestPsicologicoEnunciado: filtroTestPsicologicoEnunciado,
			testPsicologicosPreguntasFiltro: this.props.obtenerTestPsicologicoPreguntasResponse.filter( p => p.enunciado.indexOf(filtroTestPsicologicoEnunciado) > -1 )
		})
	}
	
	obtenerTablaTituloPartes(titulo){
		return ("Partes del test psicológico: ").concat(titulo);
	}
	
	obtenerTablaTituloPreguntas(titulo){
		return ("Preguntas del test psicológico: ").concat(titulo, " (Parte ",this.state.idParte, ")");
	}
	
	varPartesTestPsicologico(test){
		this.setState({
			idTestPsicologico : test.idTestPsicologico,
			idParte: 0, 
			nombre : test.nombre,
			testPsicologicosPartesFiltro: this.props.obtenerTestPsicologicosPartesResponse.filter(p => p.idTestPsicologico == test.idTestPsicologico),
			isLoading: true
		});
		this.props.obtenerTestPsicologicoPreguntas(test.idTestPsicologico);
	}
	
	varPreguntasTestPsicologico(test){
		this.setState({
			idTestPsicologico : test.idTestPsicologico,
			idParte: test.idParte,
			nombre : this.state.nombre,
			filtroTestPsicologicoEnunciado: '',
			testPsicologicosPreguntasFiltro: this.props.obtenerTestPsicologicoPreguntasResponse.filter(p => p.idParte == test.idParte)
		});
	}
	
	generarTablaBodyTestPsicologico(row){
		if(row != null){
			return (<tr key={row.idTestPsicologico} onClick={() => this.varPartesTestPsicologico(row)} >
						<td>{row.idTestPsicologico}</td>
						<td>{row.nombre}</td>
						<td>{row.cantidadPreguntas}</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	generarTablaBodyPartes(row){
		if(row != null){
			return (<tr key={('').concat(row.idTestPsicologico,'-',row.idParte,'-',row.instrucciones)} onClick={() => this.varPreguntasTestPsicologico(row)} >
						<td>{row.idParte}</td>
						<td>{row.instrucciones}</td>
						<td>Se puede seleccionar hasta un máximo de {row.alternativaMaxSeleccion} alternativas</td>
						<td>{row.duracion == 0 ? 'No hay tiempo límite' : (row.duracion + " minutos")}</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	generarTablaBodyPreguntas(row){
		if(row != null){
			let alternativas = '';
			let enunciadoGATBParte3 = '';
			let alternativasGATBParte3 = '';
			if(2 == row.idTestPsicologico && 3 == row.idParte){
				var enunciadoSplit = row.enunciado.split(",");
				enunciadoGATBParte3 = (<img src={('/').concat(enunciadoSplit[0])} height="40" width="auto" />);
				alternativasGATBParte3 = (<img src={('/').concat(enunciadoSplit[1])} height="40" width="auto" />);
			}
			var i;
			for(i = 0; i < row.alternativa.length; i++) {
				alternativas += ('').concat(row.alternativa[i].alternativa,' (',row.alternativa[i].glosa,') ');
			}
			return (<tr key={('').concat(row.idTestPsicologico,'-',row.idParte,'-',row.idPregunta)}>
						<td>{row.idParte}</td>
						<td>{row.idPregunta}. {2 == row.idTestPsicologico && 3 == row.idParte ? enunciadoGATBParte3 : row.enunciado }
						</td>
						<td>{2 == row.idTestPsicologico && 3 == row.idParte ? alternativasGATBParte3 : alternativas}</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	render() {
		const { idTestPsicologico, idParte, nombre, testPsicologicosPreguntasFiltro, filtroTestPsicologicoEnunciado, testPsicologicosPartesFiltro, errors, isLoading, errorMensaje } = this.state;
		
		var tableHeadTestPsicologico = [{
				key: 'idTestPsicologico',
				nombre: 'N°'
			},{
				key: 'nombre',
				nombre: 'Nombre'
			},{
				key: 'cantidadPreguntas',
				nombre: 'Cantidad de preguntas'
		}]
		
		var tableHeadPartes = [{
				key: 'idParte',
				nombre: 'Parte'
			},{
				key: 'instrucciones',
				nombre: 'Instrucciones'
			},{
				key: 'alternativaMaxSeleccion',
				nombre: 'Mínimo de alternativas seleccionables'
			},{
				key: 'duracion',
				nombre: 'Duración'
		}]
		
		var tableHeadPreguntas = [{
				key: 'idParte',
				nombre: 'Parte'
			},{
				key: 'idPregunta',
				nombre: 'Pregunta'
			},{
				key: 'alternativas',
				nombre: 'Alternativas'
		}]
		
		var camposBusquedaPreguntas = [{
				key: 'idFiltroPreguntasEnunciado',
				label: "Filtrar por enunciado de la pregunta",
				onChange: this.filtrarListaPreguntas.bind(this),
				valor: filtroTestPsicologicoEnunciado
		}];
		
		return (
			<div className="mt-3 mx-auto ancho1200">
				{isLoading && <CargandoImagen />}
				{this.props.obtenerTestPsicologicosResponse.length > 0 &&
				<Fragment>
					<TablePaginado tituloTabla={"Lista de tests psicológicos"}
						mensajeSinRegistros={"No se encontró tests psicológicos."}
						tableHead={tableHeadTestPsicologico}
						tablaEstilo={"width200"}
						tableBody={this.generarTablaBodyTestPsicologico.bind(this)}
						registrosPorPagina={10} 
						registros={this.props.obtenerTestPsicologicosResponse} 
						camposBusqueda={[]} />
					
					{idTestPsicologico > 0 &&
					<div key={("Partes").concat(idTestPsicologico)}>
						<TablePaginado tituloTabla={this.obtenerTablaTituloPartes(nombre)}
							mensajeSinRegistros={"No se encontró partes."}
							tableHead={tableHeadPartes}
							tablaEstilo={"width200"}
							tableBody={this.generarTablaBodyPartes.bind(this)}
							registrosPorPagina={5} 
							registros={testPsicologicosPartesFiltro} 
							camposBusqueda={[]} />
					</div>
					}
					
					{idTestPsicologico > 0 && idParte > 0 &&
					<div key={("Preguntas").concat(idTestPsicologico,"Parte",idParte)}>
						<BarraBusqueda camposBusqueda={camposBusquedaPreguntas} />
						<TablePaginado tituloTabla={this.obtenerTablaTituloPreguntas(nombre)}
							mensajeSinRegistros={"No se encontró preguntas del test psicológico " + nombre} 
							tableHead={tableHeadPreguntas}
							tablaEstilo={"width200"}
							tableBody={this.generarTablaBodyPreguntas.bind(this)}
							nombreTitulo={nombre}
							registrosPorPagina={10}
							registros={filtroTestPsicologicoEnunciado.length > 0 ? testPsicologicosPreguntasFiltro : idTestPsicologico > 0 ? testPsicologicosPreguntasFiltro : []} 
							camposBusqueda={[]} />
							
					</div>
					}
				</Fragment>
				}
				{errorMensaje != '' && <MensajeError error={errorMensaje} />}
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		obtenerTestPsicologicosResponse : state.reducerTestPsicologico.obtenerTestPsicologicosResponse,
		obtenerTestPsicologicoPreguntasResponse : state.reducerTestPsicologico.obtenerTestPsicologicoPreguntasResponse,
		obtenerTestPsicologicosPartesResponse : state.reducerTestPsicologico.obtenerTestPsicologicosPartesResponse
	}
}

export default connect(mapStateToProps, { obtenerTestPsicologicos, obtenerTestPsicologicosPartes, obtenerTestPsicologicoPreguntas })(TestPsicologicos);