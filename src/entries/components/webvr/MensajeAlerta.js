import React from 'react';

const MensajeAlerta = ({ id, label, position, color, visible }) => {
	return(
		<a-text id={id} 
			value={label} align="center" color="white" wrapcount="30"
			visible={label.length > 0 ? "true" : "false"}
			width="0.55" height="0.42"
			position={position}
			rotation="0 0 0"
			geometry="primitive: box; width: 0.57; height: 0.05; depth: 0.001" material={color}
			font="/assets/fonts/custom-msdf.json"
			text="height:1.01;color:#fff;fontImage:/assets/fonts/custom.png;anchor:center;align:top;align:center;negate:false">
		</a-text>
	);
}

export default MensajeAlerta;