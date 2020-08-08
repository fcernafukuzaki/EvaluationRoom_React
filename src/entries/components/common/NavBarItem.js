import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';

export default function NavBarItem(props){
	const {tipo, exact, disabled, link, label, item} = props;
	var htmlField = '';
	if(tipo === 'nav-item') {
		htmlField = (
			<li activeclassname="nav-item active" >
				<NavLink 
				className={classnames('nav-link', disabled )}
				exact={exact}
				to={link}>{label}</NavLink>
			</li>
		)
	} else if(tipo === 'nav-item dropdown') {
		htmlField = (
			<li className={classnames(tipo)} >
				<NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				{label}
				</NavLink>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					{
						item.map( item => {
							return (
							<NavLink key={item.key}
							className="dropdown-item"
							exact={item.exact}
							to={item.link}>{item.label}</NavLink>
							);
						})
					}
				</div>
			</li>
		)
	}
	
	return htmlField;
}