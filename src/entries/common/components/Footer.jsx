import React from 'react'
import {getYear} from './date_util'

export default function Footer(props){
	return (
		<footer id="footer" className="footer">
			<div className="container" >
				<div className="footer-copyright">
					<p>© {getYear()} Copyright Francisco Cerna Fukuzaki. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	)
}