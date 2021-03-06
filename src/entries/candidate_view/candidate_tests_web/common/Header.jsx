import React, {Component, Fragment} from 'react';

const Header = (props) => {
	const { nombreCandidato, numeroTestPsicologicoActual, numeroTestPsicologicoParteActual, 
		testPsicologicosAsignados, testPsicologicosFaltantes, flagMostrarMensajeBienvenida, 
		getLogo } = props;
	let numero_TestPsicologicoActual = numeroTestPsicologicoActual;
	let numero_TestPsicologicoParte = numeroTestPsicologicoParteActual > 0 ? numeroTestPsicologicoParteActual : 0
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
						{
							testPsicologicosAsignados > 0 && !flagMostrarMensajeBienvenida &&
							<Fragment>
								<p>Cantidad de pruebas asignadas: {testPsicologicosAsignados}</p>
								<p>Cantidad de pruebas faltantes: {testPsicologicosFaltantes + 1 >= 0 ? testPsicologicosFaltantes + 1 : 0}</p>
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