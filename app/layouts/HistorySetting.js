import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Button
} from 'react-native';
import DatePicker from 'react-native-datepicker';

class HistorySetting extends Component {

  constructor(props) {
    super(props);
    var currentdate = new Date();
    var currentDateTime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes(); 
    var lastDateTime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth())  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes(); 
    this.state = {
      startDateTime: lastDateTime,
      endDateTime: currentDateTime,
      datePickerStyle: {
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36,
        },
        dateText: {
          color: '#fff'              
        },
        dateTouchBody:{
          marginVertical: 10,
        }
      }
    };
  }

  // componentWillMount() {
  //   this._panResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
  //     onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
  //     onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
  //     onPanResponderMove: (e) => console.log('onPanResponderMove'),
  //     onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
  //     onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <DatePicker
          style={{width: 200}}
          date={this.state.startDateTime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={this.state.datePickerStyle}
          minuteInterval={10}
          onDateChange={(datetime) => {this.setState({startDateTime: datetime});}}
        />
        <DatePicker
          style={{width: 200}}
          date={this.state.endDateTime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={this.state.datePickerStyle}
          minuteInterval={10}
          onDateChange={(datetime) => {this.setState({endDateTime: datetime});}}
        />
        <Button
          onPress={this.onPressSetting}
          title="View"
          color="#fff"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }

  onPressSetting = () => {
    global.startDateTime = this.state.startDateTime.replace(" ","%20")+':00';
    global.endDateTime = this.state.endDateTime.replace(" ","%20")+':00';
    this.props.onItemSelected("VehicleHistory");    
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default HistorySetting