import React, {Fragment} from 'react';
import classnames from 'classnames';

import ClientsSelectionProcessTable from '../components/clients_selectionprocess_table'
import ClientsSelectionProcessButtonNew from '../components/clients_selectionprocess_button_new'
import CandidateCard from '../../candidate_card/container/candidate_card'
import {getDate} from '../../../common/components/date_util'
import {encriptarAES} from '../../../common/components/encriptar_aes';;

function tableSelectionProcess(selectionProcess){
    var tableHead = [{
            key: 'identificador',
            nombre: 'N°'
        },{
            key: 'nombre',
            nombre: 'Cliente'
        },{
            key: 'apellidoPaterno',
            nombre: 'Puesto Laboral'
        },{
            key: 'date_process_begin',
            nombre: 'date_process_begin'
        },{
            key: 'date_process_end',
            nombre: 'date_process_end'
        },{
            key: 'process_active',
            nombre: 'process_active'
        },{
            key: 'apellidoMaterno',
            nombre: 'Cant. Candidatos'
        },{
            key: 'accion',
            nombre: 'Acción'
    }]

    if(selectionProcess.length > 0) {
        var tableBody = selectionProcess.map((elemento, index) =>{
            var tableCandidates = elemento.selectionprocess_candidates.map(candidate =>{
                return (<Fragment key={candidate.idcandidate}>
                            <CandidateCard 
                                    id={candidate.candidate.idcandidato}
                                    name={candidate.candidate.nombre}
                                    paternal_surname={candidate.candidate.apellidopaterno}
                                    maternal_surname={candidate.candidate.apellidomaterno}
                                    birth_date={candidate.candidate.fechanacimiento}
                                    email_address={candidate.candidate.correoelectronico}
                                    telephones={candidate.candidate.telephones}
                                    psychologicaltests={candidate.candidate.psychologicaltests}
                                />
                </Fragment>)
            })
            var hashIdClientIdJobPosition = encriptarAES(elemento.idclient.toString() + '_' + elemento.idjobposition.toString());
            var asignarCandidatos = (
                                    <ClientsSelectionProcessButtonNew 
                                        pathname={'/selectionprocess'}
                                        hashId={`?id=${hashIdClientIdJobPosition}`}
                                        buttonClass={'far fa-edit'}
                                        buttonTitle={'Actualizar datos de proceso de selección'}
                                        buttonLabel={'Actualizar'}
                                    />
            );
            return (<Fragment key={elemento.idclient + ' - ' + elemento.idjobposition}>
                        <div className='div-table-row'>
                            <div className='selectionprocess-row-header'>
                                <div className='div-table-col div-table-col-first'>{(index+1)}</div>
                                <div className='div-table-col'>Cliente: {elemento.client.nombre}</div>
                                <div className='div-table-col'>Puesto laboral: {elemento.jobposition.nombre}</div>
                                <div className='div-table-col'>Fec. Ini. proceso: {getDate(elemento.date_process_begin)}</div>
                                <div className='div-table-col'>Fec. Fin proceso: {getDate(elemento.date_process_end)}</div>
                                <div className='div-table-col'>Estado: {elemento.process_active ? 
                                    (<Fragment><i className="fas fa-exclamation"></i> ACTIVO</Fragment>) : 
                                    (<Fragment><i className="fas fa-check-circle"></i> FINALIZADO</Fragment>)}</div>
                                <div className='div-table-col'>Cant. de candidatos: {elemento.selectionprocess_candidates.length}</div>
                                <div className='div-table-col div-table-col-last'>{asignarCandidatos}
                                </div>
                            </div>
                        </div>
                        <div className='div-table-row'>
                            <div>
                                <div className='candidate-cards'>
                                {tableCandidates}
                                </div>
                            </div>
                        </div>
                    </Fragment>)
        })
        return (<ClientsSelectionProcessTable tableHead={tableHead} tableBody={tableBody} />)
    } else {
        return (<strong>No se ha encontrado resultados.</strong>)
    }
}

const ClientsSelectionProcessList = ({ datos }) => {
    //console.log('datos', datos)
	return(
        <Fragment>
        {
            tableSelectionProcess(datos)
        }
        </Fragment>
	);
}

export default ClientsSelectionProcessList;