const React = require('react');
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
  FlatList,
  Dimensions,
} = require('react-native');
const { Component } = React;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  button_left: {
    position: 'absolute',
    top: 25,
    left: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  button_right: {
    position: 'absolute',
    top: 25,
    right: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
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

  historyView: {
    // position: 'absolute',
    // bottom: 0,
    backgroundColor: 'red',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5
  },
  vehicleName: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    color: '#444C5B',
    fontSize: 20,
    fontWeight: '600',
  },
  sum: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    color: '#444C5B',
    fontSize: 18,
    fontWeight: '400',
  },

  itemView: {
    flex: 1,
    // borderLeftWidth: 2,
    // borderLeftColor: '#939AA5',
    paddingLeft: 10,
    paddingBottom: 10,
  },

  time: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    color: '#444C5B',
    fontSize: 15,
    fontWeight: '400',
    flex: 1,
    paddingBottom: 3,
  },
  date: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    color: '#444C5B',
    fontSize: 15,
    fontWeight: '400',
  },
  location: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    color: '#939AA5',
    fontSize: 17,
    fontWeight: '400',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: '#939AA5',
    borderWidth: 2,
    backgroundColor: '#fff',
    // position: 'absolute',
    // top: 2,
    // left: -9,
  },
  Marker: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: height/4-32,
    left: width/2-16,
  }
});

module.exports = class VehicleHistory extends Component {
  constructor(props) {
    super(props);
    console.log("Home constructor");
    this.preViewIndex = -1;
  }
  region = {
        latitude: global.currentVehicle.coordinate.lat,
        longitude: global.currentVehicle.coordinate.lon,
        latitudeDelta: 0.0622/2.0,
        longitudeDelta: 0.0211/2.0,
      };

  state = {
    historyList:[],
    refreshing: false,
    displayTime: Date.now(),
    region: region,
  };

  static navigationOptions = {
    title: 'VehicleHistory',
    header:false
  };


  componentDidMount() {
    console.log("componentDidMount", global.currentVehicle.name);

  }

  _onRefresh(){
    console.log("_onRefresh")
  }

  _onEndReached(){
    var displayTime = new Date(this.state.displayTime);
    var twoDaysAgoTime = new Date(this.state.displayTime-2*3600*24*1000);
    var startDateTime = twoDaysAgoTime.getFullYear() + "-"
                + (twoDaysAgoTime.getMonth()+1)  + "-"
                + twoDaysAgoTime.getDate() + "%20"
                + twoDaysAgoTime.getHours() + ":"
                + twoDaysAgoTime.getMinutes()+ ":00";
    var endDateTime = displayTime.getFullYear() + "-"
                + (displayTime.getMonth()+1)  + "-"
                + displayTime.getDate() + "%20"
                + displayTime.getHours() + ":"
                + displayTime.getMinutes()+":00";
    this.setState({
      displayTime: this.state.displayTime-2*3600*24*1000,
    })
    console.log("_onEndReached")
    var REQUEST_URL_DEVICE_HISTORY = 'https://api.koja.frdid.com/api/device/v1/devices/'
                              +global.currentVehicle.id+
                              '/history/'+startDateTime+'/'+endDateTime;
                              // '/history/2017-07-08%201:01:01/2017-07-10%208:01:01';
    console.log(REQUEST_URL_DEVICE_HISTORY);
    encrypted = base64.encode(global.userId + ":" + global.sessionId)
    fetch(REQUEST_URL_DEVICE_HISTORY,{
      method: 'GET',
      headers: {
        'Authorization': 'Session ' + encrypted,
        'Accept': 'application/json',
        'Connection': 'close',
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.length > 0){
        var _historyList = [];
        var historyListLength = this.state.historyList.length;
        for (var i = responseData.length - 1; i >= 0; i-=5) {
            dateTime = new Date(responseData[i].time);
            _historyList.push({
              key: historyListLength++,
              date: dateTime.toDateString().substr(0, 10),
              time: dateTime.toTimeString().substr(0, 5),
              latitude: responseData[i].lat,
              longitude: responseData[i].lon,
            });
        };
        this.setState({
          historyList: [...this.state.historyList, ..._historyList],
        });
        console.log("history count", _historyList.length);
      }else{
        console.log("vehicle_history 0")
        this._onEndReached();
      }
    })
    .done();
  }

  _onViewableItemsChanged = (viewableItems) => {
    if(viewableItems){
      var {item} = viewableItems;
      // console.log("kangtle _onViewableItemsChanged", index, this.preViewIndex)
      region = {
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.0622/2.0,
            longitudeDelta: 0.0211/2.0,
          };

      this.setState({
        region: region
      })
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <MapView
              ref={ref=>(this._map=ref)}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 35.73136901855469,
                longitude: 51.4324,
                latitudeDelta: 0.922,
                longitudeDelta: 0.421,
              }}
              region={this.state.region}
          >
            {/*<Image source={require('../images/marker.png')} style={styles.Marker} />*/}
            <MapView.Marker
              // key={marker.id}
              // title={global.currentVehicle.name}
              coordinate={this.state.region} style={{position: 'absolute', top: 0, left: 50}}>
            </MapView.Marker>

            {this.state.historyList.length>0?
              <MapView.Polyline
                  coordinates={this.state.historyList}
                  strokeColor={"#3C8FC7"}
                  fillColor={"#3C8FC7"}
                  strokeWidth={3}/>:null
            }
          </MapView>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <Image
              style={styles.avatar}
              source={require('../images/avatar.png')}
            />
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.vehicleName}>{global.currentVehicle.name}</Text>
              <Text style={styles.sum}>1.5Km</Text>
            </View>
          </View>
          <FlatList
            // refreshing={this.state.refreshing}
            // onRefresh={()=>(this._onRefresh())}
            onViewableItemsChanged={({viewableItems})=>{this._onViewableItemsChanged.apply(this, viewableItems)}}
            onEndReachedThreshold={0.5}
            onEndReached={this._onEndReached.bind(this)}
            data={this.state.historyList}
            renderItem={({item})=>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.circle}/>
                  <View style={{width: 2, backgroundColor: '#939AA5', flex: 1}}/>
                </View>
                <View style={styles.itemView}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                  <Text style={styles.location}>{item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}</Text>
                </View>
              </View>
            }
            horizontal= {false}
            style={{paddingHorizontal: 20}}
            // keyExtractor={(item)=>item.time}
          />
        </View>
        <Button style={styles.button_left} onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../images/back.png')} style={{width: 20, height: 20}} />
        </Button>
        <Button style={styles.button_right} onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../images/search_green.png')} style={{width: 20, height: 20}} />
        </Button>
      </View>
    );
  }
};
