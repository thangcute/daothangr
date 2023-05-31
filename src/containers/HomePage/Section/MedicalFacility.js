import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinics } from "../../../services/userService";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinics("ALL");
    if (res && res.clinics.errCode === 0) {
      this.setState({
        dataClinics: res.clinics.data ? res.clinics.data : [],
      });
    }
  }
  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span>
              <FormattedMessage id="homepage.clinic" />
            </span>
            <button>
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      ></div>
                      <div className="text-img">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
