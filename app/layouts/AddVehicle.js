import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import Input from '../components/Input';
import Toast from 'react-native-simple-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import base64 from 'base-64'
import Picker from 'react-native-picker';
import {strings} from '../components/i18n'

export default class AddVehicle extends Component {
  state = {
    visibleModal: true,
    name: "",
    imei: "",
    phoneNumber: "",
    deviceTypeId: global.DTypelist[0].id,
    deviceType: global.DTypelist[0].name,
    isAdding: false
  };

  componentDidMount() {
    console.log("did mount")
    let pickerData = [];
    for(var i=0;i<global.DTypelist.length;i++){
        pickerData.push(global.DTypelist[i].name);
    }

    this.setState({pickData: pickerData});

    Picker.init({
        pickerData: pickerData,
        selectedValue: [this.state.deviceType],
        pickerTitleText: '',
        pickerConfirmBtnText: 'Confirm',
        pickerCancelBtnText: 'Cancel',
        pickerBg: [255,255,255,1],
        onPickerConfirm: data => {
            this.setState({deviceType: data[0]});
            var indexOfType = pickerData.indexOf(data[0]);
            this.setState({deviceTypeId: global.DTypelist[indexOfType].id});
            console.log(this.state.deviceTypeId);
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        }
    });
    Picker.hide();
  }


  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Input label={strings.name}
         onChangeText={(text) => this.setState({name:text})}
         value={this.state.name}/>
      <Input label={strings.imei}
         onChangeText={(text) => this.setState({imei:text})}
         value={this.state.imei}/>
      <Input label={strings.phone_number}
         onChangeText={(text) => this.setState({phoneNumber:text})}
         value={this.state.phoneNumber}/>

      <Text onPress={()=>{Picker.show()}} style={{fontFamily: 'avenir-light', borderBottomWidth: 1, padding: 20, color: '#555'}}>{this.state.deviceType}</Text>
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignSelf: 'stretch', paddingHorizontal: 50}}>
        <Button
          onPress={this.onCancelClicked}
          title={strings.cancel}
          color="#67cdba"
          // style={styles.button}
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.onOkClicked}
          title={strings.ok}
          color="#67cdba"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );

  onOkClicked = () =>{
    console.log(this.state.deviceTypeId);
    if(this.state.name == ""){
      Toast.show(strings.enter_device_name);
      return;
    }
    if(this.state.imei == ""){
      Toast.show(strings.enter_device_imei);
      return;
    }
    if(this.state.phoneNumber == ""){
      Toast.show(strings.enter_phone_number);
      return;
    }

    this.setState({visibleModal: false});
    setTimeout(()=>{
      this.setState({isAdding: true});
    },400);

    var REQUEST_URL_DEVICES = 'https://api.koja.frdid.com/api/device/v1/devices/';

    encrypted = base64.encode(global.userId + ":" + global.sessionId)
    fetch(REQUEST_URL_DEVICES,{
      method: 'POST',
      headers: {
        'Authorization': 'Session ' + encrypted,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        deviceTypeId: this.state.deviceTypeId,
        phoneNumber: this.state.phoneNumber,
        imei: this.state.imei
      })
    })
    .then((response) => {
      if(response.status == 200){
          fetch(REQUEST_URL_DEVICES,{
            method: 'GET',
            headers: {
              'Authorization': 'Session ' + encrypted,
              'Accept': 'application/json',
              'Connection': 'close',
            }
          })
          .then((response) => response.json())
          .then((responseData) => {
            global.Dlist = responseData;
            this.setState({isAdding: false});
            this.props.onAddOkBtn();
            console.log("added",global.Dlist);
          })
          .done();
      }
      // response.json()
    })
    // .then((responseData) => {
    // })
    .done();

  }

  onCancelClicked = () =>{
    this.setState({ visibleModal: false });
    this.props.onAddCancelBtn();
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isAdding} overlayColor={"rgba(0,0,0,0.8)"} textContent={strings.adding} textStyle={{color: '#fff'}} />
        <Modal isVisible={this.state.visibleModal}>
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // button: {
  //   marginHorizontal: 26,
  //   // flex:1
  // },
  modalContent: {
    // flex: 0.5,
    backgroundColor: 'white',
    padding: 22,
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  // itemStyle: {
  //   fontSize: 15,
  //   height: 75,
  //   color: 'black',
  //   textAlign: 'center',
  //   fontWeight: 'bold'
  // },
  // picker: {
  //   alignSelf: 'stretch',
  //   marginVertical: 30,
  // },
});


      // <Picker
      //     style={styles.picker}
      //     mode="dropdown"
      //     itemStyle={styles.itemStyle}
      //     selectedValue={this.state.deviceTypeId}
      //     onValueChange={(itemValue, itemIndex) => this.setState({deviceTypeId: itemValue})}>
      //     {global.DTypelist.map(DType => (
      //       <Picker.Item key={DType.id} label={DType.name} value={DType.id} />
      //     ))}
      // </Picker>
