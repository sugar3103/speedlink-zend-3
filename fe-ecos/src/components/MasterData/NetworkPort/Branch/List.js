/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Table from '../../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../../containers/Shared/picker/ConfirmPicker';

import {
  getBranchList,
  toggleBranchModal,
  deleteBranchItem
} from "../../../../redux/actions";


const BranchFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

BranchFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
  }

  toggleModal = (branch) => {
    this.props.toggleBranchModal(branch);
  }

  onDelete = (ids) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker 
            onClose={onClose}
            onDelete={() => this.props.deleteBranchItem(ids, messages)}
            messages={messages}
          />
        )
      }
    })
  }

  onChangePageSize = (size) => {
    const { messages } = this.props.intl;
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    }

    if (this.props.branch.paramSearch) {
      Object.assign(params, { "query": this.props.branch.paramSearch})
    };
    this.props.getBranchList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.branch.paramSearch) {
      Object.assign(params, { "query": this.props.branch.paramSearch })
    };
    this.props.getBranchList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getBranchList(null, messages);
  }

  showBranchItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            branch={item}
          />
        )
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['no-result']}</td></tr>
      )
    }
    return result;
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.branch;
    return (
      <Fragment>
        <Button
          color="success"
          onClick={() => this.toggleModal(null)}
          className="master-data-btn"
          size="sm"
        >{messages['branch.add-new']}</Button>
        <Action modalOpen={modalOpen} />
        {selected.length > 0 &&
            <Button
            color="danger"
            onClick={() => this.onDelete(selected)}
            className="master-data-btn"
            size="sm"
          >{messages['branch.delete']}</Button>
        }
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.branch;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
            Header: '#',
            accessor: "#",
            Cell: ({ original }) => {
              return (
               original.id
              )
            },
            sortable: false,
        },
        {
          Header: messages['branch.code'],
          accessor: "branch.code",
          Cell: ({ original }) => {
            return (
             original.code
            )
          },
          sortable: false
        },
        {
          Header: messages['branch.name'],
          accessor: "branch.name",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.name_en : original.name
            )
          },
          sortable: false,
        },
        {
          Header: messages['description'],
          accessor: "description",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.description_en : original.description
            )
          },
          sortable: false,
        },
        {
            Header: messages['branch.city'],
            accessor: "branch.city",
            Cell: ({ original }) => {
              return (
               original.city
              )
            },
            sortable: false
        },
        {
            Header: messages['status'],
            accessor: "status",
            Cell: ({ original }) => {
              return (
                original.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>
              )
            },
            className: "text-center",
            sortable: false
        },
        {
          Header: messages['created-at'],
          accessor: "created_at",
          sortable: false,
        },
        {
            Header: messages['action'], 
            Cell: ({ original }) => {
              return (
                <Fragment>
                  <Button color="info" size="sm" onClick={() => this.toggleModal(original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                  <Button color="danger" size="sm" onClick={() => this.onDelete([original.id])}><span className="lnr lnr-trash" /></Button>
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
            <Search />
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
            />
          </CardBody>
        </Card>
      </Col>

      // <Col md={12} lg={12}>
      //   <Card>
      //     <CardBody className="master-data-list">
      //     <Search />
      //     <div className="mb-2">
      //         <Button 
      //           color="success" 
      //           onClick={this.toggleModal}
      //           className="master-data-btn"
      //           size="sm"
      //         >{messages['branch.add-new']}</Button>
      //         <Action modalOpen={modalOpen} />
      //         <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
      //       </div>
        
      //       <Table responsive bordered hover>
      //         <thead>
      //           <tr>
      //             <th>#</th>
      //             <th>{messages['branch.code']}</th>
      //             <th>{messages['name']}</th>
      //             <th>{messages['description']}</th>
      //             <th>{messages['branch.city']}</th>
      //             <th>{messages['status']}</th>
      //             <th>{messages['created-at']}</th>
      //             <th>{messages['action']}</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {loading ? (
      //             <tr><td colSpan={9} className="text-center"><div className="loading-table" /></td></tr>
      //           ) : (
      //               this.showBranchItem(items)
      //             )}
      //         </tbody>
      //       </Table>
      //       <Pagination pagination={this.state} total={total} onChangePage={this.onChangePage} />
      //     </CardBody>
      //   </Card>
      // </Col>
    );
  }
}

List.propTypes = {
  branch: PropTypes.object.isRequired,
  getBranchList: PropTypes.func.isRequired,
  toggleBranchModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ branch }) => {
  return {
    branch,
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getBranchList,
    toggleBranchModal,
    deleteBranchItem
  }
)(List));
