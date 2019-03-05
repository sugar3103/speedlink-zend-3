/* eslint-disable consistent-return */
import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { injectIntl } from 'react-intl';

class EditableTable extends PureComponent {
  static propTypes = {
    heads: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      editable: PropTypes.bool,
      sortable: PropTypes.bool,
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onSaveTable: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    const originalRows = this.props.rows;
    const rows = originalRows.slice(0, 10);
    this.state = { rows, originalRows, enableButton: false };
  }

  onSaveTable = () => {
    this.props.onSaveTable(this.state.rows);
  }

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i += 1) {
      if (!isNaN(parseInt(Object.values(updated), 10))) {
        rows[i] = { ...rows[i], ...updated };
      }
    }

    this.setState({ rows, enableButton: true });
  };

  rowGetter = i => this.state.rows[i];

  render() {
    const { messages } = this.props.intl;
    return (
      <div className="table">
        <ReactDataGrid
          enableCellSelect
          columns={this.props.heads}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowHeight={44}
        />
        {this.state.enableButton && 
          <Button 
            size="sm" 
            color="primary" 
            className="btn-grid"
            onClick={this.onSaveTable}
          >{messages['save']}</Button>
        }
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default injectIntl(EditableTable);
