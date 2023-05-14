import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { getScheduleDoctorByDate } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alldays: [],
      allAvailableTime: [],
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let alldays = this.getArrDays(language);
    this.setState({
      alldays: alldays,
    });
  }

  //chuyển first letter thành in hoa
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let alldays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ValueVi2 = moment(new Date()).format("DD/MM");
          let Today = `Hôm nay - ${ValueVi2}`;
          object.label = Today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ValueVi2 = moment(new Date()).format("DD/MM");
          let Today = `Today - ${ValueVi2}`;
          object.label = Today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      alldays.push(object);
    }
    return alldays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let alldays = this.getArrDays(this.props.language);
      this.setState({
        alldays: alldays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let alldays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        alldays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      console.log("check schedule: ", res);
    }
  };
  render() {
    let { alldays, allAvailableTime } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnchangeSelect(event)}>
            {alldays &&
              alldays.length > 0 &&
              alldays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-avilable-time">
          <div className="text-calendar">
            <i className="fas fa-calendar-alt">
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </i>
          </div>
          <div className="time-content">
            {allAvailableTime && allAvailableTime.length > 0 ? (
              <>
                <div className="time-content-button">
                  {allAvailableTime.map((item, index) => {
                    let timeDisplay =
                      language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        key={index}
                        className={
                          language === LANGUAGES.VI ? "btn-vie" : "btn-en"
                        }
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>

                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                    <i className="fas fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
