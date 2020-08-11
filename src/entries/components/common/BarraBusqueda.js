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
				})
			}
			</div>
		</Fragment>
	)
}