import React, { Component } from "react";
import { TouchableOpacity, Text, ToastAndroid } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
let RNFS = require("react-native-fs");
var db = openDatabase({ name: "UserDatabase.db" });

export default class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      completeUser: null,
    };
  }
  fetchData = () => {
    db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "SELECT * FROM 'user'",
        [],
        (tx, res) => {
          console.log("item:", res.rows.length);
          var len = res.rows.length;
          var data = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < len; i++) {
              //   console.log(res.rows.item(i));
              let row = res.rows.item(i);
              data.push(row);
            }
            this.setState({ users: data }, this.jsonData);
          }
        }
      );
    });
  };
  fetchDependents = (personId, callback) => {
    // var data = [];
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM 'dependents' WHERE person_id=?",
        [personId],
        (tx, res) => {
          console.log("dep item:", res.rows.length);
          var len = res.rows.length;
          var data = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < len; i++) {
              //   console.log(res.rows.item(i));
              let row = res.rows.item(i);
              data.push(row);
            }
            // console.log(personId, data);
            callback(data);
          }
        }
      );
      //   return data;
    });
    // return data;
  };

  jsonData = () => {
    var promiseB = this.state.users.map((item, index) => {
      // console.log(item);
      new Promise((resolve, reject) => {
        this.fetchDependents(item.person_id, (value) => {
          item["dependents"] = value;
          resolve(item);
        });
      });
      return item;
    });
    // console.log("this is the data", promiseB);
    this.setState({ completeUser: promiseB });
  };
  downloadJson = () => {
    // await this.jsonData();
    var data = JSON.stringify(this.state.completeUser);
    var path = "/storage/emulated/0/Download/db.JSON";
    RNFS.writeFile(path, data, "utf8")
      .then((res) => {
        console.log("file written");
        ToastAndroid.show("Downloaded", ToastAndroid.SHORT);
      })
      .catch((err) => {
        console.log("ERROR: file write failed!!!");
        ToastAndroid.show("failed", ToastAndroid.SHORT);
        console.log(err.message, err.code);
      });
  };

  async componentDidMount() {
    // let promise = new Promise(this.fetchData());
    // promise.then(this.jsonData());
    await this.fetchData();
  }

  render() {
    // console.log(this.state.completeUser);
    return (
      <>
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => this.downloadJson()}
        >
          <Text style={{ fontWeight: "bold", color: "#428bca" }}>
            Download json
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}
