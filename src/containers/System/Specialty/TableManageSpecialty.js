import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageSpecialty.scss";
import * as actions from "../../../store/actions";
import { deleteSpecialtyService } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import $ from "jquery";
import { Link } from "react-router-dom";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({ html, text }) {
//   console.log("handleEditorChange", html, text);
// }

class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtyRedux: [],
      dataPhanTrang: [],
    };
  }

  componentDidMount() {
    this.props.fetchSpecialtyRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      let tmp = [];
      for (var k = 0; k < 5; k++) {
        tmp.push(this.props.listSpecialty[k]);
      }
      this.setState({
        specialtyRedux: this.props.listSpecialty,
        dataPhanTrang: tmp,
      });
    }
  }

  //   handleDeleteUser = (user) => {
  //     this.props.deleteAUserRedux(user.id);
  //   };

  //   handleEditUser = (user) => {
  //     this.props.handleEditUserFromParentKey(user);
  //   };

  handleEditSpecialty = (specialty) => {
    this.props.handleEditSpecialtyFromParent(specialty);
  };
  handleDeleteSpecialty = async (specialty) => {
    let res = await deleteSpecialtyService(specialty.id);
    if (res && res.errCode === 0) {
      toast.success("xóa thành công!");
      this.props.fetchSpecialtyRedux();
    } else {
      toast.error("Xóa thất bại!");
    }
  };
  handleClickNum = (j, e) => {
    let tmpTheoTrang = [];
    var n = j * 5;
    var t = j * 5 - 5;
    for (var k = t; k < n; k++) {
      if (this.state.specialtyRedux[k]) {
        tmpTheoTrang.push(this.state.specialtyRedux[k]);
      } else break;
    }
    this.setState({
      dataPhanTrang: tmpTheoTrang,
    });
    $(".p").removeClass("active");
    $("#" + j).addClass("active");
  };
  render() {
    let arrSpecialty = this.state.dataPhanTrang;
    let num = Math.ceil(this.state.specialtyRedux.length / 5);
    return (
      <React.Fragment>
        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
        <table id="TableManageSpecialty">
          <tbody>
            <tr>
              <th className="col-8">Name</th>
              <th className="col-3">Ảnh</th>
              <th className="col-1">Thao tác</th>
            </tr>
            {arrSpecialty &&
              arrSpecialty.length > 0 &&
              arrSpecialty.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={item.image}
                        alt=""
                        style={{ width: "150px", height: "100px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditSpecialty(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteSpecialty(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="number">
          <div className="phantrang">
            {(() => {
              let a = [];
              for (let j = 0; j < num; j++) {
                switch (j) {
                  case 0:
                    a.push(
                      <Link
                        key={j}
                        onClick={() => this.handleClickNum(j + 1)}
                        id={j + 1}
                        className="p active"
                      >
                        {j + 1}
                      </Link>
                    );
                    break;
                  default:
                    a.push(
                      <Link
                        key={j}
                        onClick={() => this.handleClickNum(j + 1)}
                        id={j + 1}
                        className="p"
                      >
                        {j + 1}
                      </Link>
                    );
                    break;
                }
              }
              return a;
            })()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listSpecialty: state.admin.allSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
