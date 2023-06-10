import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { isTemplateLiteral } from "typescript";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
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

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      dataPhanTrang: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      let tmp = [];
      for (var k = 0; k < 5; k++) {
        tmp.push(this.props.listUsers[k]);
      }
      this.setState({
        usersRedux: this.props.listUsers,

        dataPhanTrang: tmp,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };
  handleClickNum = (j, e) => {
    let tmpTheoTrang = [];
    var n = j * 5;
    var t = j * 5 - 5;
    for (var k = t; k < n; k++) {
      if (this.state.usersRedux[k]) {
        tmpTheoTrang.push(this.state.usersRedux[k]);
      } else break;
    }
    this.setState({
      dataPhanTrang: tmpTheoTrang,
    });
    $(".p").removeClass("active");
    $("#" + j).addClass("active");
  };

  render() {
    let arrUsers = this.state.dataPhanTrang;
    let num = Math.ceil(this.state.usersRedux.length / 5);

    return (
      <React.Fragment>
        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
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
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
