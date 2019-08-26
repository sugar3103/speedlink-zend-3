import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Col, Card, CardBody, Modal, ButtonToolbar, Button, Badge } from 'reactstrap';
import ImportForm from './ImportForm';
import PropTypes from 'prop-types';
import { uploadRangeWeightSpecialRequest, getDataImportRangeWeightSpecial } from '../../../redux/actions';
import Table from '../../../containers/Shared/table/Table';
import ReactLoading from "react-loading";

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
        if (values) {
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
        const { dataImport, totalImport, loadingDataImport, savingDataImport, error } = this.props;
        const { messages, locale } = this.props.intl;
        const columnTable = {
            checkbox: false,
            columns: [
                {
                    Header: messages['pri_special.name'],
                    accessor: "name",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.customer'],
                    accessor: "account_no",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.from'],
                    accessor: "from",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.to'],
                    accessor: "to",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.carrier'],
                    sortable: false,
                    Cell: ({ original }) => {
                        return (
                            locale === 'en-US' ? original.carrier_en : original.carrier
                        )
                    },
                },
                {
                    Header: messages['pri_special.service'],
                    sortable: false,
                    Cell: ({ original }) => {
                        return (
                            locale === 'en-US' ? original.service_en : original.service
                        )
                    },
                },
                {
                    Header: messages['pri_special.shipment-type'],
                    sortable: false,
                    Cell: ({ original }) => {
                        return (
                            locale === 'en-US' ? original.shipment_type_en : original.shipment_type
                        )
                    },
                },
                {
                    Header: messages['pri_special.area'],
                    accessor: "special_area_name",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.calculate-unit'],
                    sortable: false,
                    Cell: ({ original }) => {
                        return (
                            original.calculate_unit === 1 ? <Badge color="success">{messages['yes']}</Badge> : <Badge color="dark">{messages['no']}</Badge>
                        )
                    },
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
                    <CardBody className="master-data-list">
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
                            onRowClick={(e) => e.preventDefault()}
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
    uploadRangeWeightSpecialRequest: PropTypes.func.isRequired,
    getDataImportRangeWeightSpecial: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingSpecial }) => {
    const { rangeWeight: { dataImport, totalImport, loadingDataImport, savingDataImport, error } } = pricingSpecial;
    return {
        dataImport, totalImport, loadingDataImport, savingDataImport, error
    }
}

export default injectIntl(connect(mapStateToProps, {
    uploadRangeWeightSpecialRequest,
    getDataImportRangeWeightSpecial
})(Import));