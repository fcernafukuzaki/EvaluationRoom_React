import React, {Component, Fragment} from 'react';
import Logo from '../../../../assets/img/logo.jpg'

function getLogo(){
	const logo = new Image();
	logo.src = Logo;
	return logo.src;
}

const Header = (props) => {
	const { nombreCandidato, testPsicologicoActual, testPsicologicosAsignados, numeroPreguntaActualIndex, candidatoDatos, estiloTablero } = props;
	let idTestPsicologicoActual = testPsicologicoActual + 1;
	let idTestPsicologicoParte = (testPsicologicoActual >= 0 && numeroPreguntaActualIndex >= 0 
			&& testPsicologicoActual < testPsicologicosAsignados) ? candidatoDatos.testPsicologicos[testPsicologicoActual].preguntas[numeroPreguntaActualIndex].idParte /*+ 1*/ : 0;
	return (
		<header id="header" className="header">
			<div id="header-container" className="lineaSubrayado">
				<div className="headerDatos">
					<img src={getLogo()} />
					<div>
						{typeof nombreCandidato != "undefined" ? (
								<p className="datosPersonales">
									<span>
										Candidato: <strong>{nombreCandidato}</strong>
									</span>
								</p>
							) : ('')
						}
						{testPsicologicoActual >= 0 && testPsicologicoActual < testPsicologicosAsignados &&
							<Fragment>
								<p>Cantidad de pruebas asignadas: {testPsicologicosAsignados}</p>
								<p>Prueba psicológica {idTestPsicologicoActual} de {testPsicologicosAsignados} (Parte {idTestPsicologicoParte})</p>
							</Fragment>
						}
					</div>
				</div>
				
			</div>
		</header>
	);
}

export default Header;