const React = require('react');
const SideMenu = require('react-native-side-menu');
import Menu from './Menu';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Toast from 'react-native-simple-toast'
import Button from '../components/Button'
import base64 from 'base-64'
import DefaultPreference from 'react-native-default-preference';

const {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} = require('react-native');
const { Component } = React;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  button: {
    position: 'absolute',
    top: 30,
    // left: 15,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 22,

  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = class HomeScreen extends Component {
  constructor(props) {
    super(props);
    console.log("Home constructor");
  }

  componentWillMount() {
    console.log("will mount")
    var params = this.props.navigation.state.params;
    if(params)
      if(params.view == "ShowOnMap"){
        console.log("navigation ShowOnMap")
        if (global.currentVehicle.coordinate == null) {
          Toast.show("Invalid coordinate");
          return;
        };
        region = {
              latitude: global.currentVehicle.coordinate.lat,
              longitude: global.currentVehicle.coordinate.lon,
              latitudeDelta: 0.000622,
              longitudeDelta: 0.000211,
            };

        this.setState({
          region: region
        })
      }
  }

  state = {
    isOpen: false,
    selectedItem: 'About',
    historyList:[],
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    const { navigate } = this.props.navigation;
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

    console.log(item);
    if(item == "Map"){
      console.log("navigate Map")
      navigate("Home")
    }
    else if(item == "LogOut" || item == "ChangePassword"){
      DefaultPreference.clear('userId');
      DefaultPreference.clear('sessionId');
      navigate("Login")
    }else if(item == "ShowOnMap"){
      if (global.currentVehicle.coordinate == null) {
        Toast.show("Invalid coordinate");
        return;
      };
      region = {
            latitude: global.currentVehicle.coordinate.lat,
            longitude: global.currentVehicle.coordinate.lon,
            latitudeDelta: 0.001222,
            longitudeDelta: 0.000511,
          };

      this.setState({
        region: region
      })
    }else if(item == "VehicleHistory"){
      var REQUEST_URL_DEVICES = 'https://api.koja.frdid.com/api/device/v1/devices/'
                                +global.currentVehicle.id+
                                '/history/'+global.startDateTime+'/'+global.endDateTime;
      console.log(REQUEST_URL_DEVICES);
      encrypted = base64.encode(global.userId + ":" + global.sessionId)
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
        var _historyList = [];
        for (var i = responseData.length - 1; i >= 0; i--) {
            _historyList.push({
              latitude: responseData[i].lat,
              longitude: responseData[i].lon,
            });
        };
        this.setState({
          historyList: _historyList,
        });
      })
      .done();
    }else if(item == "VehicleList"){
      navigate("VehicleList")
    }

  }

  static navigationOptions = {
    title: 'Home',
    header:false
  };


  componentDidMount() {
    console.log("componentDidMount");
    for (var i = global.Dlist.length - 1; i >= 0; i--) {
      var vehicle = global.Dlist[i];
      if(vehicle.coordinate != null){
        region = {
              latitude: vehicle.coordinate.lat,
              longitude: vehicle.coordinate.lon,
              latitudeDelta: 0.00522,
              longitudeDelta: 0.002521,
            };

        this.setState({
          region: region
        })
        break;
      }
    };
  }

  render() {
    global.menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menuPosition={(global.lang=="ir")?"right":"left"}
        menu={global.menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <MapView.Animated
            ref={ref=>(this._map=ref)}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 31.73136901855469,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={this.state.region}
        >
          {global.Dlist.map(marker => (
            marker.coordinate != null?
              <MapView.Marker
                key={marker.id}
                title={marker.name}
                coordinate={{
                  latitude: marker.coordinate.lat,
                  longitude: marker.coordinate.lon
                }}>
              </MapView.Marker>:null
              )
            )
          }
          {this.state.historyList.length>0?
            <MapView.Polyline
                coordinates={this.state.historyList}
                strokeColor={"#3C8FC7"}
                fillColor={"#3C8FC7"}
                strokeWidth={3}/>:null
          }
        </MapView.Animated>
        <Button style={[(global.lang == 'ir')?{right: 15}:{left: 15},styles.button]} onPress={() => this.toggle()}>
          <Image
            source={require('../images/menu.png')} style={{width: 20, height: 20}} />
        </Button>
      </SideMenu>
    );
  }
};
