import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import { uuidv4 } from '../../../util/uuidv4';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class PricingVasItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      type: 0,
      removed: false
    }
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      type: item.type
    });
  }
  

  onAddRowPrice = (e) => {
    e.preventDefault();
    let { rows } = this.state;
    rows.push({
      index: uuidv4(),
      from: 0,
      to: 0,
      price: 0
    })
    this.setState({ rows });
  }

  onRemoveRowPrice = (e, index) => {
    e.preventDefault();
    let { rows } = this.state;
    rows = rows.filter(row => row.index !== index);
    this.setState({ rows });
  }

  onRemoveItem = (e) => {
    e.preventDefault();
    this.setState({
      removed: true
    });
  }

  onChangeType = (value) => {
    this.setState({
      type: value,
      rows: [
        {
          index: uuidv4(),
          from: 0,
          to: 0,
          price: 0
        }
      ],
    });
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

  valueValidator = (value) => {
    const { messages } = this.props.intl;
    const nan = isNaN(value);
    if (!value || nan) {
      return messages['pricing.validate-value-numberic'];
    }
    return true;
}

  render() {
    const { messages } = this.props.intl;
    const { type, removed } = this.state;
    const { index } = this.props.item;

    const cellEdit = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
  };


    return removed ? null : (
      <div>
        <div className="group-input">
          <div>
            <Button size="sm" color="danger" onClick={(e) => this.onRemoveItem(e)}><span className="lnr lnr-circle-minus"></span></Button>
          </div>
          <div className="form__form-group type-select">
            <div className="form__form-group-field">
              <Field
                name={`${index}_type`}
                component={renderSelectField}
                options={[
                  { value: 0, label: messages['pricing.normal'] },
                  { value: 1, label: messages['pricing.range'] },
                ]}
                clearable={false}
                placeholder={messages['pricing.type']}
                onChange={this.onChangeType}
              />
            </div>
          </div>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <Field
                name={`${index}_name`}
                component={CustomField}
                type="text"
                placeholder={messages['name']}
              />
            </div>
          </div>
          <div className="equal-span">
            <span>=</span>
          </div>
          <div className="form__form-group input-value">
            <div className="form__form-group-field">
              <Field
                name={`${index}_formula`}
                component={CustomField}
                type="text"
                placeholder={messages['pricing.value']}
              />
            </div>
            <div className="price-vas" style={{display: type === 1 ? 'block' : 'none'}}>
              <BootstrapTable data={ this.state.rows } cellEdit={ cellEdit }>
                <TableHeaderColumn dataField="index" dataFormat={ this.actionFormatter } isKey><Button size="sm" color="success" onClick={(e) => this.onAddRowPrice(e)}><span className="lnr lnr-plus-circle"></span></Button></TableHeaderColumn>
                <TableHeaderColumn dataField="from">{messages['pricing.from']}</TableHeaderColumn>
                <TableHeaderColumn dataField="to">{messages['pricing.to']}</TableHeaderColumn>
                <TableHeaderColumn dataField="price" editable={ { validator: this.valueValidator } }>{messages['pricing.price']}</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
          {type === 0 &&
            <div className="form__form-group input-minimun-value">
              <div className="form__form-group-field">
                <Field
                  name={`${index}_min`}
                  component={CustomField}
                  type="text"
                  placeholder={messages['pricing.minimun-value']}
                />
              </div>
            </div>
          }
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {}
}

export default injectIntl(connect(mapStateToProps, null)(PricingVasItem));
