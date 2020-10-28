import React, { Component } from "react";
import Tab3 from "./index";
import {
  Remarks,
  insertUser,
  insertDependents,
  updateUser,
  updateDependents
} from "../../../../redux/actions/userActions";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";
import { BackHandler } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "UserDatabase.db" });
class MainThird extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personID: "",
      userId:''
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
/*     db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "select * FROM 'user'",
        [],
        (tx, res) => {
          var id = res.rows.length + 1;
          // this.setState({userID: id})
          // console.log("item:", id);
          this.setState({ personID: id });
        }
      );
    }); */
  }
    componentWillReceiveProps(nextProps) {
    if (nextProps.user.user !== this.props.user.user) {
      this.props.navigation.navigate("List");
    }
  }
 /*  static getDerivedStateFromProps = (props,state) => {
    if(props.user.id !== state.userId){
      console.log("navigate")
      this.props.navigation.navigate("List");
    }

  } */

  componentDidMount() {
    this.setState({userId:this.props.user.id})
  }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  render() {
    var personalInfo, dependentInfo, remarks, userID, personID;
    if (isEmpty(this.props.user.remarks)) {
      remarks = null;
    } else {
      remarks = this.props.user.remarks;
    }
    if (this.props.user.dependent) {
      dependentInfo = this.props.user.dependent;
    }
    if (this.props.user.user) {
      personalInfo = this.props.user.user;
    }
    if (this.props.user.id) {
      userID = this.props.user.id;
    }
    if (this.state.personID !== "") {
      personID = this.state.personID;
    }
    console.log(this.state.personID);

    return (
      <>
        <Tab3
          navigation={this.props.navigation}
          Remarks={this.props.Remarks}
          insertUser={this.props.insertUser}
          insertDependents={this.props.insertDependents}
          updateUser={this.props.updateUser}
          updateDependents={this.props.updateDependents}
          info={remarks}
          personalInfo={personalInfo}
          dependentInfo={dependentInfo}
          userID={userID}
          personID={personID}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  Remarks,
  insertUser,
  insertDependents,
  updateUser,
  updateDependents
})(MainThird);
