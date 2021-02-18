import React, {Component, Fragment} from 'react';

const Header = (props) => {
	const { nombreCandidato, numeroTestPsicologicoActual, numeroTestPsicologicoParteActual, testPsicologicosAsignados, getLogo, numeroPreguntaActualIndex, candidatoDatos, estiloTablero } = props;
	let numero_TestPsicologicoActual = numeroTestPsicologicoActual + 1;
	let numero_TestPsicologicoParte = numeroTestPsicologicoActual > 0 ? numeroTestPsicologicoParteActual + 1 : 0
	//let idTestPsicologicoParte = (numeroTestPsicologicoActual >= 0 && numeroPreguntaActualIndex >= 0 
	//		&& numeroTestPsicologicoActual < testPsicologicosAsignados) ? candidatoDatos.testPsicologicos[testPsicologicoActual].preguntas[numeroPreguntaActualIndex].idParte /*+ 1*/ : 0;
	return (
		<header id="header" className="header">
			<div id="header-container" className="lineaSubrayado">
				<div className="headerDatos">
					<img src={getLogo} />
					<div>
						{typeof nombreCandidato != "undefined" ? (
								<p className="datosPersonales">
									<span>
										Candidato: <strong>{nombreCandidato}</strong>
									</span>
								</p>
							) : ('')
						}
						{/*testPsicologicoActual >= 0 && testPsicologicoActual < testPsicologicosAsignados &&*/
							testPsicologicosAsignados > 0 &&
							<Fragment>
								<p>Cantidad de pruebas asignadas: {testPsicologicosAsignados}</p>
								<p>Prueba psicológica {numero_TestPsicologicoActual} de {testPsicologicosAsignados} (Parte {numero_TestPsicologicoParte})</p>
							</Fragment>
						}
					</div>
				</div>
				
			</div>
		</header>
	);
}

export default Header;