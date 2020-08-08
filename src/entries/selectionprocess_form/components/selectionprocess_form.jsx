import React, {Fragment} from 'react'
import classnames from 'classnames'
import Formulario from '../../components/common/Formulario'
import { Prompt } from 'react-router';
import CandidatesTableSelect from '../components/candidates_table_select'

function formSelectionProcess(selectionProcess, nombreForm, errors, isLoading, prompt) {
    console.log(selectionProcess)
    var form = {
        titulo: (selectionProcess.client.idcliente == '' || selectionProcess.client.idcliente == 0 ? 'Registrar cliente' : ('Datos de cliente ').concat(nombreForm)),
        campos: [
            [{
                key: 'idCliente',
                name: 'idCliente',
                id: 'idCliente',
                type: 'hidden',
                value: selectionProcess.client.idcliente,
                error: errors.idCliente,
                onChange: onChange.bind(this),
                required: 'false'
            }] , [{
                key: 'nombre',
                name: 'nombre',
                id: 'nombre',
                label: 'Nombre empresa : ',
                type: 'text-linea',
                value: selectionProcess.client.nombre,
                error: errors.nombre,
                onChange: onChange.bind(this),
                labelClass: 'col-md-4',
                fieldClass: 'col-md-5',
                required: 'true'
            }] , [{
                key: 'idPuestoLaboral',
                name: 'idPuestoLaboral',
                id: 'idPuestoLaboral',
                type: 'hidden',
                value: selectionProcess.jobposition.idpuestolaboral,
                error: errors.idPuestoLaboral,
                onChange: onChange.bind(this),
                required: 'false'
            }] , [{
                key: 'nombre',
                name: 'nombre',
                id: 'nombre',
                label: 'Nombre puesto laboral : ',
                type: 'text-linea',
                value: selectionProcess.jobposition.nombre,
                error: errors.nombre,
                onChange: onChange.bind(this),
                labelClass: 'col-md-4',
                fieldClass: 'col-md-5',
                required: 'true'
            }]
        ],
        botones: [
            {
                key: 'guardar',
                label: 'Guardar',
                divClass: 'col-md-1',
                botonClass: 'btn-primary btn-md',
                tipo: 'button-submit',
                isLoading: isLoading
            } , {
                key: 'cancelar',
                label: 'Cancelar',
                divClass: 'col-md-1',
                botonClass: 'btn-primary btn-md',
                tipo: 'button',
                onClick: onClickCancelar.bind(this, prompt),
                isLoading: isLoading
            }],
            onSubmit: onSubmit.bind(this)
        }
    
    return (<Fragment>
            <Prompt
                when={prompt}
                message="¿Estás seguro de NO querer registrar el cliente?"
            />
            <Formulario form={form} />
            <CandidatesTableSelect />
        </Fragment>)
}

function isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) { this.setState({	errors : errors	}) }
    return isValid;
}

function onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
        this.setState({
            errors: {}, 
            isLoading: true,
            cliente:{
                idCliente: this.state.idCliente,
                nombre: this.state.nombre
            }
        }, () => {
            if(this.state.idCliente === ''){
                this.props.guardarCliente(this.state.cliente);
            } else {
                this.props.guardarCliente(this.state.cliente);
            }
        });
    }
}

function onChange(e) {
    this.setState({ [e.target.name]: e.target.value, prompt: !!(e.target.value.length) });
}

function onClickCancelar(prompt, e) {
    console.log('onClickCancelar', e)
    console.log('onClickCancelar', prompt)
    if(!prompt){
        limpiar();
    } else {
        if(window.confirm("¿Estás seguro de NO querer registrar el cliente?")){
            limpiar();
        }
    }
}

function limpiar(){
    this.setState({
        idCliente: '',
        nombre: '',
        nombreForm: '',
        cliente: {},
        prompt: false
    })
}

const SelectionProcessForm = ({ datos, nameForm, errors, isLoading, prompt }) => {
    return(
        <Fragment>
            {formSelectionProcess(datos, nameForm, errors, isLoading, prompt)}
        </Fragment>
    );
}

export default SelectionProcessForm;