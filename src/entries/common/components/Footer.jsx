import React from 'react'
import { Fragment } from 'react'
import {getYear} from './date_util'

export default function Footer(props){
	const texto = "© " + getYear() + " Copyright Francisco Cerna Fukuzaki. Todos los derechos reservados."
	return (
		<Fragment>
		{
			props.isLogin ?
			<div className="text-center small">
                <small>{texto}</small>
            </div>
			:
			<footer id="footer" className="footer">
				<div className="container" >
					<div className="footer-copyright">
						<p>{texto}</p>
					</div>
				</div>
			</footer>
		}
		</Fragment>
	)
}