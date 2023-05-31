import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailClinicById({ id: id });
      if (res && res.clinics.errCode === 0) {
        if (res.clinics.data.image) {
          res.clinics.data.image = new Buffer.from(
            res.clinics.data.image,
            "base64"
          ).toString("binary");
        }
        let data = res.clinics.data;

        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;

          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailClinic: res.clinics.data,
          arrDoctorId: arrDoctorId,
        });
      }

      // imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-clinic-container">
        <HomeHeader />
        <div style={{ paddingTop: "90px" }} className="description-clinic">
          {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
            <>
              <div
                style={{
                  backgroundImage: `url(${dataDetailClinic.image})`,
                  height: "250px",
                  width: "100%",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div>{dataDetailClinic.name}</div>
              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic.descriptionHTML,
                }}
              ></div>
            </>
          )}
        </div>

        <div className="detail-clinic-body">
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        // dataTime={dataTime}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
