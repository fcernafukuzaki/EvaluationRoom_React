import React from 'react';
import classnames from 'classnames';

function generarTableHead(field){
	var htmlField = '';
	htmlField = (
		<th key={field.key}>{field.nombre}</th>
	)
	return htmlField;
}

const Table = ({ tableHead, tableBody }) => {
	var vtableHead = tableHead.map( campo =>{
		return generarTableHead(campo);
	});

	return(
		<div className="mb-4">
			<table className="width200 table table-hover table-condensed">
				<thead>
					<tr>
						{vtableHead}
					</tr>
				</thead>
				<tbody>
					{tableBody}
				</tbody>
			</table>
		</div>
	);
}

export default Table;