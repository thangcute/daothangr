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
    };
  }

  componentDidMount() {
    this.props.fetchSpecialtyRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      this.setState({
        specialtyRedux: this.props.listSpecialty,
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
  render() {
    let arrSpecialty = this.state.specialtyRedux;
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
                        style={{ width: "150px", height: "150px" }}
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
