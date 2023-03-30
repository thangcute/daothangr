import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

class Specialty extends Component {
  render() {
    return (
      <div className="share">
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span>Chuyên Khoa Phổ Biến</span>
              <button>Xem Thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 1</div>
                </div>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 2</div>
                </div>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 3</div>
                </div>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 4</div>
                </div>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 5</div>
                </div>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 6</div>
                </div>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 7</div>
                </div>
                <div className="img-customize">
                  <div className="bg-image"></div>
                  <div className="text-img">Cơ xương khớp 8</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
