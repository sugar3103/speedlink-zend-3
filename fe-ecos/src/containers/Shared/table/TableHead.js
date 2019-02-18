import React, { Component } from 'react';
import CheckIcon from 'mdi-react/CheckIcon';

class TableHead extends Component {
    render() {
        const { columns } = this.props;
        return (
            <thead>
                <tr>
                    <th>
                        <label className="checkbox-btn">
                            <input
                                className="checkbox-btn__checkbox"
                                type="checkbox"
                            />
                            <span className="checkbox-btn__checkbox-custom">
                                <CheckIcon />
                            </span>
                        </label>
                    </th>
                    {columns.map((column, key) => {
                        return (<th key={key}>{column.Header}</th>)
                    })}
                </tr>
            </thead>
        )
    }
}

export default TableHead;