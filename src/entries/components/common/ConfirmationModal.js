import React from 'react';
import { Fragment } from 'react';
import Modal from '../../common/components/modal'

const ConfirmationModal = (props, {onClose, classNameOverlay, classNameModal, classNameContainer}) => {
	return(
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
							<div className="mt-5 mb-2">
								{props.children}
							</div>
						</div>
					</div>
				</div>
            </div>
		</Fragment>
	);
}

export default ConfirmationModal;