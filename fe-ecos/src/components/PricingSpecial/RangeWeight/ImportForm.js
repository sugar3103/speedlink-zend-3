import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Progress } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import FileInput from '../../../containers/Shared/form/FileInput';
import bsCustomFileInput from 'bs-custom-file-input';
import PropTypes from 'prop-types';
import { resetDataImportRangeWeightSpecial } from '../../../redux/actions';

class ImportForm extends Component {

    componentDidMount() {
        bsCustomFileInput.init()
    }

    handleReset = () => {
        this.props.reset();
        document.getElementById('inputImport').value = '';
        document.getElementById('inputImport').dispatchEvent(new Event('change'));
        this.props.resetDataImportRangeWeightSpecial();
    }

    render() {
        const { handleSubmit, progress, uploading, totalImport } = this.props;

        return (
            <form onSubmit={handleSubmit} className="form">
                <div className="form__form-group">
                    <div className="form__form-group-field">
                        <div className="input-group">
                            <div className="custom-file">
                                <Field
                                    name="import_file"
                                    component={FileInput}
                                    type="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    className="custom-file-input"
                                    id="inputImport"
                                />
                                <label className="custom-file-label" htmlFor="inputImport">Choose file</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form__form-group">
                    <Button color="primary" size="sm">Upload</Button>
                    <Button color="secondary" size="sm" onClick={this.handleReset}>Reset</Button>
                    {!uploading && totalImport > 0 &&
                        <Button color="success float-right" size="sm">Import Data</Button>
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
    resetDataImportRangeWeightSpecial: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial }) => {
    const { rangeWeight: { progress, uploading, totalImport } } = pricingSpecial;
    return {
        progress,
        uploading,
        totalImport
    }
}

export default connect(mapStateToProps, {
    resetDataImportRangeWeightSpecial
})(reduxForm({
    form: 'import_zone_special_form',
})(injectIntl(ImportForm)));
