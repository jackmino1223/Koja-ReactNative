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
} = require('react-native');
const { Component } = React;

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
    borderLeftWidth: 2,
    borderLeftColor: '#939AA5',
    paddingLeft: 20,
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
    position: 'absolute',
    top: 2,
    left: -9,
  }
});

module.exports = class ShowOnMap extends Component {
  constructor(props) {
    super(props);
    console.log("Home constructor");
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
    title: 'ShowOnMap',
    header:false
  };

  render() {
    return (
      <View style={{flex: 1}}>
          <MapView.Animated
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
            <MapView.Marker
              // key={marker.id}
              title={global.currentVehicle.name}
              coordinate={this.state.region}>
            </MapView.Marker>
          </MapView.Animated>
        <Button style={styles.button_left} onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../images/back.png')} style={{width: 20, height: 20}} />
        </Button>
      </View>
    );
  }
};
