import React from 'react'
import {
 View,
 Text,
 StyleSheet,
 ListView,
 Image,
 TextInput,
 TouchableOpacity,
 Alert,
} from 'react-native'

import Button from '../components/Button'
import HistorySetting from './HistorySetting'
import AddVehicle from './AddVehicle'
import base64 from 'base-64'
const  SideMenu = require('react-native-side-menu')
import Toast from 'react-native-simple-toast'
import {strings} from '../components/i18n'
// const  {menu} = require('../router.js')
// import Menu from './Menu'

module.exports = class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  const subds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isSideOpen: false,
      dataSource: this.ds.cloneWithRows(global.Dlist),
      search: "Search",
      searchDataList: [],
      openRow: -1,
      view: "Main",
      isSearch: 0,
      subDataSource: subds.cloneWithRows([
	      	{
	      		name:'Show on Map',
	      		image:require('../images/map.png'),
            func:this.showOnMap,
	      	},
	      	{
	      		name:'Vehicle History',
	      		image:require('../images/history.png'),
            func:this.vehicleHistory,
	      	},
	      	{
	      		name:'Remove Device',
	      		image:require('../images/delete.png'),
            func:this.removeVehicle,
	      	},
		  ]),
    };
    // this.onSubItemClicked = this.onSubItemClicked.bind(this);
  }

  static navigationOptions = {
    title: 'Vehicle List',
    header: false,
    // headerRight: (
    //         <Button onPress={this.onPressAddBtn}>
    //           <Image
    //             source={require('../images/add.png')} style={{width: 34, height: 34}} />
    //         </Button>),
  };

  onChangeSearchText = (text) => {
    searchDataList = [];
    for (var i = 0; i < global.Dlist.length; i++) {
      if(global.Dlist[i].name.toLowerCase().includes(text.toLowerCase())){
        searchDataList.push(global.Dlist[i]);
      }
    };
    this.setState({
      searchDataList: searchDataList,
      dataSource: this.ds.cloneWithRows(searchDataList)
    });

  }

  onPressBackBtn = () =>{
    if(this.state.view == "Main")
      this.props.onBackBtn();
    else
      this.setState({
        view: "Main",
      });
  }
  onPressAddBtn = () =>{
      this.setState({
        view: "AddVehicle",
      });
  }

  onAddOkBtn = () =>{
      this.setState({
        view: "Main",
      });
      this.setState({
        dataSource: this.ds.cloneWithRows(global.Dlist)
      });
  }

  onAddCancelBtn = () =>{
      this.setState({
        view: "Main",
      });
  }

  render() {
    // const menu = <Menu />;
    return (
      <SideMenu
      menuPosition={(global.lang=="ir")?"right":"left"}
      menu = {global.menu}
      isOpen={this.state.isSideOpen}
      onChange={(isOpen) => {this.setState({isSideOpen: isOpen})}}
      >

        <View style={styles.container}>
          <View style={[{flexDirection: (global.lang=='ir')?'row-reverse':'row'},styles.navbar]}>
            <Button onPress={()=>{this.setState({isSideOpen: !this.state.isSideOpen})}}>
              <Image
                source={require('../images/menu.png')} style={{width: 27, height: 27}} />
            </Button>
            <Text style={styles.navbarText}>{strings.vehicle_list}</Text>
            {/*<Button onPress={()=>{this.setState({isSearch:!this.state.isSearch})}}>
              <Image
                source={require('../images/search_green.png')} style={{width: 27, height: 27}} />
            </Button>*/}
            <Button onPress={this.onPressAddBtn}>
              <Text style={{color: '#48CCC5', fontSize: 40, fontWeight: '600'}}>+</Text>
            </Button>
          </View>
          <View style={{
              padding: 10,
              flex: 1,
            }}>
            {/*{this.state.isSearch?*/}
            <View style={{flexDirection:'row', alignItems: 'center',}}>
        	 	  <TextInput
        	        style={[styles.TextInput,{textAlign: (global.lang == 'ir')?'right':'left'}]}
        	        onChangeText={(text) => this.onChangeSearchText(text)}
        	        // value={this.state.text}
        	        placeholder = {strings.search}/>
            </View>
            {/*:null}*/}
      	 	  <ListView
      	        dataSource={this.state.dataSource}
                enableEmptySections={true}
      	        renderRow={this.renderItem.bind(this)}
      	        style={styles.listView}/>
          </View>
        </View>
        {this.state.view == 'AddVehicle'?
          <AddVehicle onAddOkBtn={this.onAddOkBtn} onAddCancelBtn={this.onAddCancelBtn}/>
          :null
        }
      </SideMenu>
    );
    // {this.state.view == 'HistorySetting'?
    //   <HistorySetting onItemSelected={this.props.onItemSelected}/>
    //   :null
    // }

  }

  renderItem(vehicle) {
    return (
      <View style={styles.itemView}>
        <TouchableOpacity onPress={(e)=>this.showOnMap(e,vehicle)}>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <Image
              style={styles.avatar}
              source={require('../images/car.png')}/>
            <View style={{flex: 1}}>
              <Text style={styles.regularGray}>{strings.driver}</Text>
              <Text style={styles.name_phonenumber}>Jhon Andreson Doe</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.regularGray}>{strings.phone_number}</Text>
              <Text style={styles.name_phonenumber}>618-448-8000</Text>
              <Text style={styles.ago}>{strings.ago}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonBar}>
           <TouchableOpacity style={styles.button} onPress={(e)=>this.showOnMap(e,vehicle)}>
            <Image source={require('../images/map_inactive.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>{strings.show_on_map}</Text>
           </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={(e)=>this.vehicleHistory(e,vehicle)}>
            <Image source={require('../images/history.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>{strings.vehicle_history}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={(e)=>this.removeVehicle(e,vehicle)}>
           <Image source={require('../images/remove.png')} style={styles.buttonImage} />
           <Text style={styles.buttonText}>{strings.remove_vehicle}</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  onItemClicked = (e, vehicle) => {
  	this.setState({
  		openRow: (this.state.openRow == vehicle.id)? -1 : vehicle.id,
  		dataSource: this.ds.cloneWithRows(this.state.searchDataList.length>0?searchDataList: global.Dlist)
  	});
  }

  showOnMap = (e, vehicle) => {
    console.log("show on map");
    global.currentVehicle = vehicle;
    const {navigate} = this.props.navigation;
    this.setState({
      view: 'ShowOnMap'
    });
    if (global.currentVehicle.coordinate == null) {
      Toast.show(strings.invalid_coordinate);
      return;
    }else{
      navigate("ShowOnMap");
    }
    // this.props.onItemSelected("ShowOnMap");
  }
  vehicleHistory = (e, vehicle) => {
    const {navigate} = this.props.navigation;
    console.log(vehicle);
    global.currentVehicle = vehicle;
    this.setState({
      view: 'VehicleHistory'
    });
    if (global.currentVehicle.coordinate == null) {
      Toast.show(strings.invalid_coordinate);
      return;
    }else{
      navigate("VehicleHistory");
    }
  }
  removeVehicle = (e, vehicle) => {
    Alert.alert(
      strings.remove_vehicle,
      strings.alert_remove_vehicle,
      [
        {text: strings.cancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: strings.ok, onPress: () => {
          console.log('OK Pressed', vehicle.id)

          var REQUEST_URL_DEVICES = 'https://api.koja.frdid.com/api/device/v1/devices/';

          encrypted = base64.encode(global.userId + ":" + global.sessionId)
          fetch(REQUEST_URL_DEVICES + vehicle.id,{
            method: 'DELETE',
            headers: {
              'Authorization': 'Session ' + encrypted,
            },
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
                  this.setState({
                    dataSource: this.ds.cloneWithRows(global.Dlist)
                  });
                })
                .done();
            }
            // response.json()
          })
          // .then((responseData) => {
          // })
          .done();
        }},
      ],
      { cancelable: false }
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingVertical:0,
    paddingHorizontal: 0,
  },
  // button: {
  //   paddingHorizontal:15,
  // },
  navbar: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'SanFranciscoDisplay-Bold',
    alignSelf: 'center',
    color: '#444C5B',
    fontSize: 21,
    fontWeight: '600',
  },

  vehicle_container: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#67cdba',
    paddingVertical: 5,
  },
  listView: {
    paddingVertical: 0,
    flex: 1,
  },
  subListView: {
  	paddingLeft: 20
  },
  text: {
    fontFamily: 'avenir-light',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
  vehicleName: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    alignSelf: 'center',
    color: '#444C5B',
    fontSize: 20,
    fontWeight: '600',
  },
  regularGray: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#939AA5',
    fontSize: 15,
    fontWeight: '400',
  },

  name_phonenumber: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#444C5B',
    fontSize: 16,
    fontWeight: '400',
  },
  ago: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    color: '#444C5B',
    fontSize: 17,
    fontWeight: '600',
  },

  itemView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  avatar: {
    width: 50,
    height: 50,
    // borderRadius: 25,
    margin: 5
    // flex: 1,
  },

  buttonBar: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 5,
  },

  buttonText: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    color: '#939AA5',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },

  buttonImage: {
    width: 20,
    height: 20
  },

  TextInput: {
  	height: 30,
    fontSize: 13,
    flex: 1,
  	backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  	paddingHorizontal: 10,
    marginBottom: 10
  }
});
