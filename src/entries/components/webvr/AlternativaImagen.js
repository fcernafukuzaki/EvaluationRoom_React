import React from 'react';

const AlternativaImagen = ({ id, label, imagen, position, visible }) => {
	var material = ("color: #fff; src:/").concat(imagen);
	return(
		<a-text id={id} 
			value={label} align="center" color="#000001" wrapcount="30" 
			width="0.55" height="0.42"
			position={position}
			rotation="0 0 0"
			geometry="primitive: box; width: 0.55; height: 0.15; depth: 0.001"
			material={material}
			
			text="height:1.01;color:#000001;anchor:center;align:top;negate:false">
		</a-text>
	);
}

export default AlternativaImagen;