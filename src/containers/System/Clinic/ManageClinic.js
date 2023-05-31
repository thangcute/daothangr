import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import {
  createNewClinic,
  editClinicService,
} from "../../../services/userService";
import TableManageClinic from "./TableManageClinic";
import * as actions from "../../../store/actions";
import "./TableManageClinic.scss";
import "./ManageClinic.scss";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      address: "",
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
    if (this.props.listClinic !== prevProps.listClinic) {
      this.setState({
        name: "",
        address: "",
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

  handleSaveNewClinic = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    let res = "";
    let mess = "";
    if (action === CRUD_ACTIONS.CREATE) {
      res = await createNewClinic({
        name: this.state.name,
        address: this.state.address,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      mess = "create thành công!";
    }
    if (action === CRUD_ACTIONS.EDIT) {
      res = await editClinicService({
        id: this.state.id,
        name: this.state.name,
        address: this.state.address,
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
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
      this.props.fetchClinicRedux();
    } else {
      toast.error(mess);
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    }
  };
  handleEditClinicFromParent = (clinic) => {
    var imageBase64 = "";
    if (clinic.image) {
      imageBase64 = new Buffer.from(clinic.image, "base64").toString("binary");
    }
    this.setState({
      id: clinic.id,
      name: clinic.name,
      address: clinic.address,
      imageBase64: imageBase64,
      descriptionHTML: clinic.descriptionHTML,
      descriptionMarkdown: clinic.descriptionMarkdown,
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
      <div className="manage-clinic-container">
        <div className="ms-title">Quản lý phòng khám</div>
        <div className="btn-add-new-clinic"></div>
        <div className="add-new-clinic row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnchange(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnchange(event, "address")}
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
              onClick={() => this.handleSaveNewClinic()}
            >
              Lưu
            </button>
          </div>
          <div className="col-12">
            <TableManageClinic
              handleEditClinicFromParent={this.handleEditClinicFromParent}
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
    listClinic: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAClinicRedux: (data) => dispatch(actions.UpdateClinic(data)),
    fetchClinicRedux: () => dispatch(actions.fetchAllClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
