/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from "react";
import { Card, CardBody, Col, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "../../../containers/Shared/table/Table";
import Can from "../../../containers/Shared/Can";
import { SELECTED_PAGE_SIZE } from "../../../constants/defaultValues";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Action from "./Action";
import Search from "./Search";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

import {
  getZoneDomesticList,
  toggleZoneDomesticModal,
  deleteZoneDomesticItem
} from "../../../redux/actions";
import ConfirmPicker from "../../../containers/Shared/picker/ConfirmPicker";
import Moment from "react-moment";

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.props.getZoneDomesticList();
  }

  toggleModal = (e, type, status) => {
    e.stopPropagation();
    this.props.toggleZoneDomesticModal(type, status);
  };

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteZoneDomesticItem(ids)}
            messages={messages}
          />
        );
      }
    });
  };

  onChangePageSize = size => {
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    };

    if (this.props.zone.paramSearch) {
      Object.assign(params, { query: this.props.zone.paramSearch });
    }
    this.props.getZoneDomesticList(params);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

  onChangePage = page => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.zone.paramSearch) {
      Object.assign(params, { query: this.props.zone.paramSearch });
    }
    this.props.getZoneDomesticList(params);

    this.setState({
      currentPage: page
    });
  };

  renderHeader = selected => {
    axios
      .post("http://api-pricing-int.local/api/v1/pricing/domestic")
      .then(function(respone) {
        // console.log("the respone from API", respone.data.data);
      });
      // console.log("props from pricing domestic", this.props)
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.zone;
    return (
      <Fragment>
        <Can
          user={this.props.authUser.user}
          permission="zone_domestic"
          action="add"
        >
          <Button
            color="success"
            onClick={e => this.toggleModal(e, "add", null)}
            className="master-data-btn"
            size="sm"
          >
            {messages["pri_dom.add-new-zone"]}
          </Button>
        </Can>
        <Action modalOpen={modalOpen} />
        <Can
          user={this.props.authUser.user}
          permission="zone_domestic"
          action="delete"
        >
          {selected.length > 0 && (
            <Button
              color="danger"
              onClick={e => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >
              {messages["pri_dom.delete-zone"]}
            </Button>
          )}
        </Can>
      </Fragment>
    );
  };

  render() {
    const { items, loading, total } = this.props.zone;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages["name"],
          accessor: "name",
          width: 150,
          Cell: ({ original }) => {
            return locale === "en-US" ? original.name_en : original.name;
          },
          sortable: false
        },
        {
          Header: messages["created-at"],
          accessor: "created_at",
          className: "text-center",
          Cell: ({ original }) => {
            return (
              <Moment fromNow format="DD/MM/YYYY" locale={locale}>
                {new Date(original.created_at)}
              </Moment>
            );
          },
          sortable: false
        },
        {
          Header: messages["action"],
          accessor: "",
          width: 100,
          className: "text-center",
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Can
                  user={this.props.authUser.user}
                  permission="zone_domestic"
                  action="edit"
                  own={original.created_at}
                >
                  <Button
                    color="info"
                    size="sm"
                    onClick={e => this.toggleModal(e, "edit", original)}
                  >
                    <span className="lnr lnr-pencil" />
                  </Button>{" "}
                  &nbsp;
                </Can>
                <Can
                  user={this.props.authUser.user}
                  permission="zone_domestic"
                  action="delete"
                  own={original.created_at}
                >
                  <Button
                    color="danger"
                    size="sm"
                    onClick={e => this.onDelete(e, [original.id])}
                  >
                    <span className="lnr lnr-trash" />
                  </Button>
                </Can>
              </Fragment>
            );
          },
          sortable: false
        }
      ]
    };

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <Search pageSize={this.state.selectedPageSize} />
            <Table
              renderHeader={this.renderHeader}
              loading={loading}
              columnTable={columnTable}
              pages={{
                pagination: this.state,
                total: total,
                onChangePage: this.onChangePage
              }}
              size={{
                selectedPageSize: this.state.selectedPageSize,
                changePageSize: this.onChangePageSize
              }}
              data={items}
              onRowClick={this.toggleModal}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  zone: PropTypes.object.isRequired,
  getZoneDomesticList: PropTypes.func.isRequired,
  toggleZoneDomesticModal: PropTypes.func.isRequired,
  deleteZoneDomesticItem: PropTypes.func.isRequired
};

const mapStateToProps = ({ pricingDomestic, authUser }) => {
  const { zone } = pricingDomestic;
  return {
    zone,
    authUser
  };
};

export default withRouter(
  injectIntl(
    connect(
      mapStateToProps,
      {
        getZoneDomesticList,
        toggleZoneDomesticModal,
        deleteZoneDomesticItem
      }
    )(List)
  )
);
