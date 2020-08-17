import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

import BarraBusqueda from '../../../components/common/BarraBusqueda'
import ClientsSelectionProcessTable from '../components/clients_selectionprocess_table'
import {ClientsSelectionProcessButtonUpdate} from './clients_selectionprocess_button'
import CandidateCard from '../../candidate_card/container/candidate_card'
import {getDate} from '../../../common/components/date_util'
import {encriptarAES} from '../../../common/components/encriptar_aes';;

class ClientsSelectionProcessList extends Component {
	constructor(props){
		super(props);
		this.state = {
            filtroNombreCliente: '',
            filtroPuestoLaboral: '',
            filtroStatusSelectionProcess: ''
        }
    }

    tableSelectionProcess(selectionProcess, candidatesPsychologicalTest){
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

        if(Object.keys(selectionProcess).length > 0) {
            var tableBody = Object.keys(selectionProcess).map((id_jobposition, index) => {
                var tableCandidates = selectionProcess[id_jobposition].map((candidate, i) => {
                    
                    var candidatesPsychologicalTestList = []
                    if(Object.keys(candidatesPsychologicalTest).length > 0) {
                        Object.keys(candidatesPsychologicalTest).map((id_candidate, index) => {
                            //console.log('id_candidate', candidatesPsychologicalTest[id_candidate])
                            if(candidatesPsychologicalTest[id_candidate][0].idcandidato == candidate.idcandidato){
                                candidatesPsychologicalTestList = candidatesPsychologicalTest[id_candidate]
                            }
                        });
                    }
                    //console.log('id_candidate', candidatesPsychologicalTestList)
                    return (<Fragment key={candidate.idcandidato}>
                                <CandidateCard 
                                        id={candidate.idcandidato}
                                        name={candidate.nombre}
                                        paternal_surname={candidate.apellidopaterno}
                                        maternal_surname={candidate.apellidomaterno}
                                        birth_date={candidate.fechanacimiento}
                                        email_address={candidate.correoelectronico}
                                        telefono_fijo={candidate.telefono_fijo}
                                        telefono_movil={candidate.telefono_movil}
                                        psychologicaltests={candidatesPsychologicalTestList}
                                    />
                    </Fragment>)
                })
    
                var elemento_id_jobposition = selectionProcess[id_jobposition]
                var elemento = elemento_id_jobposition[0]
    
                var hashIdClientIdJobPosition = encriptarAES(elemento.idclient.toString() + '_' + elemento.idjobposition.toString());
                var asignarCandidatos = (
                                        <ClientsSelectionProcessButtonUpdate 
                                            pathname={'/selectionprocess'}
                                            hashId={`?id=${hashIdClientIdJobPosition}`}
                                        />
                );
    
                return (<Fragment key={elemento.idclient + ' - ' + elemento.idjobposition}>
                        <div className='div-table-row'>
                            <div className='selectionprocess-row-header'>
                                <div className='div-table-col div-table-col-first'>{(index+1)}</div>
                                <div className='div-table-col'>Cliente: {elemento.client_name}</div>
                                <div className='div-table-col'>Puesto laboral: {elemento.jobposition_name}</div>
                                <div className='div-table-col'>Fec. Ini. proceso: {getDate(elemento.date_process_begin)}</div>
                                <div className='div-table-col'>Fec. Fin proceso: {getDate(elemento.date_process_end)}</div>
                                <div className='div-table-col'>Estado: {elemento.process_active ? 
                                    (<Fragment><i className="fas fa-exclamation"></i> ACTIVO</Fragment>) : 
                                    (<Fragment><i className="fas fa-check-circle"></i> FINALIZADO</Fragment>)}</div>
                                <div className='div-table-col'>Cant. de candidatos: {elemento_id_jobposition.length}</div>
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
            });
            return (<ClientsSelectionProcessTable tableHead={tableHead} tableBody={tableBody} />)
        } else {
            return (<strong>No se ha encontrado resultados.</strong>)
        }
    }

    barraBusqueda(){
        var camposBusqueda = [{
                key: 'idFiltroNombreCliente',
                label: "Filtrar por nombre de cliente",
                onChange: this.filtrarNombreCliente.bind(this),
                valor: this.state.filtroNombreCliente
            } , {
                key: 'idFiltroNombrePuestoLaboral',
                label: "Filtrar por nombre de proceso (Puesto laboral)",
                onChange: this.filtrarPuestoLaboral.bind(this),
                valor: this.state.filtroPuestoLaboral
            } , {
                key: 'idFiltroStatusSelectionProcess',
                label: "Estado",
                onChange: this.filtrarStatusSelectionProcess.bind(this),
                valor: this.state.filtroStatusSelectionProcess
        }];
        return (<BarraBusqueda camposBusqueda={camposBusqueda} />)
    }

    filtrarNombreCliente(e){
        let filtro = e.target.value.toLowerCase();
        this.setState({
            filtroNombreCliente: filtro.toLowerCase(),
            //perfilesFiltro: this.props.obtenerPerfilesResponse.filter( c => c.nombre.toLowerCase().indexOf(filtroPerfilesNombre) > -1 )
        })
    }
    filtrarPuestoLaboral(e){
        let filtro = e.target.value.toLowerCase();
        this.setState({
            filtroPuestoLaboral: filtro.toLowerCase(),
        })
    }
    filtrarStatusSelectionProcess(e){
        let filtro = e.target.value.toLowerCase();
        this.setState({
            filtroStatusSelectionProcess: filtro.toLowerCase(),
        })
    }

    render () {
        return (
            <Fragment>
                {this.barraBusqueda()}
                {
                    this.tableSelectionProcess(this.props.datos, this.props.datosCandidatos)
                }
            </Fragment>
        )
    }
}

export default (ClientsSelectionProcessList);