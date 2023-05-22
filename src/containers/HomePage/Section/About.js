import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

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

class About extends Component {
  render() {
    return (
      <div className="share">
        <div className="section-share section-about">
          <div className="section-about-header">
            Truyền thông nói gì về Newline
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/s7lY5w51a8c"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo
                trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn
                dang dở, để từ video tiếp theo, chúng ta sẽ bắt đầu làm về
                backend và react để tạo dữ liệu thật cho trang home design này.
              </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
