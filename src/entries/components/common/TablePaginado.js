import React, {Component, Fragment} from 'react';
import classnames from 'classnames';
import BarraBusqueda from './BarraBusqueda';

export default class TablePaginado extends Component {
	constructor(props){
		super(props);
		this.state = {
			paginaActual: 1
		};
		this.handleClick = this.handleClick.bind(this);
	}

	generarTableHead(field){
		var htmlField = '';
		htmlField = (
			<th key={field.key}>{field.nombre}</th>
		)
		return htmlField;
	}
	
	handleClick(event) {
		this.setState({
			paginaActual: Number(event.target.id)
		});
	}

	render() {
		const { paginaActual } = this.state;
		
		let vregistros = [];
		if(this.props.registros != null){
			vregistros = this.props.registros;
		}
		
		var vtableHead = this.props.tableHead.map( campo =>{
			return this.generarTableHead(campo);
		});
	
		const indiceUltimoRegistro = paginaActual * this.props.registrosPorPagina;
		const indicePrimerRegistro = indiceUltimoRegistro - this.props.registrosPorPagina;
		const registrosActual = vregistros.slice(indicePrimerRegistro, indiceUltimoRegistro);

		var renderRegistros = this.props.tableBody(null);
		
		if(registrosActual.length == 0){
			renderRegistros = this.props.mensajeSinRegistros;
		} else {
			renderRegistros = registrosActual.map((registro, index) => {
				return this.props.tableBody(registro, index);
			});
		}
		//console.log('TablePaginado', renderRegistros);
		const numeroPaginas = [];
		for (let i = 1; i <= Math.ceil(vregistros.length / this.props.registrosPorPagina); i++) {
			numeroPaginas.push(i);
		}
		const renderNumeroPaginas = numeroPaginas.map(numero => {
			return (
				<li key={numero}
					id={numero}
					className={classnames('page-item', (paginaActual == numero) ? 'active' : '' )}
					onClick={this.handleClick} >
					<span id={numero} className="page-link" >
					{numero}
					</span>
				</li>
			);
		});
		//console.log('Tabla',this.props);
		return(
			<div className="mb-3 pb-1">
				<nav aria-label="Page navigation example">
					<Fragment>
						<h4>{this.props.tituloTabla}</h4>
						{this.props.camposBusqueda != null &&
						<BarraBusqueda camposBusqueda={this.props.camposBusqueda} />
						}
						{registrosActual.length > 0 &&
						<Fragment>
							<table className={classnames(this.props.tablaEstilo,'table table-hover table-condensed') }>
								<thead>
									<tr>
										{vtableHead}
									</tr>
								</thead>
								<tbody>
									{renderRegistros}
								</tbody>
							</table>
							<ul className="pagination pagination-sm">
								{renderNumeroPaginas}
							</ul>
						</Fragment>
						}
						{registrosActual.length == 0 &&
							<h5>{renderRegistros}</h5>
						}
					</Fragment>
				</nav>
			</div>
		);
	}
}