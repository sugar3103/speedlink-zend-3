import React, { PureComponent , Fragment } from 'react';
import PropTypes from 'prop-types';

class PageTitle extends PureComponent {

    componentWillReceiveProps() {
        document.title = this.props.title + ' - ' + document.title;
        document.querySelector('.topbar__title').innerHTML = this.props.title;
    }

    render() {        
        return(
            <Fragment></Fragment>
        )
    }
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired    
}

export default PageTitle;