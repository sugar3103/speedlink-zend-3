/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Search from './Search';

class List extends Component {

  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <Search />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default List
