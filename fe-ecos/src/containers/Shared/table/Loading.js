import React, { Component } from 'react'

export default class Loading extends Component {
  render () {
    return (
      this.props.loading
        ? <div className='text-center'>
            <div className="loading-table" />
          </div>
        : null
    )
  }
}