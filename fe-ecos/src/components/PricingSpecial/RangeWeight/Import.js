import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Col, Card, CardBody, Modal, ButtonToolbar, Button, Badge, UncontrolledTooltip } from 'reactstrap';
import ImportForm from './ImportForm';
import PropTypes from 'prop-types';
import { uploadRangeWeightSpecialRequest, getDataImportRangeWeightSpecial } from '../../../redux/actions';
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

        this.props.getDataImportRangeWeightSpecial(params);

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

        this.props.getDataImportRangeWeightSpecial(params);

        this.setState({
            currentPage: page
        });
    };

    handleSubmit = values => {
        if (Object.entries(values).length > 0) {
            this.props.uploadRangeWeightSpecialRequest(values);
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
        const { dataImport, totalImport, loadingDataImport, savingDataImport, error, totalImportSuccess, totalRecord } = this.props;
        
        const { messages, locale } = this.props.intl;
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
                    width: 100,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.name}
                                {original.error && original.error.name && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorName${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorName${original.id}`}>{messages['pri_special.name-not-empty']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.customer'],
                    accessor: "customer_name",
                    width: 120,
                    sortable: false,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.customer_name}
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
                {
                    Header: messages['pri_special.from'],
                    accessor: "from",
                    sortable: false,
                    width: 70,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.from}
                                {original.error && original.error.from && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorFrom${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorFrom${original.id}`}>{messages['pri_special.from-is-not-number']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.to'],
                    accessor: "to",
                    sortable: false,
                    width: 70,
                    Cell: ({ original }) => {
                        return (
                            <Fragment>
                                {original.to}
                                {original.error && original.error.to && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorTo${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorTo${original.id}`}>{messages['pri_special.to-is-not-number']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.carrier'],
                    sortable: false,
                    accessor: "carrier",
                    width: 150,
                    Cell: ({ original }) => {
                        let content = locale === 'en-US' ? original.carrier_en : original.carrier;
                        return (
                            <Fragment>
                                {content}
                                {original.error && original.error.carrier && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorCarrier${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorCarrier${original.id}`}>{messages['pri_special.carrier-does-not-exist']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.service'],
                    sortable: false,
                    accessor: "service",
                    width: 150,
                    Cell: ({ original }) => {
                        let content = locale === 'en-US' ? original.service_en : original.service;
                        return (
                            <Fragment>
                                {content}
                                {original.error && original.error.service && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorService${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorService${original.id}`}>{messages['pri_special.service-does-not-exist']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    },
                },
                {
                    Header: messages['pri_special.shipment-type'],
                    sortable: false,
                    accessor: "shipment_type",
                    width: 150,
                    Cell: ({ original }) => {
                        let content = locale === 'en-US' ? original.shipment_type_en : original.shipment_type;
                        return (
                            <Fragment>
                                {content}
                                {original.error && original.error.shipment_type && 
                                    <div className="float-right">
                                        <AlertOutlineIcon id={`errorShipmentType${original.id}`} />
                                        <UncontrolledTooltip placement="right" target={`errorShipmentType${original.id}`}>{messages['pri_special.shipment-type-does-not-exist']}</UncontrolledTooltip>
                                    </div>
                                }
                            </Fragment>
                        )
                    }
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
                    Header: messages['pri_special.calculate-unit'],
                    sortable: false,
                    accessor: "calculate_unit",
                    Cell: ({ original }) => {
                        return (
                            original.calculate_unit === 1 ? <Badge color="success">{messages['yes']}</Badge> : <Badge color="dark">{messages['no']}</Badge>
                        )
                    },
                    width: 120
                },
                {
                    Header: messages['pri_special.unit'],
                    accessor: "unit",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.round-up'],
                    accessor: "round_up",
                    sortable: false,
                },
                {
                    Header: messages['status'],
                    accessor: "status",
                    Cell: ({ original }) => {
                        return (
                            original.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>
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
                            {totalImportSuccess &&
                                <div className="modal__body">
                                    {`${messages['pri_special.imported-success']} ${totalImportSuccess} ${messages['pri_special.of-a-total']} ${totalRecord} ${messages['pri_special.record']}`}
                                </div>
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
    uploadRangeWeightSpecialRequest: PropTypes.func.isRequired,
    getDataImportRangeWeightSpecial: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingSpecial }) => {
    const { rangeWeight: { dataImport, totalImport, loadingDataImport, savingDataImport, error, totalImportSuccess, totalRecord } } = pricingSpecial;
    
    return {
        dataImport, totalImport, loadingDataImport, savingDataImport, error, totalImportSuccess, totalRecord
    }
}

export default injectIntl(connect(mapStateToProps, {
    uploadRangeWeightSpecialRequest,
    getDataImportRangeWeightSpecial
})(Import));