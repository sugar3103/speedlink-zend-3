import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Col, Card, CardBody } from 'reactstrap';
import ImportForm from './ImportForm';
import PropTypes from 'prop-types';
import { uploadZoneSpecialRequest } from '../../../redux/actions';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import Table from '../../../containers/Shared/table/Table';

class Import extends Component {

    constructor() {
        super();
        this.state = {
            selectedPageSize: SELECTED_PAGE_SIZE,
            currentPage: 1,
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

        this.props.getZoneSpecialList(params);

        this.setState({
            currentPage: 1,
            selectedPageSize: size
        });
    }

    onChangePage = (page) => {
        let params = {
            offset: {
                start: parseInt(page, 10),
                limit: parseInt(this.state.selectedPageSize, 10)
            }
        }

        this.props.getZoneSpecialList(params);

        this.setState({
            currentPage: page
        });
    };

    handleSubmit = values => {
        if (values) {
            this.props.uploadZoneSpecialRequest(values);
        }
    }

    render() {
        const { dataImport, totalImport } = this.props;
        const { messages } = this.props.intl;
        const columnTable = {
            checkbox: false,
            columns: [
                {
                    Header: messages['pri_special.name'],
                    accessor: "name",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.name-en'],
                    accessor: "name_en",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.origin-city'],
                    accessor: "from_city",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.dest-city'],
                    accessor: "to_city",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.dest-district'],
                    accessor: "to_district",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.dest-ward'],
                    accessor: "to_ward",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.area'],
                    accessor: "area_name",
                    sortable: false,
                },
                {
                    Header: messages['pri_special.customer'],
                    accessor: "account_no",
                    sortable: false,
                },

            ]
        };
        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody className="master-data-list">
                        <div className="upload-card mb-3">
                            <ImportForm onSubmit={this.handleSubmit} />
                        </div>
                        <Table
                            renderHeader={() => (null)}
                            loading={false}
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
                            onRowClick={(e) => e.preventDefault()}
                        />
                    </CardBody>
                </Card>
            </Col>
        );
    }
}


Import.propTypes = {
    uploadZoneSpecialRequest: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial }) => {
    const { zone: { dataImport, totalImport } } = pricingSpecial;
    return {
        dataImport, totalImport
    }
}

export default injectIntl(connect(mapStateToProps, {
    uploadZoneSpecialRequest
})(Import));