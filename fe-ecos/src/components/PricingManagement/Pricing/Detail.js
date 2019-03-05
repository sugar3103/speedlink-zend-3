import React, { Component } from 'react';
import Action from './Action';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import PricingData from './PricingData';

const data = [
  {
      "id": 1,
      "pricing_id": 2,
      "service_id": 1,
      "service_code": "S002",
      "service_name": "Service 002",
      "service_name_en": "Service 002",
      "shipment_type_id": 2,
      "shipment_type_code": "ST002",
      "shipment_type_name": "Shipment Type 002",
      "shipment_type_name_en": "Shipment Type 002",
      "status": true,
      "pricing_data": {
          "title": {
              "Weight": "Weight",
              "Zone A": "Zone A",
              "Zone B": "Zone B",
              "Zone C": "Zone C",
              "Zone D": "Zone D",
              "Zone E": "Zone E",
              "Zone F": "Zone F",
              "Zone G": "Zone G"
          },
          "data": {
              "id_1": {
                  "Weight": "0 - 5",
                  "Zone A": 50,
                  "Zone B": 51,
                  "Zone C": 52,
                  "Zone D": 53,
                  "Zone E": 54,
                  "Zone F": 55,
                  "Zone G": 56,
              },
              "id_2": {
                "Weight": "5 - 10",
                "Zone A": 100,
                "Zone B": 101,
                "Zone C": 102,
                "Zone D": 103,
                "Zone E": 104,
                "Zone F": 105,
                "Zone G": 106,
              },
              "id_3": {
                "Weight": "10 - 15",
                "Zone A": 150,
                "Zone B": 151,
                "Zone C": 152,
                "Zone D": 153,
                "Zone E": 154,
                "Zone F": 155,
                "Zone G": 156,
              },
          }
      },
      "created_at": "27/02/2019 11:29:02",
      "created_by": "layton.luan",
      "updated_at": "27/02/2019 11:29:02",
      "updated_by": "layton.luan"
  }
];

class Detail extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: '1',
      data: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: data
      });
    }, 1000);
  }
  

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  showTabItem = () => {
    let result = null;
    if (this.state.data.length > 0) {
      result = data.map((item, index) => {
        return (
          <NavItem key={index}>
            <NavLink
              className={classnames({ active: this.state.activeTab === index + 2 })}
              onClick={() => {
                this.toggle(index + 2);
              }}
            >
              {item.service_name}
            </NavLink>
          </NavItem>
        )
      })
    }
    return result;
  }

  showTabContent = () => {
    let result = null;
    if (this.state.data.length > 0) {
      result = data.map((item, index) => {
        return (
          <TabPane tabId={index + 2} key={index}>
            <PricingData pricing={item} />
          </TabPane>
        )
      })
    }
    return result;
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <div className="tabs tabs--vertical tabs--vertical-colored">
              <div className="tabs__wrap">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      {messages['pricing.master-data']}
                    </NavLink>
                  </NavItem>
                  {this.showTabItem()}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Action type={this.props.type} />
                  </TabPane>
                  {this.showTabContent()}
                </TabContent>
              </div>
            </div>

          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default injectIntl(Detail);