import React, { PureComponent, Fragment } from 'react';
import { Table as TableReact } from 'reactstrap';
import PropTypes from 'prop-types';
import Pagination from '../pagination/Pagination';
import ItemPerPage from '../pagination/ItemPerPage';
import TableHead from './TableHead';

class RenderTable extends PureComponent {

    static propTypes = {
        columns: PropTypes.array,
        children: PropTypes.any.isRequired,
        header: PropTypes.any,
        pages: PropTypes.shape({
            pagination: PropTypes.object,
            total: PropTypes.number,
            onChangePage: PropTypes.func
        }),
        size: PropTypes.shape({
            selectedPageSize: PropTypes.number.isRequired,
            changePageSize: PropTypes.func.isRequired
        })
    };

    static defaultProps = {
        columns: [],
        data: [],
    };

    render() {
        const { header, columns, pages, size, children, loading } = this.props;

        return (
            <Fragment>
                <div className="mb-2">
                    {header}
                    <ItemPerPage selectedPageSize={size.selectedPageSize} changePageSize={size.changePageSize} />
                </div>
                <TableReact responsive bordered hover id="tableList">
                    <TableHead 
                        columns={columns} 
                    />
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={Object.keys(columns).length + 1} className="text-center"><div className="loading-table" /></td></tr>
                        ) : (
                                children
                            )}
                    </tbody>
                </TableReact>
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
    columns: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    children: PropTypes.any.isRequired,
    header: PropTypes.any,
    pages: PropTypes.shape({
        pagination: PropTypes.object,
        total: PropTypes.number,
        onChangePage: PropTypes.func
    }),
    size: PropTypes.shape({
        selectedPageSize: PropTypes.number.isRequired,
        changePageSize: PropTypes.func.isRequired
    })
}

export default Table;