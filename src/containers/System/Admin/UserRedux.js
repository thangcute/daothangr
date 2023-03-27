import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

import "./UserRedux.scss";
import { getAllCodeService } from "../../../services/userService";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      isQpen: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // this.getAllCodeGender();
    // this.getAllCodePosition();
    // this.getAllCodeRole();
  }
  // getAllCodeGender = async () => {
  //   try {
  //     let res = await getAllCodeService("gender");

  //     if (res && res.errCode === 0) {
  //       this.setState({
  //         genderArr: res.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // getAllCodePosition = async () => {
  //   try {
  //     let res = await getAllCodeService("position");

  //     if (res && res.errCode === 0) {
  //       this.setState({
  //         positionArr: res.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // getAllCodeRole = async () => {
  //   try {
  //     let res = await getAllCodeService("Role");
  //     if (res && res.errCode === 0) {
  //       this.setState({
  //         roleArr: res.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
  }

  handleOnchangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
      });
    }
  };

  openPreviewImage = () => {
    this.setState({
      isOpen: true,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGenders = this.props.isLoadingGender;

    return (
      <div className="user-redux-container">
        <div className="title">User Redux "đào văn thắng IT"</div>
        <div>{isLoadingGenders === true ? "loading genders" : ""}</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input className="form-control" type="password" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstname" />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastname" />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone" />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select className="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select className="form-control">
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}{" "}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.roleid" />
                </label>
                <select className="form-control">
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button className="btn btn-primary">
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.isQpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
