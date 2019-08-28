import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Col, Card, CardBody, Modal, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import ImportForm from './ImportForm';
import PropTypes from 'prop-types';
import { uploadZoneSpecialRequest, getDataImportZoneSpecial } from '../../../redux/actions';
import Table from '../../../containers/Shared/table/Table';
import ReactLoading from "react-loading";
import AlertOutlineIcon from 'mdi-react/AlertOutlineIcon';

class Import extends Component {

    constructor() {
        super();
        this.state = {
            selectedPageSize: 1000,
            currentPage: 1,
            modal: false
        };
    }

    onChangePageSize = (size) => {
        size = parseInt(size, 10);
        let params = {
            offset: {
                start: 1,
                limit: size
            }
        }

        this.props.getDataImportZoneSpecial(params);

        this.setState({
            currentPage: 1,
            selectedPageSize: size
        });
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChangePage = (page) => {
        let params = {
            offset: {
                start: parseInt(page, 10),
                limit: parseInt(this.state.selectedPageSize, 10)
            }
        }

        this.props.getDataImportZoneSpecial(params);

        this.setState({
            currentPage: page
        });
    };

    handleSubmit = values => {
        if (values) {
            this.props.uploadZoneSpecialRequest(values);
        }
    }

    createMarkup = (messages) => {
        return { __html: messages };
    }

    renderTitleModal = () => {
        const { savingDataImport, error, intl: { messages } } = this.props;
        if (savingDataImport) {
            return <ReactLoading type="bars" className="loading" />;
        } else if (!savingDataImport && error) {
            return messages['pri_special.import-error'];
        } else {
            return messages['pri_special.import-success'];
        }
    }

    render() {
        const { dataImport, totalImport, loadingDataImport, savingDataImport, error } = this.props;
        const { messages } = this.props.intl;
        const columnTable = {
            checkbox: false,
            columns: [
                {
                    Header: messages['pri_special.id'],
                    accessor: "id",
                    sortable: false,
                    width: 50,
                },
                {
                    Header: messages['pri_special.name'],
                    accessor: "name",
                    sortable: false,
                    width: 120,
                },
                {
                    Header: messages['pri_special.name-en'],
                    accessor: "name_en",
                    sortable: false,
                    width: 120,
                },
                {
                    Header: messages['pri_special.origin-city'],
                    accessor: "from_city",
                    sortable: false,
                    width: 150,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.from_city}
                                {original.error && original.error.fromCity && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorFromCity${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorFromCity${original.id}`}>{messages['pri_special.city-does-not-exist']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.dest-city'],
                    accessor: "to_city",
                    sortable: false,
                    width: 150,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.to_city}
                                {original.error && original.error.toAddress && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorToAddress${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorToAddress${original.id}`}>{messages['pri_special.to-address-does-not-exist']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.dest-district'],
                    accessor: "to_district",
                    sortable: false,
                    width: 150,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.to_district}
                                {original.error && original.error.toAddress && 
                                    <div className="float-right">
                                        <AlertOutlineIcon />
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.dest-ward'],
                    accessor: "to_ward",
                    sortable: false,
                    width: 150,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.to_ward}
                                {original.error && original.error.toAddress && 
                                    <div className="float-right">
                                        <AlertOutlineIcon />
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.area'],
                    accessor: "area_name",
                    sortable: false,
                    width: 150,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.area_name}
                                {original.error && original.error.area && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorArea${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorArea${original.id}`}>{messages['pri_special.area-does-not-exist']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.customer'],
                    accessor: "account_no",
                    sortable: false,
                    width: 120,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.account_no}
                                {original.error && original.error.customer && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorCustomer${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorCustomer${original.id}`}>{messages['pri_special.customer-does-not-exist']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },

            ]
        };

        let color = '';
        if (savingDataImport) {
            color = 'primary';
        } else if (!savingDataImport && error) {
            color = 'danger';
        } else {
            color = 'success';
        }
        
        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody className="master-data-list pri-dom">
                        <div className="upload-card mb-3">
                            <ImportForm onSubmit={this.handleSubmit} toggleModal={this.toggleModal} />
                        </div>
                        <Table
                            renderHeader={() => (null)}
                            loading={loadingDataImport}
                            columnTable={columnTable}
                            pages={{
                                pagination: this.state,
                                total: totalImport,
                                onChangePage: this.onChangePage
                            }}
                            size={{
                                selectedPageSize: this.state.selectedPageSize,
                                changePageSize: this.onChangePageSize
                            }}
                            data={dataImport}
                            optionPage={[1000, 2000, 5000, 10000]}
                        />
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggleModal}
                            className={`modal-dialog--${color} modal-dialog--colored`}
                        >
                            <div className="modal__header">
                                <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
                                <h4 className="bold-text  modal__title">
                                    {this.renderTitleModal()}
                                </h4>
                            </div>
                            {savingDataImport &&
                                <div className="modal__body" dangerouslySetInnerHTML={this.createMarkup(messages['pri_special.waiting-import'])} />
                            }
                            <ButtonToolbar className="modal__footer mt-3">
                                <Button color="success" onClick={this.toggleModal}>{messages['ok']}</Button>
                            </ButtonToolbar>
                        </Modal>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}


Import.propTypes = {
    uploadZoneSpecialRequest: PropTypes.func.isRequired,
    getDataImportZoneSpecial: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial }) => {
    const { zone: { dataImport, totalImport, loadingDataImport, savingDataImport, error } } = pricingSpecial;
    return {
        dataImport, totalImport, loadingDataImport, savingDataImport, error
    }
}

export default injectIntl(connect(mapStateToProps, {
    uploadZoneSpecialRequest,
    getDataImportZoneSpecial
})(Import));