import React from 'react';

const AlternativaImg = ({ id, label, imagen, posicion, posicionTexto, visible }) => {
	var material = ("color: #18afa8; opacity: 0.10;");
	var materialTexto = ("color: #ffffff; opacity: 0.10;");
	return(
		<a-text id={id} 
			value="" align="center" color="#000001" wrapcount="1" 
			width="0.55"
			position={posicion}
			rotation="0 0 0"
			geometry="primitive: box; width: 0.14; height: 0.15; depth: 0.001"
			material={material}
			font="/assets/fonts/custom-msdf.json"
			text="height:1.01;align:center;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false">
			<a-text 
				value={label} align="center" color="#000001" wrapcount="1" 
				width="0.55"
				position={posicionTexto}
				rotation="0 0 0"
				geometry="primitive: box; width: 0.14; height: 0.03; depth: 0.001"
				material={materialTexto}
				font="/assets/fonts/custom-msdf.json"
				text="height:1.01;align:center;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;baseline:top;negate:false">
			</a-text>
		</a-text>
	);
}

export default AlternativaImg;