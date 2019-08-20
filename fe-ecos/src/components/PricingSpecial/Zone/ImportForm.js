import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Progress } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import FileInput from '../../../containers/Shared/form/FileInput';
import bsCustomFileInput from 'bs-custom-file-input';
import { resetDataImportZoneSpecial, saveDataImportZoneSpecial } from '../../../redux/actions';
import PropTypes from 'prop-types';
import validate from './validateImportForm';

class ImportForm extends Component {

    componentDidMount() {
        bsCustomFileInput.init()
    }

    handleReset = () => {
        this.props.reset();
        document.getElementById('inputImport').value = '';
        document.getElementById('inputImport').dispatchEvent(new Event('change'));
        this.props.resetDataImportZoneSpecial();
    }

    hanldeSaveData = (e) => {
        e.preventDefault();
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            return ev.returnValue = 'Are you sure you want to close?';
        });
        this.props.toggleModal();
        this.props.saveDataImportZoneSpecial();
    }

    render() {
        const { handleSubmit, progress, uploading, totalImport, intl: { messages }, savingDataImport } = this.props;

        return (
            <form onSubmit={handleSubmit} className="form">
                <div className="form__form-group">
                    <Field
                        name="import_file"
                        component={FileInput}
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className="custom-file-input"
                        id="inputImport"
                    />
                </div>
                <div className="form__form-group">
                    <Button color="primary" size="sm">{messages['upload']}</Button>
                    <Button color="secondary" size="sm" onClick={this.handleReset}>{messages['reset']}</Button>
                    {!uploading && totalImport > 0 &&
                        <Button color="success float-right" disabled={savingDataImport} onClick={this.hanldeSaveData} size="sm">{messages['pri_special.import-data']}</Button>
                    }
                </div>
                {uploading &&
                    <div className="form__form-group">
                        <div className="progress-wrap progress-wrap--middle">
                            <Progress animated value={progress} />
                        </div>
                    </div>
                }
            </form>
        )
    }
}

ImportForm.propTypes = {
    resetDataImportZoneSpecial: PropTypes.func.isRequired,
    saveDataImportZoneSpecial: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingSpecial }) => {
    const { zone: { progress, uploading, totalImport, savingDataImport } } = pricingSpecial;
    return {
        progress,
        uploading,
        totalImport,
        savingDataImport
    }
}

export default connect(mapStateToProps, {
    resetDataImportZoneSpecial,
    saveDataImportZoneSpecial
})(reduxForm({
    form: 'import_zone_special_form',
    validate
})(injectIntl(ImportForm)));
