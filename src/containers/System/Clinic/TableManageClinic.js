import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageClinic.scss";
import * as actions from "../../../store/actions";
import { deleteClinicService } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({ html, text }) {
//   console.log("handleEditorChange", html, text);
// }

class TableManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicRedux: [],
      dataPhanTrang: [],
    };
  }

  componentDidMount() {
    this.props.fetchClinicRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinic !== this.props.listClinic) {
      let tmp = [];
      for (var k = 0; k < 5; k++) {
        tmp.push(this.props.listClinic[k]);
      }
      this.setState({
        clinicRedux: this.props.listClinic,
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

  handleEditClinic = (clinic) => {
    this.props.handleEditClinicFromParent(clinic);
  };
  handleDeleteClinic = async (clinic) => {
    let res = await deleteClinicService(clinic.id);
    if (res && res.errCode === 0) {
      toast.success("xóa thành công!");
      this.props.fetchClinicRedux();
    } else {
      toast.error("Xóa thất bại!");
    }
  };
  handleClickNum = (j, e) => {
    let tmpTheoTrang = [];
    var n = j * 5;
    var t = j * 5 - 5;
    for (var k = t; k < n; k++) {
      if (this.state.clinicRedux[k]) {
        tmpTheoTrang.push(this.state.clinicRedux[k]);
      } else break;
    }
    this.setState({
      dataPhanTrang: tmpTheoTrang,
    });
  };
  render() {
    let arrClinic = this.state.dataPhanTrang;
    let num = Math.ceil(this.state.clinicRedux.length / 5);
    return (
      <React.Fragment>
        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
        <table id="TableManageClinic">
          <tbody>
            <tr>
              <th className="col-8">Name</th>
              <th className="col-3">Ảnh</th>
              <th className="col-1">Thao tác</th>
            </tr>
            {arrClinic &&
              arrClinic.length > 0 &&
              arrClinic.map((item, index) => {
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
                        onClick={() => this.handleEditClinic(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteClinic(item)}
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
                a.push(
                  <a key={j} onClick={() => this.handleClickNum(j + 1, this)}>
                    {j + 1}
                  </a>
                );
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
    listClinic: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchAllClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
