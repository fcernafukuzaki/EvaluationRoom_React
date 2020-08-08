import React from 'react';

const Boton = ({ id, label, geometria, position, visible }) => {
	return(
		<a-entity id={id} position={position} visible={visible}>
		<a-text 
			value={label} align="center" color="#ffffff" 
			width="0.3" height="0.3" 
			geometry={geometria} material="color: #333"
			font="/assets/fonts/custom-msdf.json" 
			text="color:#ffffff; fontImage:/assets/fonts/custom.png;negate:false;wrapCount:17"
			>
		</a-text>
		</a-entity>
	);
}

export default Boton;