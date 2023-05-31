import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./SearchClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import { findClinic } from "../../../services/userService";
import { withRouter } from "react-router";

class SearchClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  handleviewdetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  handleOnchange = async (event) => {
    if (event.target.value) {
      let data = await findClinic(event.target.value);
      if (data) {
        data.clinics.data.map((item) => {
          if (item.image) {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
          }
        });

        this.setState({
          dataClinic: data.clinics.data,
        });
      }
    } else {
      let data = await findClinic(this.props.match.params.name);
      if (data) {
        data.clinics.data.map((item) => {
          if (item.image) {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
          }
        });

        this.setState({
          dataClinic: data.clinics.data,
        });
      }
    }
  };
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.name
    ) {
      let data = await findClinic(this.props.match.params.name);
      if (data) {
        data.clinics.data.map((item) => {
          if (item.image) {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
          }
        });

        this.setState({
          dataClinic: data.clinics.data,
        });
      }
    }
  }

  render() {
    console.log(this.state);
    let { dataClinic } = this.state;
    return (
      <>
        <div className="detail-clinic-container">
          <HomeHeader />
          <div style={{ height: "80px" }}></div>
          <div
            className="header-img"
            style={{
              height: "250px",
              background: "orange",
              backgroundImage:
                "url(https://bookingcare.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fic_banner.b9608702.png&w=1920&q=75)",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="left">
              <img
                src="https://bookingcare.vn/_next/image?url=https%3A%2F%2Fcdn.bookingcare.vn%2Ffo%2F2022%2F12%2F05%2F112832-xn-tong-quat.png&w=256&q=75"
                alt=""
              />
            </div>
            <div className="right">
              <h2>Tổng quát</h2>
              <p>Xét nhiệm tổng quát</p>
              <br />
              <p>
                xét nhiệm tổng quát thường được chỉ định trong khám bệnh vì nó
                giúp phát hiện nhiều bệnh lý (đặc biệt ở giai đoạn lâm sàng).
                Việc chủ động xét nhiệm tổng quát giúp bạn kiểm soát tình trạng
                sức khỏe, phòng ngừa và điều trị các bệnh lý từ sớm.
              </p>
            </div>
          </div>
          <div className="search-clinic-container">
            <div className="search-clinic-body">
              <div className="header">
                <div className="search">
                  <input
                    type="text"
                    placeholder="search"
                    className="form-control"
                    onChange={(event) => this.handleOnchange(event)}
                  />
                  <button className="btn-search">Tìm kiếm</button>
                </div>
              </div>
            </div>
            <div className="data">
              <div className="row">
                {dataClinic && dataClinic.length > 0 ? (
                  dataClinic.map((item, index) => {
                    return (
                      <div className="col-4" key={index}>
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div
                          className="text-name"
                          onClick={() => this.handleviewdetailClinic(item)}
                        >
                          {item.name}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12" style={{ textAlign: "center" }}>
                    No data
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchClinic)
);
