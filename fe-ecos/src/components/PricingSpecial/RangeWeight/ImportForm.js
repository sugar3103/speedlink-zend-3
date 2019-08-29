import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Progress } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import FileInput from '../../../containers/Shared/form/FileInput';
import bsCustomFileInput from 'bs-custom-file-input';
import PropTypes from 'prop-types';
import { resetDataImportRangeWeightSpecial, saveDataImportRangeWeightSpecial } from '../../../redux/actions';
import validate from './validateImportForm';
import { apiUrl } from '../../../constants/defaultValues';

class ImportForm extends Component {

    componentDidMount() {
        bsCustomFileInput.init();
        this.handleReset();
    }

    handleReset = () => {
        this.props.initialize();
        document.getElementById('inputImport').value = '';
        document.getElementById('inputImport').dispatchEvent(new Event('change'));
        this.props.resetDataImportRangeWeightSpecial();
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    hanldeSaveData = (e) => {
        e.preventDefault();
        window.addEventListener("beforeunload", this.handleBeforeUnload);
        this.props.toggleModal();
        this.props.saveDataImportRangeWeightSpecial();
    }

    handleBeforeUnload(event) {
        event.returnValue = '';
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.savingDataImport === false && nextProps.savingDataImport !== this.props.savingDataImport) {
            this.handleReset();
        }
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
                    <Button color="primary" size="sm" type="submit">{messages['upload']}</Button>
                    <Button color="secondary" size="sm" onClick={this.handleReset}>{messages['reset']}</Button>
                    {!uploading && totalImport > 0 ?
                        <Button color="success float-right" size="sm" disabled={savingDataImport} onClick={this.hanldeSaveData}>{messages['pri_special.import-data']}</Button>
                    :
                        <a className="btn btn-success btn-sm float-right" download href={`${apiUrl}pricing/special/range-weight/download`}>{messages['pri_special.download-sample']}</a> 
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
    resetDataImportRangeWeightSpecial: PropTypes.func.isRequired,
    saveDataImportRangeWeightSpecial: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial }) => {
    const { rangeWeight: { progress, uploading, totalImport, savingDataImport } } = pricingSpecial;
    return {
        progress,
        uploading,
        totalImport,
        savingDataImport
    }
}

export default connect(mapStateToProps, {
    resetDataImportRangeWeightSpecial,
    saveDataImportRangeWeightSpecial
})(reduxForm({
    form: 'import_range_weight_special_form',
    validate
})(injectIntl(ImportForm)));
