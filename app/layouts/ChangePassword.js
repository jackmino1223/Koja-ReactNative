import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import Input from '../components/Input';
import Toast from 'react-native-simple-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import base64 from 'base-64'
import Picker from 'react-native-picker';
import {strings} from '../components/i18n'

export default class ChangePassword extends Component {
  state = {
    visibleModal: true,
    newPassword: "",
    confirmPassword: "",
    isChanging: false
  };

  componentDidMount() {
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Input label={strings.new_password}
         onChangeText={(text) => this.setState({newPassword:text})}
         secureTextEntry={true}
         value={this.state.newPassword}/>
      <Input label={strings.confirm_password}
         onChangeText={(text) => this.setState({confirmPassword:text})}
         secureTextEntry={true}
         value={this.state.confirmPassword}/>
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignSelf: 'stretch', paddingHorizontal: 50, paddingTop: 20}}>
        <Button
          onPress={this.onCancelClicked}
          title={strings.cancel}
          color="#67cdba"
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
    if(this.state.newPassword == ""){
      Toast.show(strings.enter_new_password);
      return;
    }
    if(this.state.confirmPassword == ""){
      Toast.show(strings.confirm_new_password);
      return;
    }
    if(this.state.newPassword != this.state.confirmPassword){
      Toast.show(strings.invalid_password);
      return;
    }

    console.log("userName",global.userName);

    this.setState({visibleModal: false});
    setTimeout(()=>{
      this.setState({isChanging: true});
    },400);

    var REQUEST_URL_DEVICES = 'https://api.koja.frdid.com/api/user/v1/password/phoneLogin';

    encrypted = base64.encode(global.userId + ":" + global.sessionId)
    fetch(REQUEST_URL_DEVICES,{
      method: 'PUT',
      headers: {
        'Authorization': 'Session ' + encrypted,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Connection': 'close'
      },
      body: JSON.stringify({
        login: global.userName,
        password: this.state.newPassword,
      })
    })
    .then((response) => {
      if(response.status == 200){
            this.setState({isChanging: false});
            this.props.onOkBtn();
      }
    })
    // .then((responseData) => {
    // })
    .done();

  }

  onCancelClicked = () =>{
    this.setState({ visibleModal: false });
    this.props.onCancelBtn();
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isChanging} overlayColor={"rgba(0,0,0,0.8)"} textContent={strings.changing_password} textStyle={{color: '#fff'}} />
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
    backgroundColor: '#67cdba',

  },
  modalContent: {
    // flex: 0.5,
    backgroundColor: 'white',
    padding: 22,
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
