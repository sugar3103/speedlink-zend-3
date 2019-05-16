import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Action from './Action';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import PricingData from './PricingData';
import { getPricingData } from '../../../redux/actions';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class Detail extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: '1',
      data: []
    };
  }

  componentDidMount() {
    const { type } = this.props;
    if (type !== 'add') {
      const { id } = this.props.match.params;
      const params = {
        offset: {
          limit: 0
        },
        query: {
          pricing_id: id
        }
      }
      this.props.getPricingData(params);
    }
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  showTabItem = (data) => {
    let result = null;
    if (data.length > 0) {
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

  showTabContent = (data) => {
    let result = null;
    if (data.length > 0) {
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
    const { type, data } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="pricing">
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
                  {type !== 'add' && data && this.showTabItem(data)}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Action type={this.props.type} />
                  </TabPane>
                  {type !== 'add' && data && this.showTabContent(data)}
                </TabContent>
              </div>
            </div>

          </CardBody>
        </Card>
      </Col>
    );
  }
}

Detail.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array,
  getPricingData: PropTypes.func.isRequired,
}

const mapStateToProps = ({pricing}) => {
  const { data } = pricing;
  return {
    data
  }
}

export default withRouter(injectIntl(connect(mapStateToProps, {
  getPricingData
})(Detail)));