import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Picker,
  ScrollView,
  Button,
  Image,
  Switch,
  BackHandler,
  FlatList,
} from 'react-native';
import Style from '../styles';
// import DatePicker from "@react-native-community/datetimepicker";
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {Husband} from './husband';
// import MainFirst from "./Main";
// import ValidationComponent from "react-native-form-validator";
let RNFS = require('react-native-fs');

/* var radio_props = [
  { label: "no  ", value: 0 },
  { label: "yes", value: 1 },
]; */

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    const data = this.props.info;
    console.log(data);
    if (data != null) {
      this.state = {
        first_name: data.first_name,
        fnameErr: '',
        last_name: data.last_name,
        lnameErr: '',
        Religion: data.Religion,
        ReligionErr: '',
        date: data.date,
        dateErr: '',
        RelStatus: data.RelStatus,
        RelErr: '',
        cell: data.cell,
        cellErr: '',
        Address: data.Address,
        AddressErr: '',
        houseOwn: data.houseOwn,
        monthlyRent: data.monthlyRent,
        monthlyRentErr: '',
        Town: data.Town,
        TownErr: '',
        Area: data.Area,
        AreaErr: '',
        profession: data.profession,
        professionErr: '',
        empStatus: data.empStatus,
        empStatusErr: '',
        MonthlyIncome: data.MonthlyIncome,
        incomeErr: '',
        skills: data.skills,
        zakat: data.zakat,
        gender: data.gender,
        HbState: data.HbState,
        HbStateErr: '',
        Hbprofession: data.Hbprofession,
        HbprofessionErr: '',
        Hbincome: data.Hbincome,
        HbincomeErr: '',
        HbUnemp: data.HbUnemp,
        HbUnempErr: '',
        Hbcompany: data.Hbcompany,
        HbReason: data.HbReason,
        HbReasonErr: '',
        genderErr: '',
        guardian: data.guardian,
        guardianErr: '',
        filepath: data.cnic,
        fileData: '',
        fileUri: data.cnic,
        cnicErr: '',
        userID: '',
        person_id: data.person_id,
      };
    } else {
      this.state = {
        first_name: '',
        fnameErr: '',
        last_name: '',
        lnameErr: '',
        Religion: '',
        ReligionErr: '',
        date: '',
        dateErr: '',
        RelStatus: '',
        RelErr: '',
        cell: '',
        cellErr: '',
        Address: '',
        AddressErr: '',
        houseOwn: false,
        monthlyRent: '',
        monthlyRentErr: '',
        Town: '',
        TownErr: '',
        /*  Area: "",
        AreaErr: "", */
        profession: '',
        professionErr: '',
        empStatus: '',
        empStatusErr: '',
        MonthlyIncome: '',
        incomeErr: '',
        skills: '',
        zakat: false,
        gender: '',
        HbState: '',
        HbStateErr: '',
        Hbprofession: '',
        HbprofessionErr: '',
        Hbincome: '',
        HbincomeErr: '',
        HbUnemp: '',
        HbUnempErr: '',
        Hbcompany: '',
        HbReason: '',
        HbReasonErr: '',
        genderErr: '',
        husbandState: '',
        guardian: '',
        guardianErr: '',
        filepath: '',
        fileData: '',
        fileUri: [],
        cnicErr: '',
        userID: '',
        person_id: '',
      };
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  validate = () => {
    var reg = /^((\+92))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    var errors = [];
    const {
      first_name,
      last_name,
      date,
      Address,
      Area,
      Town,
      cell,
      fileUri,
      guardian,
      Religion,
      RelStatus,
      profession,
      empStatus,
      MonthlyIncome,
      gender,
      HbState,
      Hbprofession,
      Hbincome,
      HbUnemp,
      HbReason,
      monthlyRent,
      houseOwn,
    } = this.state;
    if (first_name !== '') {
      if (first_name.length < 3) {
        this.setState({fnameErr: 'Name field must be greater than 2 words'});
        errors.push('fname error');
      } else {
        this.setState({fnameErr: ''});
      }
    } else {
      this.setState({fnameErr: 'First name field is empty'});
      errors.push('fname error');
    }

    /*   if (last_name === '') {
      this.setState({lnameErr: 'Name field is empty'});
      errors.push('lname error');
    } else {
      this.setState({lnameErr: ''});
    } */
    if (gender === '') {
      this.setState({genderErr: 'Please select gender'});
      errors.push('gender error');
    } else {
      this.setState({genderErr: ''});
    }
    if (guardian === '') {
      this.setState({guardianErr: 'Guardian field is empty'});
      errors.push('guardian error');
    } else {
      this.setState({guardianErr: ''});
    }
    if (Religion === '') {
      this.setState({ReligionErr: 'Please select Religion'});
      errors.push('relegi error');
    } else {
      this.setState({ReligionErr: ''});
    }
    if (date === '') {
      this.setState({dateErr: 'Date of birth field is empty'});
      errors.push('datr error');
    } else {
      this.setState({dateErr: ''});
    }
    if (RelStatus === '') {
      this.setState({RelErr: 'Please select relationship status'});
      errors.push('rel error');
    } else {
      this.setState({RelErr: ''});
    }
    if (cell !== '') {
      var result = reg.test(this.state.cell);
      if (!result) {
        this.setState({cellErr: 'Contact number is invalid'});
        errors.push('phon error');
      } else {
        this.setState({cellErr: ''});
      }
    } else {
      this.setState({cellErr: 'Contact no feild is empty'});
      errors.push('phone error');
    }
    if (Address !== '') {
      if (Address.length < 7) {
        this.setState({AddressErr: 'Address must be greater than 7 words'});
        errors.push('addres error');
      } else {
        this.setState({AddressErr: ''});
      }
    } else {
      this.setState({AddressErr: 'Address is empty'});
      errors.push('addres error');
    }
    if (Town === '') {
      this.setState({TownErr: 'Please select town'});
      errors.push('town error');
    } else {
      this.setState({TownErr: ''});
    }
    if (Area === '') {
      this.setState({AreaErr: 'Area field is empty'});
      errors.push('area error');
    } else {
      this.setState({AreaErr: ''});
    }
    if (profession === '') {
      this.setState({professionErr: 'Please select profession'});
      errors.push('professsio error');
    } else {
      this.setState({professionErr: ''});
    }
    if (empStatus === '') {
      this.setState({empStatusErr: 'Please select employment status'});
      errors.push('empsta error');
    } else {
      this.setState({empStatusErr: ''});
    }

    if (MonthlyIncome == '') {
      this.setState({incomeErr: 'Income field is empty'});
      errors.push('incon error');
    } else {
      this.setState({incomeErr: ''});
    }
    if (fileUri.length === 0) {
      this.setState({cnicErr: 'CNIC image not uploaded'});
      errors.push('imageerror');
    } else {
      this.setState({cnicErr: ''});
    }
    if (gender === 'Female' && RelStatus === 'Married') {
      if (HbState === '') {
        this.setState({
          HbStateErr: 'Husband employement status field is empty',
        });
        errors.push('error');
      } else {
        this.setState({HbStateErr: ''});
      }
    }
    /*    if (HbState === 'Employed' && Hbincome === '') {
      this.setState({HbincomeErr: "Husband's income empty"});
      errors.push('income err');
    } else {
      this.setState({HbincomeErr: ''});
    }
    if (HbState === 'Employed' && Hbprofession === '') {
      this.setState({HbprofessionErr: "Husband's profession is empty"});
      errors.push('profession err');
    } else {
      this.setState({HbprofessionErr: ''});
    }
    if (HbState === 'Unemployed' && HbUnemp === '') {
      this.setState({HbUnempErr: 'Unemployement type is empty'});
      errors.push('unemp err');
    } else {
      this.setState({HbUnempErr: ''});
    }
    if (HbUnemp === 'Permenant' && Hbprofession === '') {
      this.setState({HbprofessionErr: "Husband's profession is empty"});
      errors.push('unemp err');
    } else {
      this.setState({HbprofessionErr: ''});
    }
    if (HbUnemp === 'Temporary' && HbReason === '') {
      this.setState({HbReasonErr: 'Unemployement reason is empty'});
      errors.push('unemp err');
    } else {
      this.setState({HbReasonErr: ''});
    } */
    if (!houseOwn && monthlyRent === '') {
      this.setState({monthlyRentErr: 'Monthly rent is empty'});
      errors.push('rent err');
    } else {
      this.setState({monthlyRentErr: ''});
    }

    return errors;
  };

  async componentDidMount() {
    if (this.props.userID) {
      await this.setState({userID: this.props.userID});
    }
    if (this.props.info) {
      if (this.props.info.person_id) {
        this.setState({person_id: this.props.info.person_id});
        console.log(this.props.info.person_id);
      }
    }
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    /*  if (this.state.userID !== "") {
      BackHandler.exitApp();
    } else {
      this.props.navigation.goBack(null);
    } */
    this.props.navigation.goBack(null);
    return true;
  }

  async onSubmit() {
    // e.preventDefault();
    var state = this.state;
    console.log(this.state.houseOwn);
    // console.log(state.fileUri);
    var isValid = await this.validate();
    /*   console.log(isValid.length);
    console.log(isValid);
    console.log(typeof isValid.length);
    if (isValid.length === 0) {
      console.log("no error");
    } else {
      console.log("exist");
    } */
    if (isValid.length === 0) {
      let personalInfo = {
        person_id: state.person_id,
        first_name: state.first_name,
        last_name: state.last_name,
        Religion: state.Religion,
        zakat: state.zakat,
        gender: state.gender,
        guardian: state.guardian,
        date: state.date,
        RelStatus: state.RelStatus,
        HbState: state.HbState,
        Hbprofession: state.Hbprofession,
        Hbcompany: state.Hbcompany,
        Hbincome: state.Hbincome,
        HbUnemp: state.HbUnemp,
        HbReason: state.HbReason,
        cell: state.cell,
        Address: state.Address,
        houseOwn: state.houseOwn,
        monthlyRent: state.monthlyRent,
        Town: state.Town,
        Area: state.Area,
        profession: state.profession,
        empStatus: state.empStatus,
        MonthlyIncome: state.MonthlyIncome,
        skills: state.skills,
        cnic: state.fileUri,
      };
      console.log(personalInfo);
      // await AsyncStorage.setItem("Personal", JSON.stringify(personalInfo));
      this.props.navigation.navigate('Tab2');
      this.props.personalInfo(personalInfo);
    } else {
      console.log(isValid);
    }
  }
  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        const imagePath = `${
          RNFS.DocumentDirectoryPath
        }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
        console.log(imagePath);
        RNFS.copyFile(response.uri, imagePath)
          .then((res) => {
            console.log('file written');
          })
          .catch((err) => {
            console.log('ERROR: image file write failed!!!');
            console.log(err.message, err.code);
          });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        // console.log("response", JSON.stringify(response));
        // console.log(source);
        console.log('image', imagePath);
        let cnic = this.state.fileUri;
        cnic.push(`file://${imagePath}`);
        this.setState({
          filepath: response.path,
          fileData: response.data,
          fileUri: cnic,
          // fileUri: `file://${imagePath}`,
        });
      }
    });
  };
  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        const imagePath = `${
          RNFS.DocumentDirectoryPath
        }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
        console.log(imagePath);
        RNFS.copyFile(response.uri, imagePath)
          .then((res) => {
            console.log('file written');
          })
          .catch((err) => {
            console.log('ERROR: image file write failed!!!');
            console.log(err.message, err.code);
          });
        let cnic = this.state.fileUri;
        cnic.push(`file://${imagePath}`);

        // console.log("response", JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: cnic,
        });
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return (
        // <Image source={{uri: this.state.fileUri[0]}} style={Style.images} />
        <FlatList
          style={Style.GridList}
          data={this.state.fileUri}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1,
              }}>
              <Image source={{uri: item}} style={Style.imageThumbnail} />
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      );
    } else {
      return null;
      /*  return (
        <Image
          source={{
            uri: `file:///data/user/0/com.formapp/files/2020-10-20T10-14-08.955Z.jpg`,
          }}
          style={Style.images}
        />
      ); */
    }
  }

  onStatusChange = (value) => {
    if (value === '-1') {
      this.setState({HbState: ''});
    } else {
      this.setState({HbState: value});
    }
  };
  onProfessionChange = (value) => {
    this.setState({Hbprofession: value});
  };
  onIncomeChange = (value) => {
    this.setState({Hbincome: value});
  };
  onCompanyChange = (value) => {
    this.setState({Hbcompany: value});
  };
  onReasonChange = (value) => {
    this.setState({HbReason: value});
  };
  onUnEmpChange = (value) => {
    this.setState({HbUnemp: value});
  };

  render() {
    /* if (this.props.info) {
      console.log("data", this.props.info);
    } */
    // console.log(this.state.fileUri);
    var {
      fnameErr,
      lnameErr,
      genderErr,
      guardianErr,
      ReligionErr,
      RelErr,
      dateErr,
      cellErr,
      AddressErr,
      AreaErr,
      TownErr,
      empStatusErr,
      incomeErr,
      professionErr,
      cnicErr,
      monthlyRentErr,
    } = this.state;

    var {gender, RelStatus} = this.state;
    let input, husbandStatus;
    /*  let isFocused = this.props.navigation.isFocused();
    console.log("tab1", isFocused); */
    if (gender === 'Female' && RelStatus === 'Married') {
      husbandStatus = (
        <Husband
          data={this.state}
          husbandState={this.state.HbState}
          company={this.state.Hbcompany}
          income={this.state.Hbincome}
          profession={this.state.Hbprofession}
          reason={this.state.HbReason}
          onStatusChange={this.onStatusChange}
          onProfessionChange={this.onProfessionChange}
          onIncomeChange={this.onIncomeChange}
          onCompanyChange={this.onCompanyChange}
          onReasonChange={this.onReasonChange}
          onUnEmpChange={this.onUnEmpChange}
        />
      );
    }

    const father = (
      <View>
        <TextInput
          value={this.state.guardian}
          onChangeText={(guardian) => this.setState({guardian})}
          placeholder={'S/o'}
          style={Style.input}
        />
        {guardianErr ? <Text style={Style.error}>{guardianErr}</Text> : null}
      </View>
    );
    const husband = (
      <View>
        <TextInput
          value={this.state.guardian}
          onChangeText={(guardian) => this.setState({guardian})}
          placeholder={'W/o , D/o '}
          style={Style.input}
        />
        {guardianErr ? <Text style={Style.error}>{guardianErr}</Text> : null}
      </View>
    );
    if (gender === 'Male') {
      input = father;
    } else if (gender === 'Female') {
      input = husband;
    } else {
      input = null;
    }
    return (
      // <MainFirst>
      <ScrollView style={Style.scrollContainer}>
        <View style={Style.container}>
          <View style={{alignItems: 'center'}}>
            <Text style={Style.myText}> Personal Info</Text>
          </View>
          <TextInput
            value={this.state.first_name}
            onChangeText={(first_name) => this.setState({first_name})}
            placeholder={'First name'}
            style={Style.input}></TextInput>
          {fnameErr ? <Text style={Style.error}>{fnameErr}</Text> : null}
          <TextInput
            value={this.state.last_name}
            onChangeText={(last_name) => this.setState({last_name})}
            placeholder={'Last name'}
            style={Style.input}></TextInput>
          {lnameErr ? <Text style={Style.error}>{lnameErr}</Text> : null}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.gender}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === '-1') {
                  this.setState({gender: ''});
                } else {
                  this.setState({gender: value});
                }
              }}>
              <Picker.Item label="Select gender" value="-1" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          {genderErr ? <Text style={Style.error}>{genderErr}</Text> : null}

          {/* {this.state.gender === "male" ? father : husband} */}
          {input}

          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.Religion}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === '-1') {
                  this.setState({Religion: ''});
                } else {
                  this.setState({Religion: value});
                }
              }}>
              <Picker.Item label="Select relegion" value="-1" />
              <Picker.Item label="Islam" value="Islam" />
              <Picker.Item label="Chritianity" value="Chritianity" />
              <Picker.Item label="Hinduism" value="Hinduism" />
              <Picker.Item label="Jew" value="Jew" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          {ReligionErr ? <Text style={Style.error}>{ReligionErr}</Text> : null}
          {this.state.Religion === 'Islam' ? (
            <View
              style={{
                width: '80%',
                marginBottom: 10,
                // alignItems: "flex-end",
                flexDirection: 'row',
              }}>
              <Text style={{marginRight: 'auto'}}>Eligible for zakat?</Text>
              <View style={{alignItems: 'flex-end'}}>
                <Switch
                  value={this.state.zakat}
                  onValueChange={(value) => this.setState({zakat: value})}
                />
              </View>
            </View>
          ) : (
            <View></View>
          )}

          <DatePicker
            style={Style.Date}
            date={this.state.date}
            mode="date"
            placeholder="DOB"
            format="YYYY-MM-DD"
            minDate="1940-01-01"
            maxDate="2003-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({date: date});
            }}
          />
          {dateErr ? <Text style={Style.error}>{dateErr}</Text> : null}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.RelStatus}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === ' -1') {
                  this.setState({RelStatus: ''});
                } else {
                  this.setState({RelStatus: value});
                }
              }}>
              <Picker.Item label="Marital status" value="-1" />
              <Picker.Item label="Single" value="Single" />
              <Picker.Item label="Married" value="Married" />
              <Picker.Item label="Widow" value="Widow" />
              <Picker.Item label="Widower" value="Widower" />
              <Picker.Item label="Seperated" value="Seperated" />
            </Picker>
          </View>
          {husbandStatus}

          {RelErr ? <Text style={Style.error}>{RelErr}</Text> : null}
          <TextInput
            value={this.state.cell}
            onChangeText={(cell) => this.setState({cell})}
            placeholder={'Contact'}
            keyboardType={'numeric'}
            style={Style.input}></TextInput>
          {cellErr ? <Text style={Style.error}>{cellErr}</Text> : null}
          <TextInput
            value={this.state.Address}
            onChangeText={(Address) => this.setState({Address})}
            placeholder={'Address'}
            style={Style.input}></TextInput>
          {AddressErr ? <Text style={Style.error}>{AddressErr}</Text> : null}
          <View
            style={{
              width: '80%',
              marginBottom: 10,
              // alignItems: "flex-end",
              flexDirection: 'row',
            }}>
            <Text style={{marginRight: 'auto'}}>House own?</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Switch
                value={this.state.houseOwn}
                onValueChange={(value) => this.setState({houseOwn: value})}
              />
            </View>
          </View>
          {!this.state.houseOwn ? (
            <>
              <TextInput
                value={this.state.monthlyRent}
                onChangeText={(monthlyRent) => this.setState({monthlyRent})}
                placeholder={'Monthly rent in PKR'}
                keyboardType={'numeric'}
                style={Style.input}></TextInput>
              {monthlyRentErr ? (
                <Text style={Style.error}>{monthlyRentErr}</Text>
              ) : null}
            </>
          ) : null}
          {/*  <View style={Style.picker}>
            <Picker
              selectedValue={this.state.Town}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === "-1") {
                  this.setState({ Town: "" });
                } else {
                  this.setState({ Town: value });
                }
              }}
            >
              <Picker.Item label="Select town" value="-1" />
              <Picker.Item label="Surjani" value="Surjani" />
              <Picker.Item label="North karachi" value="North karachi" />
              <Picker.Item label="New Karachi" value="New Karachi" />
              <Picker.Item label="Korangi" value="Korangi" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View> */}
          <TextInput
            value={this.state.Town}
            onChangeText={(Town) => this.setState({Town})}
            placeholder={'Town'}
            style={Style.input}></TextInput>

          {TownErr ? <Text style={Style.error}>{TownErr}</Text> : null}
          <TextInput
            value={this.state.Area}
            onChangeText={(Area) => this.setState({Area})}
            placeholder={'Area'}
            style={Style.input}></TextInput>
          {AreaErr ? <Text style={Style.error}>{AreaErr}</Text> : null}
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.profession}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === '-1') {
                  this.setState({profession: ''});
                } else {
                  this.setState({profession: value});
                }
              }}>
              <Picker.Item label="Profession" value="-1" />
              <Picker.Item label="Driver" value="Driver" />
              <Picker.Item label="Maid" value="Maid" />
              <Picker.Item label="Labor/Daily wage worker" value="Labor" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>

          {professionErr ? (
            <Text style={Style.error}>{professionErr}</Text>
          ) : null}
          <View style={Style.picker}>
            <Picker
              itemStyle={{color: 'blue'}}
              selectedValue={this.state.empStatus}
              onValueChange={(value) => {
                if (value === '-1') {
                  this.setState({empStatus: ''});
                } else {
                  this.setState({empStatus: value});
                }
              }}>
              <Picker.Item label="Employment status" value="-1" />
              <Picker.Item label="Employed" value="Employed" />
              <Picker.Item label="Unemployed" value="Unemployed" />
              <Picker.Item label="Self-employed" value="Self-employed" />
            </Picker>
          </View>

          {empStatusErr ? (
            <Text style={Style.error}>{empStatusErr}</Text>
          ) : null}
          <TextInput
            value={this.state.MonthlyIncome}
            onChangeText={(MonthlyIncome) => this.setState({MonthlyIncome})}
            placeholder={'Monthly Income'}
            style={Style.input}
            keyboardType={'numeric'}></TextInput>
          {incomeErr ? <Text style={Style.error}>{incomeErr}</Text> : null}
          <TextInput
            value={this.state.skills}
            onChangeText={(skills) => this.setState({skills})}
            placeholder={'Hands on skills'}
            style={Style.input}></TextInput>

          <TouchableOpacity onPress={this.chooseImage} style={Style.upload}>
            <Text style={{color: '#428bca', fontWeight: 'bold'}}>
              Upload CNIC image
            </Text>
          </TouchableOpacity>
          {cnicErr ? <Text style={Style.error}>{cnicErr}</Text> : null}
          <View style={Style.ImageSections}>
            <View>{this.renderFileUri()}</View>
          </View>
          {this.state.fileUri.length !== 0 ? (
            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => this.setState({fileUri: []})}>
              <Text style={{color: '#428bca', fontWeight: 'bold'}}>
                Remove photo
              </Text>
            </TouchableOpacity>
          ) : null}

          <Button title={'Submit'} onPress={this.onSubmit.bind(this)} />
          <Text></Text>
        </View>
      </ScrollView>
      // </MainFirst>
    );
  }
}
