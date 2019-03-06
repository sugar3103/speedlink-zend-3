import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import ReactDataGrid from "react-data-grid";
import { uuidv4 } from '../../../util/uuidv4';

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
    this.props.change(`${this.props.index}_type`, this.state.type);
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

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    const { messages } = this.props.intl;
    const columns = [
      {
        key: 'index',
        headerRenderer: <Button size="sm" color="success" onClick={(e) => this.onAddRowPrice(e)}><span className="lnr lnr-plus-circle"></span></Button>,
        width: 50,
        formatter: ({ value }) => (
          <Button
            size="sm"
            color="danger"
            onClick={(e) => this.onRemoveRowPrice(e, value)}
          ><span className="lnr lnr-circle-minus"></span></Button>
        ),
      },
      {
        key: 'from',
        name: messages['pricing.from'],
        width: 65,
        editable: true,
      },
      {
        key: 'to',
        name: messages['pricing.to'],
        width: 65,
        editable: true,
      },
      {
        key: 'price',
        name: messages['pricing.price'],
        width: 65,
        editable: true,
      }
    ];

    const { rows, type, removed } = this.state;
    const { index } = this.props;

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
              <ReactDataGrid
                columns={columns}
                rowGetter={i => rows[i]}
                rowsCount={rows.length}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                headerRowHeight={50}
                enableCellAutoFocus={false}
              />
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

export default reduxForm({
  form: 'pricing_vas_action_form',
})(injectIntl(connect(mapStateToProps, null)(PricingVasItem)));
