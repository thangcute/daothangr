import React, { Component } from "react";
import { connect } from "react-redux";
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

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span>
              <FormattedMessage id="homepage.handbook" />
            </span>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
              </div>
              <div className="img-customize">
                <div className="bg-image"></div>
                <div className="text-img">
                  <FormattedMessage id="homepage.handbook" />
                </div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
