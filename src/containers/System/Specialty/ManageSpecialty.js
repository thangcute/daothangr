import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import {
  createNewSpecialty,
  editSpecialtyService,
} from "../../../services/userService";
import TableManageSpecialty from "./TableManageSpecialty";
import * as actions from "../../../store/actions";
import "./TableManageSpecialty.scss";
import "./ManageSpecialty.scss";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      action: "",
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listSpecialty !== prevProps.listSpecialty) {
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  handleOnchange = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    let res = "";
    let mess = "";
    if (action === CRUD_ACTIONS.CREATE) {
      res = await createNewSpecialty({
        name: this.state.name,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      mess = "create thành công!";
    }
    if (action === CRUD_ACTIONS.EDIT) {
      res = await editSpecialtyService({
        id: this.state.id,
        name: this.state.name,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      mess = "update thành công!";
    }

    if (res && res.errCode === 0) {
      toast.success(mess);
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
      this.props.fetchSpecialtyRedux();
    } else {
      toast.error(mess);
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    }
  };
  handleEditSpecialtyFromParent = (specialty) => {
    var imageBase64 = "";
    if (specialty.image) {
      imageBase64 = new Buffer.from(specialty.image, "base64").toString(
        "binary"
      );
    }
    this.setState({
      id: specialty.id,
      name: specialty.name,
      imageBase64: imageBase64,
      descriptionHTML: specialty.descriptionHTML,
      descriptionMarkdown: specialty.descriptionMarkdown,
      action: CRUD_ACTIONS.EDIT,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name", "descriptionHTML", "descriptionMarkdown"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>
        <div className="btn-add-new-specialty"></div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnchange(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className={
                this.state.action === CRUD_ACTIONS.EDIT
                  ? "btn btn-warning"
                  : "btn btn-primary"
              }
              onClick={() => this.handleSaveNewSpecialty()}
            >
              Lưu
            </button>
          </div>
          <div className="col-12">
            <TableManageSpecialty
              handleEditSpecialtyFromParent={this.handleEditSpecialtyFromParent}
              action={this.state.action}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listSpecialty: state.admin.allSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editASpecialtyRedux: (data) => dispatch(actions.UpdateSpecialty(data)),
    fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
