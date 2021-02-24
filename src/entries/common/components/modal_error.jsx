import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'

function ModalError(props) {
    return ReactDOM.createPortal(
        <Fragment>
            <div className='soportetecnico_notificacion_overlay'></div>
            <div className='soportetecnico_notificacion_modal'>
                <div className='soportetecnico_notificacion_modal_container'>
                    
                    <div className="container-fluid form-border">
                        <div className='mt-3 soportetecnico_notificacion_modal_close_button_align'>
                            <button className='soportetecnico_notificacion_modal_close_button'
                                onClick={props.onClose}
                            >X</button>
                        </div>
                        <div className="mb-3">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>,
        document.getElementById('home-modal-error')
    );
}

export default ModalError