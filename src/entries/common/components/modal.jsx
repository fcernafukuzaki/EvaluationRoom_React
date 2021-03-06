import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'

function Modal(props) {
    return ReactDOM.createPortal(
        <Fragment>
            <div className={props.classNameOverlay !== undefined ? props.classNameOverlay : 'candidato_apreciacion_overlay'}></div>
            <div className={props.classNameModal !== undefined ? props.classNameModal : 'candidato_apreciacion_modal'}>
                <div className={props.classNameContainer !== undefined ? props.classNameContainer : 'candidato_apreciacion_modal_container'}>
                    
                    <div className="container-fluid form-border">
                        <div className={'mt-3 candidato_apreciacion_modal_close_button_align'}>
                            <button className={'candidato_apreciacion_modal_close_button'}
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
        document.getElementById('home-modal')
    );
}

export default Modal