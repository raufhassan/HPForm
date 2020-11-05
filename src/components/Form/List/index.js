import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { connect } from "react-redux";
import {
  Logout,
  fetchDependents,
  addNew,
} from "../../../../redux/actions/userActions";
import Style from "../styles";

var db = openDatabase({ name: "UserDatabase.db" });

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      record: [],
      id: "",
      dependents: [],
    };
  }
  fetchData = () => {
    db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "SELECT * FROM 'user' WHERE user_id = ?",
        [this.state.id],
        (tx, res) => {
          console.log("item:", res.rows.length);
          var len = res.rows.length;
          var data = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < len; i++) {
              //   console.log(res.rows.item(i));
              let row = res.rows.item(i);
              data.push(row);
              this.setState({ record: data });
              // dependent fetch
              /*  */
              // dependent fetch
            }
          }
        }
      );
    });
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      // Call ur function here.. or add logic.
      // if (this.props.user.id) {
      // console.log("focused id", this.props.user.id);
      // this.props.navigation.navigate("Tab1");
      console.log("focused");
      if (this.props.user.id) {
        this.setState({ id: this.props.user.id });
      }
      this.fetchData();

      // }
    });

    /*     db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "select last_insert_rowid() FROM 'dependents'",
        [],
        (tx, res) => {
          console.log("item:", res.rows.length);
          console.log(res.rows.item(0));
        }
      );
    }); */
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
  handleBackButtonClick = () => {
    if (this.state.userID !== "") {
      BackHandler.exitApp();
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  };
  getDependents = (person_id) => {
    db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "SELECT * FROM 'dependents' WHERE person_id = ?",
        [person_id],
        (tx, res) => {
          console.log("item:", res.rows.length);
          var len = res.rows.length;
          var data2 = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < len; i++) {
              //   console.log(res.rows.item(i));
              let row = res.rows.item(i);
              data2.push(row);
            }
            this.setState({ dependents: data2 });
            console.log("state dep", this.state.dependents);
          }
        }
      );
    });
  };
  async onPress() {
    await this.props.Logout();
    this.props.navigation.navigate("Home");
  }
  onAdd() {
    this.props.addNew();
    this.props.navigation.navigate("Tab1");
  }
  actionOnRow = (item, index) => {
    // var { record } = this.state;
    let user = {
      person_id: item.person_id,
      first_name: item.first_name,
      last_name: item.last_name,
      Religion: item.religion,
      zakat: JSON.parse(item.zakat),
      gender: item.gender,
      guardian: item.guardian,
      date: item.DOB,
      RelStatus: item.marital_status,
      cell: item.contact,
      HbState: item.husband_status,
      Hbprofession: item.husband_profession,
      Hbcompany: item.husband_company,
      Hbincome: item.husband_income,
      HbUnemp: item.husband_unemp_type,
      HbReason: item.husband_unemp_reason,
      Address: item.address,
      houseOwn: JSON.parse(item.house_ownership),
      monthlyRent: item.monthly_rent.toString(),
      Town: item.town,
      Area: item.area,
      profession: item.profession,
      empStatus: item.emp_status,
      MonthlyIncome: item.monthly_income.toString(),
      skills: item.skills,
      cnic: item.cnic_image,
    };
    let remarks = {
      familyIs: item.family_is,
      selectedFor: JSON.parse(item.family_registered),
      disease: item.disease,
      Remarks: item.remarks,
      imagesUri: JSON.parse(item.images),
    };
    let dependent = {
      EducationExp: item.education_exp,
      OverallIncome: item.overall_income,
      Rent: item.rent_exp,
      Utility: item.utility_exp,
    };
    // console.log("info", user);
    // console.log("item remarks", remarks);
    // console.log(item.person_id);
    // this.getDependents(item.person_id);
    this.props.fetchDependents(user, remarks, dependent);
    this.props.navigation.navigate("Tab1");
  };
  showAlert = (item) => {
    Alert.alert(
      "Delete entry",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => this.deleteRow(item) },
      ],
      { cancelable: false }
    );
  };
  deleteRow = (item) => {
    // console.log(item);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM user where person_id=?",
        [item.person_id],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("user deleted");
          } else {
            console.log("unsuccessfull");
          }
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM dependents where person_id=?",
        [item.person_id],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log("dep deleted");
          } else {
            console.log("unsuccessfull");
          }
        }
      );
    });
    this.fetchData();
  };
  render() {
    // console.log("state user", this.state.record);
    // console.log("state depe", this.state.dependents);
    // console.log(this.props.user.dependent);

    return (
      <View style={Style.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={Style.buttonStyle}
            onPress={this.onPress.bind(this)}
          >
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.buttonStyle}
            onPress={this.onAdd.bind(this)}
          >
            <Text style={{ color: "#fff" }}>Add new</Text>
          </TouchableOpacity>
        </View>

        <Text style={Style.myText}> List View</Text>
        <FlatList
          data={this.state.record}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }) => (
            <View style={Style.listItem}>
              <View style={{ flexDirection: "row", marginRight: "auto" }}>
                <Text style={{ color: "#fff", fontSize: 15 }}>
                  {item.first_name}
                </Text>
                <Text style={{ marginLeft: 3, color: "#fff", fontSize: 15 }}>
                  {item.last_name}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <TouchableOpacity
                  // style={Style.listItem}
                  onPress={() => this.actionOnRow(item, index)}
                >
                  <Text style={{ color: "#fff" }}> Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.showAlert(item)}>
                  <Text style={{ color: "#fff", marginLeft: 10 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {/* <FlatList
          data={this.state.record}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        /> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  Logout,
  fetchDependents,
  addNew,
})(List);
