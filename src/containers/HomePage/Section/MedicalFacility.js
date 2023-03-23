import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span>Cơ sở y tế nổi bật</span>
            <button>Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">Bệnh viện ung bướu Hưng Việt</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
