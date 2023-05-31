import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialtys } from "../../../services/userService";
import Slider from "react-slick";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialtys("ALL");
    if (res && res.specialties.errCode === 0) {
      this.setState({
        dataSpecialty: res.specialties.data,
      });
    }
  }
  handleviewdetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className="share">
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span>
                <FormattedMessage id="homepage.specialty-popular" />
              </span>
              <button>
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        className="img-customize"
                        key={index}
                        onClick={() => this.handleviewdetailSpecialty(item)}
                      >
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="text-name">{item.name}</div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
