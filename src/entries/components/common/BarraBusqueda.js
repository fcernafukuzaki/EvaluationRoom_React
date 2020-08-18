import React, { Fragment } from 'react';
import classnames from 'classnames';

export default function BarraBusqueda(props){
	//<div className={classnames('botonesBusqueda', 'mb-3') }>
	//<form className="form">
	return (
		<Fragment>
			<div className="form-group row">
			{
				props.camposBusqueda.map( campoBusqueda => {
					if (typeof campoBusqueda.type !== 'undefined') {
						//campoBusqueda.label
						//campoBusqueda.valor
						let options = []
						campoBusqueda.valor.map( campo =>{
							options.push(
								<option key={campo.value} value={campo.value}>{campo.label}</option>
							)
						})
						return (
							<div key={campoBusqueda.key} className="col">
							<div className="input-group mb-2">
								<div className="input-group-prepend">
									<div className="input-group-text"><i className="fas fa-search"></i></div>
								</div>
								<select name={campoBusqueda.name} className={classnames("form-control form-control-sm")} 
									onChange={campoBusqueda.onChange} 
									size={campoBusqueda.size} 
									multiple={campoBusqueda.multiple} value={campoBusqueda.valueSelected}>
									{options}
								</select>
							</div>
							</div>
						)
					} else {
						return (
							<div key={campoBusqueda.key} className="col">
							<div className="input-group mb-2">
								<div className="input-group-prepend">
									<div className="input-group-text"><i className="fas fa-search"></i></div>
								</div>
								<input
									type='text'
									onChange={campoBusqueda.onChange}
									className="form-control form-control-sm"
									placeholder={campoBusqueda.label}
									value={campoBusqueda.valor}
								/>
							</div>
							</div>
						)
					}
				})
			}
			</div>
		</Fragment>
	)
}