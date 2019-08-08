import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleAreaSpecialModal, changeTypeAreaSpecialModal, getCustomerSpecialList, } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import Can from '../../../containers/Shared/Can';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_EDIT, MODAL_VIEW } from '../../../constants/defaultValues';
import Moment from 'react-moment';


class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalType: ''
    }
  }

  componentWillMount() {
    const params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      }
    };
    this.props.getCustomerSpecialList(params);
  }
  

  componentDidMount() {
    const data = this.props.modalData;

    if (data) {
      this.props.initialize(data);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
    }
  }

  toggleModal = () => {
    this.props.toggleAreaSpecialModal();
  }

  changeTypeModal = () => {
    this.props.changeTypeAreaSpecialModal(MODAL_VIEW);
  }

  showOptionCustomer = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
    return result;
  }

  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalType, modalData, customer } = this.props;
    let className = 'success';
    let title = messages['pri_special.add-new-area'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['pri_special.add-new-area'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['pri_special.update-area'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['status.view'];
        break;
      default:
        break;
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component={CustomField}
                type="text"
                placeholder={messages['name']}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_special.customer']}</span>
            <div className="form__form-group-field">
              <Field
                name="customer_id"
                component={renderSelectField}
                options={customer.items && this.showOptionCustomer(customer.items)}
                disabled={disabled}
                clearable={false}
              />
            </div>
          </div>
          <div className="footer">
            {modalData &&
              <Fragment>
                <hr />
                <Row>
                  <Col md={6}>
                    <span><i className="label-info-data">{messages['created-by']}:</i>{modalData.full_name_created ? modalData.full_name_created : modalData.created_by}</span>
                    <br />
                    <span><i className="label-info-data">{messages['created-at']}:</i>
                      <Moment fromNow locale={locale}>{new Date(modalData.created_at)}</Moment>
                    </span>
                  </Col>
                  {modalData.updated_at &&
                    <Col md={6}>
                      <span><i className="label-info-data">{messages['updated-by']}:</i>{modalData.full_name_updated ? modalData.full_name_updated : modalData.updated_by}</span>
                      <br />
                      <span><i className="label-info-data">{messages['updated-at']}:</i>
                        <Moment fromNow locale={locale}>{new Date(modalData.updated_at)}</Moment>
                      </span>
                    </Col>
                  }
                </Row>
              </Fragment>
            }
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          <Can user={this.props.authUser.user} permission="area_special" action="edit" own={modalData && modalData.created_by}>
            <Button color={className} type="submit">{modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
          </Can>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  modalType: PropTypes.string,
  authUser: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleAreaSpecialModal: PropTypes.func.isRequired,
  changeTypeAreaSpecialModal: PropTypes.func.isRequired,
  getCustomerSpecialList: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial, authUser }) => {
  const { area, customer } = pricingSpecial;
  const { modalData, modalType } = area;
  return {
    modalData,
    modalType,
    authUser,
    customer
  }
}

export default connect(mapStateToProps, {
  toggleAreaSpecialModal,
  changeTypeAreaSpecialModal,
  getCustomerSpecialList
})(reduxForm({
  form: 'area_special_action_form',
  validate
})(injectIntl(ActionForm)));