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
  SafeAreaView,
  FlatList,
} from 'react-native';
import Style from '../styles';
import RadioForm from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {openDatabase} from 'react-native-sqlite-storage';
import Modal from 'react-native-modal';
import SelectMultiple from 'react-native-select-multiple';
let RNFS = require('react-native-fs');
var db = openDatabase({name: 'UserDatabase.db'});

const options = ['Ration', 'Education ', 'Small Business Support', 'Health'];
// const fruits = ['Apples', 'Oranges', 'Pears'];
export default class Tab3 extends Component {
  constructor(props) {
    super(props);
    const data = this.props.info;
    if (data !== null) {
      this.state = {
        familyIs: data.familyIs,
        familyErr: '',
        selectedFor: data.selectedFor,
        typeErr: '',
        disease: data.disease,
        diseaseErr: '',
        Remarks: data.Remarks,
        RemarksErr: '',
        imagesUri: data.imagesUri,
        imageErr: '',
        userID: '',
        personID: '',
        dependentInfo: {},
        profileInfo: {},
        check: '',
        dp: data.profileImage,
        isModalVisible: false,
      };
    } else {
      this.state = {
        familyIs: '',
        familyErr: '',
        selectedFor: [],
        typeErr: '',
        disease: '',
        diseaseErr: '',
        Remarks: '',
        RemarksErr: '',
        imagesUri: [],
        imageErr: '',
        userID: '',
        personID: '',
        dependentInfo: {},
        personalInfo: {},
        check: '',
        dp: '',
        isModalVisible: false,
      };
    }
    /*   db.transaction((txn) => {
      txn.executeSql(
        // "SELECT * FROM sqlite_master WHERE type='table' AND name='dependents'",
        "select person_id, first_name FROM 'user' ORDER BY person_id DESC",
        [],
        (tx, res) => {
          if (res.rows.length > 0) {
            // var id = res.rows.length + 1;
            var id;
            id = res.rows.item(0).person_id + 1;

            // console.log(res.rows.item(0).person_id);
            // this.setState({userID: id})
            // console.log("item:", id);
            this.setState({ personID: id });
          } else {
            this.setState({ personID: 1 });
          }
        }
      );
    }); */
  }
  onSelectionsChange = (value) => {
    const val = value.map((el) => el.value);
    this.setState({selectedFor: val});
  };
  componentDidMount() {
    if (this.props.personalInfo) {
      this.setState({personalInfo: this.props.personalInfo});
    }
    if (this.props.dependentInfo) {
      this.setState({dependentInfo: this.props.dependentInfo});
    }
    if (this.props.userID) {
      this.setState({userID: this.props.userID});
    }
    if (this.props.personalInfo.person_id) {
      this.setState({check: this.props.personalInfo.person_id});
      console.log('person', this.props.personalInfo.person_id);
    }

    /* try {
      const retrievedItem = await AsyncStorage.getItem("DependentInfo");
      const item = JSON.parse(retrievedItem);
      console.log("data of async", item);
    } catch (error) {
      console.log(error.message);
    } */
  }
  validate = () => {
    var errors = [];
    const {selectedFor, disease, Remarks, imagesUri, familyIs} = this.state;
    if (selectedFor.length === 0) {
      this.setState({typeErr: 'Please select atleast one option'});
      errors.push('type error');
    } else {
      this.setState({typeErr: ''});
    }
    if (this.state.selectedFor.includes('Health') && disease === '') {
      this.setState({diseaseErr: 'Please select disease'});
      errors.push('disease error');
    } else {
      this.setState({diseaseErr: ''});
    }
    if (Remarks === '') {
      this.setState({RemarksErr: 'Remarks field empty'});
      errors.push('remark error');
    } else {
      this.setState({RemarksErr: ''});
    }
    if (imagesUri.length === 0) {
      this.setState({imageErr: 'Please upload images'});
      errors.push('images error');
    } else {
      this.setState({imageErr: ''});
    }
    if (familyIs === '') {
      this.setState({familyErr: 'Please select review'});
      errors.push('images error');
    } else {
      this.setState({familyErr: ''});
    }
    if (!this.state.selectedFor.includes('Health')) {
      this.setState({disease: ''});
    }

    return errors;
  };
  OpenLibrary = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 5,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    }).then((images) => {
      // console.log(images);

      const uri = images.map((el, index) => {
        // console.log("recieved image", el);
        //  uri[index] = el.path;
        var path = `${
          RNFS.DocumentDirectoryPath
        }/${new Date().toISOString()}${index}.jpg`.replace(/:/g, '-');
        RNFS.copyFile(el.path, path)
          .then((res) => {
            console.log('file written');
          })
          .catch((err) => {
            console.log('ERROR: image file write failed!!!');
            console.log(err.message, err.code);
          });
        return `file://${path}`;
      });
      // console.log(uri);
      this.setState({imagesUri: uri});
    });
  };
  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };
  renderImage = (image) => {
    return (
      <Image
        style={{
          width: 185,
          height: 128,
          backgroundColor: '#fff',
          marginTop: 1,
          resizeMode: 'contain',
        }}
        source={{uri: image}}
      />
    );
  };
  onHealth = () => {
    if (this.state.selectedFor.includes('Health')) {
      return (
        <>
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.disease}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === '-1') {
                  this.setState({disease: ''});
                } else {
                  this.setState({disease: value});
                }
              }}>
              <Picker.Item label="Select disease" value="-1" />
              <Picker.Item label="Cancer" value="Cancer" />
              <Picker.Item label="Handicapped" value="Handicapped" />
              <Picker.Item label="Covid" value="Covid" />
              <Picker.Item label="Lukemia" value="Lukemia" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {this.state.diseaseErr ? (
            <Text style={Style.error}>{this.state.diseaseErr}</Text>
          ) : null}
        </>
      );
    }
  };

  onSubmit() {
    // e.preventDefault(e);
    // console.log(this.state);
    var isValid = this.validate();
    // console.log(isValid);
    if (isValid.length === 0) {
      var remarks = {
        familyIs: this.state.familyIs,
        selectedFor: this.state.selectedFor,
        disease: this.state.disease,
        Remarks: this.state.Remarks,
        imagesUri: this.state.imagesUri,
        profileImage: this.state.dp,
      };
      if (this.state.check) {
        this.props.deleteDependents(this.state.check);
        this.props.updateUser(
          this.state.personalInfo,
          this.state.dependentInfo,
          this.state.userID,
          remarks,
        );
        this.props.insertDependents(
          this.state.dependentInfo.dependents,
          this.state.check,
        );
        console.log('edit');
      } else {
        // console.log("insert", this.state.personID);

        this.props.Remarks(remarks);
        this.props.insertUser(
          this.state.personalInfo,
          this.state.dependentInfo,
          this.state.userID,
          remarks,
          this.state.dependentInfo.dependents,
        );
        /*   this.props.insertDependents(
          this.state.dependentInfo.dependents,
          this.state.personID
        ); */
      }
    }
  }

  actionOnImage = (item) => {
    /* Alert.alert(
      'Set Profile ',
      'Click ok to set Profile picture?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.setState({dp: item}, console.log(this.state.dp)),
        },
      ],
      {cancelable: false},
    ); */
    this.setState({dp: item}, console.log(this.state.dp));
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  render() {
    const {RemarksErr, typeErr, imageErr, familyErr} = this.state;
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={Style.container}>
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text style={Style.myText}> Initial Screening</Text>
          </View>
          <View style={{marginTop: 20}}></View>
          <View style={Style.center}>
            <Text style={Style.label}>Is Family deserving? </Text>
          </View>
          <View style={Style.picker}>
            <Picker
              selectedValue={this.state.familyIs}
              style={Style.picker}
              onValueChange={(value) => {
                if (value === '-1') {
                  this.setState({familyIs: ''});
                } else {
                  this.setState({familyIs: value});
                }
              }}>
              <Picker.Item label="Select review" value="-1" />
              <Picker.Item label="Most deserving" value="Most deserving" />
              <Picker.Item label="Deserving" value="Deserving" />
              <Picker.Item label="Not deserving" value="Not deserving" />
              <Picker.Item
                label="Temporarily relief"
                value="Temporarily relief"
              />
            </Picker>
          </View>
          {familyErr ? <Text style={Style.error}>{familyErr}</Text> : null}
          {/*  <View style={Style.center}>
            <Text style={Style.label}>Is Family deserving? </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              //   formHorizontal={true}
              onPress={(value) => this.setState({ familyIs: value })}
            />
          </View> */}
          <View style={{width: '80%'}}>
            <Text style={Style.label}>Family registered for</Text>
            <TouchableOpacity style={Style.input} onPress={this.toggleModal}>
              <Text>{this.state.selectedFor.length} items selected</Text>
            </TouchableOpacity>
          </View>
          {typeErr ? <Text style={Style.error}>{typeErr}</Text> : null}

          {this.onHealth()}
          <View>
            {/* modal for multiple selectio */}
            <Modal
              isVisible={this.state.isModalVisible}
              onBackdropPress={this.toggleModal}>
              <View style={{backgroundColor: 'white'}}>
                <View style={{width: '100%'}}>
                  <SelectMultiple
                    items={options}
                    selectedItems={this.state.selectedFor}
                    onSelectionsChange={(value) =>
                      this.onSelectionsChange(value)
                    }
                  />
                </View>
              </View>
            </Modal>
          </View>
          <TextInput
            value={this.state.Remarks}
            onChangeText={(Remarks) => this.setState({Remarks})}
            placeholder={'Remarks'}
            style={Style.input}></TextInput>

          {RemarksErr ? <Text style={Style.error}>{RemarksErr}</Text> : null}
          <TouchableOpacity style={Style.upload} onPress={this.OpenLibrary}>
            <Text style={{color: '#428bca', fontWeight: 'bold'}}>
              Upload images
            </Text>
          </TouchableOpacity>
          {imageErr ? <Text style={Style.error}>{imageErr}</Text> : null}
          {/*   <ScrollView horizontal>
            <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
              {this.state.imagesUri
                ? this.state.imagesUri.map((el, index) => {
                    return (
                      <View
                        style={
                          {
                            // width: 185, height: 128,
                            //  width:'50%',
                            // flexBasis: "33.33%",
                          }
                        }
                        key={index}
                      >
                        {this.renderImage(el)}
                      </View>
                    );
                  })
                : null}
            </View>
          </ScrollView> */}
          {/* <SafeAreaView style={{flex: 1, justifyContent: 'center'}}> */}

          <FlatList
            style={Style.GridList}
            data={this.state.imagesUri}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                }}>
                {this.state.dp === item ? (
                  <TouchableOpacity
                    style={{padding: 4}}
                    onPress={() => this.actionOnImage(item)}
                    activeOpacity={0.5}>
                    <Image style={Style.imageActive} source={{uri: item}} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{padding: 4}}
                    onPress={() => this.actionOnImage(item)}
                    activeOpacity={0.5}>
                    <Image style={Style.imageThumbnail} source={{uri: item}} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
          {/* </SafeAreaView> */}
          <View style={{alignItems: 'center', flex: 1, width: '100%'}}>
            <Button
              title={'submit'}
              style={Style.submit}
              onPress={this.onSubmit.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
