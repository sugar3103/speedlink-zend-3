import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Field, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import FormulaField from './FormulaField';
import { uuidv4 } from '../../../util/uuidv4';
import { formatCurrency, normalizeCurrency } from '../../../util/format-field';

class PricingVasItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            disabledField: false
        }
    }

    componentDidMount() {
        let { spec, type_action } = this.props;
        if (spec.length > 0) {
            spec = spec.map(item => {
                return {
                    ...item,
                    index: uuidv4()
                }
            });
        }
        this.setState({
            rows: spec,
            disabledField: type_action === 'edit' ? false : true
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.spec) {
            let { spec } = nextProps;
            if (spec.length > 0) {
                spec = spec.map(item => {
                    return {
                        ...item,
                        index: uuidv4()
                    }
                });
            }

            this.setState({
                rows: spec
            });
        }

        if (this.props.type !== nextProps.type) {
            this.props.changeFormValue(nextProps.type);
        }
    }

    actionFormatter = (cell, row) => {
        return (
            <Button
                size="sm"
                color="danger"
                onClick={(e) => this.onRemoveRowPrice(e, cell)}
            ><span className="lnr lnr-circle-minus"></span></Button>
        )
    }

    onAddRowPrice = (e) => {
        e.preventDefault();
        let { rows } = this.state;
        rows.push({
            index: uuidv4(),
            id: 0,
            from: 0,
            to: 0,
            value: 0
        })
        this.setState({ rows });

        this.props.changeSpec(rows);
    }

    onRemoveRowPrice = (e, indexRow) => {
        e.preventDefault();
        let { rows } = this.state;

        const idx = rows.findIndex(x => x.index === indexRow);

        rows[idx].id !== 0 ? rows[idx].is_deleted = true : rows.splice(idx, 1);

        this.setState({ rows });

        this.props.changeSpec(rows);
    }

    onAfterSaveCell = () => {
        this.props.changeSpec(this.state.rows);
    }

    removeField = (index) => {
        if (this.props.fields.get(index).id) {
            this.props.removeFieldVas();
        } else {
            this.props.fields.remove(index);
        }
    }

    formatPrice = (value) => {
        return new Intl.NumberFormat().format(value);
    }

    valueValidator = (value) => {
        const { messages } = this.props.intl;
        const nan = isNaN(value);
        if (!value || nan) {
            return messages['pri_int.validate-value-numberic'];
        }
        return true;
    }

    render() {
        const { messages } = this.props.intl;
        const cellEdit = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell
        };
        const { vas, index, spec, type, type_action } = this.props;

        const { rows, disabledField } = this.state;
        const data = rows.filter(row => row.is_deleted !== true);

        return (
            <li key={index} className="vas-item">
                {type_action === 'edit' &&
                    <div className="mr-2">
                        <Button size="sm" color="danger" onClick={() => this.removeField(index)}><span className="lnr lnr-circle-minus"></span></Button>
                    </div>
                }
                <Field
                    name={`${vas}.pricing_data_id`}
                    component="input"
                    type="hidden"
                />
                <div className="form-row group-input">
                    <div className="form__form-group col-md-2">
                        <div className="form__form-group-field">
                            <Field
                                name={`${vas}.type`}
                                component={renderSelectField}
                                options={[
                                    { value: 0, label: messages['pri_int.normal'] },
                                    { value: 1, label: messages['pri_int.range'] },
                                ]}
                                clearable={false}
                                placeholder={messages['pri_int.type']}
                                disabled={disabledField}
                            />
                        </div>
                    </div>
                    <div className="form__form-group col-md-3">
                        <div className="form__form-group-field">
                            <Field
                                name={`${vas}.name`}
                                component={CustomField}
                                type="text"
                                placeholder={messages['name']}
                                disabled={disabledField}
                            />
                        </div>
                    </div>
                    <div className={`form__form-group col-md-${type === 1 ? 7 : 4}`}>
                        <div className="form__form-group-field">
                            <Field
                                name={`${vas}.formula`}
                                component={FormulaField}
                                placeholder={messages['pri_int.formula']}
                                disabled={disabledField}
                            />
                        </div>
                        {type === 1 &&
                            <BootstrapTable data={data} cellEdit={cellEdit} containerClass="table-price">
                                {type_action === 'edit' &&
                                    <TableHeaderColumn dataField="index" dataFormat={this.actionFormatter} isKey><Button size="sm" color="success" onClick={(e) => this.onAddRowPrice(e)}><span className="lnr lnr-plus-circle"></span></Button></TableHeaderColumn>
                                }
                                <TableHeaderColumn
                                    isKey={type_action === 'edit' ? false : true}
                                    dataField="from"
                                    editable={type_action === 'edit' ? { validator: this.valueValidator } : false}
                                >{messages['pri_int.from']}</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="to"
                                    editable={type_action === 'edit' ? { validator: this.valueValidator } : false}
                                >{messages['pri_int.to']}</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="value"
                                    dataFormat={this.formatPrice}
                                    editable={type_action === 'edit' ? { validator: this.valueValidator } : false}
                                >{messages['pri_int.price']}</TableHeaderColumn>
                            </BootstrapTable>
                        }
                        {type === 1 && spec.length === 0 &&
                            <span className="form__form-group-error">{messages['pri_dom.validate-vas-spec-required']}</span>
                        }
                    </div>
                    {type !== 1 &&
                        <div className="form__form-group col-md-3">
                            <div className="form__form-group-field">
                                <Field
                                    name={`${vas}.min`}
                                    component={CustomField}
                                    type="text"
                                    placeholder={messages['pri_int.minimun-value']}
                                    disabled={disabledField}
                                    format={formatCurrency}
                                    normalize={normalizeCurrency}
                                />
                            </div>
                        </div>
                    }
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state, props) => {
    const selector = formValueSelector('pricing_international_vas_action_form');
    const type = selector(state, `${props.vas}.type`);
    const spec = selector(state, `${props.vas}.spec`);

    return {
        type,
        spec
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    changeFormValue: value => {
        if (value === 1) {
            return dispatch(change("pricing_international_vas_action_form", `vas[${props.index}].min`, null))
        } else {
            return dispatch(change("pricing_international_vas_action_form", `vas[${props.index}].spec`, []))
        }
    },
    changeSpec: value => dispatch(change('pricing_international_vas_action_form', `vas[${props.index}].spec`, value)),
    removeFieldVas: () => dispatch(change("pricing_international_vas_action_form", `vas[${props.index}].is_deleted`, true))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PricingVasItem));
