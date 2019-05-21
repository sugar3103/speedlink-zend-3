import React, { Component } from 'react';
import { CardBody, Button } from 'reactstrap';

class ConfirmPicker extends Component {
    render() {
        const { onClose, onDelete, messages } = this.props;
        return (
            <div className='custom-ui-confirm'>
                <CardBody>
                    <div className="card__title">
                        <span className="lnr lnr-cross-circle title-icon" />
                        <h5 className="bold-text">{messages["warning"]}</h5>
                    </div>
                    <p>{messages["delete-confirm"]}</p>
                    <div className="mt-3">
                        <Button outline size="sm" onClick={onClose}>{messages["cancel"]}</Button> &nbsp;
                        <Button 
                            color="danger" 
                            size="sm" 
                            onClick={() => { onDelete()
                                            onClose()
                                        }}
                        >{messages["delete"]}</Button>
                    </div>
                </CardBody>
            </div>
        );
    }
}

export default ConfirmPicker;