import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import TablePaginado from '../../components/common/TablePaginado';
import BarraBusqueda from '../../components/common/BarraBusqueda';
import {obtenerTestPsicologicosInfo} from '../../../actions/recruiter_view/actionMenu'

class TestPsicologicos extends Component {
	constructor(props){
		super(props);
		this.state = {
			filtroTestPsicologicoEnunciado: '',
			testPsicologicosPreguntasAux: [], // Lista de preguntas. El valor no cambia
			testPsicologicosPreguntasFiltro:[], // Lista de preguntas que cambia a partir del texto ingresado
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
		this.props.obtenerTestPsicologicosInfo(this.props.token, this.props.correoelectronico)
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.obtenerTestPsicologicosInfoResponse !== this.props.obtenerTestPsicologicosInfoResponse) {
			this.setState({
				isLoading: Object.entries(this.props.obtenerTestPsicologicosInfoResponse).length > 0 ? false : true
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
		this.setState({[e.target.name]: e.target.value});
	}
	
	filtrarListaPreguntas(e){
		let filtroTestPsicologicoEnunciado = e.target.value;
		this.setState({
			filtroTestPsicologicoEnunciado: filtroTestPsicologicoEnunciado,
			testPsicologicosPreguntasFiltro: this.state.testPsicologicosPreguntasAux.filter(p => p.enunciado.indexOf(filtroTestPsicologicoEnunciado) > -1)
		})
	}
	
	obtenerTablaTituloPartes(titulo){
		return ("Partes del test psicológico: ").concat(titulo);
	}
	
	obtenerTablaTituloPreguntas(titulo){
		return ("Preguntas del test psicológico: ").concat(titulo," (Parte ",this.state.idParte,")");
	}
	
	varPartesTestPsicologico(test){
		this.setState({
			idTestPsicologico: test.idtestpsicologico,
			idParte: 0, 
			nombre: test.nombre,
			testPsicologicosPartesFiltro: this.props.obtenerTestPsicologicosInfoResponse.filter(p => p.idtestpsicologico == test.idtestpsicologico)
		});
	}
	
	varPreguntasTestPsicologico(idtestpsicologico, idparte, preguntas){
		this.setState({
			idTestPsicologico: idtestpsicologico,
			idParte: idparte,
			nombre: this.state.nombre,
			filtroTestPsicologicoEnunciado: '',
			testPsicologicosPreguntasFiltro: preguntas,
			testPsicologicosPreguntasAux: preguntas
		});
	}
	
	generarTablaBodyTestPsicologico(row){
		if(row != null){
			return (<tr key={row.idtestpsicologico} onClick={() => this.varPartesTestPsicologico(row)} >
						<td>{row.idtestpsicologico}</td>
						<td>{row.nombre}</td>
						<td>{row.cantidadpreguntas}</td>
					</tr>);
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	generarTablaBodyPartes(row){
		if(row != null){
			const html_body = row.instrucciones.map(parte => {
				return (<tr key={('').concat(parte.idtestpsicologico,'-',parte.idparte,'-',parte.instrucciones)} 
							onClick={() => this.varPreguntasTestPsicologico(parte.idtestpsicologico,parte.idparte,parte.preguntas)} >
							<td>{parte.idparte}</td>
							<td>{parte.instrucciones}</td>
							<td>Se puede seleccionar hasta un máximo de {parte.alternativamaxseleccion} alternativas</td>
							<td>{parte.duracion == 0 ? 'No hay tiempo límite' : (parte.duracion + " segundos")}</td>
						</tr>);
			})
			return html_body
		} else {
			return (<tr><td>Cargando</td></tr>)
		}
	}
	
	generarTablaBodyPreguntas(row){
		if(row != null){
			let alternativas = '';
			let enunciadoGATBParte3 = '';
			let alternativasGATBParte3 = '';
			if(2 == row.idtestpsicologico && 3 == row.idparte){
				var enunciadoSplit = row.enunciado.split(",");
				enunciadoGATBParte3 = (<img src={('/').concat(enunciadoSplit[0])} height="40" width="auto" />);
				alternativasGATBParte3 = (<img src={('/').concat(enunciadoSplit[1])} height="40" width="auto" />);
			}
			var i;
			for(i = 0; i < row.alternativa.length; i++) {
				alternativas += ('').concat(row.alternativa[i].alternativa,' (',row.alternativa[i].glosa,') ');
			}
			return (<tr key={('').concat(row.idtestpsicologico,'-',row.idparte,'-',row.idpregunta)}>
						<td>{row.idparte}</td>
						<td>{row.idpregunta}. {2 == row.idtestpsicologico && 3 == row.idparte ? enunciadoGATBParte3 : row.enunciado }
						</td>
						<td>{2 == row.idtestpsicologico && 3 == row.idparte ? alternativasGATBParte3 : alternativas}</td>
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
				{this.props.obtenerTestPsicologicosInfoResponse.length > 0 &&
				<Fragment>
					<TablePaginado tituloTabla={"Lista de tests psicológicos"}
						mensajeSinRegistros={"No se encontró tests psicológicos."}
						tableHead={tableHeadTestPsicologico}
						tablaEstilo={"width200"}
						tableBody={this.generarTablaBodyTestPsicologico.bind(this)}
						registrosPorPagina={10} 
						registros={this.props.obtenerTestPsicologicosInfoResponse} 
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
							registros={filtroTestPsicologicoEnunciado.length > 0 ? testPsicologicosPreguntasFiltro: idTestPsicologico > 0 ? testPsicologicosPreguntasFiltro: []} 
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
		obtenerTestPsicologicosInfoResponse: state.reducerMenu.obtenerTestPsicologicosInfoResponse
	}
}

export default connect(mapStateToProps, {obtenerTestPsicologicosInfo})(TestPsicologicos);