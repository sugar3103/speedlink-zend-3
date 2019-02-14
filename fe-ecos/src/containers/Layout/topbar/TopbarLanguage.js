import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';
import PropTypes from 'prop-types';
import { changeLocale } from '../../../redux/actions';

const en = `${process.env.PUBLIC_URL}/img/language/en.png`;
const vi = `${process.env.PUBLIC_URL}/img/language/vi.png`;

const EnLng = () => (
  <span className="topbar__language-btn-title">
    <img src={en} alt="en" />
    <span>EN</span>
  </span>
);

const ViLng = () => (
  <span className="topbar__language-btn-title">
    <img src={vi} alt="vi" />
    <span>VI</span>
  </span>
);

class TopbarLanguage extends PureComponent {
  static propTypes = {
    locale: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
      mainButtonContent: <ViLng />,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    this.setState({
      mainButtonContent: locale === 'vi' ? <ViLng /> : <EnLng />
    });
  }
  

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  changeLanguage = (lng) => {
    this.props.changeLocale(lng);
    switch (lng) {
      case 'en':
        this.setState({ mainButtonContent: <EnLng /> });
        break;
      case 'vi':
        this.setState({ mainButtonContent: <ViLng /> });
        break;
      default:
        this.setState({ mainButtonContent: <ViLng /> });
        break;
    }
  };

  render() {
    return (
      <div className="topbar__collapse topbar__collapse--language">
        <button className="topbar__btn" onClick={this.toggle}>
          {this.state.mainButtonContent}
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
        <Collapse
          isOpen={this.state.collapse}
          className="topbar__collapse-content topbar__collapse-content--language"
        >
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('en')}
          >
            <EnLng />
          </button>
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('vi')}
          >
            <ViLng />
          </button>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const { locale } = settings;
  return {
    locale
  }
}

export default connect(mapStateToProps, {
  changeLocale
})(TopbarLanguage);
