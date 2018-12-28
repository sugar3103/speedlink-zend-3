import React, { Component } from 'react';
import config from '../../config';
import { authHeader } from '../../_helpers/auth-header';

import {
    Button,
    Form,
    Input,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap'

import '../../assets/css/datatables.bundle.css';

const $ = require('jquery')
$.DataTable = require("datatables.net")

class Code extends Component {
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.on('preXhr.dt', function ( e, settings, data ) {
            data.Authorization = "Basic ";
        }).DataTable(
            {
                responsive: !0,
                dom: '<"top"<"row" <"col-sm-12 col-md-5" i><"col-sm-12 col-md-7 text-right" l>><"clear">>rt<"bottom" p>',
                lengthMenu: [5, 10, 25, 50],
                pageLength: 10,
                language: {
                    lengthMenu: "Display _MENU_"
                },
                fixedHeader: {
                    header: true
                },
                deferRender: true,
                searchDelay: 500,
                processing: !0,
                serverSide: !0,
                ajax: {                    
                    headers: {
                        "Authorization": "Bearer: ......"
                    },
                    url: config.apiUrl + '/address',
                    type: "POST",                    
                },
                columns: [
                    { data: "code" },
                    { data: "city" },
                    { data: "district" },
                    { data: "ward" },
                    { data: "action" }
                ],
                columnDefs: [{
                    targets: -1,
                    title: "Actions",
                    orderable: !1,
                    render: function (a, t, e, n) {
                        return 'Actions'

                    }
                }]
            }
        )
    }

    componentWillMount() {
        // this.$el.DataTable.destroy(true);
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Address Code</strong>
                                <small> Management</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12">
                                        <Form>
                                            <Row>
                                                <Col md="3">
                                                    <label>Code:</label>
                                                    <Input placeholder="Code" name="code" data-col-index="0" />
                                                </Col>
                                                <Col md="3">
                                                    <label>Zip Code:</label>
                                                    <Input placeholder="Zip Code" name="zip_code" data-col-index="1" />
                                                </Col>

                                                <Col md="3">
                                                    <label>Country:</label>
                                                    <Input placeholder="Country" name="country" data-col-index="2" />
                                                </Col>

                                                <Col md="3">
                                                    <label>City/Province:</label>
                                                    <Input placeholder="City/Province" name="city" data-col-index="3" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="3">
                                                    <label>District:</label>
                                                    <Input placeholder="District" name="district" data-col-index="4" />
                                                </Col>
                                                <Col md="3">
                                                    <label>Ward:</label>
                                                    <Input placeholder="Ward" name="ward" data-col-index="5" />
                                                </Col>

                                                <Col md="3">
                                                    <label>Branch:</label>
                                                    <Input placeholder="Branch" name="branch" data-col-index="6" />
                                                </Col>

                                                <Col md="3">
                                                    <label>Hub:</label>
                                                    <Input placeholder="Hub" name="hub" data-col-index="7" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <Button color="danger" id="m_search"> 
                                                        <span>
                                                            <i className="icon-search"></i>
                                                            <span>Search</span>
                                                        </span>
                                                    </Button>{' '}
                                                </Col>
                                            </Row>
                                        </Form>
                                        <hr />
                                        <table ref={el => this.el = el} className="table table-striped- table-bordered table-hover table-checkable">
                                            <thead>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>City</th>
                                                    <th>District</th>
                                                    <th>Ward</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Code;