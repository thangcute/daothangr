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

class HomeFooter extends Component {
  render() {
    return (
      <div
        className="home-footer"
        style={{ height: "100px", background: "#64b9e5" }}
      >
        <p>
          &copy; 2023 Đào Văn Thắng. More information.
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100024568866731"
          >
            {" "}
            &#8594; Click here &#8592;
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
