import React, {Fragment} from 'react';
 
import TabBarItem from './TabBarItem';
import TabBarPaneItem from './TabBarPaneItem';

import Table from './Table';
import TablePaginado from './TablePaginado';

import { ResponsivePie } from '@nivo/pie';

function generarTablaResultado(idTestPsicologico, elementos, caracteristicasPrincipales){
	let rows = []
	if(elementos != null){
		if(3 == idTestPsicologico){
			rows.push(obtenerTableBodyTdResultadoDISC(elementos, caracteristicasPrincipales));
		} else if(4 == idTestPsicologico) {
		} else {
			elementos.map((row) => {
				rows.push(
					<tr key={('').concat(row.factor,'-',row.subFactor)}>
						<td>{row.factor} {row.subFactor}</td>
						<td>{row.interpretacion}</td>
						<td>{row.resultado}</td>
					</tr>
				)
			})
		}
	} else {
		rows.push(<tr><td>Cargando</td></tr>)
	}
	return (rows)
}

function obtenerTableBodyTdResultadoDISC(elementos, interpretacion){
	//console.log('obtenerTableBodyTdResultadoDISC', elementos, interpretacion);
	let rows = [];
	let elemento = [];
	if(elementos.caracteristicasPrincipales != null && interpretacion == 'caracteristicasPrincipales'){
		elemento = elementos.caracteristicasPrincipales;
	} else if(elementos.puntajes != null && interpretacion == 'puntajes'){
		elemento = elementos.puntajes;
	} else if(elementos.puntajesEquivalente != null && interpretacion == 'puntajesEquivalente'){
		elemento = elementos.puntajesEquivalente;
	} else if(elementos.fortalezas != null && interpretacion == 'fortalezas'){
		elemento = elementos.fortalezas;
	} else if(elementos.debilidades != null && interpretacion == 'debilidades'){
		elemento = elementos.debilidades;
	} else if(elementos.diarias != null && interpretacion == 'diarias'){
		rows.push(
			<tr key={('').concat(elementos.diarias.factor)}>
				<td>{elementos.diarias.factor}</td>
				<td>{elementos.diarias.interpretacion}</td>
				<td>{elementos.diarias.resultado}</td>
			</tr>
		);
	}
	if(elemento != null){
		elemento.map((row) => {
			rows.push(
				<tr key={('').concat(row.factor)}>
					<td>{row.factor}</td>
					{(
					interpretacion != 'puntajes' && interpretacion != 'puntajesEquivalente') &&
					<td>{row.interpretacion}</td>
					}
					{(interpretacion == 'puntajes' || interpretacion == 'puntajesEquivalente') &&
					<td>{
					row.factor == 'D' ? 'Dominio' : 
					row.factor == 'I' ? 'Influencia' : 
					row.factor == 'S' ? 'Sumisión' : 
					row.factor == 'C' ? 'Conformidad a normas' : ''}</td>
					}
					<td>{row.resultado}</td>
				</tr>
			)
		})
	}
	return (rows)
}

//puntajes :factor: "D", resultado: "0", interpretacion: ""
//puntajesEquivalente :factor: "D", resultado: "70", interpretacion: ""
//fortalezas :factor : "D", resultado: "POSITIVO", interpretacion: "fortaleza"
//debilidades :factor: "D", resultado: "APRESURADO", interpretacion: "debilidad"
//diarias :factor : "S<", resultado: "Buscar variedad, demostrar un sentido de urgencia y reaccionar al cambio rápidamente.", interpretacion: "diaria"
function obtenerTableBodyRespuestas(row){
	if(row != null){
		let respuestaCandidato = '';
		let alternativasGATBParte3 = '';
		let respuestaTestPsicologico = '';
		if(3 == row.idTestPsicologico){
			const signos = ["+","-"];
			var i;
			for(i = 0; i < row.respuestas.length; i++) {
				respuestaCandidato += ('(').concat(signos[i],' ',row.respuestas[i].alternativaRespuestaCandidato,') ',row.respuestas[i].glosaRespuestaCandidato,' ');
			}
		} else {
			var i;
			for(i = 0; i < row.respuestas.length; i++) {
				if(2 == row.idTestPsicologico && 3 == row.idParte){
					respuestaCandidato += ('').concat(row.respuestas[i].alternativaRespuestaCandidato,' ');
					alternativasGATBParte3 = (<img src={('/').concat(row.respuestas[i].glosaRespuestaCandidato)} alt={('Alternativa ').concat(row.respuestas[i].alternativaRespuestaCandidato)} height="40" width="auto" />);
					respuestaTestPsicologico += ('').concat(row.respuestas[i].alternativaRespuestaTestPsicologico,' ');
				} else {
					respuestaCandidato += ('').concat(row.respuestas[i].alternativaRespuestaCandidato,' (',row.respuestas[i].glosaRespuestaCandidato,') ');
					if(row.respuestas[i].alternativaRespuestaTestPsicologico != null){
						respuestaTestPsicologico += ('').concat(row.respuestas[i].alternativaRespuestaTestPsicologico,' (',row.respuestas[i].glosaRespuestaTestPsicologico,') ');
					}
				}
			}
		}
		let respuesta = '';
		if(respuestaTestPsicologico.length > 0){
			if(respuestaCandidato == respuestaTestPsicologico){
				respuesta = <i className="far fa-check-circle iconoVerde icono2em" title="Respuesta correcta" ></i>
			} else {
				respuesta = <i className="far fa-times-circle iconoRojo icono2em" title="Respuesta incorrecta" ></i>
			}
		}
		return (
			<tr key={('').concat(row.idTestPsicologico,'-',row.idParte,'-',row.idPregunta)}>
				<td>{row.idParte}</td>
				<td>{row.idPregunta}. {2 == row.idTestPsicologico && 3 == row.idParte ? <img src={('/').concat(row.enunciadoPregunta)} height="40" width="auto" /> : row.enunciadoPregunta }
					 {2 == row.idTestPsicologico && 3 == row.idParte ? alternativasGATBParte3 : ''}
					</td>
				{2 == row.idTestPsicologico && 
					(<td className="text-center">{respuesta}</td>)
				}
				<td>{respuestaCandidato.trim()}</td>
				{2 == row.idTestPsicologico && 
					(<td>{respuestaTestPsicologico.trim()}</td>)
				}
			</tr>
		);
	} else {
		return (<tr><td>Cargando</td></tr>)
	}
}

function generarGrafico(datos, nombreTest){
	var grafico = '';
	if(Object.entries(datos).length > 0){
		var datosGrafico = datos.filter(dato => dato[0].nombre == nombreTest);
		grafico = (
			<div className="graficoDonaResultado">
				<ResponsivePie
					data={datosGrafico[0][1].datos}
					margin={{ "top": 40, "right": 80, "bottom": 80, "left": 80 }}
					innerRadius={0.5}
					padAngle={0.7}
					cornerRadius={3}
					colors="nivo"
					colorBy="id"
					borderWidth={1}
					borderColor="inherit:darker(0.2)"
					radialLabelsSkipAngle={10}
					radialLabelsTextXOffset={6}
					radialLabelsTextColor="#333333"
					radialLabelsLinkOffset={0}
					radialLabelsLinkDiagonalLength={16}
					radialLabelsLinkHorizontalLength={24}
					radialLabelsLinkStrokeWidth={1}
					radialLabelsLinkColor="inherit"
					slicesLabelsSkipAngle={10}
					slicesLabelsTextColor="#333333"
					animate={true}
					motionStiffness={90}
					motionDamping={15}
				/>
			</div>
		);
	}
	return (grafico);
}

export default function TabBar(props){
	//console.log('TabBar::',props);
	var tabHead = [];
	if(Object.entries(props.elemento).length > 0){
		if(props.elemento.testPsicologicos.length > 0){
			props.elemento.testPsicologicos.map( test => {
				var activo = '';
				var activoPanel = '';
				if(test.nombre == props.elemento.testPsicologicos[0].nombre){
					activo = 'active';
					activoPanel = 'show active';
				}
				tabHead.push({
					id: ('nav-').concat(test.nombre, '-tab'),
					label: test.nombre,
					tipo: 'tab',
					tipoPanel: 'tabpanel',
					activo: activo,
					activoPanel: activoPanel,
					link: ('#nav-').concat(test.nombre),
					keyTab: ('nav-').concat(test.nombre),
					elementos: test
				});
			});
		}
	}
	
	var navItem = tabHead.map( test =>{
		return <TabBarItem {...test} key={test.id} />;
	});
	
	var tableHead = [{
			key: 'idParte',
			nombre: 'Parte'
		},{
			key: 'idPregunta',
			nombre: 'Pregunta'
		},{
			key: 'respuesta',
			nombre: 'Respuesta'
		},{
			key: 'respuestaCandidato',
			nombre: 'Respuesta del candidato'
		},{
			key: 'respuestaTestPsicologico',
			nombre: 'Respuesta del test psicológico'
	}];
	
	var tableHeadReducido = [{
			key: 'idParte',
			nombre: 'Parte'
		},{
			key: 'idPregunta',
			nombre: 'Pregunta'
		},{
			key: 'respuestaCandidato',
			nombre: 'Respuesta del candidato'
	}];
	
	var tableHeadInterpretacion = [{
			key: 'principalCaracteristica',
			nombre: 'Principal característica'
		},{
			key: 'descripcionCaracteristica',
			nombre: 'Descripción característica / Interpretacion'
		},{
			key: 'resultado',
			nombre: 'Resultado'
	}];
	
	var navItemPane = tabHead.map( test =>{
		//console.log('TabBar::data0::',props.data[0].datos.replace(/\\/g,''));
		var fechaExamenFormato = (<strong>El candidato aún no realiza el test psicológico.</strong>);
		if(test.elementos.fechaExamen > 0){
			var fechaExamen = new Date(test.elementos.fechaExamen);
			fechaExamenFormato = ("").concat(fechaExamen.getDate(),"/",(fechaExamen.getMonth() < 10 ? "0" + (fechaExamen.getMonth() + 1) : fechaExamen.getMonth() + 1),"/",fechaExamen.getFullYear());
		}
		//console.log(test.elementos);
		return (
			<TabBarPaneItem key={test.keyTab} {...test} >
				<div className="pt-2 px-3">Cantidad de respuestas respondidas: {test.elementos.respuestas.length} / {test.elementos.cantidadPreguntas}</div>
				<div className="px-3">Fecha en que se realizó el test psicológico: {fechaExamenFormato}</div>
				{Object.entries(props.data).length > 0 &&
				<Fragment>
					<div>{generarGrafico(props.data, test.label)}</div>
					<div className="px-3">
						<h4>Resultados</h4>
						{test.elementos.idTestPsicologico == 3 && <Table tableHead={tableHeadInterpretacion} tableBody={generarTablaResultado(test.elementos.idTestPsicologico, test.elementos.resultado, 'puntajes')} />}
						{test.elementos.idTestPsicologico == 3 && <Table tableHead={tableHeadInterpretacion} tableBody={generarTablaResultado(test.elementos.idTestPsicologico, test.elementos.resultado, 'puntajesEquivalente')} />}
					</div>
					<div className="px-3">
						<h4>Interpretacion resultado de prueba</h4>
						<Table tableHead={tableHeadInterpretacion} tableBody={generarTablaResultado(test.elementos.idTestPsicologico, test.elementos.resultado, 'caracteristicasPrincipales')} />
						
						{test.elementos.idTestPsicologico == 3 && <Table tableHead={tableHeadInterpretacion} tableBody={generarTablaResultado(test.elementos.idTestPsicologico, test.elementos.resultado, 'fortalezas')} />}
						{test.elementos.idTestPsicologico == 3 && <Table tableHead={tableHeadInterpretacion} tableBody={generarTablaResultado(test.elementos.idTestPsicologico, test.elementos.resultado, 'debilidades')} />}
						{test.elementos.idTestPsicologico == 3 && <Table tableHead={tableHeadInterpretacion} tableBody={generarTablaResultado(test.elementos.idTestPsicologico, test.elementos.resultado, 'diarias')} />}
					</div>
				</Fragment>
				}
				<div className="px-3">
					<TablePaginado tituloTabla={"Respuestas del candidato"}
						mensajeSinRegistros={"El candidato aún no ha realizado el test psicológico."}
						tableHead={test.elementos.idTestPsicologico == 2 ? tableHead : tableHeadReducido}
						tablaEstilo={"tablaResultado"}
						tableBody={obtenerTableBodyRespuestas.bind(this)}
						registrosPorPagina={25}
						registros={test.elementos.respuestas}
						camposBusqueda={[]}
						/>
				</div>
			</TabBarPaneItem>
		);
	});
	
	return (
		<Fragment>
			<div className="mb-3">
				<nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						{navItem}
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					{navItemPane}
				</div>
			</div>
		</Fragment>
	);
}