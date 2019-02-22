import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../pagination/Pagination';
import ItemPerPage from '../pagination/ItemPerPage';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import CheckIcon from 'mdi-react/CheckIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import Loading from './Loading';
import NoData from './NoData';

class RenderTable extends PureComponent {

    constructor() {
        super()
        this.state = {
            selected: [],
            selectAll: 0
        }
    }

    renderHeader = (selected) => {
        return this.props.renderHeader(selected);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.data) {
            this.setState({
                selected: [],
                selectAll: 0
            });
        }
    }

    toggleRow = (id) => {
        const { selected } = this.state;
        
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        
        let selectAll = 0;
        if (newSelected.length > 0 && newSelected.length < this.props.data.length) {
            selectAll = 2;
        }
        if (newSelected.length === this.props.data.length) {
            selectAll = 1;
        }
        this.setState({ 
            selected: newSelected,
            selectAll: selectAll
        });
    }

    toggleSelectAll = (data) => {
        if (this.state.selectAll === 0) {
            this.setState({
                selected: data.map(n => n.id),
                selectAll: 1
            });
        } else {
            this.setState({
                selected: [],
                selectAll: 0
            });
        }
    }

    getNoDataProps = () => {
        if (this.props.data) {
            return {
                show: true,
                loading: this.props.loading
            }
        }
        return {show: false, loading: this.props.loading};
    }

    render() {
        const { columnTable, pages, size, data, loading, onRowClick } = this.props;
        let columns = columnTable.columns;
        if (columnTable.checkbox && data && data.length > 0) {
            columns.unshift({
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <label className="checkbox-btn" onClick={(e) => e.stopPropagation()}>
                            <input 
                                className="checkbox-btn__checkbox"
                                type="checkbox" 
                                checked={this.state.selected.indexOf(original.id) !== -1}
                                onChange={() => this.toggleRow(original.id)}
                            />
                            <span className="checkbox-btn__checkbox-custom">
                                <CheckIcon />
                            </span>
                        </label>
                    );
                },
                Header: x => {
                    return (
                        <label className="checkbox-btn">
                            <input 
                                className="checkbox-btn__checkbox" 
                                type="checkbox" 
                                checked={this.state.selectAll === 1}
                                ref={input => {
                                    if (input) {
                                        input.indeterminate = this.state.selectAll === 2;
                                    }
                                }}
                                onChange={() => this.toggleSelectAll(data)}
                            />
                            <span className="checkbox-btn__checkbox-custom">
                                {this.state.selectAll === 2 ? <MinusIcon /> : <CheckIcon />}
                            </span>
                        </label>
                    );
                },
                width: 50,
                className: 'text-center',
                sortable: false,
            })
        }
        return (
            <Fragment>
                <div className="mb-2">
                    {this.renderHeader(this.state.selected)}
                    <ItemPerPage selectedPageSize={size.selectedPageSize} changePageSize={size.changePageSize} />
                    <div className="clearfix"></div>
                </div>
                <ReactTable
                    data={!loading && data && data.length > 0 ? data : []}
                    columns={columns}
                    showPagination={false}
                    minRows={0}
                    className="-highlight -striped"
                    loading={loading}
                    LoadingComponent={Loading}
                    NoDataComponent={NoData}
                    getNoDataProps={this.getNoDataProps}
                    getTrProps={(state, rowInfo) => ({
                        onClick: (e) => onRowClick(e, 'view', rowInfo.original)
                    })}
                />
                <Pagination pagination={pages.pagination} total={pages.total} onChangePage={pages.onChangePage} />
            </Fragment>
        )
    }
}

const Table = props => (
    <RenderTable
        {...props}
        columns={props.columns}
        loading={props.loading}
        pages={props.pages}
        size={props.size}
        children={props.children}
        header={props.header}
    />
);

Table.propTypes = {
    columnTable: PropTypes.shape({
        columns: PropTypes.array.isRequired,
        checkbox: PropTypes.bool.isRequired,
    }).isRequired,
    renderHeader: PropTypes.func.isRequired,
    pages: PropTypes.shape({
        pagination: PropTypes.object,
        total: PropTypes.number,
        onChangePage: PropTypes.func
    }),
    size: PropTypes.shape({
        selectedPageSize: PropTypes.number.isRequired,
        changePageSize: PropTypes.func.isRequired
    }),
    data: PropTypes.array,
    loading: PropTypes.bool.isRequired
}

export default Table;