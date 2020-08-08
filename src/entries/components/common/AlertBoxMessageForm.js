import React from 'react';
import classnames from 'classnames';

const AlertBoxMessageForm = ({ alertMessageHeading, alertMessageBody, alertMessageFooter }) => {
	return (
		<div className={classnames("alert alert-success")} role="alert">
			<h4 className={classnames("alert-heading")} >{alertMessageHeading}</h4>
			{alertMessageBody}
			<hr className="mb-2 mt-2" />
			{alertMessageFooter}
		</div>
	);
}

export default AlertBoxMessageForm;