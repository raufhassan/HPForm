import React, { Component } from "react";
import Tab2 from "./index";
import { connect } from "react-redux";
import {
  DependentInfo,
  deleteDependents,
} from "../../../../redux/actions/userActions";
import isEmpty from "../../../validation/is-empty";
import { BackHandler } from "react-native";
class MainSecond extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {}
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
    var info, personalInfo;
    if (isEmpty(this.props.user.dependent)) {
      info = null;
    } else {
      info = this.props.user.dependent;
    }
    if (this.props.user.user) {
      personalInfo = this.props.user.user;
    }
    return (
      <>
        <Tab2
          navigation={this.props.navigation}
          DependentInfo={this.props.DependentInfo}
          info={info}
          deleteDependents={this.props.deleteDependents}
          personalInfo={personalInfo}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  DependentInfo,
  deleteDependents,
})(MainSecond);
