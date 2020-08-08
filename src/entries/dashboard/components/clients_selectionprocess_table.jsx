import React from 'react';
import classnames from 'classnames';

function generarTableHead(field, index){
    var htmlField = '';
    var styleFirst = 'div-table-col-first'
	htmlField = (
		<div key={field.key} className={classnames('div-table-col', (index==0 ? styleFirst : ''))}>{field.nombre}</div>
	)
	return htmlField;
}

const ClientsSelectionProcessTable = ({ tableHead, tableBody }) => {
	var vtableHead = tableHead.map( (campo, index) =>{
		return generarTableHead(campo, index);
	});
	/*
	<div className='div-table-row div-table-row-header'>
                    {vtableHead}
				</div>
				
				<div className='div-table-row'>
				</div>
	*/
	return(
		<div className="mb-4">
			<div className="div-table selectionprocess-list">
                {tableBody}
			</div>
		</div>
	);
}

export default ClientsSelectionProcessTable;