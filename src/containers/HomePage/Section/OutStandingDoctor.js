import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { useHistory } from "react-router-dom";

class OutStandingDoctor extends Component {
  history = useHistory();
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  handleviewdetaildoctor = (doctor) => {
    console.log(doctor);
    history.push(`/users/:${doctor.id}`);
  };
  render() {
    let allDoctors = this.state.arrDoctors;
    let language = this.props.language;

    return (
      <div className="share">
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span>
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button>
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {allDoctors &&
                  allDoctors.length > 0 &&
                  allDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                    return (
                      <div
                        className="img-customize"
                        key={index}
                        onClick={() => this.handleviewdetaildoctor(item)}
                      >
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image"
                              style={{ backgroundImage: `url(${imageBase64})` }}
                            ></div>
                          </div>

                          <div className="position text-center">
                            <div>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div>Cơ Xương Khớp</div>
                          </div>
                        </div>
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
