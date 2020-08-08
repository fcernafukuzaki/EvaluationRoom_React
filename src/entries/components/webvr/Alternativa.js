import React from 'react';

const Alternativa = ({ id, label, position, visible }) => {
	return(
		<a-text id={id} 
			value={label} align="center" color="#000001" wrapcount="30" 
			width="0.55" height="0.42"
			position={position}
			rotation="0 0 0"
			geometry="primitive: box; width: 0.57; height: 0.07; depth: 0.001"
			material="color: #18afa8"
			font="/assets/fonts/custom-msdf.json"
			text="height:1.01;color:#000001;fontImage:/assets/fonts/custom.png;anchor:center;align:center;negate:false">
		</a-text>
	);
}

export default Alternativa;