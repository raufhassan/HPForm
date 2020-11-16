import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Button, TextInput} from 'react-native';
import Style from './style';
import DateTimePicker from '@react-native-community/datetimepicker';
import Download from './Download';
let RNFS = require('react-native-fs');

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      idErr: '',
    };

    // this.handleEvent = this.handleEvent.bind(this);
  }
  validate = () => {
    if (this.state.id === '') {
      this.setState({idErr: 'please enter id'});
      return false;
    } else {
      this.setState({idErr: ''});
      return true;
    }
  };
  componentDidMount() {}
  onSubmit() {
    // var data;
    var userId = this.state.id;
    if (this.validate()) {
      this.props.saveID(parseInt(userId));
      this.props.navigation.navigate('List');
      // this.props.insertCheck();
    } else {
      console.log('error');
    }
    showDatepicker = () => {
      this.setState({show: true});
    };

    // console.log(userId);
    // this.props.insertCheck();
    // this.props.saveID(userId);
    // console.log(data);

    /* await AsyncStorage.setItem("id", userId);
    this.props.navigation.navigate("Tab1"); */
  }

  componentDidMount() {}

  render() {
    console.log(this.state.date);
    return (
      <View style={Style.container}>
        <Text style={Style.myText}>Enter User ID</Text>
        <TextInput
          value={String(this.state.id)}
          onChangeText={(value) => this.setState({id: value})}
          placeholder={'User Id'}
          style={Style.input}></TextInput>
        {this.state.idErr ? (
          <Text style={Style.error}>{this.state.idErr}</Text>
        ) : null}
        <Button
          title={'Submit'}
          style={Style.submit}
          onPress={this.onSubmit.bind(this)}
        />
        <Download />

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Tab1')}>
          <Text> Go to Form </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Tab2')}>
          <Text> Go to tab2 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Tab3')}>
          <Text> Go to tab3 </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
