import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Field, reduxForm } from "redux-form";
import { Button, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import renderSelectField from "../../../containers/Shared/form/Select";

class SearchForm extends Component {
  render() {
    const { handleSubmit, reset } = this.props;
    const { messages, locale } = this.props.intl;

    return (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={4} xl={4} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">
                {messages["pri_special.type"]}
              </span>
              <div className="form__form-group-field">
                <Field
                  name="type"
                  component={renderSelectField}
                  placeholder={messages["pri_special.type"]}
                  options={[
                    { value: "customer", label: messages["pri_dom.customer"] },
                    { value: "public", label: messages["pri_dom.public"] }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4} xl={4} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">
                {messages["pri_special.customer"]}
              </span>
              <div className="form__form-group-field">
                <Field
                  name="special_area_id"
                  component={renderSelectField}
                  placeholder={messages["pri_special.customer"]}
                  options={[
                    { value: "fhs-best-fr", label: "FHS Best Fr" },
                    { value: "sendo-close-fr", label: "Sendo Close Fr" }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4} xl={4} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">
                {messages["pri_special.zone-name"]}
              </span>
              <div className="form__form-group-field">
                <Field
                  name={locale === "en-US" ? "name_en" : "name"}
                  component={renderSelectField}
                  type="text"
                  placeholder={messages["pri_special.zone-name"]}
                  options={[
                    { value: "zone-1", label: "Zone 1" },
                    { value: "zone-2", label: "Zone 2" },
                    { value: "zone-3", label: "Zone 3" },
                    { value: "zone-4", label: "Zone 4" },
                    { value: "zone-5", label: "Zone 5" },
                    { value: "zone-6", label: "Zone 6" },
                    { value: "zone-7", label: "Zone 7" },
                    { value: "zone-8", label: "Zone 8" },
                  ]}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={4} xl={4} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">
                {messages["pri_special.category"]}
              </span>
              <div className="form__form-group-field">
                <Field
                  name="category"
                  component={renderSelectField}
                  placeholder={messages["pri_special.category"]}
                  options={[
                    { value: "import", label: "Import" },
                    { value: "export", label: "Export" }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4} xl={4} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">
                {messages["pri_special.carrier"]}
              </span>
              <div className="form__form-group-field">
                <Field
                  name="carrier"
                  component={renderSelectField}
                  placeholder={messages["pri_special.carrier"]}
                  options={[
                    { value: "spl", label: "SPL" },
                    { value: "dhl", label: "DHL" },
                    { value: "fedex", label: "Fedex" }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4} xl={4} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">
                {messages["pri_special.service"]}
              </span>
              <div className="form__form-group-field">
                <Field
                  name="to_ward"
                  component={renderSelectField}
                  placeholder={messages["pri_special.service"]}
                  options={[{ value: "ecommerce", label: "Ecommerce" }]}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-left">
            <Button size="sm" outline color="primary" id="search">
              {messages["search"]}
            </Button>{" "}
            <Button
              size="sm"
              outline
              onClick={e => {
                reset();
                setTimeout(() => {
                  handleSubmit();
                }, 200);
              }}
            >
              {messages["clear"]}
            </Button>
          </Col>
          <Col md={6} className="text-right">
            <Button
              size="sm"
              color="primary"
              onClick={e => {
                reset();
                setTimeout(() => {
                  handleSubmit();
                }, 200);
              }}
            >
              {/* {messages["create"]} */}
              Create
            </Button>{" "}
            <Button size="sm" color="danger" outline id="search">
              {messages["delete"]}
            </Button>
            <Button size="sm" outline id="search">
              {/* {messages["export"]} */}
              Export
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default reduxForm({
  form: "zone_domestic_search_form"
})(injectIntl(SearchForm));
